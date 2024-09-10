import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentTooltip,
  selectTooltipForId,
  setCurrentTooltip,
} from './modules'
import { Drawer } from '@ui/components/base/Drawer'
import { Button } from '@ui/components/base/Button'
import { Container } from '@ui/components/base/Grid'
import { Typography } from '@ui/components/base/Typography'

export default function TooltipDrawer() {
  const dispatch = useDispatch()
  const currentTooltip = useSelector(selectCurrentTooltip())
  const handleTooltipChange = (value: boolean) => {
    if (value === false) {
      dispatch(setCurrentTooltip(undefined))
    }
  }

  const handleTooltipClose = () => {
    dispatch(setCurrentTooltip(undefined))
  }

  return (
    <Drawer
      variant="primary"
      open={currentTooltip !== undefined}
      onOpenChange={handleTooltipChange}
    >
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
          {currentTooltip?.troubleshoot_info_title ||
            currentTooltip?.title ||
            ''}
        </Typography>
        <Typography
          dangerouslySetInnerHTML={{
            __html:
              currentTooltip?.troubleshoot_description ||
              currentTooltip?.description ||
              '',
          }}
          variant={'body'}
          className="mt-8 whitespace-pre-wrap text-neutral-dark [&>*]:my-4"
        ></Typography>
      </Container>
    </Drawer>
  )
}
