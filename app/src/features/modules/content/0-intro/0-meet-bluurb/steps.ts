import { FormWizardStep } from '@/features/common/components/FormWizard'
import { checkinSteps } from '@/features/check-in/content/steps'

// Remove first item from array
const [, ...rest] = checkinSteps

export const meetBluurbSteps: FormWizardStep[] = [
  {
    id: 'guide',
    text: `Before we start, let's get to know each other!

Can I ask you a few questions?
    `,
    type: 'dialog',
    next: {
      text: 'Sure',
    },
  },
  {
    id: 'name',
    text: `
    Thanks :)

You know my name, but I don't know yours.

So tell me, what's your name
    `,
    type: 'text-input',
  },
  {
    id: 'age',
    text: `
It's great to meet you, [NAME]!

How old are you?
    `,
    type: 'text-input',
  },
  {
    id: 'pronouns',
    text: 'And what are your pronouns [NAME]?',
    type: 'radio',
    options: ['She/her', 'He/him', 'They/them', 'Something else'],
  },
  {
    id: 'bluurbs-pronouns',
    text: `
Thanks for sharing, [NAME].

My pronouns are they/them, and I don't have a human age as I'm just a bunch of pixels :)`,
    type: 'dialog',
  },
  {
    id: 'actions-feeling-down',
    text: `
So, [NAME] what helps you feel better when you're feeling down?`,
    type: 'text-input',
  },
  {
    id: 'what-i-do',
    text: `
    That's neat!

When I feel down I usually call a friend, play video games or go for a long float around the internet.
    `,
    type: 'dialog',
  },
  {
    id: 'i-feel-nervous',
    text: `
To be honest, I'm feeling a little anxious today. I often do check-ins to help me reflect on how I'm feeling.`,
    type: 'dialog',
  },
  {
    id: 'i-feel-nervous',
    text: `
Hang on...that's a brilliant idea! Let's do a quick check in together.`,
    type: 'dialog',
    next: {
      text: "Let's do it",
    },
  },
  ...rest,
]
