import { describe, it, expect } from 'vitest'
import { NATURAL, ACCIDENTAL, FULL, SHARP, FLAT, buildDeck, splitNote } from './deck.js'

describe('pools', () => {
  it('기본음 7개', () => expect(NATURAL).toHaveLength(7))

  it('샵/플랫 14개 (E♯, B♯, C♭, F♭ 포함)', () => {
    expect(ACCIDENTAL).toHaveLength(14)
    for (const c of [`E${SHARP}`, `B${SHARP}`, `C${FLAT}`, `F${FLAT}`]) {
      expect(ACCIDENTAL).toContain(c)
    }
  })

  it('악보 기호를 쓰고 ASCII #, b 는 쓰지 않는다', () => {
    for (const c of ACCIDENTAL) expect(c).toMatch(/^[A-G][♯♭]$/)
  })

  it('전체 21개, 중복 없음', () => {
    expect(FULL).toHaveLength(21)
    expect(new Set(FULL).size).toBe(21)
  })
})

describe('splitNote', () => {
  it('글자와 기호를 분리한다', () => {
    expect(splitNote(`F${SHARP}`)).toEqual({ letter: 'F', accidental: SHARP })
    expect(splitNote('G')).toEqual({ letter: 'G', accidental: '' })
  })
})

describe('buildDeck', () => {
  it('요청한 개수만큼 만든다', () => {
    expect(buildDeck(NATURAL, 3)).toHaveLength(3)
    expect(buildDeck(NATURAL, 20)).toHaveLength(20)
  })

  it('풀 크기만큼 뽑으면 전부 한 번씩 나온다', () => {
    expect(new Set(buildDeck(FULL, 21)).size).toBe(21)
  })

  it('연속으로 같은 카드가 나오지 않는다', () => {
    for (let t = 0; t < 200; t++) {
      const d = buildDeck(NATURAL, 50)
      for (let i = 1; i < d.length; i++) expect(d[i]).not.toBe(d[i - 1])
    }
  })
})
