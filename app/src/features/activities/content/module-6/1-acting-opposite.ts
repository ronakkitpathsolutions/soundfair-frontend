import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const actingOpposite: ActivityFormStep[] = [
  {
    id: 'acting-opposite',
    label: 'When we act opposite we:',
    type: 'radio',
    options: [
      'Act out what our feelings urge us to do',
      'Deny the feelings we have',
      'Behave in helpful ways opposite to what our feelings urge us to do',
      'All of the above',
    ],
    correctOption:
      'Behave in helpful ways opposite to what our feelings urge us to do',
  },
]
