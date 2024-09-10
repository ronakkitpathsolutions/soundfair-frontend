import { FormWizardStep } from '@/features/common/components/FormWizard'

export const unhelpfulThoughts: FormWizardStep[] = [
  {
    id: 'me-triangle',
    text: "You've reached Module 4! In this module we'll focus on the thinking part of the Me Triangle.",
    type: 'dialog',
    next: {
      text: 'Begin',
      action: {
        type: 'video',
        id: 'unhelpful-thoughts',
      },
    },
  },
  {
    id: 'answer',
    text: "I'm curious — what does the RUT feel like for you?",
    type: 'dialog',
    next: {
      text: 'Let me tell you',
      action: {
        type: 'activity',
        id: 'rut-feel-like',
      },
    },
  },
  {
    id: 'honoured',
    text: `
    I feel honoured you shared that with me, [NAME].

For me, a RUT feels like overanalysing (more than I usually do as a robot!)
    `,
    type: 'dialog',
    unlock: {
      type: 'strategy',
      ids: ['unhelpful-thoughts-and-the-rut'],
    },
  },
  {
    id: 'complete',
    text: `
You've collected the **Unhelpful thoughts and the RUT** strategy
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'unhelpful-thoughts-and-the-rut',
      },
    },
  },
]
