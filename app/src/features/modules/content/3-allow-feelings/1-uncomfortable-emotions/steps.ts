import { FormWizardStep } from '@/features/common/components/FormWizard'

export const uncomfortableEmotions: FormWizardStep[] = [
  {
    id: 'meet',
    text: "In this module we'll be focusing on the feelings part of the Me Triangle.",
    type: 'dialog',
    next: {
      text: 'Begin',
      action: {
        type: 'video',
        id: 'uncomfortable-emotions',
      },
    },
  },
  {
    id: 'answer',
    text: 'Can you help me remember the general categories for uncomfortable feelings?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['categories-of-uncomfortable-emotions'],
    },
    next: {
      text: "Let's go",
      action: {
        type: 'activity',
        id: 'uncomfortable-feelings-group',
      },
    },
  },
  {
    id: 'complete',
    text: `
I'm happy you're here to help me learn too!

You've collected the **Categories of uncomfortable emotions** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'categories-of-uncomfortable-emotions',
      },
    },
  },
]
