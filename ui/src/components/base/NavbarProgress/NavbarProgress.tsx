import React, { FC } from 'react'
import { cn } from '../../../utils/cn'
import { Button } from '../Button'
import { Typography } from '../Typography'
import { Progress } from '../Progress'

export interface NavbarProgressProps {
  title: string
  showBackBtn?: boolean
  showCloseBtn?: boolean
  onBackClicked?: () => void
  onCloseClicked?: () => void
  progress?: number
  className?: string
  variant?: 'primary' | 'secondary'
}

export const NavbarProgress: FC<NavbarProgressProps> = ({
  title,
  showBackBtn,
  showCloseBtn,
  onBackClicked,
  onCloseClicked,
  progress,
  variant = 'primary',
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      <div className="relative flex min-h-[28px]">
        <div className="absolute inset-y-0 left-0">
          {showBackBtn ? (
            <Button
              aria-label="Go back"
              type="button"
              onClick={onBackClicked}
              variant="icon"
              icon="back"
            />
          ) : null}
        </div>
        <Typography
          variant="text-sm"
          component="h2"
          className={cn('m-auto px-8 text-center', {
            'text-purple-20': variant === 'primary',
            'text-purple-60': variant === 'secondary',
          })}
        >
          {title}
        </Typography>
        <div className="absolute inset-y-0 right-0 ">
          {showCloseBtn ? (
            <Button
              aria-label="Close"
              type="button"
              onClick={onCloseClicked}
              variant="icon"
              icon="close"
            />
          ) : null}
        </div>
      </div>
      {progress || progress === 0 ? (
        <Progress className="pointer-events-none mt-4" value={progress} />
      ) : null}
    </div>
  )
}
