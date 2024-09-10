import { FormWizardStep } from '@/features/common/components/FormWizard'

export const thinkFeelDoSummary: FormWizardStep[] = [
  {
    id: 'summary',
    text: `Here's a summary of what we learnt in Module 1: Understanding Emotions.`,
    type: 'dialog',
    secondary: {
      text: 'Show strategies',
      action: {
        type: 'toolkit',
        id: 'strategies',
      },
    },
  },
  {
    id: 'activity',
    text: `Let's use what we just learnt and apply it to something that might happen to you during the week.`,
    type: 'dialog',
    next: {
      text: 'Begin',
      action: {
        type: 'activity',
        id: 'think-feel-do-summary',
      },
    },
  },
  {
    id: 'normal',
    text: "It's understandable to feel and react that way in that scenario.",
    type: 'dialog',
  },
  {
    id: 'managing-emotions',
    text: 'Managing our emotions starts with noticing our initial reactions and feelings, and purposely finding helpful and healthy ways to cope with what triggers us.',
    type: 'dialog',
  },
  {
    id: 'learn',
    text: "That's what we'll learn together. I'm so excited to learn these new skills with you!",
    type: 'dialog',
  },
  {
    id: 'complete',
    text: `Congratulations! You've completed Module 1—Understanding Emotions and the Me Triangle.`,
    type: 'dialog',
  },
]
