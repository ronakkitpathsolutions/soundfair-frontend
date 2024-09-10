import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const tipsGoodBehaviour: ActivityFormStep[] = [
  {
    id: 'tips-good-behaviour',
    label:
      'What are 3 tips to help you decide if coping behaviours are helpful or not?',
    type: 'checkbox',
    options: [
      'The behaviour matches the situation',
      'Someone who is emotionally balanced and resilient would do the same thing',
      'It feels good and empowering at the time',
      'It reflects the person I want to be',
    ],
  },
]
