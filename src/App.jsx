import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import TriviaItem from './components/TriviaItem'
import { nanoid } from 'nanoid'
import logo from './img/logo.svg'
import './App.css'

function App () {
  const [quizStart, setQuizStart] = useState(false)
  const [allQuizData, setAllQuizData] = useState([])

  function handleStart () {
    setQuizStart(true)
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=3&category=9&type=multiple')
      .then(res => res.json())
      .then(data => normalizeQuizData(data.results))
  }, [])

  function normalizeQuizData (data) {
    // const quizItems = data.map(quizItem => ({
    //   ...quizItem,
    //   Id: nanoid(),
    //   correctAnswerObj: {
    //     Id: 1,
    //     value: 'string'
    //   },
    //   all_answers: getAllAnswers(quizItem),
    //   selected_answer_Id: null
    // }))
    const quizItemsNormalized = data.map(quizItem => ({
      triviaQuestionId: nanoid(),
      question: quizItem.question,
      correctAnswerObj: {
        Id: nanoid(),
        value: quizItem.correct_answer
      },
      incorrectAnswersArr: quizItem.incorrect_answers,
      selectedAnswerId: null
    }))
    const quizItems = quizItemsNormalized.map(quizItem => ({
      ...quizItem,
      allAnswersArr: getAnswersArr(quizItem)
    }))
    console.log(quizItems)
    setAllQuizData(quizItems)
  }

  function getAnswersArr (quizItem) {
    console.log(quizItem)
    const correctAnswer = quizItem.correctAnswerObj
    console.log(correctAnswer)
    const incorrectAnswers = quizItem.incorrectAnswersArr
    const incorrectAnswerObjects = incorrectAnswers.map(item => ({
      Id: nanoid(),
      value: item
    }))
    const answerArr = incorrectAnswerObjects.concat(correctAnswer)
    // console.log(answerArr)
    const randomizedAnswerArr = answerArr.sort(() => Math.random() - 0.5)
    // console.log(randomizedAnswerArr)
    return randomizedAnswerArr
  }

  // function getAllAnswers (quizItem) {
  //   // console.log(quizItem)
  //   const correctAnswer = quizItem.correct_answer
  //   const incorrectAnswers = quizItem.incorrect_answers
  //   const answerArray = incorrectAnswers.concat(correctAnswer)
  //   const sortedArray = answerArray.sort(() => Math.random() - 0.5)
  //   const answersObject = sortedArray.map(item => ({
  //     value: item,
  //     Id: nanoid()
  //   }))
  //   return answersObject
  // }

  function handleSelectedAnswer (questionId, answerId) {
    console.log(`clicked answer ${questionId} ${answerId}`)
    const questionIndex = allQuizData.findIndex((question) => question.Id === questionId)
    // console.log(questionIndex)

    setAllQuizData(prevData => prevData.map((triviaItem) => {
      // console.log(triviaItem)
      // console.log(answerId)
      return questionId === triviaItem.Id
        ? { ...triviaItem, selected_answer_Id: answerId }
        : triviaItem
    }))
  }

  function checkAnswers () {
    console.log('check answers')
    // console.log(allQuizData)
    allQuizData.forEach(element => console.log(element))
  }

  const triviaElements = allQuizData.map(triviaItem => {
    // console.log(triviaItem)
    return (
      <TriviaItem
        key={triviaItem.triviaQuestionId}
        triviaItemId={triviaItem.triviaQuestionId}
        correctAnswer={triviaItem.correctAnswerObj}
        question={triviaItem.question}
        possibleAnswers={triviaItem.allAnswersArr}
        handleSelectedAnswer={handleSelectedAnswer}
        selectedAnswerId={triviaItem.selectedAnswerId}
      />
    )
  })

  return (
    <div className='app'>
      <div className='quizboard'>
        {quizStart
          ? <div className='quiz'>
            {triviaElements}
            <button
              className='submit-quiz'
              type='button'
              onClick={checkAnswers}
            >
              Check answers
            </button>
            </div>
          : <StartScreen handleStart={handleStart} />}
      </div>
    </div>
  )
}

export default App
