import { useState } from 'react'
import { MODES } from '../lib/deck.js'

const clamp = (v, min, max) => Math.min(max, Math.max(min, Number.isFinite(v) ? v : min))

export default function Setup({ onStart }) {
  const [mode, setMode] = useState('natural')
  const [count, setCount] = useState(7)
  const [seconds, setSeconds] = useState(2)

  const pickMode = (m) => {
    setMode(m)
    setCount(MODES[m].pool.length)
  }

  return (
    <section className="panel">
      <div className="field">
        <label>버전</label>
        <div className="seg">
          {Object.entries(MODES).map(([key, m]) => (
            <button
              key={key}
              className={mode === key ? 'on' : ''}
              onClick={() => pickMode(key)}
            >
              {m.label}
              <br />
              <small>{m.sub}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="count">카드 개수</label>
        <input
          id="count"
          type="number"
          min="1"
          max="200"
          value={count}
          onChange={(e) => setCount(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="sec">카드당 제한 시간 (초)</label>
        <input
          id="sec"
          type="number"
          min="0"
          max="60"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <div className="hint">0 입력 시 타이머 없이 직접 넘기기</div>
      </div>

      <button
        className="primary"
        onClick={() =>
          onStart({
            mode,
            count: clamp(Number(count), 1, 200),
            seconds: clamp(Number(seconds), 0, 60),
          })
        }
      >
        시작
      </button>
    </section>
  )
}
