import { FC } from 'react'
import { Drawer, DrawerFooter, DrawerHeader } from '@ui/components/base/Drawer'
import { Button } from '@ui/components/base/Button'
import { Typography } from '@ui/components/base/Typography'
import { ModuleProgress } from '@/features/modules/types'
import { CardProgress } from '@ui/components/base/CardProgress'
import { Line } from '@ui/components/base/Svgs'

export interface ModuleDrawerProps {
  open: boolean
  onOpenChange: (value: boolean) => void
  moduleProgress: ModuleProgress[]
}

export const ModuleDrawer: FC<ModuleDrawerProps> = ({
  open,
  onOpenChange,
  moduleProgress,
}) => {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      variant="primary"
      preventDefaults
    >
      <DrawerHeader>
        <Button
          onClick={() => onOpenChange(false)}
          variant="icon"
          aria-label="Close modules list"
          icon="close"
          className="absolute right-5 top-5"
        />
        <Typography variant="h2" className="my-6 text-center text-purple-60">
          Modules
        </Typography>
      </DrawerHeader>
      <div className="mx-auto max-w-5xl pb-20 pt-[90px]">
        {moduleProgress.map((module, index) => (
          <div key={module.title}>
            {index !== 0 && <Line className="mx-auto mb-5" />}
            <div className="mb-6 flex justify-center gap-1">
              <Typography variant="text-sm" className="text-purple-30">
                {module.title}
              </Typography>
              <Typography variant="text-sm" className="text-purple-60">
                {module.description}
              </Typography>
            </div>
            <div className="mb-6 flex flex-col gap-[20px]">
              {module.parts.map((part) => (
                <CardProgress
                  key={part.title}
                  title={part.title}
                  href={part.href}
                  onClick={() => onOpenChange(false)}
                  status={part.status}
                  meta={part.timeLeft}
                  progress={part.progress}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  )
}
