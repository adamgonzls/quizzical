import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import TriviaItem from './components/TriviaItem'
import { nanoid } from 'nanoid'
import logo from './img/logo.svg'
import './App.css'

function App () {
  const [quizStatus, setQuizStatus] = useState({
    inProgress: false,
    statusString: ''
  })
  const [allQuizData, setAllQuizData] = useState([])

  function handleStart (resultsString = '') {
    setQuizStatus(prevData => ({
      inProgress: !prevData.inProgress,
      statusString: resultsString
    }))
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=3&category=9&type=multiple')
      .then(res => res.json())
      .then(data => normalizeQuizData(data.results))
  }, [])

  function normalizeQuizData (data) {
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
    // console.log(quizItems)
    setAllQuizData(quizItems)
  }

  function getAnswersArr (quizItem) {
    // console.log(quizItem)
    const correctAnswer = quizItem.correctAnswerObj
    // console.log(correctAnswer)
    const incorrectAnswers = quizItem.incorrectAnswersArr
    const incorrectAnswerObjects = incorrectAnswers.map(item => ({
      Id: nanoid(),
      value: item
    }))
    const answerArr = incorrectAnswerObjects.concat(correctAnswer)
    const randomizedAnswerArr = answerArr.sort(() => Math.random() - 0.5)
    return randomizedAnswerArr
  }

  function handleSelectedAnswer (questionId, answerId) {
    setAllQuizData(prevData => prevData.map((triviaItem) => {
      return questionId === triviaItem.triviaQuestionId
        ? { ...triviaItem, selectedAnswerId: answerId }
        : triviaItem
    }))
  }

  function checkAnswers () {
    // console.log(allQuizData)
    let correctAnswerAmount = 0
    const numberOfQuestions = allQuizData.length
    allQuizData.forEach((quizItem, index) => {
      // console.log(quizItem)
      if (quizItem.selectedAnswerId === quizItem.correctAnswerObj.Id) {
        correctAnswerAmount++
      }
    })
    const resultsString = `you scored ${correctAnswerAmount} / ${numberOfQuestions} correct answers`
    console.log(resultsString)
    setQuizStatus(prevData => ({
      inProgress: !prevData,
      statusString: resultsString
    }))
    return resultsString
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
        {quizStatus.inProgress || quizStatus.statusString
          ? <div className='quiz'>
            {triviaElements}
            <div className='quiz__status'>
              {quizStatus.statusString.length &&
                <h3>
                  {quizStatus.statusString}
                </h3>}
              <button
                className='quiz__submit'
                type='button'
                onClick={quizStatus.inProgress ? checkAnswers : checkAnswers}
              >
                {quizStatus.inProgress ? 'Check answers' : 'Play Again'}
              </button>
            </div>
            </div>
          : <StartScreen handleStart={handleStart} />}
      </div>
    </div>
  )
}

export default App
