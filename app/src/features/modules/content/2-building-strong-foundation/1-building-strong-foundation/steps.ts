import { FormWizardStep } from '@/features/common/components/FormWizard'

export const buildingStrongFoundation: FormWizardStep[] = [
  {
    id: 'meet',
    text: "This module builds on what we learnt about the Me Triangle. With the help of Sophia we'll learn how to create a strong foundation for our triangle by making changes to our habits and behaviours.",
    type: 'dialog',
    next: {
      text: 'Begin',
      action: {
        type: 'video',
        id: 'strong-foundation',
      },
    },
  },
  {
    id: 'answer',
    text: 'So...helpful habits can help us do...what?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['helpful-habits'],
    },
    next: {
      text: "I'm glad you asked",
      action: {
        type: 'activity',
        id: 'helpful-habits',
      },
    },
  },
  {
    id: 'complete',
    text: `
You're clever!

You've collected the **Helpful habits** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'helpful-habits',
      },
    },
  },
]
