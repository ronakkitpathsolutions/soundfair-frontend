import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const wontHelpPostpone: ActivityFormStep[] = [
  {
    id: 'allow-postpone-act',
    label: "Which of these won't help you practice allow-postpone-act?",
    type: 'radio',
    options: [
      'Keep a picture of the Me Triangle somewhere you can easily see it',
      'Write down allow-postpone-act',
      'Practice by doing an Action Plan for your usual triggers',
      'Never look at the Me Triangle and your strategies again',
    ],
    correctOption: 'Never look at the Me Triangle and your strategies again',
  },
]
