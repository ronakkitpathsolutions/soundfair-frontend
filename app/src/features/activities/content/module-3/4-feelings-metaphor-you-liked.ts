import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const feelingsMetaphorYouLiked: ActivityFormStep[] = [
  {
    id: 'feelings-metaphor-you-liked',
    label: 'Pick the feelings metaphor that you liked the most:',
    type: 'radio',
    options: [
      'feelings are like waves',
      'a passing storm',
      'cartoon characters',
      "I've got my own metaphor!",
    ],
  },
]
