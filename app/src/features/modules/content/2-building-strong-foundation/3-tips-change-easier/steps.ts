import { FormWizardStep } from '@/features/common/components/FormWizard'

export const tipMakeChangeEasier: FormWizardStep[] = [
  {
    id: 'helpful-habits',
    text: "It's easy to practice helpful habits when we've got lots of time and are feeling great—but what happens when life drops unexpected barriers in our way?",
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'make-change-easier',
      },
    },
  },
  {
    id: 'answer',
    text: 'Do you remember the four tips to make change easier?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['make-change-easier'],
    },
    next: {
      text: 'Sure do!',
      action: {
        type: 'activity',
        id: 'not-good-tip',
      },
    },
  },
  {
    id: 'complete',
    text: `
Round of applause—you're just too good!

You've collected the **Tips to make change easier** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'make-change-easier',
      },
    },
  },
]
