import { useState } from 'react'
import InputView from './views/InputView.jsx'
import LoadingView from './views/LoadingView.jsx'
import ResultView from './views/ResultView.jsx'
import { generate404 } from './api.js'

function App() {
  const [view, setView] = useState('input')
  const [html, setHtml] = useState('')
  const [lastInput, setLastInput] = useState({ brand: '', desc: '', tone: 'minimal' })

  const handleGenerate = async (brand, desc, tone) => {
    setLastInput({ brand, desc, tone })
    setView('loading')

    try {
      const generatedHtml = await generate404(brand, desc, tone)
      setHtml(generatedHtml)
      setView('result')
    } catch (error) {
      console.error(error)
      setView('input')
    }
  }

  const handleRegen = async () => {
    const { brand, desc, tone } = lastInput
    if (!brand && !desc) {
      setView('input')
      return
    }

    await handleGenerate(brand, desc, tone)
  }

  const handleNew = () => {
    setHtml('')
    setView('input')
  }

  if (view === 'loading') {
    return <LoadingView />
  }

  if (view === 'result') {
    return <ResultView html={html} onRegen={handleRegen} onNew={handleNew} />
  }

  return <InputView onGenerate={handleGenerate} />
}

export default App
