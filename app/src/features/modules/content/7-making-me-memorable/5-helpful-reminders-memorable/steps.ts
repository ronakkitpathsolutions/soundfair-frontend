import { FormWizardStep } from '@/features/common/components/FormWizard'

export const helpfulRemindersMemorable: FormWizardStep[] = [
  {
    id: 'intro',
    text: `
Incredible work, [NAME]! You've completed Module 7: Making Me Memorable.

Your toolkit is now full.
    `,
    type: 'dialog',
    next: {
      action: {
        type: 'toolkit',
        id: 'strategies',
      },
    },
  },
  {
    id: 'fully-equipped',
    text: `
You're now fully equipped to take action and manage your emotions.
    `,
    type: 'dialog',
  },
  {
    id: 'complete',
    text: `
Your lessons may be complete, but that doesn't mean we both can't hang around.

Keep practicing, and remember you can revisit the strategies or lessons, or check in with me any time.
    `,
    type: 'dialog',
  },
]
