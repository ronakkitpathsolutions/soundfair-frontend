import { api } from '@/api/client'
import AdminLayout from '@/components/AdminLayout'
import { updateToast } from '@/features/toast'
import { fetchModuleById } from '@/slices/modulesSlice'
import { categories } from '@/utils/constant'
import { CustomButton } from '@ui/components/base/CustomButton'
import { Form, Textarea, TextInput } from '@ui/components/base/Form'
import { Selector } from '@ui/components/base/Form/Selector'
import zodResolver, { AddModuleSchema } from '@ui/utils/validations'
import { ChevronRight, Home } from 'lucide-react'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

interface PageProps { }

const ModuleForm: FC<PageProps> = () => {
  const router = useRouter()

  interface FormValues {
    name: string
    category: string
    description: string
  }

  const initialState: FormValues = {
    name: '',
    category: '',
    description: '',
  }

  const [initialValues, setInitialValues] = useState({ ...initialState })

  const form = useForm({
    defaultValues: initialState,
    values: initialValues,
    resolver: zodResolver(AddModuleSchema),
  })

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (router.query?.id) {
      dispatch(
        fetchModuleById({
          params: {
            module_id: router.query.id,
          },
        }),
      ).then((response: any) => {
        setInitialValues({
          name: response?.payload?.name || '',
          category: response?.payload?.category || '',
          description: response?.payload?.description || '',
        })
      })
    }
  }, [dispatch, router.query.id])

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true)
    try {
      const response = await api.modules.update({
        module_id: Number(router.query.id),
        ...values,
      })
      if (response?.data) {
        setIsLoading(false)
        const { message } = response?.data
        dispatch(
          updateToast({
            open: true,
            message: message || '',
            variant: 'success',
          }),
        )
        router.push('/categories')
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
    <AdminLayout>
      <div className="w-full">
        <div className="flex w-auto items-center text-sm">
          <span className="cursor-pointer">
            <Home className="h-4 w-4" />
          </span>
          <span className="mx-[2px]">
            <ChevronRight className="h-4 w-4" />
          </span>
          <span
            className="cursor-pointer"
            onClick={() => router.push(`/categories`)}
          >
            Categories
          </span>
          <span className="mx-[2px]">
            <ChevronRight className="h-4 w-4" />
          </span>
          <span
            onClick={() => router.push(`/categories/${router.query.modules_id}`)}
            className="cursor-pointer capitalize"
          >
            {router.query.modules_id}
          </span>
          <span className="mx-[2px]">
            <ChevronRight className="h-4 w-4" />
          </span>
          <span
            onClick={() =>
              router.push(
                `/categories/${router.query.modules_id}/view/${router.query.id}`,
              )
            }
            className="cursor-pointer capitalize"
          >
            {initialValues.name || ''}
          </span>
          <span className="mx-[2px]">
            <ChevronRight className="h-4 w-4" />
          </span>
          <span className="font-semibold">Edit</span>
        </div>
        <div className="mt-8">
          <h4 className="text-display-sm font-medium">Edit Module</h4>
          <div className="mt-4 grid grid-cols-12">
            <div className="col-span-6">
              <Form
                className="w-full p-4 md:w-[360px] md:p-0"
                onSubmit={handleSubmit}
                {...{ form }}
              >
                <TextInput
                  className="mb-4"
                  isNotShow
                  inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                  name="name"
                  type="name"
                  label="Module Name"
                  required
                />
                <Textarea
                  labelClass="text-sm font-medium !relative !top-0 !left-0 !m-0 !p-0 !ml-[2px]"
                  className="mb-4 mt-2"
                  inputClass="!focus-visible:ring-offset-0 !focus-visible:ring-green !focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                  name="description"
                  label="Description"
                />
                <Selector
                  className="mb-4 mt-8"
                  isNotShow
                  inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                  name="category"
                  options={categories?.map((val) => ({
                    name: val,
                    value: val,
                  }))}
                  label="Select Category"
                  required
                />
                <CustomButton
                  disabled={isLoading}
                  className="mt-1 flex cursor-pointer items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-gray-200 hover:bg-gray-800 hover:text-gray-200"
                  type="submit"
                >
                  {isLoading ? 'Please wait' : 'Submit'}
                </CustomButton>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ModuleForm
