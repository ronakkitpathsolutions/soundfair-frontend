import { createSlice } from '@reduxjs/toolkit'
import { Strategy } from '@/features/strategies/types'
import { Practice } from '@/features/practices/types'
import { strategies } from '@/features/strategies/content/strategies'

export type ToolkitTab = 'strategies' | 'practice'

interface ToolkitState {
  open: boolean
  tab: ToolkitTab
  activeStrategy: Strategy | null
  activePractice: Practice | null
}

const initialState: ToolkitState = {
  open: false,
  tab: 'strategies',
  activeStrategy: null,
  activePractice: null,
}

export const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState,
  reducers: {
    toggleToolkit: (state, action) => {
      state.open = action.payload

      if (!action.payload) {
        state.activeStrategy = null
        state.activePractice = null
      }
    },
    setTab: (state, action: { payload: ToolkitTab; type: string }) => {
      state.tab = action.payload
    },
    setActiveStrategy: (state, action) => {
      state.activeStrategy = action.payload
    },
    setActivePractice: (state, action) => {
      state.activePractice = action.payload
    },
    clearActiveElements: (state) => {
      state.activeStrategy = null
      state.activePractice = null
    },
    openToStrategy: (state, action) => {
      state.open = true
      state.tab = 'strategies'
      const strategy = strategies.find((item) => item.id === action.payload)

      if (!strategy) {
        throw new Error(`Strategy with ID ${action.payload} does not exist`)
      }

      state.activeStrategy = strategy
    },
    openToPractice: (state, action) => {
      state.open = true
      state.tab = 'practice'
      state.activePractice = action.payload
    },
  },
})

export const {
  toggleToolkit,
  setTab,
  setActiveStrategy,
  setActivePractice,
  clearActiveElements,
  openToStrategy,
  openToPractice,
} = toolkitSlice.actions

export default toolkitSlice.reducer
