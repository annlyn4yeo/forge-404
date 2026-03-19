const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;
const PROMPT_TEMPLATE = import.meta.env.VITE_404_PROMPT_TEMPLATE;
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;

function stripMarkdownFences(value) {
  return String(value)
    .trim()
    .replace(/^```[a-zA-Z]*\s*/i, "")
    .replace(/\s*```$/i, "")
    .replace(/```/g, "")
    .trim();
}

function isLikelyHtml(value) {
  const html = String(value).trim();
  return html.startsWith("<") && html.includes("</");
}

function buildPrompt(brand, desc, tone) {
  if (!PROMPT_TEMPLATE) {
    throw new Error(
      "Missing prompt template. Set VITE_404_PROMPT_TEMPLATE in your .env file.",
    );
  }

  return PROMPT_TEMPLATE.replaceAll("${tone}", tone)
    .replaceAll("${brand}", brand)
    .replaceAll("${desc}", desc);
}

export async function generate404(brand, desc, tone) {
  if (!GEMINI_KEY) {
    throw new Error(
      "Missing Gemini API key. Set VITE_GEMINI_KEY in your .env file.",
    );
  }

  const prompt = buildPrompt(brand, desc, tone);

  const response = await fetch(GEMINI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.9 },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const candidates = data?.candidates;

  if (!Array.isArray(candidates) || candidates.length === 0) {
    throw new Error("Gemini returned no candidates. Please try again.");
  }

  const raw = candidates[0]?.content?.parts?.[0]?.text;

  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error("Gemini returned an empty response text.");
  }

  const html = stripMarkdownFences(raw);

  if (!isLikelyHtml(html)) {
    throw new Error("Gemini response was not a valid raw HTML string.");
  }

  return html;
}
