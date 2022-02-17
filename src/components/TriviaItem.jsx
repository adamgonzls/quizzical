export default function TriviaItem ({ triviaItemId, correctAnswer, question, possibleAnswers, handleSelectedAnswer, selectedAnswerId }) {
  const selectedAnswerStyles = {
    backgroundColor: 'var(--link-water)',
    borderColor: 'var(--link-water)'
  }

  const nonSelectedAnswerStyles = {
    backgroundColor: 'transparent',
    borderColor: 'var(--kashmir-blue)'
  }

  const answerElements = possibleAnswers.map(answer => {
    const styles = answer.Id === selectedAnswerId ? selectedAnswerStyles : nonSelectedAnswerStyles

    return (
      <li
        key={answer.Id}
        selected={answer.selected}
        className='trivia__answer'
        style={styles}
        onClick={() => handleSelectedAnswer(triviaItemId, answer.Id)}
      >
        {answer.value}
      </li>
    )
  })

  return (
    <div className='trivia__item'>
      <h2 className='trivia__question'>Q: {question}</h2>
      <ul className='trivia__answers'>
        {answerElements}
      </ul>
    </div>
  )
}
