import { FormWizardStep } from '@/features/common/components/FormWizard'

export const selfReflection: FormWizardStep[] = [
  {
    id: 'intro',
    text: "Hey [NAME], let's take a moment to reflect on our journey and the gains we've made!",
    type: 'dialog',
    next: {
      text: 'Okay',
    },
  },
  {
    id: 'intro-2',
    text: "Can I ask you 4 questions to help you reflect on what you've learnt?",
    type: 'dialog',
    next: {
      text: 'Sure',
    },
  },
  {
    id: 'intro-3',
    text: `
Great, [NAME].

Just a note — these questions are designed to help us reflect on our progress. We won't store your notes anywhere.
    `,
    type: 'dialog',
    next: {
      text: 'Sure',
    },
  },
  {
    id: 'intro-4',
    text: `
Awesome, [NAME].

Write the answers down, say it aloud or just have a good think.

Ready?
    `,
    type: 'dialog',
    next: {
      text: 'Ready',
    },
  },
  {
    id: 'guided-1',
    text: `
Q1. Since using bluurb.me what have you learnt?

Let me know when you're done...
    `,
    type: 'dialog',
    next: {
      text: "I'm done",
    },
  },
  {
    id: 'guided-2',
    text: `
Q2. Since using bluurb.me what have you gained or improved?

Let me know when you're done...
    `,
    type: 'dialog',
    next: {
      text: "I'm done",
    },
  },
  {
    id: 'guided-3',
    text: `
Q3. What have you enjoyed most?

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
Q4. What have you found hardest?

Let me know when you're done...
    `,
    type: 'dialog',
    next: {
      text: "I'm done",
    },
  },
  {
    id: 'thanks',
    text: `
Thanks for sharing your journey with me.
    `,
    type: 'dialog',
    next: {
      text: 'No worries',
    },
  },
  {
    id: 'complete',
    text: `
We've covered a lot together, and while some parts might feel a lot harder than others I hope reflecting has helped you to see how much good work you've done.
    `,
    type: 'dialog',
  },
]
