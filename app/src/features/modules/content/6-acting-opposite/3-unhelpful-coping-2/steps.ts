import { FormWizardStep } from '@/features/common/components/FormWizard'

export const unhelpfulCoping2: FormWizardStep[] = [
  {
    id: 'intro',
    text: '3 unhelpful behaviours down, 3 to go.',
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'coping-part-2',
      },
    },
  },
  {
    id: 'answer',
    text: `
    Wow! Heaps of those behaviours feel familiar to me! Especially avoidance and excessive distractions...

What about you, [NAME]?
    `,
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['unhelpful-coping-behaviours-consequences-and-acting'],
    },
    next: {
      text: 'Let me look',
      action: {
        type: 'activity',
        id: 'unhelpful-behaviours-you-know',
      },
    },
  },
  {
    id: 'complete',
    text: `
It's so interesting to reflect on all the possible unhelpful behaviours - sometimes we don't know we're doing them.

You've collected the **Unhelpful coping behaviours, consequences and acting opposite** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategies',
      action: {
        type: 'toolkit',
        id: 'strategies',
      },
    },
  },
]
