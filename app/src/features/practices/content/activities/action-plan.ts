import { PracticeActivityFormStep } from '@/features/practices/types'

export const actionPlanSteps: PracticeActivityFormStep[] = [
  {
    id: 'thoughtCope',
    text: 'How will you cope with or reframe the [THOUGHT]?',
    showResponse: 'thought',
    type: 'radio',
    options: ['Problem solving diary', 'Helpful thinking list'],
  },
  {
    id: 'feelingCope',
    text: 'What strategy will you use to allow the [FEELING]?',
    showResponse: 'feeling',
    type: 'radio',
    options: [
      'Mindful allowing attitude',
      'Feelings metaphor',
      'Slow breathing',
    ],
  },
  {
    id: 'unhelpfulBehaviour',
    text: 'What type of unhelpful [BEHAVIOUR] is',
    showResponse: 'behaviour',
    type: 'checkbox',
    options: [
      'Avoidance',
      'Safety behaviours',
      'Withdrawal',
      'Numbing',
      'Excessive distractions',
      'Aggression',
      'Go me! I am actually behaving in helpful ways already!',
    ],
  },
]
