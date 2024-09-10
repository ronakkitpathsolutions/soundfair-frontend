import { FormWizardStep } from '@/features/common/components/FormWizard'

export const postponeFlowchart: FormWizardStep[] = [
  {
    id: 'intro',
    text: "No more putting off learning about postponing! Let's watch...",
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'postpone-flow-chart',
      },
    },
  },
  {
    id: 'answer',
    text: 'So the best time to revisit the thoughts I have postponed is...when?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['postpone-flow-chart'],
    },
    next: {
      text: 'Let me answer that',
      action: {
        type: 'activity',
        id: 'best-time-to-postpone',
      },
    },
  },
  {
    id: 'complete',
    text: `
You've collected the **Postpone flow chart and steps** strategy.
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'postpone-flow-chart',
      },
    },
  },
]
