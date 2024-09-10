'use client'
import { forwardRef } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import cx from 'clsx'

const NavTabs = TabsPrimitive.Root

const NavTabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cx(
        'relative inline-flex min-w-full flex-row items-center gap-10 bg-blue-300 transition-transform',
        className,
      )}
      {...props}
    />
  )
})
NavTabsList.displayName = TabsPrimitive.List.displayName

const NavTabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <TabsPrimitive.Trigger
      onClick={handleClick}
      ref={ref}
      className={cx(
        'ring-offset-background focus-visible:ring-ring flex-shrink-0 items-center justify-center whitespace-nowrap border-b-4 border-b-blue-300 py-4 text-display-lg text-blue transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-black data-[state=active]:text-black',
        className,
      )}
      {...props}
    />
  )
})
NavTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const NavTabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cx(
      'ring-offset-background focus-visible:ring-ring pt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
NavTabsContent.displayName = TabsPrimitive.Content.displayName

export { NavTabs, NavTabsList, NavTabsTrigger, NavTabsContent }
