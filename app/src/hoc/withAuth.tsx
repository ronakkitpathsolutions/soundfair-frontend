'use client'
import React, { useEffect, ComponentType } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { isTokenActive } from '@/utils/helper'

interface WithAuthRouteProps {
  // Define any additional props that you expect WrappedComponent to receive
}

function withAuthRoute<Props extends WithAuthRouteProps>(
  WrappedComponent: ComponentType<Props>,
) {
  function ComponentWithAuthRoute(props: Props) {
    const router = useRouter()
    const auth = useSelector((state: { auth: any }) => state.auth)

    useEffect(() => {
      // If the user is not authenticated, redirect to the login page
      if (isTokenActive(auth?.token)) {
        router.push(auth?.user?.role_id === 2 ? '/' : '/categories')
      }
    }, [auth, router])

    // If the user is authenticated, render the WrappedComponent
    // Otherwise, render null while the redirection is in progress
    return !isTokenActive(auth?.token) ? <WrappedComponent {...props} /> : null
  }

  // Set display name for debugging purposes
  ComponentWithAuthRoute.displayName = `withAuthRoute(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`

  return ComponentWithAuthRoute
}

export default withAuthRoute
