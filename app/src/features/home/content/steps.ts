import { FormWizardStep } from '@/features/common/components/FormWizard'

export const homeSteps: FormWizardStep[] = [
  {
    id: 'intro',
    text: `Welcome to bluurb.me — an app designed to teach everyone (and anything) how to manage their emotions, make tough times less tough and generally boost mental health and wellbeing.`,
    type: 'dialog',
    next: {
      text: `I'd like that`,
    },
  },
  {
    id: 'did-you-know',
    text: `I'm glad you're here to learn with me!

    Across 7 modules we'll learn expert skills for free along with a team of psychologists from the University of Western Australia (UWA).`,
    type: 'dialog',
    next: {
      text: `Sounds good`,
    },
  },
  {
    id: 'about-the-app',
    text: `We'll watch videos, do activities and answer questions. As we learn, I promise not to store or share anything you share with me.

    If you want more info about what we do with your data check out the Privacy Policy.`,
    type: 'dialog',
    secondary: {
      text: 'View privacy policy',
      action: {
        type: 'link',
        href: '/privacy-policy/',
      },
    },
    next: {
      text: `Let's start learning`,
    },
  },
  {
    id: 'about-the-app',
    text: `By the way, I'm bluurb—your digital assistant and personal guide as you learn new skills to be strong and mentally-fit.
    
    Together we'll learn about you, your mental health and how to make it better every day, no matter what life throws your way.`,
    type: 'dialog',
    next: {
      text: 'Let’s go!',
    },
  },
]
