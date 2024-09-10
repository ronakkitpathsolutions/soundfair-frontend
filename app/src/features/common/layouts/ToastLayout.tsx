import React, { useCallback } from 'react'
import { ToastProvider } from 'ui/src/components/base/Toast/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { updateToast } from '@/features/toast'

export const ToastLayout = (): JSX.Element => {
  const dispatch = useDispatch()
  const toast = useSelector(({ toast }) => toast)

  const handleClose = useCallback(() => {
    dispatch(updateToast({ ...toast, open: false }))
  }, [dispatch, toast])

  return (
    <ToastProvider {...toast} {...{ handleClose }} swipeDirection="right" />
  )
}
