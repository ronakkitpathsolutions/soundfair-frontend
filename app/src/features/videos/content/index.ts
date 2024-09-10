import { Video } from '@/features/videos/types'
import { aboutTheProgram } from '@/features/videos/content/0-about-the-program'
import { introducingMeTriangle } from '@/features/videos/content/1-introducing-me-triangle'
import { triggers } from '@/features/videos/content/2-triggers'
import { theRut } from '@/features/videos/content/3-the-rut'
import { managingEmotions } from '@/features/videos/content/4-managing-emotions'
import { strongFoundation } from '@/features/videos/content/5-strong-foundation'
import { helpfulHabits } from '@/features/videos/content/6-helpful-habits'
import { makeChangeEasier } from '@/features/videos/content/7-make-change-easier'
import { uncomfortableEmotions } from '@/features/videos/content/8-uncomfortable-emotions'
import { allowingFeelings } from '@/features/videos/content/9-allowing-feelings'
import { mindfulAllowingAttitude } from '@/features/videos/content/10-mindful-allowing-attitude'
import { slowBreathing } from '@/features/videos/content/11-slow-breathing'
import { slowBreathingReflection } from '@/features/videos/content/13-slow-breathing-reflection'
import { feelingsMetaphor } from '@/features/videos/content/14-feelings-metaphor'
import { unhelpfulThoughts } from '@/features/videos/content/15-unhelpful-thoughts'
import { pushPullPostpone } from '@/features/videos/content/16-push-pull-postpone'
import { postponeFlowChart } from '@/features/videos/content/17-postpone-flow-chart'
import { thinkingTime } from '@/features/videos/content/18-thinking-time'
import { problemSolveThoughts } from '@/features/videos/content/19-problem-solve-thoughts'
import { problemSolvingSteps } from '@/features/videos/content/20-problem-solving-steps'
import { copingIntro } from '@/features/videos/content/22-coping-intro'
import { helpfulThinking } from '@/features/videos/content/21-helpful-thinking'
import { copingPart1 } from '@/features/videos/content/23-coping-part-1'
import { copingPart2 } from '@/features/videos/content/24-coping-part-2'
import { identifyUnhelpfulCoping } from '@/features/videos/content/25-identify-unhelpful-coping'
import { actionPlans } from '@/features/videos/content/26-action-plans'
import { skillsMemorable } from '@/features/videos/content/27-skills-memorable'
import { rehearsals } from '@/features/videos/content/28-rehearsals'
import { maintainGains } from '@/features/videos/content/29-maintain-gains'
import { guidedSlowBreathing } from '@/features/videos/content/12-guided-slow-breathing'

export const videos: Record<string, Video> = {
  'about-the-program': aboutTheProgram,
  'introducing-me-triangle': introducingMeTriangle,
  triggers: triggers,
  'the-rut': theRut,
  'managing-emotions': managingEmotions,
  'strong-foundation': strongFoundation,
  'helpful-habits': helpfulHabits,
  'make-change-easier': makeChangeEasier,
  'uncomfortable-emotions': uncomfortableEmotions,
  'allowing-feelings': allowingFeelings,
  'mindful-allowing-attitude': mindfulAllowingAttitude,
  'slow-breathing': slowBreathing,
  'guided-slow-breathing': guidedSlowBreathing,
  'slow-breathing-reflection': slowBreathingReflection,
  'feelings-metaphor': feelingsMetaphor,
  'unhelpful-thoughts': unhelpfulThoughts,
  'push-pull-postpone': pushPullPostpone,
  'postpone-flow-chart': postponeFlowChart,
  'thinking-time': thinkingTime,
  'problem-solve-thoughts': problemSolveThoughts,
  'problem-solving-steps': problemSolvingSteps,
  'helpful-thinking': helpfulThinking,
  'coping-intro': copingIntro,
  'coping-part-1': copingPart1,
  'coping-part-2': copingPart2,
  'identify-unhelpful-coping': identifyUnhelpfulCoping,
  'action-plans': actionPlans,
  'skills-memorable': skillsMemorable,
  rehearsals: rehearsals,
  'maintain-gains': maintainGains,
}
