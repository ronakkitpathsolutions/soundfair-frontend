'use client'
import { forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import cx from 'clsx'

// Components
import * as Comp from '@radix-ui/react-checkbox'
import { Icon } from '../../Icon'
import { Typography } from '../../Typography'
import { cn } from 'ui/src/utils/cn'

const checkboxVariants = cva(
  ' items-center relative flex rounded-md transition-colors',
  {
    variants: {
      variant: {
        default: ['flex p-5 bg-white hover:sm:bg-primary-hover'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof checkboxVariants> {
  variant?: 'default'
  label: string | React.ReactNode
  value?: any
  onChange?: any
  error?: string
  labelClass?: string
  className?: string
  isHide?: boolean
  disabled?: boolean
  rootClass?: string
  inputClass?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant,
      labelClass,
      rootClass,
      label,
      value,
      disabled = false,
      onChange,
      error,
      className,
      inputClass,
      isHide = false,
      ...props
    },
    ref,
  ) => {
    const labelId = `label-${props.name}`

    return (
      <div className={className}>
        <div
          className={cn(
            checkboxVariants({
              variant,
            }),
            !isHide
              ? 'shadow-card focus-within:ring-2 focus-within:ring-primary-focus'
              : 'shadow-none',
            inputClass,
            disabled ? '!cursor-not-allowed bg-gray-100' : 'cursor-pointer',
          )}
        >
          <Comp.Root
            id={props.name}
            className={cx(
              'mr-2 flex h-[24px] w-[24px] min-w-[24px] appearance-none items-center justify-normal rounded border border-blue focus:outline-0',
              value ? 'border-2 bg-green' : null,
              typeof label === 'string'
                ? 'cursor-pointer after:absolute after:inset-0' // Only make label clickable if it's a string
                : null,
              rootClass,
              disabled ? '!cursor-not-allowed' : 'cursor-pointer',
            )}
            checked={value}
            disabled={disabled}
            aria-labelledby={labelId}
            onCheckedChange={onChange}
          >
            <Comp.Indicator className="text-white">
              <Icon
                name="check"
                circle={false}
                className="relative -top-[1px] h-6 w-6"
              />
            </Comp.Indicator>
          </Comp.Root>

          <Typography
            component="label"
            variant="text-md"
            id={labelId}
            className={cn(
              'max-w-[70%] break-words leading-[130%] text-blue',
              labelClass,
            )}
          >
            {label}
          </Typography>
        </div>
        {error ? (
          <p className="text-error mt-2" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
