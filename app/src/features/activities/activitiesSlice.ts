import { createSlice } from '@reduxjs/toolkit'
import { activities } from '@/features/activities/content'

interface ActivityState {
  openActivity: keyof typeof activities | null
  onComplete: null | (() => void)
}

const initialState: ActivityState = {
  openActivity: null,
  onComplete: null,
}

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    toggleActivity: (state, action) => {
      state.openActivity = action.payload

      if (action.payload === null) {
        state.onComplete = null
      }
    },
    setActivityOnComplete: (state, action) => {
      state.onComplete = action.payload
    },
  },
})

export const { toggleActivity, setActivityOnComplete } = activitiesSlice.actions

export const selectorOpenActivity = (state: { activities: ActivityState }) =>
  state.activities.openActivity

export const selectorOnComplete = (state: { activities: ActivityState }) =>
  state.activities.onComplete

export default activitiesSlice.reducer
