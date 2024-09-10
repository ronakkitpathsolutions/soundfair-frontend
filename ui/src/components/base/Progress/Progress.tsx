'use client'

import { useState, useEffect, forwardRef } from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '../../../utils/cn'

export interface ProgressProps extends ProgressPrimitive.ProgressProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  showValue?: boolean
}

const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    { className, variant = 'primary', showValue, value, max, ...props },
    ref,
  ) => {
    const [val, setVal] = useState(0)

    useEffect(() => {
      setVal(value as number)
    }, [value])

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative h-3 w-full overflow-hidden rounded-full',
          {
            'bg-purple-70 text-purple-20': variant === 'primary',
            'bg-neutral text-purple-70': variant === 'secondary',
            'bg-blue-300 text-purple-70': variant === 'tertiary',
            'h-4': showValue,
          },
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn('h-full w-full flex-1 rounded-lg transition-all', {
            'bg-purple-40': variant === 'primary',
            'bg-green': variant === 'secondary' || variant === 'tertiary',
          })}
          style={{ transform: `translateX(-${100 - (val || 0)}%)` }}
        />
        {showValue && (
          <p
            className={cn(
              'absolute bottom-0 left-1 top-0 flex items-center justify-center text-sm',
            )}
          >
            {val}%
          </p>
        )}
      </ProgressPrimitive.Root>
    )
  },
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
