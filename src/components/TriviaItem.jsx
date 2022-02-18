export default function TriviaItem ({ triviaItemId, correctAnswer, question, possibleAnswers, handleSelectedAnswer, selectedAnswerId, quizStatus }) {
  const selectedAnswerStyles = {
    backgroundColor: 'var(--link-water)',
    borderColor: 'var(--link-water)'
  }

  const defaultAnswerStyles = {
    backgroundColor: 'transparent',
    borderColor: 'var(--kashmir-blue)'
  }

  const nonSelectedCorrectAnswerStyle = {
    backgroundColor: 'var(--non-selected-correct-answer)',
    borderColor: 'var(--non-selected-correct-answer)'
  }

  const answerElements = possibleAnswers.map(answer => {
    let styles = answer.Id === selectedAnswerId ? selectedAnswerStyles : defaultAnswerStyles

    if (!quizStatus) {
      if ((answer.Id === correctAnswer.Id) && (answer.Id !== selectedAnswerId)) {
        styles = nonSelectedCorrectAnswerStyle
      }
    }

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
