import { FC } from 'react'
import { Logo } from '@ui/components/base/Logo'
import { cn } from '@ui/utils/cn'

export interface BluurbProps {
  className?: string
}

export const Bluurb: FC<BluurbProps> = ({ className }) => {
  return (
    <Logo
      className={cn('mx-10 xs:v-sm:w-[320px] xs:v-md:w-[460px]', className)}
    />
  )
}
