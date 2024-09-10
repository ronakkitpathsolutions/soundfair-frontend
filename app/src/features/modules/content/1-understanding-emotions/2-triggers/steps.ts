import { FormWizardStep } from '@/features/common/components/FormWizard'

export const triggers: FormWizardStep[] = [
  {
    id: 'unpack',
    text: 'It’s time to unpack what happens when we’re triggered.',
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'triggers',
      },
    },
  },
  {
    id: 'answer',
    text: "Oops! I tuned out for a second...what's a RUT again?",
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['triggers'],
    },
    next: {
      text: "I've got the answer",
      action: {
        type: 'activity',
        id: 'what-is-a-rut',
      },
    },
  },
  {
    id: 'complete',
    text: `
You're on a roll!

You've collected the **Triggers** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'triggers',
      },
    },
  },
]
