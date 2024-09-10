import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const whatIsATrigger: ActivityFormStep[] = [
  {
    id: 'what-is-a-trigger',
    label: 'A trigger can be:',
    type: 'radio',
    options: [
      'An obvious external situation',
      'Subtle internal experiences',
      'Just about anything',
      'All of the above',
    ],
    correctOption: 'All of the above',
  },
]
