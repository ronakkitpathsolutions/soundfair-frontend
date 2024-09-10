import { FormWizardStep } from '@/features/common/components/FormWizard'

export const helpfulRemindersPostponingThoughts: FormWizardStep[] = [
  {
    id: 'intro',
    text: `Just remember — practice makes perfect.

    Visit Strategies any time to practice postponing, problem solving and helpful thinking.`,
    type: 'dialog',
    next: {
      text: 'Thanks',
    },
  },
  {
    id: 'complete',
    text: `
    You've flexed new muscles and completed Module 5: Postponing thoughts - problem solving and helpful thinking

    Take a look of what you've learnt.
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
