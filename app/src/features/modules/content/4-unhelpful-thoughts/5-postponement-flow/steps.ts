import { FormWizardStep } from '@/features/common/components/FormWizard'

export const helpfulReminderPostponementFlow: FormWizardStep[] = [
  {
    id: 'intro',
    text: `
    You've completed Module 4: Unhelpful thoughts.

Don't postpone practicing a new and clever flow.

Let's give _postponement_ a go.
    `,
    type: 'dialog',
    next: {
      text: 'Okay',
    },
  },
  {
    id: 'unhelpful-thought',
    text: 'Has an unhelpful thought popped up that you want to postpone with me?',
    type: 'dialog',
    next: {
      text: 'Yes please',
    },
  },
  {
    id: 'first',
    text: `
    Okay — first, let's get the unhelpful thoughts out of your head.

Write them down somewhere in as few words as possible.

Once you've done this let me know you're ready.
    `,
    type: 'dialog',
    next: {
      text: "I'm ready",
    },
  },
  {
    id: 'postpone',
    text: `
Now postpone the thought until later!

Try saying a phrase to postpone it like 'See ya later!'
    `,
    type: 'dialog',
    next: {
      text: "Okay what's next",
    },
  },
  {
    id: 'refocus',
    text: `
Refocus on what you're doing.

If you're not doing much just notice your surroundings.
    `,
    type: 'dialog',
    next: {
      text: 'Got it!',
    },
  },
  {
    id: 'thought-comes-back',
    text: `
If the thought comes back that's okay — just repeat!
    `,
    type: 'dialog',
    next: {
      text: 'See all the steps',
      action: {
        type: 'strategy',
        id: 'postpone-flow-chart',
      },
    },
  },
  {
    id: 'remember',
    text: `
Remember — we don't do our best thinking in the moment, so let's leave it until later.
    `,
    type: 'dialog',
    next: {
      text: 'Thanks',
    },
  },
  {
    id: 'complete',
    text: `
    You can revisit the thought later during Thinking Time to see if it's really important to you, and plan what to do about it.
    `,
    type: 'dialog',
    secondary: {
      text: 'View thinking time strategy',
      action: {
        type: 'strategy',
        id: 'thinking-time',
      },
    },
  },
]
