import { FormWizardStep } from '@/features/common/components/FormWizard'
import { routes } from '@/lib/constants/routes'

export const helpfulRemindersPractice: FormWizardStep[] = [
  {
    id: 'intro',
    text: "You did it! You've completed Module 6: Acting Opposite and now have all the tools to manage your emotions, no matter what life throws your way.",
    type: 'dialog',
    unlock: {
      type: 'practice',
    },
  },
  {
    id: 'unlocked',
    text: "Congratulations, [NAME]! You've unlocked Practice!",
    type: 'dialog',
    next: {
      text: 'Tell me more',
    },
  },
  {
    id: 'interactive-action-plan',
    text: 'Practice is your interactive Action Plan journal. Use it any time you experience a trigger or difficult feelings.',
    type: 'dialog',
    next: {
      text: 'Cool',
    },
  },
  {
    id: 'go-practice',
    text: `
Let's Practice!
    `,
    type: 'dialog',
    next: {
      text: 'Begin',
      action: {
        type: 'link',
        href: routes.practice.new,
      },
    },
  },
  {
    id: 'finished-practice',
    text: `
Well done! You just completed your first Practice!

You've collected the **Action Plan** strategy
    `,
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['action-plan'],
    },
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'action-plan',
      },
    },
  },
  {
    id: 'complete',
    text: 'You can come back to Practice and complete a interactive journal any time',
    type: 'dialog',
    next: {
      text: 'Cool',
    },
  },
]
