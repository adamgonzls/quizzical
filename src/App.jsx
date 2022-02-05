import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import TriviaItem from './components/TriviaItem'
import logo from './img/logo.svg'
import './App.css'

function App () {
  const [quizStatus, setQuizStatus] = useState(false)
  const [quizData, setQuizData] = useState([])

  const [count, setCount] = useState(0)

  function handleStart () {
    console.log('click')
    setQuizStatus(true)
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple')
      .then(res => res.json())
      .then(data => setQuizData(data.results))
  }, [])

  function shuffleArray (answerArray) {
    const sortedArray = answerArray.sort(() => Math.random() - 0.5)
    return sortedArray
  }

  const triviaElements = quizData.map(item => {
    console.log(item)

    const correctAnswer = item.correct_answer
    const incorrectAnswers = item.incorrect_answers
    const answerArray = incorrectAnswers.concat(correctAnswer)
    const shuffledAnswers = shuffleArray(answerArray)

    console.log(shuffledAnswers)

    const possibleAnswers = shuffledAnswers.map((answer, index) => {
      return (<li key={index} className='trivia__answer'>{answer}</li>)
    })

    return (
      <TriviaItem
        correctAnswer={item.correct_answer}
        question={item.question}
        possibleAnswers={possibleAnswers}
      />
    )
  })

  return (
    <div className='app'>
      <div className='quizboard'>
        {quizStatus
          ? <div className='quiz'>
            {triviaElements}
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
