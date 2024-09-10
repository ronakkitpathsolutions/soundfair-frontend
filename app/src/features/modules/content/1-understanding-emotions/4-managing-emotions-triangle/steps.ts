import { FormWizardStep } from '@/features/common/components/FormWizard'

export const managingEmotionsTriangle: FormWizardStep[] = [
  {
    id: 'learn',
    text: "Here's the final lesson for module 1...",
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'managing-emotions',
      },
    },
  },
  {
    id: 'answer',
    text: "Neat! So we're going to learn to Allow-Postpone-Act. Which means...what exactly?",
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['managing-emotions-triangle'],
    },
    next: {
      text: "I've got you, Bluurb",
      action: {
        type: 'activity',
        id: 'allow-postpone-act',
      },
    },
  },
  {
    id: 'complete',
    text: `
Perfect, perfect, perfect!

You've collected the **Parts of the Managing Emotions Triangle** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'managing-emotions-triangle',
      },
    },
  },
]
