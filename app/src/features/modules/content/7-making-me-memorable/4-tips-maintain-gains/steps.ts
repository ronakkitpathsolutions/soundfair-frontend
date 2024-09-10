import { FormWizardStep } from '@/features/common/components/FormWizard'

export const tipsMaintainingGains: FormWizardStep[] = [
  {
    id: 'intro',
    text: 'Ash has a few final tips for us before we finish our final module.\n',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['maintaining-my-gains-plan'],
    },
    next: {
      action: {
        type: 'video',
        id: 'maintain-gains',
      },
    },
  },
  {
    id: 'complete',
    text: `
Thanks Ash!

You've collected the **Maintaining my gains plan** strategy.
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'maintaining-my-gains-plan',
      },
    },
  },
]
