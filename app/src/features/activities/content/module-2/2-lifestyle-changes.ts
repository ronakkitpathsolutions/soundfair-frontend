import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const lifestyleChanges: ActivityFormStep[] = [
  {
    id: 'lifestyle-changes',
    label: 'Lifestyle changes are changes you make to your:',
    type: 'radio',
    options: [
      'Routine, like work-life balance, what you eat and drink or physical activity',
      'Physical space, like where your desk faces or the colour of your walls',
      'Personal appearance, like cutting your hair',
      'All of the above',
    ],
    correctOption:
      'Routine, like work-life balance, what you eat and drink or physical activity',
  },
]
