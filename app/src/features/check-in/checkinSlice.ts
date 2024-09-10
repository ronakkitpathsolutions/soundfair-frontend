import { createSlice } from '@reduxjs/toolkit'

interface ModulesState {
  progress: Record<string, any> | null
}

// Define the initial state using that type
const initialState: ModulesState = {
  progress: null,
}

export const checkinSlice = createSlice({
  name: 'checkin',
  initialState,
  reducers: {
    checkinSave: (state: ModulesState, action: { payload: any }) => {
      state.progress = action.payload
    },
  },
})

export const { checkinSave } = checkinSlice.actions

export const selectCheckinProgress = (state: { checkin: ModulesState }) =>
  state.checkin.progress

export default checkinSlice.reducer
