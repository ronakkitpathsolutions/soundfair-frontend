import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const whatIsARut: ActivityFormStep[] = [
  {
    id: 'what-is-a-rut',
    label: 'A RUT is:',
    type: 'radio',
    options: [
      'Repeat Under Thinking',
      'Repetitive Unhelpful Thinking',
      'Routine Unhelpful Triggers',
      'Raising Up Thoughts',
    ],
    correctOption: 'Repetitive Unhelpful Thinking',
  },
]
