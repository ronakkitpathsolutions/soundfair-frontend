import { createSlice } from '@reduxjs/toolkit'

interface CrisisState {
  openSupport: boolean
}

const initialState: CrisisState = {
  openSupport: false,
}

export const crisisSlice = createSlice({
  name: 'crisis',
  initialState,
  reducers: {
    toggleSupport: (state, action) => {
      state.openSupport = action.payload
    },
  },
})

export const { toggleSupport } = crisisSlice.actions

export const selectCrisisOpenSupport = (state: { crisis: CrisisState }) =>
  state.crisis.openSupport

export default crisisSlice.reducer
