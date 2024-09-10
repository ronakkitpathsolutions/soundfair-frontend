import { FormWizardStep } from '@/features/common/components/FormWizard'

export const devSteps: FormWizardStep[] = [
  {
    id: 'video',
    text: `Testing for a video`,
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'thinking-time',
      },
    },
  },
  {
    id: 'activity',
    text: `Testing for an activity`,
    type: 'dialog',
    next: {
      action: {
        type: 'activity',
        id: 'when-best-thinking',
      },
    },
  },
  {
    id: 'text-input',
    text: `Testing for a test input`,
    type: 'text-input',
  },
  {
    id: 'trigger',
    text: `Testing for an icon like [TRIGGER] [BEHAVIOUR]`,
    type: 'dialog',
  },
]
