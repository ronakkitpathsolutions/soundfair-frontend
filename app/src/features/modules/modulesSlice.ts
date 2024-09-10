import { createSelector, createSlice } from '@reduxjs/toolkit'
import { modulesList } from '@/features/modules/content/modules-list'

interface ModulePartProgress {
  status: 'not-started' | 'in-progress' | 'completed' | 'locked'
  currentStep: number
  data?: Record<string, string>
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}

export type ModuleId = (typeof modulesList)[number]['id']
export type ModulePartId = (typeof modulesList)[number]['parts'][number]['id']
export type ModulePart = PartialRecord<ModulePartId, ModulePartProgress | null>

type ModuleProgressMap = Record<ModuleId, ModulePart>
interface ModulesState {
  open: boolean
  progress: ModuleProgressMap
}

interface ModuleNextAction {
  payload: {
    moduleId: ModuleId
    partId: ModulePartId
    currentStep: number
    completed: boolean
    data?: Record<string, string>
  }
  type: string
}

// Define the initial state using that type
const initialState: ModulesState = {
  open: false,
  progress: {
    intro: {
      'meet-bluurb': {
        status: 'not-started',
        currentStep: 0,
      },
      'about-the-program': {
        status: 'locked',
        currentStep: 0,
      },
    },
    'module-1': {
      'the-me-triangle': null,
      triggers: null,
      'the-rut': null,
      'managing-emotions-triangle': null,
      'helpful-reminders-think-feel-do': null,
    },
    'module-2': {
      'building-strong-foundation': null,
      'helpful-habits': null,
      'tips-make-change-easier': null,
      'helpful-reminders-helpful-habits': null,
    },
    'module-3': {
      'uncomfortable-emotions': null,
      'allowing-feelings': null,
      'mindful-allowing-attitude': null,
      'slow-breathing': null,
      'slow-breathing-reflection': null,
      'feelings-metaphor': null,
      'helpful-reminders-allow-feelings': null,
    },
    'module-4': {
      'unhelpful-thoughts-and-rut': null,
      'push-pull-postpone': null,
      'postpone-flow-chart': null,
      'thinking-time': null,
      'helpful-reminders-postponement-flow': null,
    },
    'module-5': {
      'problem-solve-thoughts': null,
      'problem-solving-steps': null,
      'helpful-thinking': null,
      'helpful-reminders-postponing-thoughts': null,
    },
    'module-6': {
      'intro-to-acting-opposite': null,
      'types-of-unhelpful-coping-1': null,
      'types-of-unhelpful-coping-2': null,
      'tips-unhelpful-coping': null,
      'intro-to-action-plans': null,
      'helpful-reminders-practice-unlocked': null,
    },
    'module-7': {
      'tips-skills-memorable': null,
      rehearsals: null,
      'self-reflection': null,
      'tips-maintain-gains': null,
      'helpful-reminders-memorable': null,
    },
  },
}

