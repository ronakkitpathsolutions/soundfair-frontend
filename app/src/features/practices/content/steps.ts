import { PracticeFormStep } from '@/features/practices/types'

export const practiceSteps: PracticeFormStep[] = [
  {
    id: 'intro',
    text: `Welcome to Practice — your interactive Action Plan journal.

Here you can log your triggers and reactions, plus make an Action Plan to manage your emotions.
    `,
    type: 'dialog',
    next: {
      text: 'Begin',
    },
  },
  {
    id: 'trigger',
    text: `What happened, [NAME]?
    
Tell me about your [TRIGGER]
    `,
    type: 'text-input',
    placeholder: 'e.g I had a fight with my little sister',
  },
  {
    id: 'reflect',
    text: `
Let's use the Me Triangle to reflect on our thoughts, feelings and behaviours
    `,
    type: 'dialog',
    secondary: {
      text: 'View Me Triangle',
      action: {
        type: 'strategy',
        id: 'me-triangle',
      },
    },
  },
  {
    id: 'thought',
    text: `Using one or two words tell me 
    what you're [THINKING]`,
    type: 'text-input',
  },
  {
    id: 'reflect',
    text: `
💡: If you haven't already, be sure to postpone your thoughts using the postponement flow steps. Give it a go now, or view the strategy to refresh your memory.
    `,
    type: 'dialog',
    secondary: {
      text: 'View strategy',
      action: {
        type: 'strategy',
        id: 'postpone-flow-chart',
      },
    },
  },
  {
    id: 'feeling',
    text: `So, [NAME], using one or two words tell me 
    how you're [FEELING]`,
    type: 'text-input',
  },
  {
    id: 'behaviour',
    text: `Using one or two words 
describe your [BEHAVIOUR]`,
    type: 'text-input',
  },
  {
    id: 'normal',
    text: `That\'s a normal reaction to have [NAME].
      
Let's see if we can create an action plan to help you manage these emotions!
      `,
    type: 'dialog',
    next: {
      action: {
        type: 'practice-activity',
        id: 'action-plan',
      },
    },
  },
  {
    id: 'behaviourCope',
    text: 'What’s a helpful, opposite action you can take instead of the [BEHAVIOUR]',
    type: 'text-input',
    showResponse: 'behaviour',
  },
  {
    id: 'helpfulHabits',
    text: 'What helpful habits can you do to keep your triangle strong?',
    type: 'text-input',
  },
  {
    id: 'complete',
    text: `You\'ve created an awesome action plan to manage your emotions [NAME]. 
    
Let's have a look!
    `,
    type: 'dialog',
  },
]
