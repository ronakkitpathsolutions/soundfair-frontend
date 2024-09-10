import { FormWizardStep } from '@/features/common/components/FormWizard'

export const tipsUnhelpfulCoping: FormWizardStep[] = [
  {
    id: 'intro',
    text: `Let's learn how to identify our unhelpful behaviours.`,
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'identify-unhelpful-coping',
      },
    },
  },
  {
    id: 'answer',
    text: `
I got a tricky question for you — reckon you can answer it?
    `,
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['identifying-unhelpful-coping-behaviours-and-actions'],
    },
    next: {
      text: "Let's try",
      action: {
        type: 'activity',
        id: 'tips-good-behaviours',
      },
    },
  },
  {
    id: 'complete',
    text: `
Tip top work, [NAME]!

You've collected the **Identifying unhelpful coping behaviours and actions** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'identifying-unhelpful-coping-behaviours-and-actions',
      },
    },
  },
]
