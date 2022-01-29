import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import logo from './img/logo.svg'
import './App.css'

function App () {
  const [quizStatus, setQuizStatus] = useState(false)
  const [count, setCount] = useState(0)

  function handleStart () {
    console.log('click')
    setQuizStatus(true)
  }

  useEffect(() => {
    ;(async function () {
      if (CSS.paintWorklet === undefined) {
        await import('https://unpkg.com/css-paint-polyfill')
      }

      CSS.paintWorklet.addModule(
        'https://unpkg.com/@georgedoescode/houdini-random-blobs'
      )
      document
        .querySelector('.worklet-canvas')
        .style.setProperty('--blob-seed', Math.random() * 10000)
    })()
  })

  return (
    <div className='app'>
      <div className='worklet-canvas' />
      <div className='quizboard'>
        {quizStatus
          ? <div className='quiz'>
            <Question />
            <Question />
            <Question />
            <Question />
            <button
              className='submit-quiz'
              type='button'
              onClick={() => setCount((count) => count + 1)}
            >
              Check answers: {count}
            </button>
            </div>
          : <StartScreen handleStart={handleStart} />}
      </div>
    </div>
  )
}

export default App
