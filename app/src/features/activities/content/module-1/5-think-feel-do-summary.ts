import { ActivityFormStep } from '@/features/activities/ActivityForm'
import { Options } from '@ui/components/base/Form/RadioGroup'

export const thinkFeelDoSummary: ActivityFormStep[] = [
  {
    id: 'scenario',
    label: 'Choose a scenario:',
    type: 'radio',
    options: [
      'Friends went out without me',
      'Asked someone out and got rejected',
      'Feeling flat and unmotivated',
      'Struggling to stay on top of work',
    ],
  },
  {
    id: 'unhelpful-thought',
    label: 'What unhelpful, repetitive thought might you be thinking?',
    type: 'checkbox',
    options: (formData): Options => {
      switch (formData['scenario']) {
        case 'Friends went out without me': {
          return [
            'No one likes me',
            "They think I'm annoying",
            'They purposely excluded me',
            'No one has time for me',
          ]
        }
        case 'Asked someone out and got rejected': {
          return [
            "They're probably laughing at me to their friends",
            "I'm not good enough",
            'No one will ever like me',
            'If only I was cooler',
          ]
        }
        case 'Feeling flat and unmotivated': {
          return [
            "I'm lazy",
            'Something is wrong with me',
            'I should be able to do this',
            "I'm a waste of space",
          ]
        }
        case 'Struggling to stay on top of work': {
          return [
            "I'll never be good enough",
            "I'm really dumb",
            "Everyone thinks I'm a waste of space",
            "I can't do it so I won't even try",
          ]
        }
      }
      return []
    },
  },
  {
    id: 'uncomfortable-emotion',
    label: 'What uncomfortable emotion might you feel?',
    type: 'radio',
    options: (formData): Options => {
      switch (formData['scenario']) {
        case 'Friends went out without me': {
          return ['Anger', 'Sad', 'Worried', 'Shame']
        }
        case 'Asked someone out and got rejected': {
          return ['Embarrassed', 'Really down', 'Hurt', 'Humiliated']
        }
        case 'Feeling flat and unmotivated': {
          return ['Numb', 'Overwhelmed', 'Ashamed', 'Frustrated']
        }
        case 'Struggling to stay on top of work': {
          return ['Panic', 'Anxious', 'Despair', 'Mad']
        }
      }
      return []
    },
  },
  {
    id: 'unhelpful-behavior',
    label: 'What unhelpful behaviour might you do as a result?',
    type: 'radio',
    options: (formData): Options => {
      switch (formData['scenario']) {
        case 'Friends went out without me': {
          return [
            'Take it out on my friends',
            'Say mean things about them to others',
            'Exclude them',
            'Avoid them if they call',
          ]
        }
        case 'Asked someone out and got rejected': {
          return [
            'Say nasty things to the person',
            "Stay in bed and don't leave the house",
            'Put myself down',
            'Stop seeing friends and family',
          ]
        }
        case 'Feeling flat and unmotivated': {
          return [
            'Beat myself up',
            'Push myself even harder',
            "Tell myself I'm worthless and punish myself",
            'Stop taking care of myself',
          ]
        }
        case 'Struggling to stay on top of work': {
          return [
            'Isolate myself from others',
            'Avoid or procrastinate',
            'Take it out on people around me',
            'Spend too much time on social media',
          ]
        }
      }
      return []
    },
  },
]
