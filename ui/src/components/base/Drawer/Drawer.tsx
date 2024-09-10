'use client'

import { FC, ReactNode } from 'react'
import cn from 'clsx'
import * as DrawerPrimitive from 'vaul'
const DrawerVaul = DrawerPrimitive.Drawer

export interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  variant: 'primary' | 'secondary'
  children: ReactNode
  preventDefaults?: boolean
}
export const Drawer: FC<DrawerProps> = ({
  open,
  onOpenChange,
  variant = 'primary',
  children,
  preventDefaults = false,
}) => {
  return (
    <DrawerVaul.Root open={open} onOpenChange={onOpenChange} closeTreshold={1}>
      <DrawerVaul.Portal>
        <DrawerVaul.Overlay className="fixed inset-0 z-50  bg-neutral-dark" />
        {preventDefaults ? (
          <DrawerVaul.Content
            onPointerMove={(event) => event.preventDefault()}
            onPointerUp={(event) => event.preventDefault()}
            onPointerDown={(event) => event.preventDefault()}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50 mx-auto mt-24 flex h-[89%] max-w-5xl flex-col rounded-t-lg md:h-[90%]',
              {
                'bg-white': variant === 'primary',
                'bg-pink-gradient': variant === 'secondary',
              },
            )}
          >
            <div
              className={cn(
                'flex-1 overflow-y-auto overflow-x-hidden rounded-t-lg p-5',
                {
                  'bg-white': variant === 'primary',
                  'bg-gradient ': variant === 'secondary',
                },
              )}
            >
              {children}
            </div>
          </DrawerVaul.Content>
        ) : (
          <DrawerVaul.Content
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50 mx-auto mt-24 flex h-[89%] max-w-5xl flex-col rounded-t-lg shadow-card md:h-[90%]',
              {
                'bg-white': variant === 'primary',
                'bg-pink-gradient': variant === 'secondary',
              },
            )}
          >
            <div
              className={cn(
                'flex-1 overflow-y-auto overflow-x-hidden rounded-t-lg',
                {
                  'bg-white': variant === 'primary',
                  'bg-gradient ': variant === 'secondary',
                },
              )}
            >
              {children}
            </div>
          </DrawerVaul.Content>
        )}
      </DrawerVaul.Portal>
    </DrawerVaul.Root>
  )
}
