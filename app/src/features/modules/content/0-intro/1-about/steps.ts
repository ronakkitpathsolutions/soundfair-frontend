import { FormWizardStep } from '@/features/common/components/FormWizard'

export const aboutSteps: FormWizardStep[] = [
  {
    id: 'about',
    text: `Did you know bluurb.me has been created by Dr Lisa Saulsman and clinical psychologists from the University of Western Australia's School of Psychological Science?`,
    type: 'dialog',
    next: {
      text: "That's cool",
    },
  },
  {
    id: 'cost',
    text: `
    It's adapted from the 'Managing My Emotions' program (Me Program).

    It's funded by Healthway WA and usually costs thousands of dollars going to therapy to learn the skills you'll learn here for free.
    `,
    type: 'dialog',
    next: {
      text: 'I like free stuff!',
    },
  },
  {
    id: 'for-anyone',
    text: 'bluurb.me is designed for anyone (and everything) who think their mental health is important and want to take care of it or even improve it.',
    type: 'dialog',
    next: {
      text: 'Sounds great!',
    },
  },
  {
    id: 'for-anyone',
    text: `
    When it comes to improving and managing my mental health I'm no expert. But Dr Lisa Saulsman is!

Watch how she explains something called CBT and how it can help us all.
    `,
    type: 'dialog',
    next: {
      action: {
        type: 'video',
        id: 'about-the-program',
      },
    },
  },
  {
    id: 'complete',
    text: `
    Thanks for the intro, Dr Lisa Saulsman!

Ready to start your first activity, [NAME]?
    `,
    type: 'dialog',
    next: {
      text: "Let's go!",
    },
  },
]
