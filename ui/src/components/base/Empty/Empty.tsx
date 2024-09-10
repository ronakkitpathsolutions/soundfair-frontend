import React, { FC, ReactNode } from 'react'
import cn from 'clsx'
import { Button } from '../Button'

export interface EmptyProps {
  children: ReactNode
  cta?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export const Empty: FC<EmptyProps> = ({ cta, children, className }) => {
  return (
    <div
      className={cn(
        'flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-purple-20 px-10',
        className,
      )}
    >
      <div className="mb-9 text-center text-purple-30">{children}</div>
      {cta ? (
        <Button variant="secondary" onClick={cta.onClick}>
          {cta.label}
        </Button>
      ) : null}
    </div>
  )
}
