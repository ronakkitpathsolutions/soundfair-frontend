import { FormWizardStep } from '@/features/common/components/FormWizard'

export const feelingsMetaphor: FormWizardStep[] = [
  {
    id: 'intro',
    text: "It's time for you and me to learn about strategy three!",
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'feelings-metaphor',
      },
    },
  },
  {
    id: 'answer',
    text: "Let's get metaphorical! Ready... set...",
    type: 'dialog',
    next: {
      text: 'Go',
      action: {
        type: 'activity',
        id: 'feelings-metaphor-you-liked',
      },
    },
  },
  {
    id: 'interesting',
    text: `
    So interesting, [NAME].

My feelings metaphor is the character metaphor! My icky, uncomfortable feeling's character is grumpy-dumpy (it always makes me laugh, because they always throw tantrums and they really need a haircut!)
    `,
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['feelings-metaphor'],
    },
    next: {
      text: 'LOL',
    },
  },
  {
    id: 'complete',
    text: `You've collected the **Feelings metaphor** strategy`,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'feelings-metaphor',
      },
    },
    next: {
      text: 'Keep learning',
    },
  },
]
