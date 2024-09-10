import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const postponeNegativeThoughts: ActivityFormStep[] = [
  {
    id: 'postpone-negative-thoughts',
    label: `Postponing our negative thoughts means:`,
    type: 'radio',
    options: [
      'Stop thinking any thoughts all together',
      'Pulling them closer and giving them lots of attention',
      'Put negative thoughts aside for later',
      'Pushing the thoughts away to suppress them',
    ],
    correctOption: 'Put negative thoughts aside for later',
  },
]
