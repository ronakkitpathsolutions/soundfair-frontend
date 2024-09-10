'use client'
import { forwardRef, useEffect, useRef, Children } from 'react'
import { Controller } from 'react-hook-form'
import { isElementInViewport } from '../../../utils/is-element-in-viewport'

// Components
import { cn } from '../../../utils/cn'

export interface FormResponse {
  type: 'error' | 'success'
  title: string
  description?: string
}

export interface FormProps {
  form: any
  children: any
  onSubmit: Promise<(data: any) => void> | ((data: any) => void)
  response?: FormResponse | null
  className?: string
  isDisabled?: boolean
  sessionType?: string
  files?: any
  setErrorMessage?: (val: string) => void
  setFileError?: (val: string) => void
  pdfFiles?: any
  setPdfError?: (val: string) => void
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      form,
      children,
      isDisabled,
      sessionType,
      setErrorMessage,
      onSubmit,
      response,
      className,
      setFileError,
      files,
      pdfFiles,
      setPdfError,
    },
    ref,
  ) => {
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = form
    const validFormFields = [
      'TextInput',
      'Select',
      'Selector',
      'Checkbox',
      'Radio',
      'RadioGroup',
      'CheckboxGroup',
      'Checkbox',
      'Textarea',
      'CustomEditor',
    ]
    const alertRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (alertRef.current && !isElementInViewport(alertRef.current)) {
        alertRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, [response])

    return (
      <form
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault()
          if (sessionType === 'Activity') {
            setErrorMessage(!isDisabled ? 'Option is required' : '')
            setFileError(files.length ? '' : 'Activity file is required')
            setPdfError(pdfFiles.length ? '' : 'Activity PDF is required')
            if (files.length && pdfFiles?.length) {
              return handleSubmit(onSubmit)()
            } else return
          } else return handleSubmit(onSubmit)()
        }}
        className={cn('flex h-full max-w-[536px] grow flex-col', className)}
      >
        {/*{response && (*/}
        {/*  <Alert*/}
        {/*    ref={alertRef}*/}
        {/*    role="alert"*/}
        {/*    title={response.title}*/}
        {/*    description={response.description}*/}
        {/*    variant={response.type}*/}
        {/*    className="mb-8"*/}
        {/*  />*/}
        {/*)}*/}
        {Children.map(children, (child) => {
          if (child === null) return null
          // If child is not a valid form field, return child
          if (
            !validFormFields.includes(
              child.type.displayName || child.props.displayName,
            )
          )
            return child

          const Field = child.type
          const { name, required, validate, ...props } = child.props

          const rules: any = {
            required: required ? 'This field is required' : null,
            validate: validate ? validate : null,
          }

          return (
            <Controller
              name={name}
              control={control}
              rules={rules}
              render={({ field }) => (
                <Field
                  error={errors[name]?.message}
                  {...props}
                  {...field}
                  required={required}
                />
              )}
            />
          )
        })}
      </form>
    )
  },
)

Form.displayName = 'Form'

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  primary?: React.ReactNode
  secondary?: React.ReactNode
  className?: string
  inline?: boolean
}

export const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(
  ({ primary, secondary, className, inline, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `z-20 mt-auto flex h-full w-full flex-col gap-4 pt-10 lg:mt-0`,
          inline && 'sm:flex-row sm:items-center sm:justify-between',
          className,
        )}
        {...props}
      >
        <div className="grow">{primary}</div>
        <div
          className={cn(
            'text-center sm:text-left lg:mt-auto',
            inline && 'lg:mt-0',
          )}
        >
          {secondary}
        </div>
      </div>
    )
  },
)

FormActions.displayName = 'FormActions'
