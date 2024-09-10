import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Drawer } from '@ui/components/base/Drawer'
import { Button } from '@ui/components/base/Button'
import { Container } from '@ui/components/base/Grid'
import { Typography } from '@ui/components/base/Typography'
import { useRouter } from 'next/router'
import HeatGraph from './HeatGraph'
import { setCurrentReport } from '@/features/soundfair/userData'

export default function ReportDrawer() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { currentReport } = useSelector((state) => state?.userData)

  const buildGraphData = () => {
    const data = [] as number[]
    const labels = [] as string[]
    if (currentReport && currentReport?.report_data?.length > 0) {
      currentReport?.report_data.forEach(
        (element: { score: number; category: string }) => {
          data.push(element?.score || 0)
          labels.push(element.category)
        },
      )
    }
    return {
      labels,
      data,
    }
  }

  const handleTooltipClose = () => {
    dispatch(setCurrentReport(undefined))
    router.push({ pathname: '/profile' })
  }

  const graphData = buildGraphData()
  return (
    <Drawer variant="primary" open={currentReport !== undefined}>
      <Container className="px-8">
        <div className="sticky top-0 flex-col bg-white pt-5">
          <Button
            icon="close"
            variant={'link'}
            className="[&_i]:px-1 [&_i]:py-1"
            onClick={handleTooltipClose}
          >
            Close
          </Button>
        </div>
        <Typography
          className="mt-8 flex flex-row justify-between"
          variant={'heading-l'}
        >
          Profile Report
        </Typography>
        <div className="m-auto w-full max-w-md p-3">
          <HeatGraph labels={graphData.labels} data={graphData.data} />
        </div>
      </Container>
    </Drawer>
  )
}
