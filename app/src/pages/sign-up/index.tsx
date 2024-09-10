import withAuth from '@/hoc/withAuth'
import { Form, TextInput } from '@ui/components/base/Form'
import { CustomButton } from '@ui/components/base/CustomButton'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@ui/components/base/Button'
import { useRouter } from 'next/router'
import zodResolver, { SignUpSchema } from '@ui/utils/validations'
import { api } from '@/api/client'
import { updateToast } from '@/features/toast'
import { useDispatch } from 'react-redux'

interface SignUpValues {
  firstName: string
  lastName: string
  email: string
  password: string
}

const initialValues: SignUpValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
}

const SignUp = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: initialValues,
    values: initialValues,
    resolver: zodResolver(SignUpSchema),
  })

  const handleSubmit = async (values: SignUpValues) => {
    setIsLoading(true)
    try {
      const response = await api.auth.register(values)
      if (response?.data) {
        setIsLoading(false)
        dispatch(
          updateToast({
            open: true,
            message: response?.data?.message || '',
            variant: 'success',
          }),
        )
        router.push('/login')
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
              Hello!
            </h3>
            <p className="mt-1 text-center text-sm text-gray-600">
              Please register your account
            </p>
          </div>
          <Form
            className="grid w-full grid-cols-12 gap-2 p-4 md:w-[360px] md:p-0"
            onSubmit={handleSubmit}
            {...{ form }}
          >
            <TextInput
              className="col-span-12 mb-3 md:col-span-6"
              isNotShow
              inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
              name="firstName"
              type="text"
              label="First Name"
              required
            />
            <TextInput
              className="col-span-12 mb-3 md:col-span-6"
              isNotShow
              inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
              name="lastName"
              type="text"
              label="Last Name"
              required
            />
            <TextInput
              className="col-span-12 mb-3"
              isNotShow
              inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
              name="email"
              type="email"
              label="Email"
              required
            />
            <TextInput
              className="col-span-12 mb-4"
              isNotShow
              inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
              name="password"
              type="password"
              label="Password"
              required
            />
            <div className="col-span-12 mt-3 flex flex-col items-end justify-end">
              <span className="mb-2 text-sm font-medium">
                Already have an Account?
                <Button
                  onClick={() => router.push('/login')}
                  type="button"
                  variant="link"
                  className="!focus:ring-0 text-decoration-underline ml-1 cursor-pointer !p-0 !text-sm text-purple-60"
                >
                  Login
                </Button>
              </span>
              <CustomButton disabled={isLoading} type="submit">
                {isLoading ? 'Please wait' : 'Sign Up'}
              </CustomButton>
            </div>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default withAuth(SignUp)
