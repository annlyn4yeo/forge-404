import { useState } from 'react'
import Toolbar from '../components/Toolbar.jsx'
import { toHTML, toReact, toTailwind } from '../transformers.js'

function ResultView({ html = '', onRegen, onNew, onCopy }) {
  const [format, setFormat] = useState('HTML')
  const [copied, setCopied] = useState(false)

  const transformers = {
    HTML: toHTML,
    React: toReact,
    Tailwind: toTailwind,
  }

  const handleCopy = async () => {
    const transformer = transformers[format] || toHTML
    const transformed = transformer(html)

    if (typeof onCopy === 'function') {
      await onCopy(transformed, format)
    } else if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(transformed)
    } else {
      throw new Error('Clipboard API is not available.')
    }

    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <iframe
        srcdoc={html}
        sandbox="allow-scripts"
        className="w-screen h-screen border-none block"
      />
      <Toolbar
        format={format}
        onFormatChange={setFormat}
        onCopy={handleCopy}
        onRegen={onRegen}
        onNew={onNew}
        copied={copied}
      />
    </>
  )
}

export default ResultView
