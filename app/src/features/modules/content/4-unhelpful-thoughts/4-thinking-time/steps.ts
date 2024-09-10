import { FormWizardStep } from '@/features/common/components/FormWizard'

export const thinkingTime: FormWizardStep[] = [
  {
    id: 'intro',
    text: 'So, what are we supposed to do in thinking time anyway?',
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'thinking-time',
      },
    },
  },
  {
    id: 'answer',
    text: 'So, wait...we do our best thinking...when?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['thinking-time'],
    },
    next: {
      text: "I'm glad you asked",
      action: {
        type: 'activity',
        id: 'when-best-thinking',
      },
    },
  },
  {
    id: 'complete',
    text: `
I think you're brilliant!

You've collected the **Thinking time** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'thinking-time',
      },
    },
  },
]
