import { useState, useEffect } from 'react'
import Question from './components/Question'
import logo from './img/logo.svg'
import './App.css'

function App () {
  const [count, setCount] = useState(0)

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
      <div className='quiz'>
        <div className='worklet-canvas' />
        <Question />
        <Question />
        <Question />
        <Question />
        <p>
          <button type='button' onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
      </div>
    </div>
  )
}

export default App
