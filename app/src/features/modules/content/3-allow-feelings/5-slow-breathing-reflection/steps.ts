import { FormWizardStep } from '@/features/common/components/FormWizard'
import { guidedSlowBreathing } from '@/features/videos/content/12-guided-slow-breathing'

export const slowBreathingReflection: FormWizardStep[] = [
  {
    id: 'intro',
    text: `
I always love doing the breathing demo!

If you want to practice slow breathing any time you can find it in Strategies.
    `,
    type: 'dialog',
    next: {
      text: 'Thanks',
      action: {
        type: 'video',
        id: 'slow-breathing-reflection',
      },
    },
  },
  {
    id: 'complete',
    text: `
That made me feel great!

You've collected the strategies for:
- Slow breathing
- Guided slow breathing
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategies',
      action: {
        type: 'toolkit',
        id: 'strategies',
      },
    },
  },
]
