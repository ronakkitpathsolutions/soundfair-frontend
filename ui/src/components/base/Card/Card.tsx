'use client'
import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'
import { Link } from '../Link'
import { Typography } from '../Typography'
import { StaticImageData } from 'next/image'
import { Pill } from '../Pill'
import Image from 'next/image'

export interface CardProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  emoji: StaticImageData
  href?: string
  notification?: string
  onClick?: () => void
}

export const Card = forwardRef<HTMLDivElement, CardProgressProps>(
  ({ title, href, notification, className, emoji, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative min-h-[150px] w-full rounded-md bg-white p-5 shadow-card transition-colors duration-500 focus-within:ring-2 focus-within:ring-primary-focus hover:animate-wiggle hover:bg-primary-hover',
        )}
        {...props}
      >
        <div className="relative mb-2 flex justify-between">
          {emoji.src ? (
            <Image src={emoji} alt="alt" className="h-[24px] w-[24px]" />
          ) : null}
          {notification ? (
            <Pill label={notification} className="absolute -right-1 -top-1" />
          ) : null}
        </div>
        <div className="flex items-center">
          <Typography
            variant="text-md"
            component="h3"
            className={cn('mr-auto text-purple-60')}
          >
            {href ? (
              <Link
                href={href}
                className="text-left before:absolute before:inset-0 focus-visible:outline-none"
              >
                {title}
              </Link>
            ) : (
              <button
                onClick={onClick}
                className="text-left before:absolute before:inset-0 focus-visible:outline-none"
              >
                {title}
              </button>
            )}
          </Typography>
        </div>
      </div>
    )
  },
)

Card.displayName = 'CardProgress'
