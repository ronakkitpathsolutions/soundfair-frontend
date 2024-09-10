import { FormWizardStep } from '@/features/common/components/FormWizard'

export const introMeTriangle: FormWizardStep[] = [
  {
    id: 'meet',
    text: 'Dr Lisa Saulsman is back to introduce our first module and explain the Me Triangle.',
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'introducing-me-triangle',
      },
    },
  },
  {
    id: 'answer',
    text: "Wait, wait, wait...so, what's a trigger!?",
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['me-triangle'],
    },
    next: {
      text: 'Let me answer that!',
      action: {
        type: 'activity',
        id: 'what-is-a-trigger',
      },
    },
  },
  {
    id: 'complete',
    text: `
You're a great listener, [NAME].

You've collected **An Introduction to the Me Triangle** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'me-triangle',
      },
    },
  },
]
