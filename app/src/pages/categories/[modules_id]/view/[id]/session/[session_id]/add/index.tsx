'use client'
import { api } from '@/api/client'
import AdminLayout from '@/components/AdminLayout'
import { fetchSessionById } from '@/slices/sessionSlice'
import { CustomButton } from '@ui/components/base/CustomButton'
import { Form, Textarea, TextInput } from '@ui/components/base/Form'
import { Checkbox } from '@ui/components/base/Form/Checkbox'
import { RadioGroup } from '@ui/components/base/Form/RadioGroup'
import { cn } from '@ui/utils/cn'
import zodResolver, { AddTipsSchema } from '@ui/utils/validations'
import { ChevronRight, Home, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateToast } from '@/features/toast'
import dynamic from 'next/dynamic'

interface PageProps {
  className?: string
}

interface FormValues {
  session_type?: string
  description?: string
  type: string
  question_title?: string
  option?: string
  troubleshoot_title?: string
  troubleshoot_description?: string
  troubleshoot_info_title?: string
  isTroubleShootChecked: boolean
}

const initialValues: FormValues = {
  description: '',
  session_type: 'Reading',
  question_title: '',
  option: '',
  type: 'text',
  isTroubleShootChecked: false,
  troubleshoot_title: '',
  troubleshoot_description: '',
  troubleshoot_info_title: '',
}

