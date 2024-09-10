'use client'
import { forwardRef } from 'react'
import { cn } from 'ui/src/utils/cn'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  className?: string
  type: 'submit' | 'reset' | 'button'
  children?: any
}

export const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, disabled = false, type = 'button', children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        {...{ disabled, type }}
        className={cn(
          'relative min-h-[45px] w-full rounded-md bg-blue-600 px-4 py-3 text-base text-white sm:text-base sm:leading-6  md:text-lg',
          className,
        )}
      >
        {children}
      </button>
    )
  },
)

CustomButton.displayName = 'CustomButton'
