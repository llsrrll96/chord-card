import { useCallback, useState } from 'react'
import Setup from './components/Setup.jsx'
import Play from './components/Play.jsx'
import End from './components/End.jsx'
import { MODES, buildDeck } from './lib/deck.js'

export default function App() {
  const [phase, setPhase] = useState('setup') // setup | play | end
  const [session, setSession] = useState(null) // { deck, seconds }
  const [result, setResult] = useState({ done: 0, completed: false })

  const handleStart = ({ mode, count, seconds }) => {
    setSession({ deck: buildDeck(MODES[mode].pool, count), seconds })
    setPhase('play')
  }

  const handleFinish = useCallback((done, completed) => {
    setResult({ done, completed })
    setPhase('end')
  }, [])

  return (
    <div className="app">
      <h1>Chord Card</h1>
      {phase === 'setup' && <Setup onStart={handleStart} />}
      {phase === 'play' && (
        <Play deck={session.deck} seconds={session.seconds} onFinish={handleFinish} />
      )}
      {phase === 'end' && <End result={result} onAgain={() => setPhase('setup')} />}
    </div>
  )
}
