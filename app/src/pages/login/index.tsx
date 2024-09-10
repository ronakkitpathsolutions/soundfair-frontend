'use client'
import withAuth from '@/hoc/withAuth'
import { Form, TextInput } from '@ui/components/base/Form'
import { CustomButton } from '@ui/components/base/CustomButton'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@ui/components/base/Button'
import { useRouter } from 'next/router'
import zodResolver, { LoginSchema } from '@ui/utils/validations'
import { useDispatch } from 'react-redux'
import { updateToast } from '@/features/toast'
import { api } from '@/api/client'
import { decodeTokenValue } from '@/utils/helper'
import { updateAuthData } from '@/features/auth/authSlice'
import { setHeaderToken } from '@/api'

interface LoginValues {
  email: string
  password: string
}

const initialValues: LoginValues = {
  email: '',
  password: '',
}

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: initialValues,
    values: initialValues,
    resolver: zodResolver(LoginSchema),
  })

  const handleSubmit = async (values: LoginValues) => {
    setIsLoading(true)
    try {
      const response = await api.auth.login(values)
      if (response?.data) {
        setIsLoading(false)
        const { message, result } = response?.data
        const payload = {
          token: result?.token || '',
          user: {
            ...decodeTokenValue(result?.token),
          },
        }
        localStorage.setItem('token', result?.token)
        setHeaderToken(result?.token)
        dispatch(updateAuthData(payload))
        setHeaderToken(result?.token)
        dispatch(
          updateToast({
            open: true,
            message: message || '',
            variant: 'success',
          }),
        )
      }
    } catch (error) {
      setIsLoading(false)
      dispatch(
        updateToast({
          open: true,
          message: error?.message || '',
          variant: 'error',
        }),
      )
    }
  }

  return (
    <section className="h-screen w-full">
      <div className="flex h-full w-full items-center justify-center">
        <div className=" flex w-auto flex-col items-center">
          <div className="w-full p-4">
            <h3 className="text-3xl md:text-4xl text-center font-medium">
              Welcome Back!
            </h3>
            <p className="mt-1 text-center text-sm text-gray-600">
              Sign in to your account
            </p>
          </div>
          <Form
            className="w-full p-4 md:w-[360px] md:p-0"
            onSubmit={handleSubmit}
            {...{ form }}
          >
            <TextInput
              className="mb-4"
              isNotShow
              inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
              name="email"
              type="email"
              label="Email"
              required
            />
            <TextInput
              className="mb-4"
              isNotShow
              inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
              name="password"
              type="password"
              label="Password"
              required
            />
            <div className="mt-4 flex flex-col items-end justify-end">
              <span className="mb-2 text-sm font-medium">
                Don&lsquo;t have an Account?
                <Button
                  onClick={() => router.push('/sign-up')}
                  type="button"
                  variant="link"
                  className="!focus:ring-0 text-decoration-underline ml-1 cursor-pointer !p-0 !text-sm text-purple-60"
                >
                  Sign up
                </Button>
              </span>
              <CustomButton type="submit">Login</CustomButton>
            </div>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default withAuth(Login)
