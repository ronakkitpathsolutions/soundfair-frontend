'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { categoriesData } from '@/utils/constant'
import { useRouter } from 'next/router'
import { ChevronRight, Home } from 'lucide-react'

interface CategoriesProps { }

const Categories = ({ ...props }: CategoriesProps) => {
  const router = useRouter()

  const handleRedirect = useCallback(
    (module_id: string) => {
      router.push(`/categories/${module_id}`)
    },
    [router],
  )

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-auto items-center text-sm">
            <span className="cursor-pointer">
              <Home className="h-4 w-4" />
            </span>
            <span className="mx-[2px]">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span className="font-semibold">Categories</span>
          </div>
        </div>
      </div>
      <div className="w-full pt-4">
        <div className="grid w-full grid-cols-12 gap-2">
          {categoriesData?.map((val) => {
            return (
              <div
                onClick={() => handleRedirect(val.name)}
                className="col-span-6 w-full cursor-pointer rounded-md border bg-gray-50 px-6 py-4"
                key={val.name}
              >
                <div className="flex flex-col items-start justify-start">
                  <p>{val.name}</p>
                  <p>{val.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}

export default Categories
