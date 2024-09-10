import { createSlice } from '@reduxjs/toolkit'
import { Quiz } from './types'

import AirtableData from '../../../../data.airtable.json'

const initialState: Quiz = {
  title: AirtableData.quiz.title,
  timeToComplete: AirtableData.quiz.timeToComplete,
  description: AirtableData.quiz.description,
  questions: Object.values(AirtableData.quizQuestions),
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state = action.payload
    },
  },
})

export const { setQuiz } = quizSlice.actions
export const selectorQuiz = (state: { quiz: Quiz }) => state.quiz
export const selectorQuizIntro = (state: { quiz: Quiz }) => ({
  title: state.quiz.title,
  description: state.quiz.description,
  timeToComplete: state.quiz.timeToComplete,
})
export const selectorQuizQuestions = (state: { quiz: Quiz }) =>
  state.quiz.questions

const quizReducer = quizSlice.reducer

export default quizReducer
