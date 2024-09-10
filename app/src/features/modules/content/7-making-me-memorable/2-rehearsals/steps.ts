import { FormWizardStep } from '@/features/common/components/FormWizard'

export const rehearsals: FormWizardStep[] = [
  {
    id: 'next',
    text: 'Ash has a few more tips to help us keep our skills super sharp.',
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'rehearsals',
      },
    },
  },
  {
    id: 'answer',
    text: 'I think I got it, but maybe you can check my answers one more time?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['verbal-rehearsal', 'imaginal-rehearsal'],
    },
    next: {
      text: 'Let me answer that',
      action: {
        type: 'activity',
        id: 'practicing',
      },
    },
  },
  {
    id: 'complete',
    text: `
Practice makes perfect!

You've collected the
- Verbal rehearsal
- Imaginal rehearsal
Strategies
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'toolkit',
        id: 'strategies',
      },
    },
  },
]
