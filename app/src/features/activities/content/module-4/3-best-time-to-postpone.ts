import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const bestTimeToPostpone: ActivityFormStep[] = [
  {
    id: 'best-time-to-postpone',
    label: 'The best time to postpone is:',
    type: 'radio',
    options: [
      '60 mins just before bed',
      '10-15 mins later in the day, but not before bed',
      'Straight away, after you finish a task',
      '10-15 mins first thing in the morning',
    ],
    correctOption: '10-15 mins later in the day, but not before bed',
  },
]
