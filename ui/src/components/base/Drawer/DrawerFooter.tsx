import { FC, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  gradient?: boolean
  children?: ReactNode
}

export const DrawerFooter: FC<DrawerFooterProps> = ({
  gradient = true,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'absolute inset-x-0 bottom-0 mt-5 flex justify-center gap-2 py-8',
        { 'bg-gradient-to-t from-neutral from-50%': gradient },
        className,
      )}
    >
      {children}
    </div>
  )
}
