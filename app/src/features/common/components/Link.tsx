import { forwardRef, ReactNode } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { cn } from '@ui/utils/cn'

export interface LinkProps extends NextLinkProps {
  coverParent?: boolean
  children: ReactNode
  className?: string
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ coverParent, className, children, ...props }, ref) => {
    return (
      <NextLink
        ref={ref}
        {...props}
        className={cn(
          {
            'before:absolute before:inset-0 focus-visible:outline-none':
              coverParent,
          },
          className,
        )}
      >
        {children}
      </NextLink>
    )
  },
)

Link.displayName = 'Link'
