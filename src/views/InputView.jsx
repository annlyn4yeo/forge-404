import { useState } from "react";

const tones = ["minimal", "bold", "playful", "dark", "technical"];

function InputView({ onGenerate }) {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("minimal");

  const handleGenerate = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    const lines = trimmedInput.split("\n");
    const brand = (lines[0] || "").trim();
    const desc = lines.slice(1).join("\n").trim();

    onGenerate(brand, desc, tone);
  };

  return (
    <div className="h-screen bg-[#0C0C0C] flex items-center justify-center">
      <div className="max-w-125 w-full px-6 flex flex-col gap-3">
        <textarea
          rows={3}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Brand name and what you do — or drop a URL"
          className="bg-[#141414] border border-[#222] rounded-lg text-[#f0ede6] text-sm p-3 w-full resize-none outline-none focus:border-[#FF4500] transition-colors"
        />

        <div className="flex flex-wrap gap-2">
          {tones.map((toneOption) => {
            const isSelected = tone === toneOption;

            return (
              <button
                key={toneOption}
                type="button"
                onClick={() => setTone(toneOption)}
                className={`font-mono text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#FF4500] text-[#FF4500] bg-[#FF4500]/10"
                    : "border-[#222] text-[#444]"
                }`}
              >
                {toneOption}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          className="bg-[#FF4500] text-white font-semibold text-sm py-3 rounded-lg hover:opacity-90 active:scale-[0.99] transition-all w-full mt-2"
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default InputView;
