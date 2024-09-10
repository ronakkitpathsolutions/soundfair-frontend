import { FC } from 'react'
import { Button } from '@ui/components/base/Button'
import { routes } from '@/lib/constants/routes'
import { TemplateDefault } from '@ui/components/template/TemplateDefault'
import { Link } from '@/features/common/components/Link'

export interface QuitProps {
  onCancel: () => void
}

export const Quit: FC<QuitProps> = ({ onCancel }) => {
  const Actions = (
    <div className="flex flex-col items-center gap-3">
      <Button asChild>
        <Link href={routes.home}>Yes, exit</Link>
      </Button>
      <Button onClick={onCancel}>No keep going</Button>
    </div>
  )

  return (
    <TemplateDefault actions={Actions}>
      <p className="mb-4">
        I can’t save your progress on this if you leave now. You’ll have to
        start again! Are you sure?
      </p>
    </TemplateDefault>
  )
}
