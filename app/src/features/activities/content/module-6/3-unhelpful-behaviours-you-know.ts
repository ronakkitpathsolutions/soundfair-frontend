import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const unhelpfulBehavioursYouKnow: ActivityFormStep[] = [
  {
    id: 'unhelpful-behaviours-you-know',
    label: 'Which unhelpful behaviours feel familiar to you?',
    type: 'checkbox',
    options: [
      'Avoidance',
      'Safety behaviours',
      'Withdrawal',
      'Numbing',
      'Excessive distractions',
      'Aggression',
    ],
  },
]
