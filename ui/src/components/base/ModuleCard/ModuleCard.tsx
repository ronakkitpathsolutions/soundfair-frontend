import React from 'react'
import { Icon } from '../Icon'
import { Typography } from '../Typography'
import { Progress } from '../Progress'
import { Button } from '../Button'
import { Link } from '../Link'

type Props = {
  moduleId: string
  title?: string
  meta?: string
  status?: 'in-progress' | 'not-started' | 'completed' | 'add' | 'remove'
  newStrategy?: boolean
  hasStrategies?: boolean
  progress?: number
  progressMeta?: string
  onClick?: () => void
}

export default function ModuleCard({
  moduleId,
  title = 'Module',
  meta,
  status = 'add',
  newStrategy = false,
  hasStrategies = false,
  progress,
  progressMeta,
  onClick,
}: Props) {
  return (
    <div className="rounded-md shadow-card">
      <div className="p-5">
        <Typography variant={'text-sm'} className="mb-2 text-neutral-dark">
          <Icon className="mr-2" circle={false} name="folder" />
          Module
          {meta && <span className="ml-2">{meta}</span>}
        </Typography>
        <Typography variant="text-lg">{title}</Typography>
        {status === 'in-progress' && (
          <div className="row flex items-center">
            <Progress
              variant="tertiary"
              value={progress}
              className="pointer-events-none mt-4 group-hover:bg-purple-60/10"
            />
            <Typography
              className="ml-4 mt-4 flex-shrink-0 text-neutral-dark"
              variant="text-sm"
            >
              {progressMeta}
            </Typography>
          </div>
        )}
        {status === 'in-progress' && (
          <div className="row mt-4 flex w-full gap-1">
            <Link className="w-full" href={`module/${moduleId}`}>
              <Button
                className="w-full flex-grow"
                icon="next"
                variant={'tertiary'}
                onClick={onClick}
              >
                {hasStrategies ? 'Learn' : 'Start Learning'}
              </Button>
            </Link>
            {hasStrategies && (
              <Link className="w-full" href={`module/${moduleId}?tab=practice`}>
                <Button
                  notification={newStrategy ? 'New' : undefined}
                  className="w-full flex-grow"
                  icon="next"
                  variant={'tertiary'}
                >
                  Practice
                </Button>
              </Link>
            )}
          </div>
        )}
        {status === 'not-started' && (
          <>
            {/* <Typography variant={'text-sm'} className="mt-4 text-neutral-dark">
              Not Started
            </Typography> */}
            <Link href={`module/${moduleId}`}>
              <Button
                className="mt-4 w-full flex-grow"
                icon="next"
                variant={'tertiary'}
                onClick={onClick}
              >
                Start Learning
              </Button>
            </Link>
          </>
        )}
        {status === 'completed' && (
          <Typography
            variant={'text-sm'}
            className="row mt-4  text-neutral-dark"
          >
            <Icon name="check" className="mr-2 h-5 w-5 bg-green text-white" />
            Complete
          </Typography>
        )}
      </div>
      {status === 'add' && (
        <button type="button" onClick={onClick} className="w-full text-left">
          <Typography className="border-t border-blue-400 px-5 py-4 pt-4 text-green">
            <Icon name="plus" circle={false} className="mr-2" />
            Add to plan
          </Typography>
        </button>
      )}
      {status === 'remove' && (
        <button type="button" onClick={onClick} className="w-full text-left">
          <Typography className="border-t border-blue-400 px-5 py-4 pt-4 text-red">
            <Icon name="close" circle={false} className="mr-2" />
            Remove from plan
          </Typography>
        </button>
      )}
    </div>
  )
}
