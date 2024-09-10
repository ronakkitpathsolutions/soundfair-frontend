import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const solvableProblems: ActivityFormStep[] = [
  {
    id: 'solvable-problems',
    label: 'Which of these is a solvable problems?',
    type: 'radio',
    options: [
      "I'm not getting along with my best friend",
      "What if my cousin doesn't do well in their exam?",
      'What if my friend has an accident?',
      'All of the above',
    ],
    correctOption: "I'm not getting along with my best friend",
  },
]
