export default function TriviaAnswers (props) {
  // console.log(props)

  // function handleClick (id) {
  // console.log(`click ${id}`)
  // setQuizData(prevData => {
  //   console.log(prevData)
  // })
  // }

  const answerElements = props.possibleAnswers.map(answer => {
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
        onClick={() => props.handleAnswer(answer.id)}
      >
        {answer.value}
      </li>
    )
  })

  return (
    <ul className='trivia__answers'>
      {answerElements}
    </ul>
  )
}
