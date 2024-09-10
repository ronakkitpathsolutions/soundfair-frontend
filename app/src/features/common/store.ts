import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

// Reducers
import strategiesReducer from '@/features/strategies/strategiesSlice'
import activitiesReducer from '@/features/activities/activitiesSlice'
import practicesReducer from '@/features/practices/practicesSlice'
import toolkitReducer from '@/features/toolkit/toolkitSlice'
import videosReducer from '@/features/videos/videosSlice'
import crisisReducer from '@/features/crisis/crisisSlice'
import checkinReducer from '@/features/check-in/checkinSlice'
import homeReducer from '@/features/home/homeSlice'
import quizReducer from '../soundfair/quiz'
import topicAreaReducer from '../soundfair/topics'
import userDataReducer from '../soundfair/userData'
import modulesReducer from '../soundfair/modules'
import authReducer from '../auth/authSlice'
import modulesSlice from '../../slices/modulesSlice'
import toastSlice from '@/features/toast'
import quizResultReducer from '../soundfair/quizResult'
import sessionSlice from '@/slices/sessionSlice'
import tipsSlice from '@/slices/tipsSlice'
import userSessionReducer from '../soundfair/userSession'

const persistConfig = (key: string) => ({
  key,
  storage,
})

const rootReducer = combineReducers({
  modules: persistReducer(persistConfig('modules'), modulesReducer),
  toast: toastSlice,
  strategies: persistReducer(persistConfig('strategies'), strategiesReducer),
  activities: persistReducer(persistConfig('activities'), activitiesReducer),
  practices: persistReducer(persistConfig('practices'), practicesReducer),
  home: persistReducer(persistConfig('home'), homeReducer),
  toolkit: toolkitReducer,
  videos: videosReducer,
  crisis: crisisReducer,
  checkin: checkinReducer,
  quiz: quizReducer,
  topicAreas: topicAreaReducer,
  userData: persistReducer(persistConfig('userData'), userDataReducer),
  auth: persistReducer(persistConfig('auth'), authReducer),
  adminModule: modulesSlice,
  adminSession: sessionSlice,
  adminTips: tipsSlice,
  quizResult: persistReducer(persistConfig('report'), quizResultReducer),
  userSession: persistReducer(
    persistConfig('progressData'),
    userSessionReducer,
  ),
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
