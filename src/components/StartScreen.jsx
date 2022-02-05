export default function StartScreen (props) {
  return (
    <div className='start'>
      <h1 className='intro__name'>Quizzical</h1>
      <p className='intro__tagline'>Test Your Knowledge!</p>
      <button onClick={props.handleStart}>Start quiz</button>
    </div>
  )
}
