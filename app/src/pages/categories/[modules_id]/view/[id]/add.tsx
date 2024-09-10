'use client'
import { api } from '@/api/client'
import AdminLayout from '@/components/AdminLayout'
import { updateToast } from '@/features/toast'
import { fetchModuleById } from '@/slices/modulesSlice'
import { mergeFileArrays } from '@/utils/helper'
import { CustomButton } from '@ui/components/base/CustomButton'
import { Form, Textarea, TextInput } from '@ui/components/base/Form'
import { CustomDropZone } from '@ui/components/base/Form/Dropzone'
import { RadioGroup } from '@ui/components/base/Form/RadioGroup'
import zodResolver, { AddSessionSchema } from '@ui/utils/validations'
import { ChevronRight, Home } from 'lucide-react'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

interface PageProps {
  className?: string
}

const SessionForm: FC<PageProps> = ({ ...props }: PageProps) => {
  const router = useRouter()
  const [files, setFiles] = useState([])
  const [pdfFiles, setPdfFiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [fileError, setFileError] = useState('')
  const [pdfError, setPdfError] = useState('')

  interface FormValues {
    name: string
    reading_time: string
    description: string
    type: string
    activity_title: string
    activity_description: string
  }

  const initialValues: FormValues = {
    name: '',
    reading_time: '',
    description: '',
    type: 'Reading',
    activity_description: '',
    activity_title: '',
  }

  const form = useForm({
    defaultValues: initialValues,
    values: initialValues,
    resolver: zodResolver(AddSessionSchema),
  })

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { module } = useSelector(({ adminModule }) => adminModule)

  const sessionType = useWatch({ name: 'type', control: form.control })

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true)
    const formData = new FormData()
    try {
      formData.append('module_id', String(router.query.id))
      formData.append('name', values.name)
      formData.append('description', values.description)
      formData.append('reading_time', values.reading_time)
      formData.append('type', values.type)
      if (values.type === 'Activity') {
        formData.append('activity_title', values.activity_title)
        formData.append('activity_description', values.activity_description)
        files.map((file) => {
          formData.append('activity_file', file)
        })
        pdfFiles.map((file) => {
          formData.append('activity_pdf', file)
        })
      }
      const response = await api.sessions.add(formData)
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
        router.push(
          `/categories/${router?.query?.modules_id}/view/${router?.query?.id}`,
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

  const getFiles = useCallback((files = [], name = '') => {
    if (!files.length) {
      name === 'activity_file'
        ? setFileError('Activity file is required')
        : setPdfError('Activity PDF is required')
    } else {
      name === 'activity_file' ? setFileError('') : setPdfError('')
    }
    name === 'activity_file' ? setFiles(files) : setPdfFiles(files)
  }, [])

  useEffect(() => {
    dispatch(
      fetchModuleById({
        params: { module_id: router.query.id },
      }),
    )
  }, [dispatch, router.query.id])

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
            onClick={() =>
              router.push(`/categories/${router.query.modules_id}`)
            }
            className="cursor-pointer capitalize "
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
            className="cursor-pointer capitalize "
          >
            {module.name || ''}
          </span>
          <span className="mx-[2px]">
            <ChevronRight className="h-4 w-4" />
          </span>
          <span className="font-semibold">Add</span>
        </div>
        <div className="mt-8">
          <h4 className="text-display-sm font-medium">Add New Session</h4>
          <div className="mt-4 grid grid-cols-12">
            <div className="col-span-6">
              <Form
                className="w-full p-4 md:w-[360px] md:p-0"
                onSubmit={(value) => {
                  handleSubmit(value)
                }}
                {...{
                  form,
                  sessionType,
                  setFileError,
                  setErrorMessage,
                  files,
                  pdfFiles,
                  setPdfError,
                }}
              >
                <TextInput
                  className="mb-4"
                  isNotShow
                  inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                  name="name"
                  type="name"
                  label="Session Name"
                  required
                />
                <TextInput
                  className="mb-4"
                  isNotShow
                  inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                  name="reading_time"
                  type="text"
                  label="Reading Duration"
                  required
                />
                <RadioGroup
                  labelClass="text-sm !opacity-100 font-medium !relative !top-0 !left-0 !m-0 !p-0 !ml-[2px]"
                  className="mb-4"
                  isHide
                  inputClass="!border !py-3 !shadow-none !bg-transparent"
                  name="type"
                  type="radio"
                  label="Session Type"
                  required
                  options={[
                    { label: 'Reading', value: 'Reading' },
                    { label: 'Activity', value: 'Activity' },
                  ]}
                />
                <Textarea
                  labelClass="text-sm font-medium !relative !top-0 !left-0 !m-0 !p-0 !ml-[2px]"
                  className="mb-4"
                  inputClass="!focus-visible:ring-offset-0 !focus-visible:ring-green !focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                  name="description"
                  label="Description"
                />
                {sessionType === 'Activity' ? (
                  <div className="mt-4 flex w-full">
                    <p className="text-md mt mb-4 ml-[2px] mt-8 font-medium">
                      Session Activity
                    </p>
                  </div>
                ) : null}
                {sessionType === 'Activity' ? (
                  <TextInput
                    className="mb-4"
                    isNotShow
                    inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                    name="activity_title"
                    type="text"
                    label="Activity Title"
                    required
                  />
                ) : null}
                {sessionType === 'Activity' ? (
                  <Textarea
                    labelClass="text-sm font-medium !relative !top-0 !left-0 !m-0 !p-0 !ml-[2px]"
                    className="mb-4"
                    inputClass="!focus-visible:ring-offset-0 !focus-visible:ring-green !focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                    name="activity_description"
                    label="Activity Description"
                  />
                ) : null}
                {sessionType === 'Activity' ? (
                  <CustomDropZone
                    accept={{
                      'image/*': ['.jpeg', '.png', '.jpg', '.svg', '.webp'],
                    }}
                    className="mt-10"
                    error={{ message: fileError }}
                    labelClass="text-sm font-medium !relative !top-0 !left-0 !m-0 !p-0 !ml-[2px]"
                    name="activity_file"
                    label="Activity Image"
                    mergeFileArrays={mergeFileArrays}
                    getFiles={getFiles}
                  />
                ) : null}
                {sessionType === 'Activity' ? (
                  <CustomDropZone
                    accept={{
                      'application/pdf': ['.pdf'],
                    }}
                    className="mt-10"
                    labelClass="text-sm font-medium !relative !top-0 !left-0 !m-0 !p-0 !ml-[2px]"
                    name="activity_pdf"
                    label="Activity PDF"
                    error={{ message: pdfError }}
                    mergeFileArrays={mergeFileArrays}
                    getFiles={getFiles}
                  />
                ) : null}
                <CustomButton
                  disabled={isLoading}
                  className="mt-10 flex cursor-pointer items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-gray-200 hover:bg-gray-800 hover:text-gray-200"
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

export default SessionForm
