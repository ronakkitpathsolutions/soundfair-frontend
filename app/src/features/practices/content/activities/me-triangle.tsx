import { Practice, PracticeActivityFormStep } from '@/features/practices/types'
import cn from 'clsx'
import { Markup } from '@ui/components/base/Markup/Markup'
import { MeTriangleSVG } from '@ui/components/base/Svgs/MeTriangle'

export const meTriangleSteps: PracticeActivityFormStep[] = [
  {
    id: 'me-triangle',
    text: ``,
    type: 'custom',
    component: ({ formData }: { formData: Practice }) => (
      <div className="mx-auto flex h-full flex-col items-center text-purple-60">
        <h2 className={cn('mb-8 mt-8 text-center')}>
          Let&apos;s use the Me Triangle to reflect on our thoughts, feelings
          and behaviours.
        </h2>
        <div className="mb-4">
          <Markup text="[TRIGGER]" />
        </div>
        <p className="mb-4">{formData.trigger}</p>
        <div className="w-full px-8">
          <MeTriangleSVG />
        </div>
      </div>
    ),
  },
]
