import { api } from '@/api/client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAllSessions = createAsyncThunk(
  'sessions/fetchAllSessions',
  async (params) => {
    const response = await api.sessions.getAll(params)
    return response.data?.result
  },
)

export const fetchSessionById = createAsyncThunk(
  'sessions/fetchSessionById',
  async (params) => {
    const response = await api.sessions.getById(params)
    return response.data?.result
  },
)

export const fetchSessionByModuleId = createAsyncThunk(
  'sessions/fetchSessionByModuleId',
  async (params) => {
    const response = await api.sessions.getByModuleId(params)
    return response.data?.result
  },
)

const initialState = {
  sessions: [],
  session: {},
  moduleSessions: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 10,
    search: '',
  },
}

export const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    handlePagination: (state, action) => {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllSessions.fulfilled, (state, action) => {
      state.sessions = action.payload
    })
    builder.addCase(fetchSessionById.fulfilled, (state, action) => {
      state.session = action.payload
    })
    builder.addCase(fetchSessionByModuleId.fulfilled, (state, action) => {
      state.moduleSessions = action.payload
    })
  },
})

export const { handlePagination } = sessionSlice.actions

export default sessionSlice.reducer
