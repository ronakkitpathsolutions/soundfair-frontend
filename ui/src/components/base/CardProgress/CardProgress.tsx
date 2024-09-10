'use client'
import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'
import { Link } from '../Link'
import { Typography } from '../Typography'
import { Icon, IconBraile, IconHeart, IconMasks } from '../Icon'
import { Progress } from '../Progress'
import { useRouter } from 'next/router'

export interface CardProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  meta?: string
  href?: string
  onClick?: () => void
  progress?: number
  status: 'in-progress' | 'locked' | 'not-started' | 'completed'
  type?: 'Module' | 'Reading' | 'Activity' | 'Strategy'
  icon?: string
  progressMeta?: string
}

export const CardProgress = forwardRef<HTMLDivElement, CardProgressProps>(
  (
    {
      title,
      description,
      meta,
      status,
      href,
      onClick,
      className,
      progress,
      type = 'Module',
      progressMeta,
      icon,
      ...props
    },
    ref,
  ) => {
    const router = useRouter()

    const getIconForType = (type: string) => {
      switch (type) {
        case 'Module':
          return 'folder'
        case 'Reading':
          return 'book'
        case 'Activity':
          return 'brain'
        case 'Strategy':
          return 'star'
        default:
          return 'folder'
      }
    }

    if (type === 'Strategy' && status === 'locked') {
      return null
    }

    const handleCardClick = () => {
      if (status === 'locked') {
        return
      }
      // Route to the href
      if (href) {
        router.push(href)
      }

      if (onClick) onClick()
    }

    return (
      <div
        onClick={handleCardClick}
        ref={ref}
        className={cn(
          'group relative w-full rounded-md border border-neutral-dark bg-white p-5 transition-colors duration-500 focus-within:ring-2 focus-within:ring-primary-focus ',
          {
            'cursor-pointer border-none shadow-card hover:animate-wiggle hover:bg-primary-hover':
              status !== 'locked',
          },
        )}
        {...props}
      >
        <div className="relative mb-2 flex items-center">
          <Typography variant="text-sm" className="mr-4 text-neutral-dark">
            <Icon circle={false} name={getIconForType(type)} className="mr-2" />
            {type}
          </Typography>
          <Typography
            variant="text-sm"
            className="leading-none text-neutral-dark"
          >
            {meta}
          </Typography>
        </div>
        <div className="flex items-center">
          <Typography
            variant="text-lg"
            component="h3"
            className={cn('mr-auto', {
              'text-blue': status !== 'locked',
              'text-neutral-dark': status === 'locked',
            })}
          >
            {status !== 'locked' && href ? (
              <Link
                href={href}
                onClick={onClick}
                className="focus-visible:outline-none"
              >
                {title}{' '}
                {type !== 'Module' && (
                  <Icon
                    name="next"
                    circle={false}
                    className={cn('-mr-2 ml-0  h-6 w-6', {})}
                  />
                )}
              </Link>
            ) : (
              title
            )}
            {icon === 'Braille' && (
              <IconBraile className="absolute right-4 top-4 h-[40px] w-[40px]" />
            )}
            {icon === 'Heart' && (
              <IconHeart className="absolute right-4 top-4 h-[40px] w-[40px]" />
            )}
            {icon === 'Masks' && (
              <IconMasks className="absolute right-4 top-4 h-[40px] w-[40px]" />
            )}
          </Typography>
        </div>
        {description && (
          <Typography
            dangerouslySetInnerHTML={{ __html: description }}
            variant="text-sm"
            className="mt-5 text-neutral-dark"
          />
        )}
        <div className="flex items-center">
          {['in-progress'].includes(status) ? (
            <Progress
              variant="secondary"
              value={progress}
              className="pointer-events-none mt-4 group-hover:bg-purple-60/10"
            />
          ) : null}
          <div className="flex-shrink-0 leading-none text-neutral-dark">
            {status === 'in-progress' && (
              <Typography className="ml-4 mt-4" variant="text-sm">
                {progressMeta}
              </Typography>
            )}
            <Typography variant="text-sm">
              {status === 'not-started' ? `` : null}
            </Typography>
            <div className="absolute right-5 top-5">
              {status === 'locked' ? (
                <Icon
                  name="locked"
                  circle={false}
                  className="h-6 w-6 text-neutral-dark"
                />
              ) : null}
              {status === 'completed' ? (
                <Icon name="check" className="h-6 w-6 bg-green text-white" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

CardProgress.displayName = 'CardProgress'
