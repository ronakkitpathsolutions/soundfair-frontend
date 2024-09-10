import { FormWizardStep } from '@/features/common/components/FormWizard'

export const slowBreathing: FormWizardStep[] = [
  {
    id: 'intro',
    text: 'Strategy two is all about slowwwww breathing....',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['guided-slow-breathing'],
    },
    next: {
      action: {
        type: 'video',
        id: 'slow-breathing',
      },
    },
  },
  {
    id: 'answer',
    text: 'Ready to give slow breathing a go?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['guided-slow-breathing'],
    },
    next: {
      text: "Let's do it",
      action: {
        type: 'video',
        id: 'guided-slow-breathing',
      },
    },
  },
  {
    id: 'complete',
    text: `
    Thanks for slow breathing with me.

Do you want to try that again?
    `,
    type: 'dialog',
    secondary: {
      text: 'Do it again',
      action: {
        type: 'video',
        id: 'guided-slow-breathing',
      },
    },
    next: {
      text: 'Keep learning',
    },
  },
]
