import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const gettingStuck: ActivityFormStep[] = [
  {
    id: 'getting-stuck',
    label:
      "Getting stuck in negative thoughts, pushing away feelings and turning to unhelpful behaviours can mean we're ________ our emotions rather than coping with or _____ our emotions.",
    type: 'radio',
    options: [
      'fighting, managing',
      'feeling, using',
      'maintaining, practicing',
      'freezing, maintaining',
    ],
    correctOption: 'fighting, managing',
  },
]
