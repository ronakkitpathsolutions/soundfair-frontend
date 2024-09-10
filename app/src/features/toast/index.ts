import { createSlice } from '@reduxjs/toolkit'

interface ToastProps {
  open?: boolean
  variant?: string
  message?: string
}

const initialState: ToastProps = {
  open: false,
  variant: 'initial',
  message: '',
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    updateToast: (state, action: { payload: ToastProps }) => {
      const data = { ...state, ...action.payload }
      return {
        ...data,
      }
    },
  },
})

export const { updateToast } = toastSlice.actions
export default toastSlice.reducer
