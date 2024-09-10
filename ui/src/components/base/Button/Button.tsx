'use client'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../../utils/cn'
import iconPaths from '../../../assets/icons/lib'
import { Icon, IconInfo } from '../Icon'
import { Typography } from '../Typography'

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus focus-within:ring-2 focus-within:ring-primary-focus disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: [
          'text-white',
          'bg-blue',
          'border',
          'border-blue',
          'hover:bg-[#1815A6]',
          'active:bg-primary-pressed',
          'w-full',
        ],
        secondary: [
          'bg-transparent',
          'border',
          'border-blue',
          'text-blue',
          'hover:bg-[#1715a650]',
          'w-full',
        ],
        tertiary: [
          'bg-transparent',
          'border',
          'rounded-md',
          'border-neutral',
          'text-blue',
          'w-full',
        ],
        link: ['text-blue', 'hover:underline'],
        icon: ['bg-blue', 'text-neutral', '!p-0'],
      },
      size: {
        small: ['text-sm', 'py-2', 'px-3'],
        medium: ['text-base md:text-lg ', 'py-2', 'px-4'],
      },
      disabled: {
        true: ['bg-neutral-30', 'text-neutral-80', 'border-transparent'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
)

export interface Notifications {
  amount: number
  message: string
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: keyof typeof iconPaths | 'info'
  notifications?: Notifications
  asChild?: boolean
  disabled?: boolean
  className?: string
  iconClass?: string
  notification?: string
  noPadding?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      notifications,
      asChild,
      disabled,
      iconClass,
      children,
      notification,
      noPadding,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    const reverseIcons = ['down']

    return (
      <div className={cn('relative inline-flex', className)}>
        {notifications && notifications.amount ? (
          <div
            role="alert"
            className={cn(
              'absolute flex h-6 w-6 items-center justify-center rounded-full border border-purple-70 bg-yellow px-2 text-sm leading-6 text-purple-60',
              {
                '-right-2 -top-3': size === 'small',
                '-right-1 -top-3': size === 'medium',
              },
            )}
          >
            {notifications.amount}{' '}
            <span className="sr-only">{notifications.message}</span>
          </div>
        ) : null}
        <Comp
          ref={ref}
          className={cn(
            className,
            buttonVariants({
              variant,
              size,
              disabled,
            }),
            {
              'py-2': variant !== 'icon' && icon,
              'py-0': variant === 'link',
              'min-h-[45px]': variant !== 'icon' && variant !== 'link',
              'px-0': noPadding,
            },
          )}
          {...props}
          disabled={(Comp === 'button' && disabled) || undefined}
        >
          <div
            className={cn('flex w-full', {
              'justify-between': icon === 'next',
            })}
          >
            {icon && !reverseIcons.includes(icon) && icon !== 'next' ? (
              icon === 'info' ? (
                <IconInfo className={cn('-ml-5', iconClass)} />
              ) : (
                <Icon
                  name={icon}
                  circle={false}
                  className={cn('-ml-5  h-6 w-6', {})}
                />
              )
            ) : null}
            {children}
            {notification && (
              <Typography
                style={{
                  color: '#262644',
                  background: '#FFFA86',
                  fontSize: '12px',
                  lineHeight: '18px',
                  padding: '3px 5px',
                  borderRadius: '4px',
                  marginLeft: '5px',
                }}
              >
                {notification}
              </Typography>
            )}
            {icon === 'next' && !notification && (
              <Icon
                name="next"
                circle={false}
                className={cn('-mr-2 ml-5  h-6 w-6', {})}
              />
            )}
            {icon && icon !== 'info' && reverseIcons.includes(icon) && (
              <Icon name={icon} circle={false} className={cn('h-6 w-6', {})} />
            )}
          </div>
        </Comp>
      </div>
    )
  },
)

Button.displayName = 'Button'