const TipsForm: FC<PageProps> = ({ ...props }: PageProps) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { session } = useSelector(({ adminSession }) => adminSession)
  const CustomEditor = dynamic(
    () => import('@ui/components/base/Editor/CustomEditor'),
    { ssr: false },
  )

  const [options, setOptions] = useState([''])
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({ ...initialValues })

  const form = useForm({
    defaultValues: initialValues,
    values: formData,
    resolver: zodResolver(AddTipsSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const formType = useWatch({ name: 'type', control: form.control })
  const isTroubleShootChecked = useWatch({
    name: 'isTroubleShootChecked',
    control: form.control,
  })

  useEffect(() => {
    dispatch(
      fetchSessionById({
        params: {
          session_id: router.query.session_id,
        },
      }),
    ).then((res: any) => {
      setFormData({
        ...formData,
        session_type: res.payload?.type,
      })
    })
  }, [dispatch, router.query.session_id])

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true)
    try {
      const payload = {
        type: values.type,
        session_id: String(router.query.session_id),
      }
      if (values.type === 'text')
        [(payload['description'] = values.description)]
      if (values.type === 'question') {
        payload['question_title'] = values.question_title
        payload['options'] = JSON.stringify(options)
      }
      if (values.isTroubleShootChecked) {
        payload['troubleshoot_title'] = values.troubleshoot_title
        payload['troubleshoot_info_title'] = values.troubleshoot_info_title
        payload['troubleshoot_description'] = values.troubleshoot_description
      }
      const response = await api.tips.add(payload)
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
          `/categories/${router.query.modules_id}/view/${router.query.id}/session/${router.query.session_id}/`,
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

  const handleOptions = useCallback(
    (value: string, index: number) => {
      const clone = [...options]
      clone[index] = value
      setOptions(clone)
    },
    [options],
  )

  const handleAdd = useCallback(() => {
    const clone = [...options]
    if (!clone[clone.length - 1]) {
      return false
    }
    clone.push('')
    setOptions(clone)
  }, [options])

  const isDisabled = useMemo(() => {
    const clone = [...options]
    return clone.every((val) => !!val)
  }, [options])

  const handleRemove = useCallback(
    (index: number, value: string) => {
      const clone = [...options]
      if (clone.length === 1) {
        return
      }
      clone.splice(index, 1)
      setOptions(clone)
    },
    [options],
  )

  return (
    <AdminLayout>
      <div className="w-full pb-8">
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
            className="cursor-pointer capitalize"
          >
            {session?.Module?.name || ''}
          </span>
          <span className="mx-[2px]">
            <ChevronRight className="h-4 w-4" />
          </span>
          <span
            onClick={() =>
              router.push(
                `/categories/${router.query.modules_id}/view/${router.query.id}/session/${router.query.session_id}`,
              )
            }
            className="cursor-pointer capitalize"
          >
            {session?.name || ''}
          </span>
          <span className="mx-[2px]">
            <ChevronRight className="h-4 w-4" />
          </span>
          <span className="font-semibold">Add</span>
        </div>
        <div className="mt-8">
          <h4 className="text-display-sm font-medium">Add New Tip</h4>
          <div className="mt-4">
            <Form
              {...{
                isDisabled,
                setErrorMessage,
              }}
              className="!max-w-auto w-full p-4 md:p-0"
              onSubmit={(value) => {
                handleSubmit(value)
              }}
              {...{ form }}
            >
              <RadioGroup
                rootClass="flex !flex-row !mt-1"
                labelClass="text-sm !opacity-100 font-medium !relative !top-0 !left-0 !m-0 !p-0 !ml-[2px]"
                className="mb-4"
                isHide
                inputClass="!border !py-3 !shadow-none !bg-transparent"
                name="type"
                type="radio"
                label="Tips Type"
                required
                options={[
                  { label: 'Text', value: 'text' },
                  { label: 'Question', value: 'question' },
                ]}
              />
              {formType === 'text' ? (
                <CustomEditor
                  displayName="CustomEditor"
                  labelClass="text-sm font-medium !relative !top-0 !left-0 !m-0 !p-0 !ml-[2px]"
                  className="mb-4"
                  inputClass="!focus-visible:ring-offset-0 !focus-visible:ring-green !focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                  name="description"
                  label="Tips Description"
                  required
                />
              ) : (
                <TextInput
                  className="mb-4"
                  isNotShow
                  inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                  name="question_title"
                  type="text"
                  label="Question Title"
                  required
                />
              )}
              {formType === 'question' ? (
                <div className="flex flex-col">
                  <label className="ml-[2px] text-sm font-medium">
                    Options
                  </label>
                  <div className="flex flex-col">
                    {options?.map((item, i) => (
                      <div
                        key={i}
                        className={cn(
                          'flex w-full items-center justify-start',
                          options.length !== 1 ? 'mb-2' : 'mb-0',
                        )}
                      >
                        <input
                          className="!focus:ring-blue-50 !focus:border-purple-600 !focus:ring-2 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out"
                          type="text"
                          value={item}
                          onChange={(e) => handleOptions(e.target.value, i)}
                        />
                        <CustomButton
                          disabled={i === 0 && !item}
                          onClick={() => handleRemove(i, item)}
                          type="button"
                          className={cn(
                            '!min-h-auto ml-2 !w-auto !bg-[#f5c6cb] !px-3 !py-2',
                            options.length === 1
                              ? '!cursor-not-allowed'
                              : '!cursor-pointer',
                          )}
                        >
                          <Trash className="h-5 w-5 text-[#ce2c31]" />
                        </CustomButton>
                      </div>
                    ))}
                    {errorMessage ? (
                      <p className="text-error ml-1 text-sm font-normal text-red-500">
                        {errorMessage || ''}
                      </p>
                    ) : null}
                  </div>
                  <CustomButton
                    disabled={!isDisabled}
                    onClick={handleAdd}
                    className={cn(
                      'mt-3 flex !w-auto items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-800 hover:text-gray-200',
                      !isDisabled ? '!cursor-not-allowed' : '!cursor-pointer',
                    )}
                    type="button"
                  >
                    <Plus className="mr-1 h-5 w-5" />
                    <span className="text-base">Add</span>
                  </CustomButton>
                </div>
              ) : null}
              <Checkbox
                isHide
                className="mb-4 !w-full"
                inputClass="!border-none !mt-4 !hover:bg-transparent !py-3 !px-1 !shadow-none !bg-transparent"
                label="Add troubleshoot information?"
                name="isTroubleShootChecked"
              />
              {isTroubleShootChecked ? (
                <TextInput
                  className="mb-4"
                  isNotShow
                  inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                  name="troubleshoot_info_title"
                  type="text"
                  label="Troubleshoot Info"
                  required
                />
              ) : null}
              {isTroubleShootChecked ? (
                <TextInput
                  className="mb-4"
                  isNotShow
                  inputClass="!focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                  name="troubleshoot_title"
                  type="text"
                  label="Troubleshoot Title"
                  required
                />
              ) : null}
              {isTroubleShootChecked ? (
                <Textarea
                  labelClass="text-sm font-medium !relative !top-0 !left-0 !m-0 !p-0 !ml-[2px]"
                  className="mb-4"
                  inputClass="!focus-visible:ring-offset-0 !focus-visible:ring-green !focus:ring-blue-50 !w-full !rounded-[0.55rem] !border !border-gray-300 !bg-white !px-4 !py-3 !text-base !text-gray-700 !outline-none !transition-colors !duration-200 ease-in-out !focus:border-purple-600 !focus:ring-2"
                  name="troubleshoot_description"
                  label="Troubleshoot Description"
                />
              ) : null}
              <CustomButton
                disabled={isLoading}
                className="mt-4 flex cursor-pointer items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-gray-200 hover:bg-gray-800 hover:text-gray-200"
                type="submit"
              >
                {isLoading ? 'Please wait' : 'Submit'}
              </CustomButton>
            </Form>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default TipsForm
