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
      all_answers: getAllAnswers(quizItem),
      selected: null
    }))
    console.log(quizItems)
    setQuizData(quizItems)
  }

  function getAllAnswers (quizItem) {
    const correctAnswer = quizItem.correct_answer
    const incorrectAnswers = quizItem.incorrect_answers
    const answerArray = incorrectAnswers.concat(correctAnswer)
    const sortedArray = answerArray.sort(() => Math.random() - 0.5)
    const answersObject = sortedArray.map(item => ({
      value: item,
      // isSelected: true,
      id: nanoid()
    }))
    // console.log(answersObject)
    return answersObject
  }

  function handleAnswer (questionId, answerId) {
    console.log(`clicked answer ${answerId} ${questionId}`)
    const i = quizData.findIndex((question) => question.id === questionId)
    console.log(i)



    //
    // setQuizData(prevData => prevData.map((dataItem, index) => {
    // console.log(dataItem)
    // const answersArray = dataItem.all_answers
    // return dataItem.all_answers[index].id === id
    //   ? { ...dataItem.all_answers, isSelected: !dataItem.all_answers[index].isSelected } : dataItem
    // }))
  }

  const triviaElements = quizData.map(question => {
    // console.log(question)
    return (
      <TriviaItem
        key={question.id}
        questionId={question.id}
        correctAnswer={question.correct_answer}
        question={question.question}
        possibleAnswers={question.all_answers}
        handleAnswer={handleAnswer}
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
