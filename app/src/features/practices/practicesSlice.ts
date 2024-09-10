import { createSlice } from '@reduxjs/toolkit'
import { Practice } from '@/features/practices/types'
import { practiceActivities } from '@/features/practices/content/activities'

interface PracticeState {
  openActivity: keyof typeof practiceActivities | null
  practices: Practice[]
  unlocked: boolean
}

export interface DeletePracticePayload {
  id: string
}

const initialState: PracticeState = {
  openActivity: null,
  practices: [],
  unlocked: false,
}

export const practicesSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    togglePracticeActivity: (state, action) => {
      state.openActivity = action.payload
    },
    practiceCompleted: (state, action: { payload: Practice }) => {
      state.practices.push({
        ...action.payload,
      })
    },
    deletePractice: (state, action: { payload: DeletePracticePayload }) => {
      state.practices = state.practices.filter(
        (practice) => practice.id !== action.payload.id,
      )
    },
    unlockPractices: (state) => {
      state.unlocked = true
    },
  },
})

export const {
  togglePracticeActivity,
  practiceCompleted,
  deletePractice,
  unlockPractices,
} = practicesSlice.actions

export const selectPractices = (state: { practices: PracticeState }) =>
  state.practices.practices

export const selectOpenPracticeActivity = (state: {
  practices: PracticeState
}) => state.practices.openActivity

export default practicesSlice.reducer
