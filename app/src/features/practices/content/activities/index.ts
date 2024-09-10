import { meTriangleSteps } from '@/features/practices/content/activities/me-triangle'
import { actionPlanSteps } from '@/features/practices/content/activities/action-plan'

export const practiceActivities = {
  'action-plan': actionPlanSteps,
  'me-triangle': meTriangleSteps,
} as const
