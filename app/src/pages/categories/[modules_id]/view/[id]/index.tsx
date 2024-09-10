'use client'
import { api } from '@/api/client'
import AdminLayout from '@/components/AdminLayout'
import { updateToast } from '@/features/toast'
import { fetchModuleById, handlePagination } from '@/slices/modulesSlice'
import { Confirm } from '@ui/components/base/Confirm'
import { CustomButton } from '@ui/components/base/CustomButton'
import { Table } from '@ui/components/base/Table'
import { ChevronRight, Eye, Home, Pencil, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Sessions = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isOpenDelete, setIsOpenDelete] = useState(0)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const modules = useSelector(({ adminModule }) => adminModule)

  useEffect(() => {
    dispatch(
      fetchModuleById({
        params: {
          module_id: router.query.id,
        },
      }),
    )
  }, [dispatch, router.query.id])

  const handleEdit = useCallback(
    (data: any) => {
      router.push(
        `/categories/${router.query?.modules_id}/view/${router.query.id}/edit/${data?.session_id}`,
      )
    },
    [router],
  )

  const handleView = useCallback(
    (data: any) => {
      router.push(
        `/categories/${router.query?.modules_id}/view/${router.query.id}/session/${data?.session_id}`,
      )
    },
    [router],
  )

  const rows = useMemo(() => {
    if (!modules?.module?.Sessions || !modules?.module?.Sessions) return []
    const clone = [...modules?.module?.Sessions]
    return clone
  }, [modules?.module?.Sessions])

  const handleDeleteSession = useCallback(
    async (id: string | number) => {
      setIsDeleteLoading(true)
      try {
        const response = await api.sessions.delete({ id })
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
          dispatch(
            fetchModuleById({
              params: {
                module_id: router.query.id,
              },
            }),
          )
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
    [dispatch, router.query.id],
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
        label: 'Session Name',
      },
      {
        id: 'description',
        fieldName: 'description',
        label: 'Description',
      },
      {
        id: 'reading_time',
        fieldName: 'reading_time',
        label: 'Duration',
        render: ({ rowData }) => (
          <p className="!w-20">{rowData?.reading_time || ''}</p>
        ),
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
                onClick={() => setIsOpenDelete(rowData?.session_id)}
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

  const handleAdd = useCallback(() => {
    router.push(
      `/categories/${router.query?.modules_id}/view/${router.query.id}/add`,
    )
  }, [router])

  const handlePaginationControl = useCallback(
    (value) => {
      dispatch(handlePagination({ ...value }))
    },
    [dispatch],
  )

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="flex w-full items-center justify-between text-sm">
          <div className="flex w-auto items-center text-sm">
            <span className="cursor-pointer">
              <Home className="h-4 w-4" />
            </span>
            <span className="mx-[2px]">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => router.push(`/categories`)}
            >
              Categories
            </span>
            <span className="mx-[2px]">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span
              onClick={() => router.push(`/categories/${router.query.modules_id}`)}
              className="cursor-pointer capitalize "
            >
              {router.query.modules_id}
            </span>
            <span className="mx-[2px]">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span className="font-semibold">{modules.module?.name || ''}</span>
          </div>
          <div className="flex w-auto items-center">
            <CustomButton
              onClick={handleAdd}
              type="button"
              className="flex !w-auto cursor-pointer items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-800 hover:text-gray-200"
            >
              <Plus className="mr-1 h-5 w-5" />
              <span className="text-base">Add</span>
            </CustomButton>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start justify-start">
          <div className="grid w-full grid-cols-12 gap-4 border-b pb-4">
            <div className="col-span-12">
              <p className="text-sm text-gray-600">Category</p>
              <p className="text-md font-semibold">
                {' '}
                {modules?.module?.category || ''}
              </p>
            </div>
            <div className="col-span-12">
              <p className="text-sm text-gray-600">Module Name</p>
              <p className="text-md font-semibold">
                {' '}
                {modules?.module?.name || ''}
              </p>
            </div>
          </div>
          <div className="w-full pt-4">
            <Table
              columns={columns}
              rows={rows}
              pagination={modules?.pagination}
              searchFields={['description', 'name', 'reading_time']}
              handlePagination={handlePaginationControl}
            />
          </div>
        </div>
      </div>
      <Confirm
        isLoading={isDeleteLoading}
        handleDelete={handleDeleteSession}
        id={isOpenDelete}
        onOpenChange={setIsOpenDelete}
        label="Delete"
        title="Confirm delete session?"
        description="This action cannot be undone. This will permanently delete session and remove your data from our servers."
      />
    </AdminLayout>
  )
}

export default Sessions
