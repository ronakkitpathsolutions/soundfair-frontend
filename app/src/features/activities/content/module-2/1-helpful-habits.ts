import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const helpfulHabits: ActivityFormStep[] = [
  {
    id: 'helpful-habits',
    label: 'Helpful habits we practice everyday can help us:',
    type: 'radio',
    options: [
      'Topple our Me Triangle',
      'Set a stable foundation for our mental health',
      'Be helpful of others',
      'Be happy all the time',
    ],
    correctOption: 'Set a stable foundation for our mental health',
  },
]
