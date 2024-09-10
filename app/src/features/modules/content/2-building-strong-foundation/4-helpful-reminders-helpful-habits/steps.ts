import { FormWizardStep } from '@/features/common/components/FormWizard'

export const helpfulRemindersHelpfulHabits: FormWizardStep[] = [
  {
    id: 'summary',
    text: 'You can always check out your toolkit for a summary of what you learnt in Module 2: Building a Strong Foundation.',
    type: 'dialog',
    next: {
      action: {
        type: 'toolkit',
        id: 'strategies',
      },
    },
  },
  {
    id: 'learnt',
    text: 'As you move through the week try to start practicing new behaviours and also keep noticing the Me Triangle in situations around you.',
    type: 'dialog',
    next: {
      text: 'Okay',
    },
  },
  {
    id: 'write-list',
    text: "Let's start now by writing a list of helpful habits we can start practicing today.",
    type: 'dialog',
    next: {
      text: "I'm ready",
    },
  },
  {
    id: 'write-list-2',
    text: `
Take a moment to write a list in your notes app or in a diary of the helpful habits you can start practicing today, including:
  - Feel food activities
  - Lifestyle changes
  - Challenging actions

Let me know when you're ready to move on.
    `,
    type: 'dialog',
    next: {
      text: "I'm ready",
    },
  },
  {
    id: 'helpful-habit',
    text: `
Next to each helpful habit make a note of when you will do these helpful habits.

Once you're done let me know you're ready.
    `,
    type: 'dialog',
    next: {
      text: "I'm ready",
    },
  },
  {
    id: 'complete',
    text: `
Great stuff!

Keep this list somewhere you can see it everyday and try to stick to your deadlines.

💡Setting regular reminders in your phone can help you remember!
    `,
    type: 'dialog',
    next: {
      text: 'Okay thanks!',
    },
  },
]
