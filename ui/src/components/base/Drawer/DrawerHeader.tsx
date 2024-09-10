import { FC, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  transparent?: boolean
  children: ReactNode
}

export const DrawerHeader: FC<DrawerHeaderProps> = ({
  transparent = false,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'absolute inset-x-0 top-0 z-10 min-h-[90px] rounded-t-lg p-5',
        { 'bg-gradient-to-b from-neutral from-50%': !transparent },
        className,
      )}
    >
      {children}
    </div>
  )
}
