import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const rutFeelLike: ActivityFormStep[] = [
  {
    id: 'rut-feel-like',
    label:
      'What does Repetitive Unhelpful Thinking (RUT) feel most like to you?',
    type: 'checkbox',
    options: [
      'Overthinking',
      'Ruminating',
      'Obsessing',
      'Over-analysing',
      'Brooding',
      'Dwelling',
      'Worrying',
    ],
  },
]
