import { FormWizardStep } from '@/features/common/components/FormWizard'

export const copingIntro: FormWizardStep[] = [
  {
    id: 'intro',
    text: 'Module 6 is the final piece of the Me Triangle.',
    type: 'dialog',
    next: {
      text: 'Hooray',
    },
  },
  {
    id: 'begin',
    text: 'This module will help us identify unhelpful behaviours and learn how to act opposite so our actions help us rather than make things worse.',
    type: 'dialog',
    next: {
      text: 'Begin',
      action: {
        type: 'video',
        id: 'coping-intro',
      },
    },
  },
  {
    id: 'answer',
    text: "I'm getting confused! Can you help me answer this question?",
    type: 'dialog',
    next: {
      text: 'Sure bluurb',
      action: {
        type: 'activity',
        id: 'acting-opposite',
      },
    },
  },
  {
    id: 'complete',
    text: `10/10 for great listening!`,
    type: 'dialog',
  },
]
