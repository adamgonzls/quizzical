export default function TriviaItem (props) {
  return (
    <div className='trivia__item'>
      <h2 className='trivia__question'>Q: {props.question}</h2>
      <ul className='trivia__answers'>
        {props.possibleAnswers}
      </ul>
    </div>
  )
}
