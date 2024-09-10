import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Quiz, QuizResult } from './types'

import AirtableData from '../../../../data.airtable.json'
import { api } from '@/api/client'

const initialState: QuizResult = {
  quizResultMatrix: [],
  finalQuestionValue: [],
  finalReport: {},
  isEdit: false,
}

export const addFinalReport = createAsyncThunk(
  'quizResult/addFinalReport',
  async (params) => {
    const response = await api.report.addReport(params)
    return response?.data
  },
)

export const updateFinalReport = createAsyncThunk(
  'quizResult/updateReport',
  async (params) => {
    const response = await api.report.updateReport(params)
    return response?.data
  },
)

export const getReportByUser = createAsyncThunk(
  'quizResult/getReportByUser',
  async (params) => {
    const response = await api.report.getReportByUser(params)
    return response?.data
  },
)

export const quizResultSlice = createSlice({
  name: 'quizResult',
  initialState,
  reducers: {
    setIsEdit: (state, action) => {
      return {
        ...state,
        isEdit: action?.payload,
      }
    },
    setFinalQuestionValue: (state, action) => {
      return {
        ...state,
        finalQuestionValue: [...action.payload],
      }
    },
    setQuizResultMatrix: (state, action) => {
      return {
        ...state,
        quizResultMatrix: action.payload,
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(addFinalReport.pending, (state, action) => {
      return {
        ...state,
        reportLoading: true,
      }
    })
    builder.addCase(addFinalReport.fulfilled, (state, action) => {
      return {
        ...state,
        finalReport: action.payload.result,
        reportLoading: false,
      }
    })
    builder.addCase(addFinalReport.rejected, (state, action) => {
      return {
        ...state,
        finalReport: {},
        reportLoading: false,
      }
    })
    builder.addCase(updateFinalReport.pending, (state, action) => {
      return {
        ...state,
        reportLoading: true,
      }
    })
    builder.addCase(updateFinalReport.fulfilled, (state, action) => {
      return {
        ...state,
        finalReport: action.payload.result,
        reportLoading: false,
      }
    })
    builder.addCase(updateFinalReport.rejected, (state, action) => {
      return {
        ...state,
        finalReport: {},
        reportLoading: false,
      }
    })
    builder.addCase(getReportByUser.fulfilled, (state, action) => {
      return {
        ...state,
        finalReport: action.payload.result,
        reportLoading: false,
      }
    })
    builder.addCase(getReportByUser.rejected, (state, action) => {
      return {
        ...state,
        finalReport: {},
        reportLoading: false,
      }
    })
  },
})

export const { setFinalQuestionValue, setQuizResultMatrix, setIsEdit } =
  quizResultSlice.actions
// export const selectorQuiz = (state: { quiz: Quiz }) => state.quiz
// export const selectorQuizIntro = (state: { quiz: Quiz }) => ({
//   title: state.quiz.title,
//   description: state.quiz.description,
//   timeToComplete: state.quiz.timeToComplete,
// })
// export const selectorQuizQuestions = (state: { quiz: Quiz }) =>
//   state.quiz.questions

const quizResultReducer = quizResultSlice.reducer

export default quizResultReducer
