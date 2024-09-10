'use client'
import { api } from '@/api/client'
import AdminLayout from '@/components/AdminLayout'
import { updateToast } from '@/features/toast'
import { fetchSessionById } from '@/slices/sessionSlice'
import { fetchAllTips, handlePagination } from '@/slices/tipsSlice'
import { Confirm } from '@ui/components/base/Confirm'
import { CustomButton } from '@ui/components/base/CustomButton'
import { Table } from '@ui/components/base/Table'
import {
  ChevronRight,
  Eye,
  File,
  Home,
  Pencil,
  Plus,
  Trash,
} from 'lucide-react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Session = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isOpenDelete, setIsOpenDelete] = useState(0)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const sessions = useSelector(({ adminSession }) => adminSession)
  const tips = useSelector(({ adminTips }) => adminTips)

  useEffect(() => {
    router.query.session_id &&
      dispatch(
        fetchSessionById({
          params: {
            session_id: router.query.session_id,
          },
        }),
      )
    dispatch(
      fetchAllTips({
        params: {
          session_id: router.query.session_id,
        },
      }),
    )
  }, [dispatch, router.query.session_id])

  const rows = useMemo(() => {
    if (!tips?.tips || !tips?.tips?.length) return []
    const clone = [...tips?.tips]
    return clone
  }, [tips?.tips])

  const handleEdit = useCallback(
    (data: any) => {
      router.push(
        `/categories/${router.query.modules_id}/view/${router.query.id}/session/${router.query.session_id}/edit/${data?.tip_id}`,
      )
    },
    [router],
  )

  const handleView = useCallback(
    (data: any) => {
      router.push(
        `/categories/${router.query.modules_id}/view/${router.query.id}/session/${router.query.session_id}/view/${data.tip_id}`,
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
        id: 'description',
        fieldName: 'description',
        label: 'Description/Title',
        render: ({ rowData }) => (
          <div
            dangerouslySetInnerHTML={{
              __html: rowData?.description || rowData?.question_title,
            }}
          />
        ),
      },
      {
        id: 'createdAt',
        fieldName: 'createdAt',
        label: 'Since',
        render: ({ rowData }) =>
          moment(rowData.createdAt).format('DD MMM, YYYY'),
      },
      {
        id: 'type',
        fieldName: 'type',
        label: 'Type',
        render: ({ rowData }) => (
          <label className="rounded border border-green bg-white px-1 py-[0.5px] capitalize text-green">
            {rowData?.type}
          </label>
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
                onClick={() => setIsOpenDelete(rowData?.tip_id)}
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

  const handleDeleteSession = useCallback(
    async (id: string | number) => {
      setIsDeleteLoading(true)
      try {
        const response = await api.tips.delete({ id })
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
            fetchAllTips({
              params: {
                session_id: router.query.session_id,
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
    [dispatch, router.query.session_id],
  )

  const handleAdd = useCallback(() => {
    router.push(
      `/categories/${router.query.modules_id}/view/${router.query.id}/session/${router.query.session_id}/add`,
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
              onClick={() => router.push(`/categories`)}
            >
              Categories
            </span>
            <span className="mx-[2px]">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span
              onClick={() =>
                router.push(`/categories/${router.query.modules_id}`)
              }
              className="cursor-pointer capitalize "
            >
              {router.query.modules_id}
            </span>
            <span className="mx-[2px]">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span
              onClick={() =>
                router.push(
                  `/categories/${router.query.modules_id}/view/${router.query.id}`,
                )
              }
              className="cursor-pointer capitalize"
            >
              {sessions?.session?.Module?.name || ''}
            </span>
            <span className="mx-[2px]">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span className="font-semibold">
              {sessions?.session?.name || ''}
            </span>
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
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Category Name</p>
              <p className="text-md font-semibold">
                {' '}
                {sessions?.session?.Module?.category || ''}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Activity Title</p>
              <p className="text-md font-semibold capitalize">
                {' '}
                {sessions?.session?.activity_title || '-'}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Module Name</p>
              <p className="text-md font-semibold">
                {' '}
                {sessions?.session?.Module?.name || ''}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Activity Description</p>
              <p className="text-md font-semibold capitalize">
                {' '}
                {sessions?.session?.activity_description || '-'}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Session Name</p>
              <p className="text-md font-semibold">
                {' '}
                {sessions?.session?.name || ''}
              </p>
            </div>

            <div className="col-span-6">
              <div>
                <p className="text-sm text-gray-600">Activity Files</p>
                {sessions?.session?.activity_file ? (
                  <div className="flex w-full flex-col">
                    {[
                      {
                        name: String(sessions?.session?.activity_file)?.split(
                          '/',
                        )[
                          String(sessions?.session?.activity_file)?.split('/')
                            .length - 1
                        ],
                      },
                    ].map((item) => (
                      <div
                        className="my-1 flex w-full items-center justify-between rounded-md border px-1 py-2 !pl-2"
                        key={item?.name}
                      >
                        <div className="flex flex-row items-center">
                          <File className="mr-1.5 h-5 w-5 text-gray-600" />
                          <p className="text-sm font-medium">{item?.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-md font-semibold capitalize">-</p>
                )}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Activity PDFs</p>
                {sessions?.session?.activity_pdf ? (
                  <div className="flex w-full flex-col">
                    {[
                      {
                        name: String(sessions?.session?.activity_pdf)?.split(
                          '/',
                        )[
                          String(sessions?.session?.activity_pdf)?.split('/')
                            .length - 1
                        ],
                      },
                    ].map((item) => (
                      <div
                        className="my-1 flex w-full items-center justify-between rounded-md border px-1 py-2 !pl-2"
                        key={item?.name}
                      >
                        <div className="flex flex-row items-center">
                          <File className="mr-1.5 h-5 w-5 text-gray-600" />
                          <p className="text-sm font-medium">{item?.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-md font-semibold capitalize">-</p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full pt-4">
            <Table
              pagination={tips?.pagination}
              handlePagination={handlePaginationControl}
              columns={columns}
              searchFields={['type', 'description', 'question_title', 'name']}
              rows={rows}
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
        title="Confirm delete tip?"
        description="This action cannot be undone. This will permanently delete tip and remove your data from our servers."
      />
    </AdminLayout>
  )
}

export default Session
