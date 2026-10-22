export default function End({ result, onAgain }) {
  return (
    <section className="panel done">
      <h2>🎸 수고했어요!</h2>
      <p>{result.completed ? `${result.done}장 완료` : `${result.done}장 연습했어요`}</p>
      <button className="primary" onClick={onAgain}>
        다시 하기
      </button>
    </section>
  )
}
