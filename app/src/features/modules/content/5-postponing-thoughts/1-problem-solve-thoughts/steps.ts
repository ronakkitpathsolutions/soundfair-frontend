import { FormWizardStep } from '@/features/common/components/FormWizard'

export const problemSolveThoughts: FormWizardStep[] = [
  {
    id: 'intro',
    text: 'Module 5 builds on what we learnt before with Tharen about Postponing our thoughts.',
    type: 'dialog',
    next: {
      text: 'Begin',
      action: {
        type: 'video',
        id: 'problem-solve-thoughts',
      },
    },
  },
  {
    id: 'answer',
    text: 'Can you help me figure out what a solvable problem could be?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['problem-solve-thoughts'],
    },
    next: {
      text: 'Sure',
      action: {
        type: 'activity',
        id: 'solvable-problems',
      },
    },
  },
  {
    id: 'complete',
    text: `
You sure are clever, [NAME]!

You've collected the **Problem solve your thoughts** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'problem-solve-thoughts',
      },
    },
  },
]
