import { FormWizardStep } from '@/features/common/components/FormWizard'

export const theRut: FormWizardStep[] = [
  {
    id: 'learn',
    text: 'Let’s see what the RUT and our feelings may lead us to do.',
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'the-rut',
      },
    },
  },
  {
    id: 'answer',
    text: 'Can you help me finish this sentence?',
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['repetitive-unhelpful-thinking'],
    },
    next: {
      text: "I'll give it a go",
      action: {
        type: 'activity',
        id: 'getting-stuck',
      },
    },
  },
  {
    id: 'complete',
    text: `
You're doing great!

You've collected the **Repetitive Unhelpful Thinking** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'repetitive-unhelpful-thinking',
      },
    },
  },
]
