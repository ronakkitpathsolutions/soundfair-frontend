'use client'
import { forwardRef, InputHTMLAttributes } from 'react'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import cx from 'clsx'
import { cn } from 'ui/src/utils/cn'
export interface Option {
  label: string
  value: any
}
export type Options = Option[] | string[]
export interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string | React.ReactNode
  value?: any
  onChange?: any
  options: Options
  error?: string
  labelClass?: string
  required?: boolean
  isHide?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
  inputClass?: string
  rootClass?: string
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      options,
      label,
      labelClass,
      autoFocus,
      value,
      onChange,
      inputClass,
      error,
      variant = 'primary',
      rootClass = '',
      className,
      defaultValue,
      isHide = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={className}>
        {label ? (
          <label
            className={cn(
              'mb-4 block text-sm font-medium leading-5 text-black opacity-50',
              labelClass,
            )}
          >
            {label}
          </label>
        ) : null}
        <RadioGroupRadix.Root
          ref={ref}
          className={cx(
            {
              'flex flex-col gap-2.5': variant === 'primary',
              'flex flex-wrap justify-center gap-[6px]':
                variant === 'secondary',
            },
            rootClass,
          )}
          value={value}
          {...props}
          onValueChange={onChange}
          autoFocus={autoFocus}
          defaultValue={defaultValue?.toString()}
        >
          {options.map((option) => {
            const opt =
              typeof option === 'string'
                ? { label: option, value: option }
                : option

            return (
              <div
                key={opt.value}
                className={cx(
                  inputClass,
                  'relative flex rounded-md transition-colors focus-within:ring-2 focus-within:ring-primary-focus',
                  {
                    'items-center  bg-white p-5 hover:sm:bg-primary-hover':
                      variant === 'primary',
                    'min-h-[45px] items-center bg-blue-300 px-4 py-3':
                      variant === 'secondary',
                    '!bg-neutral':
                      variant === 'secondary' && value === opt.value,
                  },
                  !isHide ? 'shadow-card' : 'shadow-none',
                )}
              >
                <RadioGroupRadix.Item
                  className={cx(
                    'mr-3 h-6 w-6 rounded-full border border-blue bg-white before:absolute before:inset-0 before:cursor-pointer focus:outline-0',
                    {
                      'border-2': variant === 'primary' && value === opt.value,
                      'absolute inset-0 h-full w-full border-none text-neutral':
                        variant === 'secondary',
                    },
                  )}
                  value={opt.value}
                  id={opt.value}
                >
                  {variant === 'primary' ? (
                    <RadioGroupRadix.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[14px] after:w-[14px] after:rounded-full after:bg-green after:content-['']" />
                  ) : null}
                </RadioGroupRadix.Item>
                <label
                  className={cx('leading-[130%]', {
                    'max-w-[70%] text-blue': variant === 'primary',
                    'text-base text-blue md:text-lg': variant === 'secondary',
                    '!text-purple-60':
                      variant === 'secondary' && value === opt.value,
                  })}
                  htmlFor={opt.value}
                >
                  {opt.label}
                </label>
              </div>
            )
          })}
        </RadioGroupRadix.Root>
        {error ? <p className="text-error mt-2">{error}</p> : null}
      </div>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'

export { RadioGroup }
