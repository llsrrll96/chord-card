// 악보에서 쓰는 기호: ♯ (U+266F), ♭ (U+266D)
export const SHARP = '♯'
export const FLAT = '♭'

export const NATURAL = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
export const SHARPS = NATURAL.map((n) => n + SHARP)
export const FLATS = NATURAL.map((n) => n + FLAT)
export const ACCIDENTAL = [...SHARPS, ...FLATS]
export const FULL = [...NATURAL, ...ACCIDENTAL]

export const MODES = {
  natural: { label: '기본음', sub: `C D E F G A B`, pool: NATURAL },
  accidental: { label: '샵 / 플랫', sub: `C${SHARP} … B${FLAT}`, pool: ACCIDENTAL },
  full: { label: '전체', sub: '21개', pool: FULL },
}

// "C♯" → { letter: "C", accidental: "♯" }
export function splitNote(note) {
  return { letter: note[0], accidental: note.slice(1) }
}

// Fisher–Yates
export function shuffle(arr, rng = Math.random) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 한 바퀴(풀 전체)를 다 돌 때까지 중복 없이 뽑고,
// 바퀴 경계에서 같은 코드가 연속으로 나오지 않게 한다.
export function buildDeck(pool, n, rng = Math.random) {
  const out = []
  while (out.length < n) {
    const round = shuffle(pool, rng)
    if (out.length && round.length > 1 && round[0] === out[out.length - 1]) {
      round.push(round.shift())
    }
    out.push(...round)
  }
  return out.slice(0, n)
}
