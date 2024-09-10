'use client'

import React, { FC, useMemo, useState } from 'react'
import { Button, Notifications } from '../Button'
import { Container } from '../Grid'
import logo from '@/assets/images/SoundfairLogo.svg'
import { UserCircle } from 'lucide-react'
import { Image } from '../Image'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@radix-ui/react-menubar'
import { Confirm } from '../Confirm'

export interface NavbarItem {
  label: string
  onClick: () => void
  notifications?: Notifications
}
export interface NavbarProps {
  items: NavbarItem[]
  user?: any
  onCrisisSupport?: () => void
  handleLogout: () => void
  handleRedirect?: (redirectTo: string) => void
}

export const Navbar: FC<NavbarProps> = ({
  items,
  user,
  onCrisisSupport,
  handleRedirect,
  handleLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const isLogged = useMemo(() => {
    if (!user) return false
    const clone = { ...user }
    return !!clone.id && !!clone.email && !!!clone?.deleted
  }, [user])

  return (
    <div className="py-5">
      <Container className="row flex justify-between">
        <Image
          imageClass="!relative !w-auto !object-contain cursor-pointer"
          src={logo.src}
          alt="Soundfair"
          onClick={() => handleRedirect?.('/dashboard')}
        />
        <div className="flex w-auto items-center justify-center ">
          <Button
            iconClass="!w-2 !h-2 !mr-4 !mt-[2px]"
            className="flex items-center"
            onClick={onCrisisSupport}
            icon="info"
            variant={'link'}
          >
            Crisis support
          </Button>
          <div className="h-full w-[2px] bg-blue-500"></div>
          {!isLogged ? (
            <Button
              className="flex items-center"
              onClick={() => handleRedirect?.('/login')}
              variant={'link'}
            >
              Login
            </Button>
          ) : (
            <Menubar className="flex items-center">
              <MenubarMenu>
                <MenubarTrigger asChild className="ml-3 flex items-center">
                  <UserCircle className="h-6 w-6 cursor-pointer text-blue-500 hover:text-blue-700" />
                </MenubarTrigger>
                <MenubarContent className="absolute right-0 top-1 flex w-36 flex-col items-center justify-center overflow-hidden rounded-md bg-white align-middle !drop-shadow-lg">
                  <MenubarItem
                    className="w-full cursor-pointer px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 hover:outline-none"
                    onClick={() => handleRedirect('/profile')}
                  >
                    Profile
                  </MenubarItem>
                  <MenubarItem
                    className="w-full cursor-pointer px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 hover:outline-none"
                    onClick={() => setIsOpen(true)}
                  >
                    Sign Out
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
        </div>
      </Container>
      <Confirm
        handleDelete={handleLogout}
        id={isOpen}
        onOpenChange={setIsOpen}
        label="Sign out"
        actionClass=""
        title="Sign out"
        description="Are you sure you want to sign out of your account?"
      />
    </div>
  )
}
