import { FormWizardStep } from '@/features/common/components/FormWizard'

export const problemSolveSteps: FormWizardStep[] = [
  {
    id: 'next',
    text: 'Problem solving sounds great! But how do we do it?',
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'problem-solving-steps',
      },
    },
  },
  {
    id: 'guided-1',
    text: "Let's do some problem solving!",
    type: 'dialog',
  },
  {
    id: 'guided-2',
    text: 'First — pick a problem you think you can do something about.',
    type: 'dialog',
    next: {
      text: 'Got it',
    },
  },
  {
    id: 'guided-3',
    text: `
Now let's go through the steps. Write the answers down, say it aloud or just have a good think.

1. What's the problem?
2. What can you do about it? (TIP: think of all the options, good and bad — think outside the box!)

Let me know when you're ready for the next step.
    `,
    type: 'dialog',
    next: {
      text: "I'm ready",
    },
  },
  {
    id: 'guided-4',
    text: `
From your list pick your favourite option to try

TIP: no option is perfect, go for the most helpful option, or the one with the least downsides
    `,
    type: 'dialog',
    next: {
      text: 'Got it',
    },
  },
  {
    id: 'guided-5',
    text: `
Now let's make a plan!

1. How can you action this option?
2. What are all the steps you need to take?
3. When will you do it?

Once you have this it's time to have a go and take action!
    `,
    type: 'dialog',
    next: {
      text: 'Next',
    },
  },
  {
    id: 'guided-6',
    text: `
Finally, check in with yourself to see how it went.

- Did it work?
- Can you try again?
- Are there any other strategies you can try?
    `,
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['problem-solving-steps'],
    },
    next: {
      text: 'Thanks',
    },
  },
  {
    id: 'guided-7',
    text: `
Come back any time to practice Problem Solving.
    `,
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['problem-solving-steps'],
    },
  },
  {
    id: 'complete',
    text: `
How great is problem solving!

You've collected strategies for:
- Problem solving steps
- Guided problem solving
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
