import { meetBluurbSteps } from '@/features/modules/content/0-intro/0-meet-bluurb/steps'
import { aboutSteps } from '@/features/modules/content/0-intro/1-about/steps'
import { theRut } from '@/features/modules/content/1-understanding-emotions/3-the-rut/steps'
import { managingEmotionsTriangle } from '@/features/modules/content/1-understanding-emotions/4-managing-emotions-triangle/steps'
import { thinkFeelDoSummary } from '@/features/modules/content/1-understanding-emotions/5-think-feel-do-summary/steps'
import { buildingStrongFoundation } from '@/features/modules/content/2-building-strong-foundation/1-building-strong-foundation/steps'
import { helpfulHabits } from '@/features/modules/content/2-building-strong-foundation/2-helpful-habits/steps'
import { tipMakeChangeEasier } from '@/features/modules/content/2-building-strong-foundation/3-tips-change-easier/steps'
import { helpfulRemindersHelpfulHabits } from '@/features/modules/content/2-building-strong-foundation/4-helpful-reminders-helpful-habits/steps'
import { uncomfortableEmotions } from '@/features/modules/content/3-allow-feelings/1-uncomfortable-emotions/steps'
import { allowingFeelings } from '@/features/modules/content/3-allow-feelings/2-allowing-feelings/steps'
import { mindfulAllowingAttitude } from '@/features/modules/content/3-allow-feelings/3-mindful-allowing-attitude/steps'
import { slowBreathing } from '@/features/modules/content/3-allow-feelings/4-slow-breathing/steps'
import { slowBreathingReflection } from '@/features/modules/content/3-allow-feelings/5-slow-breathing-reflection/steps'
import { feelingsMetaphor } from '@/features/modules/content/3-allow-feelings/6-feelings-metaphor/steps'
import { helpfulReminderAllowFeelings } from '@/features/modules/content/3-allow-feelings/7-helpful-reminder/steps'
import { unhelpfulThoughts } from '@/features/modules/content/4-unhelpful-thoughts/1-unhelpful-thoughts/steps'
import { pushPullPostpone } from '@/features/modules/content/4-unhelpful-thoughts/2-push-pull-postpone/steps'
import { helpfulReminderPostponementFlow } from '@/features/modules/content/4-unhelpful-thoughts/5-postponement-flow/steps'
import { problemSolveThoughts } from '@/features/modules/content/5-postponing-thoughts/1-problem-solve-thoughts/steps'
import { problemSolveSteps } from '@/features/modules/content/5-postponing-thoughts/2-problem-solve-steps/steps'
import { helpfulThinking } from '@/features/modules/content/5-postponing-thoughts/3-helpful-thinking/steps'
import { unhelpfulCoping1 } from '@/features/modules/content/6-acting-opposite/2-unhelpful-coping-1/steps'
import { unhelpfulCoping2 } from '@/features/modules/content/6-acting-opposite/3-unhelpful-coping-2/steps'
import { helpfulRemindersPractice } from '@/features/modules/content/6-acting-opposite/6-helpful-reminders-practice/steps'
import { tipsSkillsMemorable } from '@/features/modules/content/7-making-me-memorable/1-tips-skills-memorable/steps'
import { rehearsals } from '@/features/modules/content/7-making-me-memorable/2-rehearsals/steps'
import { selfReflection } from '@/features/modules/content/7-making-me-memorable/3-self-reflection/steps'
import { tipsMaintainingGains } from '@/features/modules/content/7-making-me-memorable/4-tips-maintain-gains/steps'
import { helpfulRemindersMemorable } from '@/features/modules/content/7-making-me-memorable/5-helpful-reminders-memorable/steps'
import { introMeTriangle } from '@/features/modules/content/1-understanding-emotions/1-intro-me-triangle/steps'
import { triggers } from '@/features/modules/content/1-understanding-emotions/2-triggers/steps'
import { actionPlans } from '@/features/modules/content/6-acting-opposite/5-action-plans/steps'
import { copingIntro } from '@/features/modules/content/6-acting-opposite/1-coping-intro/steps'
import { postponeFlowchart } from '@/features/modules/content/4-unhelpful-thoughts/3-postpone-flowchart/steps'
import { thinkingTime } from '@/features/modules/content/4-unhelpful-thoughts/4-thinking-time/steps'
import { tipsUnhelpfulCoping } from '@/features/modules/content/6-acting-opposite/4-tips-unhelpful-coping/steps'
import { helpfulRemindersPostponingThoughts } from '@/features/modules/content/5-postponing-thoughts/4-helpful-reminders-postpone-thoughts/steps'

