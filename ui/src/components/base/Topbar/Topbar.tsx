'use client'
import React, { FC, useCallback, useState } from 'react'
import { cn } from 'ui/src/utils/cn'
import { CustomButton } from '../CustomButton'
import { LucideMenu, UserCircle } from 'lucide-react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@radix-ui/react-menubar'
import { Confirm } from '../Confirm'

export interface TopbarProps {
  open?: boolean
  className?: string
  handleToggle?: () => void
  handleLogout?: () => void
  handleRedirect?: (path: string) => void
}

export const Topbar: FC<TopbarProps> = ({
  open,
  handleToggle,
  className,
  handleRedirect,
  handleLogout,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section
      className={cn(
        className,
        open ? 'ml-[256px]' : 'ml-[unset]',
        open ? 'w-[calc(100%-256px)]' : 'w-full',
        'fixed z-50 border-b bg-white px-6 transition-all duration-500',
      )}
    >
      <div className="flex h-20 w-full items-center justify-between">
        <div>
          <CustomButton
            onClick={handleToggle}
            type="button"
            className="!bg-[#f0f2f5] !px-3 !py-2"
          >
            <LucideMenu className="h-6 w-6 text-[#333]" />
          </CustomButton>
        </div>
        <div className="z-50">
          <Menubar className="flex items-center">
            <MenubarMenu>
              <MenubarTrigger
                asChild
                className="flex cursor-pointer items-center"
              >
                <UserCircle className="h-8 w-8 cursor-pointer text-[#333]" />
              </MenubarTrigger>
              <MenubarContent className="absolute right-0 top-full overflow-hidden rounded-md bg-white align-middle !drop-shadow-lg">
                {/* <MenubarItem
                  className="cursor-pointer px-10 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:outline-none"
                  onClick={() => handleRedirect('/admin/profile')}
                >
                  Profile
                </MenubarItem> */}
                <MenubarItem
                  className="flex min-w-[90px] cursor-pointer items-center justify-center px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:outline-none"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="flex">Sign Out</span>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <Confirm
        handleDelete={handleLogout}
        id={isOpen}
        onOpenChange={setIsOpen}
        label="Sign Out"
        actionClass=""
        title="Sign Out"
        description="Are you sure you want to sign out of your account?"
      />
    </section>
  )
}
