import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const whenBestThinking: ActivityFormStep[] = [
  {
    id: 'when-best-thinking',
    label: 'We do our best thinking:',
    type: 'radio',
    options: [
      'Later when emotions are less intense',
      'In the heat of the moment',
      'All the time',
      'None of the above',
    ],
    correctOption: 'Later when emotions are less intense',
  },
]
