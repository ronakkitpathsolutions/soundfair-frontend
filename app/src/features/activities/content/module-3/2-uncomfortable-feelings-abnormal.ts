import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const uncomfortableFeelingsAbnormal: ActivityFormStep[] = [
  {
    id: 'uncomfortable-feelings-abnormal',
    label: `
True or false...

It's really abnormal to have uncomfortable feelings, like fear, anxiety or sadness?    
    `,
    type: 'radio',
    options: ['True', 'False'],
    correctOption: 'False',
  },
]
