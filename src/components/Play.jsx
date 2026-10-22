import { useCallback, useEffect, useRef, useState } from 'react'
import { splitNote } from '../lib/deck.js'

export default function Play({ deck, seconds, onFinish }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [left, setLeft] = useState(seconds)
  const elapsedRef = useRef(0) // 현재 카드에서 흐른 시간(ms)

  const goNext = useCallback(() => {
    elapsedRef.current = 0
    setLeft(seconds)
    setPaused(false)
    setIdx((i) => i + 1)
  }, [seconds])

  const finished = idx >= deck.length

  // 끝났으면 부모에 알림
  useEffect(() => {
    if (finished) onFinish(deck.length, true)
  }, [finished, deck.length, onFinish])

  // 카드별 타이머
  useEffect(() => {
    if (finished || seconds === 0 || paused) return
    let raf
    let last = performance.now()
    const tick = (now) => {
      elapsedRef.current += now - last
      last = now
      const remain = Math.max(0, seconds * 1000 - elapsedRef.current)
      setLeft(remain / 1000)
      if (remain <= 0) {
        goNext()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [idx, paused, seconds, finished, goNext])

  // 키보드: → / Enter 다음, Space 일시정지, Esc 종료
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') goNext()
      else if (e.key === ' ') {
        e.preventDefault()
        if (seconds > 0) setPaused((p) => !p)
      } else if (e.key === 'Escape') onFinish(idx, false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, idx, seconds, onFinish])

  if (finished) return null

  const { letter, accidental } = splitNote(deck[idx])

  return (
    <section>
      <div className="meta">
        <span>
          {idx + 1} / {deck.length}
        </span>
        <span>{seconds > 0 ? `${left.toFixed(1)}s` : ''}</span>
      </div>

      <div className="card">
        <div className="chord">
          {letter}
          {accidental && <sup className="acc">{accidental}</sup>}
        </div>
        {seconds > 0 && (
          <div className="bar">
            <i style={{ transform: `scaleX(${left / seconds})` }} />
          </div>
        )}
      </div>

      <div className="controls">
        <button onClick={() => seconds > 0 && setPaused((p) => !p)} disabled={seconds === 0}>
          {paused ? '계속' : '일시정지'}
        </button>
        <button onClick={goNext}>다음 (→)</button>
        <button onClick={() => onFinish(idx, false)}>종료</button>
      </div>
    </section>
  )
}
