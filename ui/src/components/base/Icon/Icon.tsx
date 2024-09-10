'use client'
import { forwardRef } from 'react'
import iconPaths from '../../../assets/icons/lib'
import { cn } from '../../../utils/cn'
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: keyof typeof iconPaths
  circle?: boolean
}

export const Icon = forwardRef<HTMLElement, IconProps>(
  ({ name, circle = true, className, ...props }, ref) => {
    return (
      <i
        className={cn(
          'inline-block h-[1em] w-[1em] align-middle',
          { 'rounded-full bg-neutral': circle },
          className,
        )}
        {...props}
        ref={ref}
      >
        <svg
          fill="currentColor"
          width="100%"
          height="100%"
          viewBox="0 0 26 25"
          xmlns="http://www.w3.org/2000/svg"
          className="m-auto"
          preserveAspectRatio="none"
        >
          <path d={iconPaths[name]} fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </i>
    )
  },
)

Icon.displayName = 'Icon'
