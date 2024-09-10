'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Table } from '@ui/components/base/Table'
import { Confirm } from '@ui/components/base/Confirm'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { CustomButton } from '@ui/components/base/CustomButton'
import { ChevronRight, Eye, Home, Pencil, Trash } from 'lucide-react'
import { fetchAllModules, handlePagination } from '@/slices/modulesSlice'
import { useRouter } from 'next/router'
import { updateToast } from '@/features/toast'
import { api } from '@/api/client'

const Modules = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isOpenDelete, setIsOpenDelete] = useState(0)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const modules = useSelector(({ adminModule }) => adminModule)

  useEffect(() => {
    dispatch(
      fetchAllModules({
        params: {
          category: router.query?.modules_id,
        },
      }),
    )
  }, [dispatch, router.query?.modules_id])

  const handleAdd = useCallback(() => {
    router.push(`/categories/${router.query?.modules_id}/add`)
  }, [router])

  const handleEdit = useCallback(
    (data: any) => {
      router.push(
        `/categories/${router.query?.modules_id}/edit/${data?.module_id}`,
      )
    },
    [router],
  )

  const handleView = useCallback(
    (data: any) => {
      router.push(
        `/categories/${router.query?.modules_id}/view/${data?.module_id}`,
      )
    },
    [router],
  )

  const columns = useMemo(
    () => [
      {
        id: 'name',
        fieldName: 'name',
        label: 'Serial',
        render: (row: any) => {
          return `#${row?.rowIndex + 1}`
        },
      },
      {
        id: 'name',
        fieldName: 'name',
        label: 'Module Name',
      },
      {
        id: 'category',
        fieldName: 'category',
        label: 'Category Name',
        render: ({ rowData }) => (
          <label className="rounded border border-green bg-white px-1 py-[0.5px] text-green">
            {rowData?.category}
          </label>
        ),
      },
      {
        id: 'createdAt',
        fieldName: 'createdAt',
        label: 'Since',
        render: ({ rowData }) => {
          return moment(rowData?.createdAt).format('D MMM, YYYY')
        },
      },
      {
        id: 'id',
        fieldName: 'id',
        label: 'Actions',
        render: ({ rowData }) => {
          return (
            <div className="flex items-center justify-start">
              <CustomButton
                onClick={() => handleView({ ...rowData })}
                className="mr-2 !min-h-[44px] !w-auto !bg-[#c3e6cb] !px-3 !py-2"
                type="button"
              >
                <Eye className="h-5 w-5 text-[#155724]" />
              </CustomButton>
              <CustomButton
                onClick={() => handleEdit({ ...rowData })}
                className="mr-2 !min-h-[44px] !w-auto !bg-[#fff3cd] !px-3 !py-2"
                type="button"
              >
                <Pencil className="h-5 w-5 text-[#856404]" />
              </CustomButton>
              <CustomButton
                onClick={() => setIsOpenDelete(rowData?.module_id)}
                className="!min-h-[44px] !w-auto !bg-[#f5c6cb] !px-3 !py-2"
                type="button"
              >
                <Trash className="h-5 w-5 text-[#ce2c31]" />
              </CustomButton>
            </div>
          )
        },
      },
    ],
    [handleEdit, handleView],
  )

  const rows = useMemo(() => {
    if (!modules?.modules || !modules?.modules?.length) return []
    const clone = [...modules?.modules]
    return clone
  }, [modules?.modules])

  const handleDeleteModule = useCallback(
    async (id: string | number) => {
      setIsDeleteLoading(true)
      try {
        const response = await api.modules.delete({ id })
        if (response?.data) {
          setIsDeleteLoading(false)
          const { message } = response?.data
          dispatch(
            updateToast({
              open: true,
              message: message || '',
              variant: 'success',
            }),
          )
          dispatch(fetchAllModules())
        }
      } catch (error) {
        setIsDeleteLoading(false)
        dispatch(
          updateToast({
            open: true,
            message: error?.message || '',
            variant: 'error',
          }),
        )
      }
    },
    [dispatch],
  )

  const handlePaginationControl = useCallback(
    (value) => {
      dispatch(handlePagination({ ...value }))
    },
    [dispatch],
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
            <span
              className="cursor-pointer"
              onClick={() => router.push('/categories')}
            >
              Categories
            </span>
            <span className="mx-[2px]">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span className="font-semibold">
              {router.query.modules_id || ''}
            </span>
          </div>
        </div>
        <div className="w-full pt-4">
          <Table
            searchFields={['category', 'name']}
            handlePagination={handlePaginationControl}
            handleAdd={handleAdd}
            columns={columns}
            rows={rows}
            pagination={modules?.pagination}
          />
          <Confirm
            isLoading={isDeleteLoading}
            handleDelete={handleDeleteModule}
            id={isOpenDelete}
            onOpenChange={setIsOpenDelete}
            label="Delete"
            title="Confirm delete module?"
            description="This action cannot be undone. This will permanently delete module and remove your data from our servers."
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Modules
