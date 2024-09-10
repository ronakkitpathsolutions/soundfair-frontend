import { ActivityFormStep } from '@/features/activities/ActivityForm'

export const mindfulAllowing: ActivityFormStep[] = [
  {
    id: 'mindful-allowing',
    label: "Select the most 'mindful allowing' phase:",
    type: 'radio',
    options: [
      "I notice I'm feeling really annoyed, and I'm even more annoyed I feel that way",
      "I'm feeling anxious and I really think I shouldn't be so stop feeling anxious now",
      "I feel upset. That's okay...it's okay for that feeling to be there right now.",
      "I'm feeling overwhelmed. I wish it would go away.",
    ],
    correctOption:
      "I feel upset. That's okay...it's okay for that feeling to be there right now.",
  },
]
