import { useState } from 'react'
import InputView from './views/InputView.jsx'
import LoadingView from './views/LoadingView.jsx'
import ResultView from './views/ResultView.jsx'

function App() {
  const [view] = useState('input')

  if (view === 'loading') {
    return <LoadingView />
  }

  if (view === 'result') {
    return <ResultView />
  }

  return <InputView />
}

export default App
