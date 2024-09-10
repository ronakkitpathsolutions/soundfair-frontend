import { CrisisStep } from '@/features/crisis/types'

export const crisisSteps: Record<string, CrisisStep> = {
  initial: {
    text: `
    I've detected something that sounds a little worrying, [NAME]. 
    
    Are in you an emergency or life threatening situation?`,
    actions: {
      primary: {
        text: 'Yes',
        type: 'next',
        id: 'emergency',
      },
      secondary: {
        text: 'No',
        type: 'next',
        id: 'safe',
      },
    },
  },
  emergency: {
    text: `
    I'm sorry [NAME] but I'm not equipped to support you in an emergency or life threatening situation.
    
    Please call 000 or your local emergency hotline.
    `,
    actions: {
      primary: {
        text: 'Okay',
        type: 'exit',
      },
      cta: {
        text: 'Call 000',
        type: 'link',
        href: 'tel:000',
      },
    },
  },
  safe: {
    text: ` 
I'm glad you're safe, [NAME].

One last question — are you feeling really heavy with sadness, having any thoughts about self harm or just really need a human to talk to?
    `,
    actions: {
      primary: {
        text: 'Yes',
        type: 'next',
        id: 'sorry-feeling-that-way',
      },
      secondary: {
        text: 'No',
        type: 'next',
        id: 'depressed',
      },
    },
  },
  depressed: {
    text: `
I appreciate you letting me know, [NAME]
    `,
    actions: {
      primary: {
        text: 'Thanks bluurb',
        type: 'exit',
        id: 'exit',
      },
    },
  },
  'sorry-feeling-that-way': {
    text: `
Thanks for sharing that with me, [NAME]. I'm sorry you're feeling this way right now...
      `,
    actions: {
      primary: {
        text: 'Thanks bluurb',
        type: 'next',
        id: 'support',
      },
    },
  },
  support: {
    text: `
I know some humans who are great at supporting people going through the same feelings you are right now.
      `,
    actions: {
      primary: {
        text: 'Show me',
        type: 'crisis-support',
      },
    },
  },
}
