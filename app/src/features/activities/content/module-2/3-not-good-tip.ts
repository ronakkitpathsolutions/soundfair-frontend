import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const notGoodTip: ActivityFormStep[] = [
  {
    id: 'not-good-tip',
    label: 'Which of the below is not a good tip for making changes:',
    type: 'radio',
    options: [
      'Be specific',
      'Take small steps',
      'Beat yourself up for not doing what you planned',
      'Celebrate small changes',
    ],
    correctOption: 'Beat yourself up for not doing what you planned',
  },
]
