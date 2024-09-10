import { FormWizardStep } from '@/features/common/components/FormWizard'

export const unhelpfulCoping1: FormWizardStep[] = [
  {
    id: 'unpack',
    text: `Now let's listen out for the six unhelpful coping behaviours, and how to act opposite.`,
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'coping-part-1',
      },
    },
  },
  {
    id: 'answer',
    text: 'So avoidance is okay...when?',
    type: 'dialog',
    next: {
      text: 'Let me answer that',
      action: {
        type: 'activity',
        id: 'avoidance',
      },
    },
  },
  {
    id: 'complete',
    text: `Yikes! I think I'd short circuit if I had to swim with sharks...literally!`,
    type: 'dialog',
  },
]
