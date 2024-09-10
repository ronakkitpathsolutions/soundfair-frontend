import { FC } from 'react'
import { Empty } from '@ui/components/base/Empty'
import { Card } from '@ui/components/base/Card'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectStrategiesProgress,
  strategyVisited,
} from '@/features/strategies/strategiesSlice'
import { strategies } from '@/features/strategies/content/strategies'
import { Strategy } from '@/features/strategies/types'
import { setActiveStrategy } from '@/features/toolkit/toolkitSlice'

export interface ToolkitTabStrategiesProps {
  closeDrawer: () => void
}

export const ToolkitTabStrategies: FC<ToolkitTabStrategiesProps> = ({
  closeDrawer,
}) => {
  const dispatch = useDispatch()
  const strategiesProgress = useSelector(selectStrategiesProgress)
  const strategiesUnlocked = strategies
    .map((strategy) => ({
      ...strategy,
      ...strategiesProgress[strategy.id],
    }))
    .filter(
      (strategy) => strategiesProgress[strategy.id]?.status === 'unlocked',
    )
  const selectStrategy = (strategy: Strategy) => {
    dispatch(setActiveStrategy(strategy))
    dispatch(strategyVisited(strategy.id))
  }

  return strategiesUnlocked.length === 0 ? (
    <Empty
      cta={{
        label: 'Continue learning',
        onClick: closeDrawer,
      }}
      className="min-h-[400px] md:min-h-[600px]"
    >
      <p className="mb-4">Nothing here yet!</p>
      <p className="mb-4">
        You’ll collect strategies and see them here as you complete modules in
        the program.
      </p>
      <p>Try it out, and come back!</p>
    </Empty>
  ) : (
    <div className="grid grid-cols-2 gap-5 pb-10">
      {strategiesUnlocked.map((strategy) => (
        <Card
          key={strategy.id}
          title={strategy.name}
          emoji={strategy.emoji}
          notification={strategy.visited ? undefined : 'New'}
          onClick={() => selectStrategy(strategy)}
        />
      ))}
    </div>
  )
}
