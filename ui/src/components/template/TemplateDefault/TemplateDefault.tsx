import { ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { Bluurb } from 'app/src/features/common/components/Bluurb'

export interface TemplateHomeProps {
  actions: ReactNode
  children: ReactNode
  smallBluurb?: boolean
  staticActions?: boolean
}

export const TemplateDefault: React.FC<TemplateHomeProps> = ({
  actions,
  children,
  smallBluurb = false,
  staticActions = false,
}) => {
  return (
    <main className="mx-auto mb-10 flex h-full max-w-[372px] flex-col items-center">
      <div className="text-center text-base text-neutral md:text-lg">
        {!smallBluurb && <div className="h-[76px]" />}
        <Bluurb
          className={cn({
            'mx-auto w-[150px] xs:v-sm:w-[150px] xs:v-md:w-[150px]':
              smallBluurb,
          })}
        />
        {children}
        <div
          className={cn({
            'fixed inset-x-0 bottom-10': !staticActions,
          })}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            {actions}
          </div>
        </div>
      </div>
    </main>
  )
}
