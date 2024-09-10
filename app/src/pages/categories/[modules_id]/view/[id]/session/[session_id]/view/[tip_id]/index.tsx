'use client'
import AdminLayout from '@/components/AdminLayout'
import { fetchSessionById } from '@/slices/sessionSlice'
import { fetchTipsById } from '@/slices/tipsSlice'
import { cn } from '@ui/utils/cn'
import { ChevronRight, File, Home } from 'lucide-react'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface PageProps {
  className?: string
}

const TipDetail: FC<PageProps> = ({ ...props }: PageProps) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { session } = useSelector(({ adminSession }) => adminSession)
  const { tip } = useSelector(({ adminTips }) => adminTips)

  useEffect(() => {
    dispatch(
      fetchSessionById({
        params: {
          session_id: router.query.session_id,
        },
      }),
    )
    dispatch(
      fetchTipsById({
        params: {
          tip_id: router.query.tip_id,
        },
      }),
    )
  }, [dispatch, router.query.session_id, router.query.tip_id])

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
              onClick={() => router.push(`/categories/${router.query.modules_id}`)}
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
              {session?.Module?.name || ''}
            </span>
            <span className="mx-[2px]">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span
              onClick={() =>
                router.push(
                  `/categories/${router.query.modules_id}/view/${router.query.id}/session/${router.query.session_id}`,
                )
              }
              className="cursor-pointer capitalize"
            >
              {session?.name || ''}
            </span>
            <span className="mx-[2px]">
              <ChevronRight className="h-4 w-4" />
            </span>
            <span
              className={cn('w-[120px] cursor-pointer truncate capitalize')}
            >
              {tip?.description || tip?.question_title || ''}
            </span>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start justify-start">
          <div className="grid w-full grid-cols-12 gap-4 border-b pb-4">
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Category Name</p>
              <p className="text-md font-semibold">
                {' '}
                {session?.Module?.category || ''}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Module Name</p>
              <p className="text-md font-semibold">
                {' '}
                {session?.Module?.name || ''}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Session Name</p>
              <p className="text-md font-semibold"> {session?.name || ''}</p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Tip Name</p>
              <p className="text-md font-semibold">
                {' '}
                {tip?.question_title || tip?.description || ''}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Tip Type</p>
              <p className="text-md font-semibold capitalize">
                {' '}
                {tip?.type || ''}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Troubleshoot Title</p>
              <p className="text-md font-semibold capitalize">
                {' '}
                {tip?.troubleshoot_title || '-'}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Troubleshoot Description</p>
              <p className="text-md font-semibold capitalize">
                {' '}
                {tip?.troubleshoot_description || '-'}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Troubleshoot Info Title</p>
              <p className="text-md font-semibold capitalize">
                {' '}
                {tip?.troubleshoot_info_title || '-'}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Tip Question</p>
              <p className="text-md font-semibold capitalize">
                {' '}
                {tip?.question_title || '-'}
              </p>
            </div>
            <div className="col-span-6">
              <p className="text-sm text-gray-600">Tip Options</p>
              {tip?.options ? (
                JSON.parse(
                  tip?.options.replace(/\\"/g, '"')?.slice(1, -1),
                )?.map((item) => (
                  <p key={item} className="text-md font-semibold capitalize">
                    {item || '-'}
                  </p>
                ))
              ) : (
                <p className="text-md font-semibold capitalize">-</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default TipDetail
