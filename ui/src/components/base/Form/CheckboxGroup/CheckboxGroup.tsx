'use client'
import { forwardRef } from 'react'
import { Checkbox } from '../Checkbox'

export interface Option {
  label: string
  value: any
}
export interface CheckboxGroupProps {
  name: string
  label?: string | React.ReactNode
  value?: any
  onChange?: any
  options: Option[] | string[]
  error?: string
  required?: boolean
  className?: string
}

const CheckboxGroup = forwardRef<HTMLInputElement, CheckboxGroupProps>(
  ({ options, label, value, onChange, error, className, ...props }, ref) => {
    const handleChange = (optionValue: any[], checked: boolean) => {
      // If selected checkbox is not in the array, add it
      if (checked) {
        onChange([...value, optionValue])
      } else {
        onChange(value.filter((v: any) => v !== optionValue))
      }
    }

    return (
      <div className={className}>
        {label ? (
          <label className="mb-4 block text-sm font-medium leading-5 text-black opacity-50">
            {label}
          </label>
        ) : null}
        <div className="mt-1 grid grid-cols-1 gap-2.5">
          {options.map((opt) => {
            const option =
              typeof opt === 'string' ? { label: opt, value: opt } : opt

            return (
              <Checkbox
                disabled={opt.disabled}
                key={option.label}
                name={option.value}
                label={option.label}
                value={Array.isArray(value) && value.includes(option.value)}
                onChange={(checked: boolean) =>
                  handleChange(option.value, checked)
                }
              />
            )
          })}
        </div>
        {error ? <p className="text-error mt-2">{error}</p> : null}
      </div>
    )
  },
)

CheckboxGroup.displayName = 'CheckboxGroup'

export { CheckboxGroup }
