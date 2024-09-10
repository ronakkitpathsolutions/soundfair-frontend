import { api } from '@/api/client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAllModules = createAsyncThunk(
  'brands/fetchAllModules',
  async (params) => {
    const response = await api.modules.getAll(params)
    return response.data?.result
  },
)

export const fetchModuleById = createAsyncThunk(
  'brands/fetchModuleById',
  async (params) => {
    const response = await api.modules.getById(params)
    return response.data?.result
  },
)

const initialState = {
  modules: [],
  module: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 10,
    search: '',
  },
}

export const moduleSlice = createSlice({
  name: 'modules',
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
    builder.addCase(fetchAllModules.fulfilled, (state, action) => {
      state.modules = action.payload
    })
    builder.addCase(fetchModuleById.fulfilled, (state, action) => {
      state.module = action.payload
    })
  },
})

export const { handlePagination } = moduleSlice.actions

export default moduleSlice.reducer
