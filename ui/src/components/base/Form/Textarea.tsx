'use client'
import { forwardRef } from 'react'
import cx from 'clsx'
import { cn } from 'ui/src/utils/cn'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  validate?: () => boolean | string
  className?: string
  inputClass?: string
  labelClass?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      name,
      label,
      required = false,
      labelClass,
      inputClass,
      error,
      onBlur,
      onChange,
      value,
      className,
      resize = 'none',
      ...props
    },
    ref,
  ) => {
    const textareaClassList = cx(
      'flex min-h-[80px] h-full w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus disabled:cursor-not-allowed disabled:opacity-50',
      inputClass,
      {
        'border-error': error,
        'resize-none': resize === 'none',
        'resize-y': resize === 'vertical',
        'resize-h': resize === 'horizontal',
        resize: resize === 'both',
      },
    )

    return (
      <div className={cx('relative mb-6 mt-4', className)}>
        <label
          htmlFor={name}
          className={cn(
            'absolute left-[15px] top-[-12px] z-10 bg-white px-1 text-sm font-medium leading-6',
            labelClass,
          )}
        >
          {label}
          {required ? (
            <span className="text-error ml-1" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        <textarea
          ref={ref}
          id={name}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          className={cn(
            textareaClassList,
            error ? 'border-red-400 focus-visible:ring-red-400' : '',
          )}
          {...props}
        />
        {error ? (
          <p className="text-error ml-1 mt-1 text-sm font-normal text-red-500">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
