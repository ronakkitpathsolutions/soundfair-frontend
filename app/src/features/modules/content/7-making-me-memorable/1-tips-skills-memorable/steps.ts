import { FormWizardStep } from '@/features/common/components/FormWizard'

export const tipsSkillsMemorable: FormWizardStep[] = [
  {
    id: 'meet',
    text: "In our final module we'll plan how to make our skills memorable and easy to access and do everyday.",
    type: 'dialog',
    next: {
      text: 'Begin',
      action: {
        type: 'video',
        id: 'skills-memorable',
      },
    },
  },
  {
    id: 'answer',
    text: 'I made a list, but I think I got something wrong — help me out?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['tips-make-new-skills-memorable'],
    },
    next: {
      text: 'Sure bluurb',
      action: {
        type: 'activity',
        id: 'wont-help-postpone',
      },
    },
  },
  {
    id: 'complete',
    text: `
You've collected the **Tips to make new skills memorable** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'tips-make-new-skills-memorable',
      },
    },
  },
]
