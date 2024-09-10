'use client'
import { forwardRef } from 'react'
import cx from 'clsx'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  placeholder?: string
  onClearInput?: (name: string) => void
  onChange?: (event: any) => void
  validate?: (value: string, formValues: any) => boolean | string
  className?: string
  inputClass?: string
  isNotShow?: boolean
  disabled?: boolean
  value?: string
  options?: any
  control?: any
}

const Selector = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      name,
      required = false,
      isNotShow = false,
      onClearInput,
      error,
      onBlur,
      onChange,
      value,
      placeholder,
      label,
      disabled,
      className,
      inputClass,
      options = [],
      ...props
    }: SelectProps,
    ref,
  ) => {
    const inputClassList = cx(
      'block w-full rounded-xl bg-purple-40 border-1 border-purple-60 py-3 pr-9 px-4 text-base md:text-lg min-h-[45px] sm:text-base sm:leading-6 placeholder-neutral focus:outline-none focus:ring-2 focus:ring-primary-focus',
      error ? 'border-error' : null,
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
            <select
              id={name}
              ref={ref}
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              {...props}
              className={inputClassList}
            >
              <option hidden>Select</option>
              {options.map((val: any) => (
                <option key={val.value} value={val.value}>
                  {val.name}
                </option>
              ))}
            </select>
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
      </div>
    )
  },
)

Selector.displayName = 'Selector'

export { Selector }
