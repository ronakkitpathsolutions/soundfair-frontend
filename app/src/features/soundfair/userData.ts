import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { UserData } from './types'
import { api } from '@/api/client'

const initialState: UserData = {
  quizCompleted: false,
  quizResults: undefined,
  profile: {},
  actionPlan: [],
  unlockedLessons: [],
  lessonProgress: {},
  unlockedStrategies: [],
  unlockedModules: [],
  userActivity: {},
  loading: false,
  currentReport: {},
}

export const getUserActivityById = createAsyncThunk(
  'userData/getUserActivityById',
  async (params: any) => {
    const response = await api.user.userActivityById(params)
    return response?.data?.result
  },
)
export const userDataSlice = createSlice({
  name: 'userData',
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      state = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setCurrentReport: (state, action) => {
      state.currentReport = action.payload
    },
    completeQuiz: (state) => {
      state.quizCompleted = true
      state.quizResults = {
        quizCompletedAt: new Date(),
      }
    },
    unlockLessons: (state, action: { payload: string[] }) => {
      // If the lesson is already unlocked, don't add it again
      const unlockedLessons = state.unlockedLessons || []
      const lessonsToAdd = action.payload.filter(
        (lessonId) => !unlockedLessons.includes(lessonId),
      )
      state.unlockedLessons = [...unlockedLessons, ...lessonsToAdd]
    },
    startLesson: (state, action: { payload: string }) => {
      const lessonId = action.payload
      if (!state.lessonProgress) {
        state.lessonProgress = {}
      }
      state.lessonProgress[lessonId] = {
        completed: false,
        timeTaken: 0,
        lessonProgress: 0,
      }
    },
    completeLesson: (state, action: { payload: string }) => {
      const lessonId = action.payload
      if (!state.lessonProgress) {
        state.lessonProgress = {}
      }
      state.lessonProgress[lessonId] = {
        ...state.lessonProgress[lessonId],
        completed: true,
      }
    },
    updateLessonProgress: (
      state,
      action: { payload: { lessonId: string; progress: number } },
    ) => {
      const { lessonId, progress } = action.payload
      if (!state.lessonProgress) {
        state.lessonProgress = {}
      }
      state.lessonProgress[lessonId] = {
        ...state.lessonProgress[lessonId],
        lessonProgress: progress,
      }
    },
    unlockStrategy: (state, action: { payload: string }) => {
      const strategyId = action.payload
      if (!state.unlockedStrategies) {
        state.unlockedStrategies = []
      }
      if (!state.unlockedStrategies.includes(strategyId)) {
        state.unlockedStrategies.push(strategyId)
      }
    },
    addModule: (state, action: { payload: string }) => {
      const moduleId = action.payload
      if (!state.unlockedModules) {
        state.unlockedModules = []
      }
      if (!state.unlockedModules.includes(moduleId)) {
        state.unlockedModules.push(moduleId)
      }
    },
    removeModule: (state, action: { payload: string }) => {
      const moduleId = action.payload
      if (!state.unlockedModules) {
        state.unlockedModules = []
      }
      if (state.unlockedModules.includes(moduleId)) {
        state.unlockedModules = state.unlockedModules.filter(
          (module) => module !== moduleId,
        )
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserActivityById.pending, (state, action) => {
      const { payload } = action
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(getUserActivityById.fulfilled, (state, action) => {
      const { payload } = action
      return {
        ...state,
        userActivity: payload,
        loading: false,
      }
    })
  },
})

export const {
  setUserData,
  setProfile,
  completeQuiz,
  unlockLessons,
  startLesson,
  completeLesson,
  updateLessonProgress,
  unlockStrategy,
  addModule,
  removeModule,
  setCurrentReport,
} = userDataSlice.actions

export const selectorUserData = (state: { userData: UserData }) =>
  state.userData

export const selectorQuizCompleted = (state: { userData: UserData }) =>
  state.userData.quizCompleted

export const selectorQuizResults = (state: { userData: UserData }) =>
  state.userData.quizResults

export const selectorProfile = (state: { userData: UserData }) =>
  state.userData.profile

export const selectorActionPlan = (state: { userData: UserData }) =>
  state.userData.actionPlan

export const selectorUnlockedLessons = (state: { userData: UserData }) =>
  state.userData.unlockedLessons

export const selectorLessonProgress = (state: { userData: UserData }) =>
  state.userData.lessonProgress
export const selectorLessonProgressForId =
  (id?: string) => (state: { userData: UserData }) => {
    if (!id) return undefined
    return state.userData.lessonProgress && state.userData.lessonProgress[id]
  }
export const selectorUnlockedStrategies = (state: { userData: UserData }) =>
  state.userData.unlockedStrategies

export const selectorUnlockedModules = (state: { userData: UserData }) =>
  state.userData.unlockedModules

const userDataReducer = userDataSlice.reducer
export default userDataReducer
