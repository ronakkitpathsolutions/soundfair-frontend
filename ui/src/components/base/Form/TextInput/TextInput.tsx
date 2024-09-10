'use client'
import { forwardRef, useState } from 'react'
import cx from 'clsx'

// Components
import { Icon } from '../../Icon'
import { EyeIcon, EyeOff } from 'lucide-react'

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  onClearInput?: (name: string) => void
  validate?: (value: string, formValues: any) => boolean | string
  className?: string
  inputClass?: string
  isNotShow?: boolean
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      name,
      required = false,
      isNotShow = false,
      onClearInput,
      error,
      type,
      placeholder,
      onBlur,
      onChange,
      value,
      autoComplete = 'off',
      label,
      className,
      inputClass,
      ...props
    }: TextInputProps,
    ref,
  ) => {
    const [inputType, setInputType] = useState(type)
    const inputClassList = cx(
      'block w-full rounded-xl bg-purple-40 border-1 border-purple-60 py-3 pr-9 px-4 text-base md:text-lg min-h-[45px] sm:text-base sm:leading-6 placeholder-neutral focus:outline-none focus:ring-2 focus:ring-primary-focus',
      error ? 'border-red-400 focus:ring-red-400' : null,
      inputClass,
    )

    return (
      <div className={cx('relative', className)}>
        <div className="relative">
          {label ? (
            <label className="ml-[2px] text-sm font-medium">
              {label || ''}
            </label>
          ) : null}
          <div className="relative">
            <input
              ref={ref}
              id={name}
              type={inputType}
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              autoComplete={autoComplete}
              {...props}
              className={inputClassList}
            />
            {onClearInput && value ? (
              <button
                type="button"
                className={cx(
                  'absolute bottom-0 right-[10px] top-0 flex h-full w-8',
                  error ? 'text-error' : null,
                )}
                onClick={() => (name ? onClearInput(name) : null)}
              >
                <Icon
                  name="close"
                  circle
                  className="m-auto h-7 w-7 text-purple-60"
                />
              </button>
            ) : !isNotShow ? (
              <div className="absolute bottom-0 right-2 top-0 flex w-8">
                <Icon
                  name="edit"
                  circle
                  className="m-auto h-7 w-7 text-purple-60"
                />
              </div>
            ) : null}
            {type === 'password' && (
              <button
                type="button"
                aria-label="Toggle password visibility"
                className="absolute right-0 top-1/2 flex -translate-y-1/2 px-4"
                onClick={() =>
                  setInputType(inputType === 'password' ? 'text' : 'password')
                }
              >
                {inputType === 'password' ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </div>
        {error ? (
          <p
            className="text-error ml-1 mt-1 text-sm font-normal text-red-500"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)

TextInput.displayName = 'TextInput'

export { TextInput }