export const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    toggleModulesDrawer: (
      state: ModulesState,
      action: { payload: boolean },
    ) => {
      state.open = action.payload
    },
    moduleSave: (state: ModulesState, action: ModuleNextAction) => {
      const { moduleId, partId, currentStep, completed, data } = action.payload
      const currentProgress = state.progress[moduleId][partId]

      // Don't update global progress if module part has already been completed
      if (currentProgress && currentProgress.status === 'completed') {
        return
      }

      // Only update progress if the new progress is greater than the current progress
      if (currentProgress) {
        currentProgress.currentStep =
          currentStep >= currentProgress.currentStep
            ? currentStep
            : currentProgress.currentStep
        currentProgress.status = completed ? 'completed' : 'in-progress'
        currentProgress.data = data
      }

      // Unlock check-in, about-the-program and Me Triangle modules after meet bluurb
      if (completed && partId === 'meet-bluurb') {
        state.progress.intro['about-the-program'] = {
          status: 'not-started',
          currentStep: 0,
          data: {},
        }
        state.progress['module-1']['the-me-triangle'] = {
          status: 'not-started',
          currentStep: 0,
          data: {},
        }
        return
      }

      // If completed unlock the next module
      if (completed && !['check-in', 'about-the-program'].includes(partId)) {
        let partToUnlock,
          moduleIdToUnlock = moduleId

        // Get current module index
        const currentModuleIndex =
          modulesList.findIndex((module) => module.id === moduleId) || 0

        // Get current module part index
        const currentModulePartIndex =
          modulesList[currentModuleIndex].parts.findIndex(
            (part) => part.id === partId,
          ) || 0

        const lastPartInModule =
          currentModulePartIndex ===
          modulesList[currentModuleIndex].parts.length - 1

        const lastModuleCompleted =
          lastPartInModule && !modulesList[currentModuleIndex + 1]

        if (lastModuleCompleted) return

        if (lastPartInModule) {
          // Unlock part in next module
          moduleIdToUnlock = modulesList[currentModuleIndex + 1].id
          partToUnlock = modulesList[currentModuleIndex + 1].parts[0]
        } else {
          // Unlock next part in current module
          partToUnlock =
            modulesList[currentModuleIndex].parts[currentModulePartIndex + 1]
        }

        if (partToUnlock) {
          state.progress[moduleIdToUnlock][partToUnlock.id] = {
            status: 'not-started',
            currentStep: 0,
            data: {},
          }
        }
      }
    },
  },
})

export const { moduleSave, toggleModulesDrawer } = modulesSlice.actions

export const selectModulesDrawerOpen = (state: { modules: ModulesState }) =>
  state.modules.open

export const selectUserName = (state: { modules: ModulesState }) => {
  return state.modules.progress.intro['meet-bluurb']?.data?.name
}

export const selectProgress = (state: { modules: ModulesState }) =>
  state.modules.progress

// This is used to display progress in the modules drawer component
export const selectModuleProgress = createSelector(
  [selectProgress],
  (moduleProgress: ModuleProgressMap) => {
    return modulesList.map((module) => ({
      title: module.title,
      description: module.description,
      parts: module.parts.map((part) => {
        const userPartProgress = moduleProgress?.[module.id]?.[part.id] || {
          status: 'locked',
          currentStep: 0,
        }

        // Calculate how much time is left based on the steps
        const totalSteps = part.steps.length
        const timeToComplete = part.timeToComplete
        const currentStep = userPartProgress.currentStep
        const timeLeft = Math.round(
          (timeToComplete / totalSteps) * (totalSteps - currentStep),
        )

        const timeLeftMessage =
          userPartProgress.status === 'locked'
            ? `${part.timeToComplete} minutes to complete`
            : `${timeLeft} minutes left`

        const stepParam =
          currentStep > 0 && userPartProgress.status !== 'completed'
            ? `?step=${currentStep}`
            : ''

        return {
          title: part.title,
          href: `/modules/${module.id}/${part.id}/${stepParam}`,
          progress: Math.floor(
            (userPartProgress.currentStep / (part.steps.length - 1)) * 100,
          ),
          timeLeft:
            userPartProgress.status === 'completed'
              ? 'Completed'
              : timeLeftMessage,
          ...userPartProgress,
        }
      }),
    }))
  },
)

export const selectToComplete = createSelector(
  [selectProgress],
  (moduleProgress: ModuleProgressMap) => {
    const toComplete = []

    // Find the first module part that is in progress or not-started
    for (const moduleItem of modulesList) {
      for (const part of moduleItem.parts) {
        const progress = moduleProgress?.[moduleItem.id]?.[part.id]
        if (
          progress &&
          (progress.status === 'in-progress' ||
            progress.status === 'not-started')
        ) {
          toComplete.push({
            moduleId: moduleItem.id,
            partId: part.id,
            step: progress.currentStep,
          })
        }
      }
    }

    if (toComplete.length >= 0) {
      return toComplete
    }

    // If no module parts are in progress or not-started, return the first module part
    return [
      {
        moduleId: modulesList[0].id,
        partId: modulesList[0].parts[0].id,
        step: 0,
      },
    ]
  },
)

export default modulesSlice.reducer
