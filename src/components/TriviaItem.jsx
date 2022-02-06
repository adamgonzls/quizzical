// import TriviaAnswers from './TriviaAnswers'

export default function TriviaItem ({ triviaItemId, correctAnswer, question, possibleAnswers, handleSelectedAnswer, selectedAnswerId }) {
  // console.log(selectedAnswerId)

  const answerElements = possibleAnswers.map(answer => {
    // console.log(answer)

    const styles = {
      backgroundColor: answer.Id === selectedAnswerId ? 'green' : 'red'
    }

    return (
      <li
        key={answer.Id}
        selected={answer.selected}
        className='trivia__answer'
        style={styles}
        // onClick={() => handleClick(answer.Id)}
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
