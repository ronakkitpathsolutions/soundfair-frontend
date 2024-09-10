import { createSlice } from '@reduxjs/toolkit'
interface HomeState {
  startedModules: boolean
}

const initialState: HomeState = {
  startedModules: false,
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setStartedModules: (state) => {
      state.startedModules = true
    },
  },
})

export const { setStartedModules } = homeSlice.actions

export const selectStartedModules = (state: { home: HomeState }) =>
  state.home.startedModules

export default homeSlice.reducer
