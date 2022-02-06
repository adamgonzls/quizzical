// import TriviaAnswers from './TriviaAnswers'

export default function TriviaItem ({ questionId, correctAnswer, question, possibleAnswers, handleAnswer }) {
  // console.log(props)

  const answerElements = possibleAnswers.map(answer => {
    // console.log(answer)
    const styles = {
      backgroundColor: answer.isSelected ? 'green' : 'red'
    }

    return (
      <li
        key={answer.id}
        isSelected={answer.isSelected}
        className='trivia__answer'
        style={styles}
        // onClick={() => handleClick(answer.id)}
        onClick={() => handleAnswer(questionId, answer.id)}
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
