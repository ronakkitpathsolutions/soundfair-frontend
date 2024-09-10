import { createSlice } from '@reduxjs/toolkit'
import { strategies } from '@/features/strategies/content/strategies'
import { StrategyId } from '@/features/strategies/types'

interface StrategyProgress {
  status: 'locked' | 'unlocked'
  visited: boolean
}

interface StrategiesState {
  progress: Record<string, StrategyProgress>
}

const strategyIds = strategies.map((strategy) => strategy.id)
const initialProgress: Record<string, StrategyProgress> = {}
strategyIds.forEach((id) => {
  initialProgress[id] = {
    status: 'locked',
    visited: false,
  }
})

const initialState: StrategiesState = {
  progress: initialProgress,
}

export const strategiesSlice = createSlice({
  name: 'strategies',
  initialState,
  reducers: {
    unlockStrategies: (
      state,
      action: {
        payload: StrategyId[]
      },
    ) => {
      const strategyIds = action.payload

      strategyIds.forEach((id) => {
        const strategy = state.progress[id]

        // Account for persistent state not containing all strategies
        if (!strategy) {
          state.progress[id] = {
            status: 'unlocked',
            visited: false,
          }
        }

        state.progress[id].status = 'unlocked'
      })
    },
    strategyVisited: (state, action) => {
      const strategyId = action.payload

      const strategy = state.progress[strategyId]

      // Account for persistent state not containing all strategies
      if (!strategy) {
        state.progress[strategyId] = {
          status: 'locked',
          visited: true,
        }
      }

      state.progress[strategyId].visited = true
    },
  },
})

export const selectStrategiesProgress = ({
  strategies,
}: {
  strategies: StrategiesState
}) => {
  return strategies.progress
}

export const selectStrategyNotifications = ({
  strategies,
}: {
  strategies: StrategiesState
}) => {
  // Get all the strategies that are unlocked but not visited
  return Object.values(strategies.progress).reduce((acc, strategy) => {
    if (strategy.status === 'unlocked' && !strategy.visited) {
      acc += 1
    }
    return acc
  }, 0)
}

export const { unlockStrategies, strategyVisited } = strategiesSlice.actions
export default strategiesSlice.reducer
