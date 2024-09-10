import { FC } from 'react'
import { Drawer } from '@ui/components/base/Drawer'
import { PracticeActivityForm } from '@/features/practices/PracticeActivityForm'
import { practiceActivities } from '@/features/practices/content/activities'
import { Practice } from '@/features/practices/types'

export interface PracticeDrawerProps {
  id: keyof typeof practiceActivities | null
  open: boolean
  onOpenChange: (value: boolean) => void
  formData: Practice
  setFormData: (value: Practice) => void
}

export const PracticeActivityDrawer: FC<PracticeDrawerProps> = ({
  id,
  open,
  onOpenChange,
  formData,
  setFormData,
}) => {
  const steps = id ? practiceActivities[id] : null

  return (
    <Drawer open={open} onOpenChange={onOpenChange} variant="primary">
      {steps ? (
        <PracticeActivityForm
          formData={formData}
          setFormData={setFormData}
          steps={steps}
          onOpenChange={onOpenChange}
        />
      ) : null}
    </Drawer>
  )
}
