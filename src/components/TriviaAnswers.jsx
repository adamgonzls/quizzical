export default function TriviaAnswers (props) {
  const style = {
    backgroundColor: props.isSelected ? 'green' : 'white'
  }

  return (
    <ul className='trivia__answers'>
      {props.possibleAnswers}
    </ul>
  )
}
