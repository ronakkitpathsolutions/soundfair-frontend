import React, { useEffect, useMemo, useState } from 'react'
import { Drawer } from '@ui/components/base/Drawer'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@ui/components/base/Typography'
import { Button } from '@ui/components/base/Button'
import { Container } from '@ui/components/base/Grid'
import { IconBraile, IconHeart, IconMasks } from '@ui/components/base/Icon'
import { fetchSessionById } from '@/slices/sessionSlice'
import { SERVER_URL } from '@/utils/constant'
import { RootState } from '@/features/common/store'

export default function StrategyDrawer() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(true)
  const [isPdfAvailable, setIsPdfAvailable] = React.useState(true)

  const strategyId = router.query.strategyId
  const strategy = useSelector(
    (state: RootState) => state?.adminSession.session,
  )

  React.useEffect(() => {
    if (strategyId) {
      dispatch(fetchSessionById({ params: { session_id: strategyId } }))
    }
  }, [dispatch, strategyId])

  useEffect(() => {
    const checkPdfAvailability = async () => {
      try {
        const response = await fetch(`${SERVER_URL}${strategy?.activity_pdf}`)
        if (response.ok) {
          setIsPdfAvailable(true)
        } else {
          setIsPdfAvailable(false)
        }
      } catch (error) {
        console.log('Error fetching PDF:', error)
        setIsPdfAvailable(false)
      }
    }

    if (strategy?.activity_pdf) {
      checkPdfAvailability()
    } else {
      setIsPdfAvailable(false)
    }
  }, [strategy?.activity_pdf])

  const handleDrawerClose = (open: boolean) => {
    setOpen(open)
    if (!open) {
      router.back()
    }
  }

  const handleDownload = async (imageUrl: string, fileName: string) => {
    let name = fileName?.split('/').pop().split('-').slice(1).join('-')
    try {
      const response = await fetch(imageUrl)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${name}` // Automatically adds correct file extension
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download image:', error)
    }
  }

  const getStrategyIcon = () => {
    switch (strategy?.strategyIcon || 'Masks') {
      case 'Braille':
        return <IconBraile className="h-[40px] w-[40px] shrink-0" />
      case 'Heart':
        return <IconHeart className="h-[40px] w-[40px] shrink-0" />
      case 'Masks':
        return <IconMasks className="h-[40px] w-[40px] shrink-0" />
      default:
        return null
    }
  }

  if (!strategy) {
    return 'Strategy not found'
  }
  return (
    <Drawer onOpenChange={handleDrawerClose} variant="primary" open={open}>
      <Container className="px-10">
        <div className="sticky top-0 flex-col bg-white pb-2 pt-5">
          <Button variant={'link'} onClick={() => handleDrawerClose(false)}>
            Close
          </Button>
        </div>
        <Typography
          className="mt-5 flex flex-row justify-between"
          variant={'h1-sm'}
        >
          {strategy?.activity_title || ''}
          {getStrategyIcon()}
        </Typography>
        <Typography
          dangerouslySetInnerHTML={{
            __html: strategy?.activity_description || '',
          }}
          variant={'text-lg'}
          className="mt-5 whitespace-pre-wrap text-neutral-dark [&>*]:my-4"
        ></Typography>
        <div className="m-2">
          {strategy?.activity_file ? (
            <img
              className="mt-5"
              src={`${SERVER_URL}${strategy?.activity_file}`}
              alt="activity-image"
              height={200}
              width={200}
            />
          ) : null}

          {strategy?.activity_pdf && isPdfAvailable ? (
            <embed
              src={`${SERVER_URL}${strategy?.activity_pdf}`}
              width="100%"
              height="600px"
              type="application/pdf"
              title="PDF Preview"
            />
          ) : null}
        </div>
      </Container>
      <Container className="sticky bottom-0 flex-col bg-white px-10 pb-5">
        <Button
          className="w-full"
          variant={'primary'}
          onClick={() =>
            handleDownload(
              `${SERVER_URL}${strategy?.activity_pdf}`,
              strategy?.activity_pdf,
            )
          }
        >
          Download as PDF
        </Button>
        <Button
          className="mt-3 w-full"
          variant={'secondary'}
          onClick={() =>
            handleDownload(
              `${SERVER_URL}${strategy?.activity_file}`,
              strategy?.activity_file,
            )
          }
        >
          Save as image
        </Button>
      </Container>
    </Drawer>
  )
}
