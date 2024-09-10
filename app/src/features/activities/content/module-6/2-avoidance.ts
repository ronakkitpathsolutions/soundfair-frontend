import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const avoidance: ActivityFormStep[] = [
  {
    id: 'avoidance',
    label: 'Avoidance is okay in situations like:',
    type: 'radio',
    options: [
      'Sitting an exam',
      'Diving into shark infested waters',
      'Going to a friends party',
      'Giving a presentation',
    ],
    correctOption: 'Diving into shark infested waters',
  },
]
