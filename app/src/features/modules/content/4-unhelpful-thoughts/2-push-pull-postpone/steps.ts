import { FormWizardStep } from '@/features/common/components/FormWizard'

export const pushPullPostpone: FormWizardStep[] = [
  {
    id: 'next',
    text: 'Next, Tharen will tell us why RUTs happen!',
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'push-pull-postpone',
      },
    },
  },
  {
    id: 'answer',
    text: 'Can you help me out with some definitions?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['push-pull-postponement'],
    },
    next: {
      text: 'Sure can',
      action: {
        type: 'activity',
        id: 'postpone-negative-thoughts',
      },
    },
  },
  {
    id: 'complete',
    text: `
You've collected the **Push-pull and postponement** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'push-pull-postponement',
      },
    },
  },
]
