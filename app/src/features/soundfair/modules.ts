import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Lesson, Module, Strategy, Tooltip } from './types'
import AirtableData from '../../../../data.airtable.json'
import { api } from '@/api/client'

interface InitialState {
  modules: { [id: string]: Module }
  lessons: { [id: string]: Lesson }
  strategies: { [id: string]: Strategy }
  tooltips: { [id: string]: Tooltip }
  currentTooltip?: string
  moduleData: string[]
  userModules: string[]
  loading: boolean
  singleModule: { [id: string]: Module }
}

const initialState: InitialState = {
  modules: AirtableData.modules,
  lessons: AirtableData.lessons,
  strategies: AirtableData.strategies,
  tooltips: AirtableData.tooltips,
  currentTooltip: undefined,
  moduleData: [],
  userModules: [],
  loading: false,
  singleModule: {},
}

export const getAllModule = createAsyncThunk(
  'modules/getAllModule',
  async (params: any) => {
    const response = await api.modules.getAll(params)
    return response?.data?.result
  },
)

export const getModuleByUser = createAsyncThunk(
  'modules/getModuleByUser',
  async (params: any) => {
    const response = await api.modules.getModuleByUser(params)
    return { data: response?.data?.result, allData: params.allData }
  },
)

export const getAllSession = createAsyncThunk(
  'modules/getAllSession',
  async (params: any) => {
    const response = await api.sessions.getAll(params)
    return response?.data?.result
  },
)

export const getModuleById = createAsyncThunk(
  'brands/fetchModuleById',
  async (params) => {
    const response = await api.modules.getById(params)
    return response.data?.result
  },
)

type LocalState = { modules: typeof initialState }

const getSession = (item: any, allData = []) => {
  if (!allData.length) return []
  const clone = [...allData]
  return clone
    .filter((data) => data?.module_id === item?.module_id)
    .map((val) => val.Sessions)
}

const customPayload = (payload = [], allData = []) => {
  if (!payload?.length) return []
  return payload?.map((item, i) => {
    return {
      ...item,
      Sessions: getSession(item, allData)?.[0],
    }
  })
}

export const modulesSlice = createSlice({
  name: 'modules',
  initialState: initialState,
  reducers: {
    setCurrentTooltip: (state, action) => {
      state.currentTooltip = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllModule.pending, (state, action) => {
      const { payload } = action
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(getAllModule.fulfilled, (state, action) => {
      const { payload } = action
      return {
        ...state,
        moduleData: payload,
        loading: false,
      }
    })
    builder.addCase(getModuleById.pending, (state, action) => {
      const { payload } = action
      return {
        ...state,
        loading: true,
        singleModule: {},
      }
    })
    builder.addCase(getModuleById.fulfilled, (state, action) => {
      const { payload } = action
      return {
        ...state,
        singleModule: payload,
        loading: false,
      }
    })

    builder.addCase(getModuleByUser.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(getModuleByUser.fulfilled, (state, action) => {
      const { data } = action.payload
      return {
        ...state,
        userModules: customPayload(data, action.payload?.allData || []),
        loading: false,
      }
    })
    builder.addCase(getModuleByUser.rejected, (state, action) => {
      return {
        ...state,
        userModules: [],
        loading: false,
      }
    })
    builder.addCase(getAllSession.pending, (state, action) => {
      const { payload } = action
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(getAllSession.fulfilled, (state, action) => {
      const { payload } = action
      return {
        ...state,
        sessions: payload,
        loading: false,
      }
    })
  },
})

export const selectorModules = (state: LocalState) => state.modules.modules

export const selectModuleList = (state: LocalState) =>
  Object.values(state.modules.modules)

export const selectorModule = (id?: string) => (state: LocalState) => {
  if (!id) return undefined
  return state.modules.userModules[id]
}

export const selectLessonsForIdArray =
  (ids?: string[]) => (state: LocalState) => {
    if (!ids) return []
    return ids.map((id) => state.modules.lessons[id])
  }

export const selectLessonForId = (id?: string) => (state: LocalState) => {
  if (!id) return undefined
  return state.modules.lessons[id]
}

export const selectStrategiesForIdArray =
  (ids?: string[]) => (state: LocalState) => {
    if (!ids) return []
    return ids.map((id) => state.modules.strategies[id])
  }

export const selectStrategyForId = (id?: string) => (state: LocalState) => {
  if (!id) return undefined
  return state.modules.strategies[id]
}

export const selectStrategiesForModuleId =
  (id?: string) => (state: LocalState) => {
    if (!id) return []
    return Object.values(state.modules.strategies).filter(
      (strategy) => strategy.relatedModule === id,
    )
  }

export const selectTooltipForId = (id?: string) => (state: LocalState) => {
  if (!id) return undefined
  return state.modules.tooltips[id]
}

export const selectTooltips = () => (state: LocalState) => {
  return state.modules.tooltips
}

export const selectCurrentTooltip = () => (state: LocalState) => {
  return state.modules.currentTooltip
}

export const { setCurrentTooltip } = modulesSlice.actions

const modulesReducer = modulesSlice.reducer
export default modulesReducer
