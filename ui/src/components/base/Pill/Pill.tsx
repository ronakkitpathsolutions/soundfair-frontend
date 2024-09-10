import React, { FC } from 'react'
import cn from 'clsx'
import { Typography } from '../Typography'
import { cva, VariantProps } from 'class-variance-authority'

const pillVariants = cva('rounded-xl inline-block', {
  variants: {
    variant: {
      primary: ['bg-yellow text-purple-60'],
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-3'],
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'small',
  },
})

export interface PillProps extends VariantProps<typeof pillVariants> {
  label: string
  className?: string
}

export const Pill: FC<PillProps> = ({ label, variant, size, className }) => {
  return (
    <div
      className={cn(
        pillVariants({
          variant,
          size,
        }),
        className,
      )}
    >
      <Typography variant="text-sm" className="text-center">
        {label}
      </Typography>
    </div>
  )
}
