'use client'
import { api } from '@/api/client'
import AdminLayout from '@/components/AdminLayout'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface AdminProfileProps { }

const AdminProfile: FC<AdminProfileProps> = ({
  ...props
}: AdminProfileProps) => {
  const router = useRouter()

  return (
    <AdminLayout>
      <div className="w-full">Profile</div>
    </AdminLayout>
  )
}

export default AdminProfile
