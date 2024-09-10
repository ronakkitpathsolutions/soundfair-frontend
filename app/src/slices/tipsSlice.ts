import { api } from '@/api/client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAllTips = createAsyncThunk(
  'adminTips/fetchAllTips',
  async (params) => {
    const response = await api.tips.getAll(params)
    return response.data?.result
  },
)

export const fetchTipsById = createAsyncThunk(
  'adminTips/fetchTipsById',
  async (params) => {
    const response = await api.tips.getById(params)
    return response.data?.result
  },
)

const initialState = {
  tips: [],
  tip: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 10,
    search: '',
  },
}

export const tipsSlice = createSlice({
  name: 'adminTips',
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
    builder.addCase(fetchAllTips.fulfilled, (state, action) => {
      state.tips = action.payload
    })
    builder.addCase(fetchTipsById.fulfilled, (state, action) => {
      state.tip = action.payload
    })
  },
})

export const { handlePagination } = tipsSlice.actions
export default tipsSlice.reducer
