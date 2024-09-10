import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const uncomfortableFeelingsGroup: ActivityFormStep[] = [
  {
    id: 'uncomfortable-feelings-group',
    label: 'Uncomfortable feelings can sometimes be grouped into:',
    type: 'radio',
    options: [
      'anxiety, anger and sadness',
      'anxiety, energetic and tired',
      'happy, grumpy and annoyed',
      'anger, shame and guilt',
    ],
    correctOption: 'anxiety, anger and sadness',
  },
]
