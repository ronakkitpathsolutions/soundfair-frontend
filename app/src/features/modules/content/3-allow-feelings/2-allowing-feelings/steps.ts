import { FormWizardStep } from '@/features/common/components/FormWizard'

export const allowingFeelings: FormWizardStep[] = [
  {
    id: 'next',
    text: 'Next, Sophia will help us start thinking differently about our feelings.',
    type: 'dialog',
    next: {
      text: 'Begin',
      action: {
        type: 'video',
        id: 'allowing-feelings',
      },
    },
  },
  {
    id: 'answer',
    text: 'True or false...uncomfortable feelings are abnormal?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['allowing-our-feelings'],
    },
    next: {
      text: 'Let me answer that',
      action: {
        type: 'activity',
        id: 'uncomfortable-feelings-abnormal',
      },
    },
  },
  {
    id: 'complete',
    text: `
Awesome, [NAME]!

You've collected the **Allowing our feelings** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'allowing-our-feelings',
      },
    },
  },
]
