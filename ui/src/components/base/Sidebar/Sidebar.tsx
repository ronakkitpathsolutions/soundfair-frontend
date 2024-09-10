'use client'
import React, { FC, useCallback, useState } from 'react'
import { cn } from 'ui/src/utils/cn'
import logo from '@/assets/images/SoundfairLogo.svg'
import { Image } from '../Image'
import { Layers, LogOut } from 'lucide-react'
import { Confirm } from '../Confirm'

export interface SidebarProps {
  open?: boolean
  className?: string
  handleRedirect?: (path: string) => void
  handleLogout?: () => void
}

export const Sidebar: FC<SidebarProps> = ({
  open,
  handleRedirect,
  handleLogout,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const getSidebarActivation = (name = '') => {
    if (!name) return false
    if (window !== undefined) {
      const path = window?.location?.pathname || ''
      const value = path.split('/')
      return {
        isActive: value.includes(name),
      }
    } else
      return {
        isActive: false,
      }
  }

  const navigationData = [
    {
      id: 'categories',
      name: 'Categories',
      path: '/categories',
      ...getSidebarActivation('categories'),
      icon: <Layers className="h-5 w-5" />,
    },
    // {
    //   id: 'session',
    //   name: 'Sessions',
    //   path: '/session',
    //   icon: <Layout className="h-5 w-5" />,
    // },
    // {
    //   id: 'tip',
    //   name: 'Tips',
    //   path: '/tips',
    //   icon: <Rows className="h-5 w-5" />,
    // },
  ]

  return (
    <section
      className={cn(
        'shadow-lg fixed left-0 top-0 z-20 h-full w-64 transform bg-white transition-all duration-500',
        open ? 'translate-x-0' : '-translate-x-full',
        className,
      )}
    >
      <div className="w-full">
        <div className="flex h-20 w-full items-center justify-center">
          <Image
            imageClass="!relative !w-auto !object-contain"
            src={logo.src}
            alt="Soundfair"
          />
        </div>
        <div className="flex h-[calc(100vh-85px)] w-full flex-col justify-between p-4">
          <nav className="w-full">
            {navigationData.map((val) => (
              <li
                onClick={() => handleRedirect && handleRedirect(val.path)}
                key={val.id}
                className={cn(
                  'mb-3 flex cursor-pointer items-center rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-800 hover:text-gray-200',
                  val.isActive ? 'bg-gray-800 text-gray-200' : '',
                )}
              >
                {val.icon}
                <span className="mx-4 font-medium">{val.name}</span>
              </li>
            ))}
          </nav>
          <nav className="w-full">
            <li
              onClick={() => setIsOpen(true)}
              className="mb-3 flex cursor-pointer items-center rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-800 hover:text-gray-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="mx-4 font-medium">Sign Out</span>
            </li>
          </nav>
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
