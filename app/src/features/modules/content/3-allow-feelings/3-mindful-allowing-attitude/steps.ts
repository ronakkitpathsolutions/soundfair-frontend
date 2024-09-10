import { FormWizardStep } from '@/features/common/components/FormWizard'

export const mindfulAllowingAttitude: FormWizardStep[] = [
  {
    id: 'intro',
    text: 'Now Sophia will share tips to help us allow our feelings.',
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'mindful-allowing-attitude',
      },
    },
  },
  {
    id: 'answer',
    text: 'Can you tell the difference between mindful allowing or fighting emotions?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['mindful-allowing-attitude'],
    },
    next: {
      text: 'I think so?',
      action: {
        type: 'activity',
        id: 'mindful-allowing',
      },
    },
  },
  {
    id: 'complete',
    text: `
One down, two more great strategies to go!

You've collected the **Mindful allowing attitude** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'mindful-allowing-attitude',
      },
    },
  },
]
