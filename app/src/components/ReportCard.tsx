'use client'
import { setCurrentReport } from '@/features/soundfair/userData'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ReportCard = ({ report, href, onClick }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleCardClick = (id) => {
    if (!href || !onClick) return
    // Route to the href
    if (onClick) {
      onClick(id)
    }

    if (href) {
      router.push(href)
    }
  }

  return (
    <div>
      <li className="shadow-sm mb-3 rounded-lg border p-4">
        <div className="flex justify-between space-x-4">
          <div
            className="cursor-pointer font-semibold text-teal-600"
            onClick={() => handleCardClick(report?.report_id)}
          >
            Report
          </div>
          <div className="text-sm text-gray-700">
            Created at: {new Date(report.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-2">
          {report?.report_data.map((data, dataIndex) => (
            <div
              key={dataIndex}
              className="rounded-md border p-2"
              style={{
                borderLeft: `4px solid ${data.color}`,
                backgroundColor: '#f9f9f9',
              }}
            >
              <div className="text-sm font-semibold">{data.category}</div>
            </div>
          ))}
        </div>
      </li>
    </div>
  )
}

export default ReportCard
