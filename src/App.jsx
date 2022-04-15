import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import TriviaItem from './components/TriviaItem'
import { nanoid } from 'nanoid'
import he from 'he'
import './App.css'

function App () {
  const [quizStatus, setQuizStatus] = useState({
    quizTryNumber: 1,
    inProgress: false,
    statusString: ''
  })
  const [allQuizData, setAllQuizData] = useState([])

  function handleStart (resultsString = '') {
    setQuizStatus(prevData => ({
      ...prevData,
      inProgress: true,
      statusString: resultsString
    }))
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=9&type=multiple')
      .then(res => res.json())
      .then(data => normalizeQuizData(data.results))
  }, [quizStatus.quizTryNumber])

  function normalizeQuizData (data) {
    const quizItemsNormalized = data.map(quizItem => ({
      triviaQuestionId: nanoid(),
      question: he.decode(quizItem.question),
      correctAnswerObj: {
        Id: nanoid(),
        value: he.decode(quizItem.correct_answer)
      },
      incorrectAnswersArr: quizItem.incorrect_answers,
      selectedAnswerId: null
    }))
    const quizItems = quizItemsNormalized.map(quizItem => ({
      ...quizItem,
      allAnswersArr: getAnswersArr(quizItem)
    }))
    setAllQuizData(quizItems)
  }

  function getAnswersArr (quizItem) {
    const correctAnswer = quizItem.correctAnswerObj
    const incorrectAnswers = quizItem.incorrectAnswersArr
    const incorrectAnswerObjects = incorrectAnswers.map(item => ({
      Id: nanoid(),
      value: he.decode(item)
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
    let correctAnswerAmount = 0
    const numberOfQuestions = allQuizData.length
    allQuizData.forEach((quizItem, index) => {
      if (quizItem.selectedAnswerId === quizItem.correctAnswerObj.Id) {
        correctAnswerAmount++
      }
    })
    const resultsString = `you scored ${correctAnswerAmount} / ${numberOfQuestions} correct answers`
    setQuizStatus(prevData => ({
      ...prevData,
      inProgress: false,
      statusString: resultsString
    }))
  }

  function scrollToTopTriviaItem () {
    const triviaElements = document.getElementsByClassName('trivia__item')
    const firstTriviaElement = triviaElements[0]
    firstTriviaElement.scrollIntoView()
  }

  function restartGame () {
    setQuizStatus(prevData => ({
      quizTryNumber: prevData.quizTryNumber + 1,
      inProgress: true,
      statusString: ''
    }))
    scrollToTopTriviaItem()
  }

  const triviaElements = allQuizData.map(triviaItem => {
    return (
      <TriviaItem
        key={triviaItem.triviaQuestionId}
        triviaItemId={triviaItem.triviaQuestionId}
        correctAnswer={triviaItem.correctAnswerObj}
        question={triviaItem.question}
        possibleAnswers={triviaItem.allAnswersArr}
        handleSelectedAnswer={handleSelectedAnswer}
        selectedAnswerId={triviaItem.selectedAnswerId}
        quizStatus={quizStatus.inProgress}
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
              {quizStatus.statusString.length > 0 &&
                <h3>
                  {quizStatus.statusString}
                </h3>}
              <button
                className='quiz__submit'
                type='button'
                onClick={quizStatus.inProgress ? checkAnswers : restartGame}
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
