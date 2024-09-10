'use Client'
import { Container } from '@ui/components/base/Grid'
import withUser from '@/hoc/withUser'
import React, { memo, useEffect, useMemo } from 'react'
import { Avatar } from '@ui/components/base/Avatar'
import { LayoutDefault } from '@/features/common/layouts/LayoutDefault'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserActivityById,
  setCurrentReport,
} from '@/features/soundfair/userData'
import { Head } from '@/features/common/components/Head'
import Image from 'next/image'
import ReportCard from '@/components/ReportCard'
import { ChevronRight, Home, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/router'

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state?.auth)
  const { userActivity } = useSelector((state) => state?.userData)
  const router = useRouter()

  const activeReports = useMemo(() => {
    if (userActivity?.Reports?.length)
      return userActivity?.Reports?.filter(
        (report) => report.status === 'active',
      )
    else return []
  }, [userActivity.Reports])

  const archiveReports = useMemo(() => {
    if (userActivity?.Reports?.length)
      return userActivity?.Reports?.filter(
        (report) => report.status === 'archived',
      )
    else return []
  }, [userActivity.Reports])
  const handleReportClick = (id) => {
    const data = userActivity?.Reports?.length
      ? userActivity?.Reports.filter((report) => report?.report_id === id)
      : []
    const currentData = data?.length ? data[0] : {}

    dispatch(setCurrentReport(currentData))
  }

  useEffect(() => {
    dispatch(getUserActivityById({ id: user?.id }))
  }, [dispatch, user])
  return (
    <>
      <Head title="profile" />
      <LayoutDefault>
        <div className="mb-20">
          <Container className="mb-20 mt-5 flex min-h-screen flex-col gap-5">
            <div className="flex w-auto items-center text-sm">
              <span className="cursor-pointer">
                <Home
                  className="h-4 w-4"
                  onClick={() => router.push(`/dashboard`)}
                />
              </span>
              <span className="mx-[2px]">
                <ChevronRight className="h-4 w-4" />
              </span>
              <span className="font-semibold">Profile</span>
            </div>
            <div className="no-wrap md:-mx-2 md:flex ">
              <div className="w-full md:mx-2 md:w-3/12">
                <div className="border-t-4 border-purple-600 bg-white p-3">
                  <Avatar
                    // className="m-auto"
                    // src="https://via.placeholder.com/150"
                    alt="User Image"
                    fallbackText={`${userActivity?.firstName?.charAt(0)?.toUpperCase() +
                      userActivity?.lastName?.charAt(0)?.toUpperCase()
                      }`}
                    size="large"
                  />
                  <div className="mt-5 flex flex-col">
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">FullName :</div>
                      <div className="py-2">
                        <h1 className="text-blue-800">
                          {userActivity?.firstName +
                            ' ' +
                            userActivity?.lastName || ''}
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Email:</div>
                      <div className="py-2">
                        <a
                          className="text-blue-800"
                          href="mailto:jane@example.com"
                        >
                          {userActivity?.email || ''}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-4"></div>
              </div>
              <div className="mx-2 h-64 w-full md:w-9/12">
                <div className="shadow-sm rounded-sm bg-white px-3">
                  <span className="focus:shadow-outline hover:shadow-xs mb-2 block w-full rounded-md px-2 py-3 text-lg font-semibold text-blue-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
                    Show Full Information
                  </span>
                  <div className="grid grid-cols-1">
                    {userActivity?.Reports?.length > 0 ? (
                      <div>
                        {activeReports.length ? (
                          <>
                            <div className="mb-3 flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                              <span className="text-green-500">
                                <svg
                                  className="h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </span>
                              <span className="tracking-wide">
                                Active User Reports
                              </span>
                            </div>
                            <div className="max-h-96">
                              <ul>
                                {activeReports.map((report, index) => (
                                  <ReportCard
                                    key={index}
                                    report={report}
                                    onClick={handleReportClick}
                                    href={`/profile/report/${report?.report_id}`}
                                  />
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : null}
                        {archiveReports.length ? (
                          <>
                            <div className="mb-3 mt-6 flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                              <span className="text-red-500">
                                <svg
                                  className="h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </span>
                              <span className="tracking-wide">
                                Past User Reports
                              </span>
                            </div>
                            <div className="scrollableContainer overflow-y-auto px-2">
                              <ul>
                                {archiveReports?.map((report, index) => (
                                  <ReportCard
                                    key={index}
                                    report={report}
                                    onClick={handleReportClick}
                                    href={`/profile/report/${report?.report_id}`}
                                  />
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : null}
                      </div>
                    ) : (
                      <div className="mb-3 flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                        <span className="text-green-500"></span>
                        <span className="tracking-wide">No activity found</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </LayoutDefault>
    </>
  )
}

export default withUser(Profile)
