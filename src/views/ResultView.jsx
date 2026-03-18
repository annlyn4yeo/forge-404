import { useState } from 'react'
import Toolbar from '../components/Toolbar.jsx'

function ResultView({ html = '', onRegen, onNew, onCopy }) {
  const [format, setFormat] = useState('HTML')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (typeof onCopy === 'function') {
      await onCopy(format)
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
