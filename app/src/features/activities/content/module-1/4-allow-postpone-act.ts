import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const allowPostponeAct: ActivityFormStep[] = [
  {
    id: 'allow-postpone-act',
    label: "Allow-Postpone-Act means we'll learn to cope better by:",
    type: 'radio',
    options: [
      'Allow unhelpful thoughts, Postpone healthy feelings, Act like a brat',
      'Allow myself to feel bad, Postpone doing anything about it, Act aggressively',
      'Allow my feelings, Postpone unhelpful thinking, Act opposite in healthier ways',
      'All of the above',
    ],
    correctOption:
      'Allow my feelings, Postpone unhelpful thinking, Act opposite in healthier ways',
  },
]
