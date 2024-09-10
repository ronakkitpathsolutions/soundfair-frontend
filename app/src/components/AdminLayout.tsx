'use client'
import { useCallback, useState } from 'react'
import withUser from '@/hoc/withUser'
import { Sidebar } from '@ui/components/base/Sidebar/Sidebar'
import { Topbar } from '@ui/components/base/Topbar/Topbar'
import { cn } from '@ui/utils/cn'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { initialAuth } from '@/features/auth/authSlice'

const AdminLayout = ({ children }) => {
  const [toggle, setToggle] = useState(true)

  const router = useRouter()
  const dispatch = useDispatch()

  const handleToggle = useCallback(() => {
    setToggle((prev) => !prev)
  }, [])

  const handleRedirect = (path: string) => {
    if (path === '/login') {
      location.href = '/login'
    } else router.push(path)
  }

  const handleLogout = useCallback(() => {
    dispatch(initialAuth({}))
    localStorage.clear()
    router.push('/login')
  }, [dispatch, router])

  return (
    <section className="relative h-screen w-screen">
      <Topbar
        open={toggle}
        {...{ handleToggle, handleRedirect, handleLogout }}
      />
      <Sidebar
        {...{ handleLogout, handleRedirect }}
        className="border"
        open={toggle}
      />
      <div
        className={cn(
          'h-[calc(100vh-80px)] p-4 pt-24 transition-all duration-500',
          toggle ? 'ml-[256px]' : 'ml-[unset]',
        )}
      >
        {children}
      </div>
    </section>
  )
}

export default withUser(AdminLayout)
