import { FC } from 'react'
import { Drawer } from '@ui/components/base/Drawer'
import { ActivityForm } from '@/features/activities/ActivityForm'
import { activities } from '@/features/activities/content'

export interface ActivityDrawerProps {
  activityId: keyof typeof activities | null
  open: boolean
  onOpenChange: (value: boolean) => void
  onComplete: (() => void) | null
}

export const ActivityDrawer: FC<ActivityDrawerProps> = ({
  open,
  onOpenChange,
  onComplete,
  activityId,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} variant="secondary">
      {activityId ? (
        <ActivityForm
          onComplete={onComplete}
          steps={activities[activityId]}
          onOpenChange={onOpenChange}
        />
      ) : null}
    </Drawer>
  )
}
