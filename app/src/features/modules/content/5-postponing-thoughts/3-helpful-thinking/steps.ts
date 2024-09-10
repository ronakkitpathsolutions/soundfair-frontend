import { FormWizardStep } from '@/features/common/components/FormWizard'

export const helpfulThinking: FormWizardStep[] = [
  {
    id: 'intro',
    text: 'Now Tharen will help us understand helpful thinking.',
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'helpful-thinking',
      },
    },
  },
  {
    id: 'guided-1',
    text: 'Ready to do some helpful thinking?',
    type: 'dialog',
    next: {
      text: "Let's do it",
    },
  },
  {
    id: 'guided-2',
    text: `
    Let's step it out.

Write the answers down, say it aloud or just have a good think.

Ready?
    `,
    type: 'dialog',
    next: {
      text: 'Ready',
    },
  },
  {
    id: 'guided-3',
    text: `
1. What happened?
2. What are you thinking?
3. How are you feeling?

Let me know when you're done...

    `,
    type: 'dialog',
    next: {
      text: "I'm done",
    },
  },
  {
    id: 'guided-4',
    text: `
    Now let's consider

How can you think differently?

TIP: use the helpful thinking questions to prompt you if you get stuck.
    `,
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['helpful-thinking', 'helpful-thinking-list'],
    },
    next: {
      text: 'Got it',
      action: {
        type: 'strategy',
        id: 'helpful-thinking',
      },
    },
  },
  {
    id: 'guided-5',
    text: 'You can try helpful thinking again anytime — just revisit this module.',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['helpful-thinking-list'],
    },
  },
  {
    id: 'complete',
    text: `
It sure helps to think helpfully!

You've collected the
- Helpful thinking
- Helpful thinking list
- Guided helpful thinking diary 
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
