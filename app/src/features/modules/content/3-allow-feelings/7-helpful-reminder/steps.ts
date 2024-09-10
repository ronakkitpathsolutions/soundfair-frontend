import { FormWizardStep } from '@/features/common/components/FormWizard'

export const helpfulReminderAllowFeelings: FormWizardStep[] = [
  {
    id: 'intro',
    text: "It's not always easy reflecting on things that make you uncomfortable. I hope you're feeling proud of how much you've learnt already.",
    type: 'dialog',
    next: {
      text: 'Thanks',
    },
  },
  {
    id: 'answer',
    text: 'You just completed Module 3: Allowing Feelings, and collected 3 new skills to help you allow and cope with uncomfortable feelings.',
    type: 'dialog',
    secondary: {
      text: 'View strategies',
      action: {
        type: 'toolkit',
        id: 'strategies',
      },
    },
    next: {
      text: 'Go',
    },
  },
]
