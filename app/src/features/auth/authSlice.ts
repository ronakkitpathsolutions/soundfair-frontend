import { createSlice } from '@reduxjs/toolkit'
import { UserInterface } from './types'

interface AuthInterface {
  token: string
  user: UserInterface
}

const initialState: AuthInterface = {
  token: '',
  user: {
    id: 0,
    name: '',
    email: '',
    role_id: 0,
    iat: 0,
    exp: 0,
    deleted: 0,
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthData: (state, action: { payload: AuthInterface }) => {
      const data = { ...action.payload }
      return {
        ...data,
      }
    },
    initialAuth: (state, action) => {
      return {
        ...initialState,
      }
    },
  },
})

export const { updateAuthData, initialAuth } = authSlice.actions
export default authSlice.reducer
