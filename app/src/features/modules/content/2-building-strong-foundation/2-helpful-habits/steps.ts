import { FormWizardStep } from '@/features/common/components/FormWizard'

export const helpfulHabits: FormWizardStep[] = [
  {
    id: 'unpack',
    text: "I can't wait to chat about helpful habits!",
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'helpful-habits',
      },
    },
  },
  {
    id: 'answer',
    text: "What's an example of a lifestyle change?",
    type: 'dialog',
    next: {
      text: 'Let me answer that',
      action: {
        type: 'activity',
        id: 'lifestyle-changes',
      },
    },
  },
  {
    id: 'complete',
    text: `Round of applause—you're just too good!

    You've collected the **Helpful Habits** strategy.
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
