import { FormWizardStep } from '@/features/common/components/FormWizard'

export const actionPlans: FormWizardStep[] = [
  {
    id: 'intro',
    text: `What a huge milestone, [NAME]! But what happens now?`,
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['action-plan'],
    },
    next: {
      action: {
        type: 'video',
        id: 'action-plans',
      },
    },
  },
  {
    id: 'complete',
    text: `
You've collected the **Action Plan** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'action-plan',
      },
    },
  },
]
