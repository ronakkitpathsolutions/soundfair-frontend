import { api } from '@/api/client'
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'

export const fetchAllTips = createAsyncThunk(
  'userSession/fetchAllTips',
  async (params) => {
    const response = await api.tips.getAll(params)
    return { tips: response.data?.result, params }
  },
)

export const fetchAllSessions = createAsyncThunk(
  'userSession/fetchAllSessions',
  async (params) => {
    const response = await api.sessions.getAll(params)
    return { sessions: response.data?.result, module_id: params.module_id }
  },
)

export const fetchMyModuleProgress = createAsyncThunk(
  'userSession/fetchMyModuleProgress',
  async (params) => {
    const response = await api.modules.getMyProgress(params)
    return response.data?.result
  },
)

export const initialState = {
  unlockedSession: [],
  moduleProgress: [],
  // tips: {
  //   tip_id: '',
  //   completed: 0,
  //   total: 5,
  // },
  currentSession: {
    session_id: 0,
    total: 0,
    completed: 0,
    currentIndex: -1,
    tips: [],
  },
  finalSession: [],
  currentModule: {
    module_id: 0,
    currentIndex: -1,
    total: 0,
    completed: 0,
    sessions: [],
  },
  finalModule: [],
}

export const userSessionSlice = createSlice({
  name: 'modules',
  initialState: initialState,
  reducers: {
    setSessionProgress: (state, action) => {
      state.currentSession = {
        ...state.currentSession,
        ...action.payload,
      }
    },
    setFinalSessionProgress: (state, action) => {
      state.finalSession = [...action?.payload]
    },
    setModuleProgress: (state, action) => {
      state.moduleProgress = action.payload
    },
    setFinalModuleProgress: (state, action) => {
      state.finalModule = [...state?.finalModule, action.payload]
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllTips.fulfilled, (state, action) => {
      const data = action.payload
      state.currentSession = {
        session_id: data?.params?.params?.session_id || 0,
        total: data?.tips?.length || 0,
        completed: 0,
        currentIndex: -1,
        tips: data?.tips || [],
      }
    })
    builder.addCase(fetchAllSessions.fulfilled, (state, action) => {
      const { module_id, sessions } = action.payload
      state.currentModule = {
        module_id: module_id || 0,
        total: sessions?.length || 0,
        completed: 0,
        currentIndex: -1,
        sessions: sessions || [],
      }
    })

    builder.addCase(fetchMyModuleProgress.fulfilled, (state, action) => {
      const { progress_data } = action.payload
      state.moduleProgress = progress_data
    })
    builder.addCase(fetchMyModuleProgress.rejected, (state, action) => {
      state.moduleProgress = []
    })
  },
})

export const {
  // setUnlockedSessions,
  // setTips,
  setFinalSessionProgress,
  setSessionProgress,
  setFinalModuleProgress,
  setModuleProgress,
} = userSessionSlice.actions
const userSessionReducer = userSessionSlice.reducer
export default userSessionReducer
