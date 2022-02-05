import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import TriviaItem from './components/TriviaItem'
import { nanoid } from 'nanoid'
import logo from './img/logo.svg'
import './App.css'

function App () {
  const [quizStatus, setQuizStatus] = useState(false)
  const [quizData, setQuizData] = useState([])

  const [count, setCount] = useState(0)

  function handleStart () {
    setQuizStatus(true)
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=3&category=9&type=multiple')
      .then(res => res.json())
      .then(data => handleQuizData(data.results))
  }, [])

  function handleQuizData (data) {
    const quizItems = data.map(quizItem => ({
      ...quizItem,
      id: nanoid(),
      all_answers: getAllAnswers(quizItem)
    }))
    // console.log(quizItems)
    setQuizData(quizItems)
  }

  function getAllAnswers (quizItem) {
    const correctAnswer = quizItem.correct_answer
    const incorrectAnswers = quizItem.incorrect_answers
    const answerArray = incorrectAnswers.concat(correctAnswer)
    const sortedArray = answerArray.sort(() => Math.random() - 0.5)
    const answersObject = sortedArray.map(item => ({
      value: item,
      isSelected: false,
      id: nanoid()
    }))
    // console.log(answersObject)
    return answersObject
  }

  const triviaElements = quizData.map(item => {
    const answerElements = item.all_answers.map(answer => {
      return (<li key={answer.id} className='trivia__answer'>{answer.value}</li>)
    })

    return (
      <TriviaItem
        key={item.id}
        correctAnswer={item.correct_answer}
        question={item.question}
        possibleAnswers={answerElements}
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
