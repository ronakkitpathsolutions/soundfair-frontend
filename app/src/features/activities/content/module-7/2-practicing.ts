import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const practicing: ActivityFormStep[] = [
  {
    id: 'practicing',
    label: `
    Complete the sentence with the options below:

"Rather than waiting for our trigger to arrive, we can practice using ________ rehearsal and ________ rehearsal":
    `,
    type: 'radio',
    options: [
      'Verbal, practice',
      'Dance, theatre',
      'Verbal, imaginal',
      'Spoken, made up',
    ],
    correctOption: 'Verbal, imaginal',
  },
]