export const modulesList = [
  {
    id: 'intro',
    title: 'Introduction',
    description: 'Getting set up',
    parts: [
      {
        id: 'meet-bluurb',
        title: 'Get to know you',
        timeToComplete: 10,
        steps: meetBluurbSteps,
      },
      {
        id: 'about-the-program',
        title: 'About the program',
        timeToComplete: 10,
        steps: aboutSteps,
      },
    ],
  },
  {
    id: 'module-1',
    title: 'Module 1',
    description: 'Understanding emotions',
    parts: [
      {
        id: 'the-me-triangle',
        title: 'The Me Triangle',
        timeToComplete: 10,
        steps: introMeTriangle,
      },
      {
        id: 'triggers',
        title: 'Triggers',
        timeToComplete: 10,
        steps: triggers,
      },
      {
        id: 'the-rut',
        title: 'Feelings, the RUT and what we do',
        timeToComplete: 10,
        steps: theRut,
      },
      {
        id: 'managing-emotions-triangle',
        title: 'Parts of the Managing Emotions Triangle',
        timeToComplete: 10,
        steps: managingEmotionsTriangle,
      },
      {
        id: 'helpful-reminders-think-feel-do',
        title: 'Helpful reminders',
        timeToComplete: 10,
        steps: thinkFeelDoSummary,
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Module 2',
    description: 'Building  a strong foundation',
    parts: [
      {
        id: 'building-strong-foundation',
        title: 'Building a strong foundation',
        timeToComplete: 10,
        steps: buildingStrongFoundation,
      },
      {
        id: 'helpful-habits',
        title: 'Helpful habits',
        timeToComplete: 10,
        steps: helpfulHabits,
      },
      {
        id: 'tips-make-change-easier',
        title: 'Tips to make change easier',
        timeToComplete: 10,
        steps: tipMakeChangeEasier,
      },
      {
        id: 'helpful-reminders-helpful-habits',
        title: 'Helpful reminders',
        timeToComplete: 10,
        steps: helpfulRemindersHelpfulHabits,
      },
    ],
  },
  {
    id: 'module-3',
    title: 'Module 3',
    description: 'Allowing feeling',
    parts: [
      {
        id: 'uncomfortable-emotions',
        title: 'Categories of uncomfortable emotions',
        timeToComplete: 10,
        steps: uncomfortableEmotions,
      },
      {
        id: 'allowing-feelings',
        title: 'Allowing our feelings',
        timeToComplete: 10,
        steps: allowingFeelings,
      },
      {
        id: 'mindful-allowing-attitude',
        title: 'Strategy 1: Mindful allowing attitude',
        timeToComplete: 10,
        steps: mindfulAllowingAttitude,
      },
      {
        id: 'slow-breathing',
        title: 'Strategy 2: Slow breathing',
        timeToComplete: 10,
        steps: slowBreathing,
      },
      {
        id: 'slow-breathing-reflection',
        title: 'Slow breathing reflection and tips',
        timeToComplete: 10,
        steps: slowBreathingReflection,
      },
      {
        id: 'feelings-metaphor',
        title: 'Strategy 3: Feelings metaphor',
        timeToComplete: 10,
        steps: feelingsMetaphor,
      },
      {
        id: 'helpful-reminders-allow-feelings',
        title: 'Helpful reminders',
        timeToComplete: 10,
        steps: helpfulReminderAllowFeelings,
      },
    ],
  },
  {
    id: 'module-4',
    title: 'Module 4',
    description: 'Postponing thoughts',
    parts: [
      {
        id: 'unhelpful-thoughts-and-rut',
        title: 'Unhelpful thoughts and the RUT',
        timeToComplete: 10,
        steps: unhelpfulThoughts,
      },
      {
        id: 'push-pull-postpone',
        title: 'Push-pull and postponement',
        timeToComplete: 10,
        steps: pushPullPostpone,
      },
      {
        id: 'postpone-flow-chart',
        title: 'Postpone flow chart and steps',
        timeToComplete: 10,
        steps: postponeFlowchart,
      },
      {
        id: 'thinking-time',
        title: 'Thinking time',
        timeToComplete: 10,
        steps: thinkingTime,
      },
      {
        id: 'helpful-reminders-postponement-flow',
        title: 'Helpful reminders',
        timeToComplete: 10,
        steps: helpfulReminderPostponementFlow,
      },
    ],
  },
  {
    id: 'module-5',
    title: 'Module 5',
    description: 'Problem solving & helpful thinking',
    parts: [
      {
        id: 'problem-solve-thoughts',
        title: 'Problem solve your thoughts',
        timeToComplete: 10,
        steps: problemSolveThoughts,
      },
      {
        id: 'problem-solving-steps',
        title: 'Problem solving steps',
        timeToComplete: 10,
        steps: problemSolveSteps,
      },
      {
        id: 'helpful-thinking',
        title: 'Helpful thinking and the helpful thinking list',
        timeToComplete: 10,
        steps: helpfulThinking,
      },
      {
        id: 'helpful-reminders-postponing-thoughts',
        title: 'Helpful reminders',
        timeToComplete: 10,
        steps: helpfulRemindersPostponingThoughts,
      },
    ],
  },
  {
    id: 'module-6',
    title: 'Module 6',
    description: 'Acting opposite',
    parts: [
      {
        id: 'intro-to-acting-opposite',
        title:
          'Introduction to unhelpful coping behaviours and acting opposite',
        timeToComplete: 10,
        steps: copingIntro,
      },
      {
        id: 'types-of-unhelpful-coping-1',
        title: 'Unhelpful coping behaviours - part 1',
        timeToComplete: 10,
        steps: unhelpfulCoping1,
      },
      {
        id: 'types-of-unhelpful-coping-2',
        title: 'Unhelpful coping behaviours - part 2',
        timeToComplete: 10,
        steps: unhelpfulCoping2,
      },
      {
        id: 'tips-unhelpful-coping',
        title: 'Tips to identify unhelpful coping behaviours',
        timeToComplete: 10,
        steps: tipsUnhelpfulCoping,
      },
      {
        id: 'intro-to-action-plans',
        title: 'Introduction to Action Plans',
        timeToComplete: 10,
        steps: actionPlans,
      },
      {
        id: 'helpful-reminders-practice-unlocked',
        title: 'Helpful reminders',
        timeToComplete: 10,
        steps: helpfulRemindersPractice,
      },
    ],
  },
  {
    id: 'module-7',
    title: 'Module 7',
    description: 'Making it memorable',
    parts: [
      {
        id: 'tips-skills-memorable',
        title: 'Tips to make new skills memorable',
        timeToComplete: 10,
        steps: tipsSkillsMemorable,
      },
      {
        id: 'rehearsals',
        title: 'Rehearsals',
        timeToComplete: 10,
        steps: rehearsals,
      },
      {
        id: 'self-reflection',
        title: 'Self reflection',
        timeToComplete: 10,
        steps: selfReflection,
      },
      {
        id: 'tips-maintain-gains',
        title: 'Maintaining gains plan',
        timeToComplete: 10,
        steps: tipsMaintainingGains,
      },
      {
        id: 'helpful-reminders-memorable',
        title: 'Helpful reminders',
        timeToComplete: 10,
        steps: helpfulRemindersMemorable,
      },
    ],
  },
] as const
