'use client'
import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, style }, ref) => {
    return (
      <div
        style={style}
        className={cn('mx-auto w-full max-w-5xl px-8 md:px-8', className)}
      >
        {children}
      </div>
    )
  },
)

Container.displayName = 'Container'
