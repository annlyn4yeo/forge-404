export function toHTML(raw) {
  return raw
}

export function toReact(raw) {
  const jsx = String(raw).replace(/\bclass=/g, 'className=')

  return `export default function NotFound() {
  return (
    <>
${jsx}
    </>
  )
}`
}

export function toTailwind(raw) {
  const html = String(raw).replace(/<style\b[\s\S]*?<\/style>/i, '').trim()

  return `<!-- Tailwind conversion: map these styles manually -->
${html}`
}
