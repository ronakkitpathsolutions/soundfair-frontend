import { FC } from 'react'
import dayjs from 'dayjs'

// Components
import { Button } from '@ui/components/base/Button'
import { Link } from '@/features/common/components/Link'
import { Empty } from '@ui/components/base/Empty'
import { Card } from '@ui/components/base/Card'

// Constants
import { routes } from '@/lib/constants/routes'

// Types
import { Practice } from '@/features/practices/types'
import { DrawerFooter } from '@ui/components/base/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import { selectPractices } from '@/features/practices/practicesSlice'
import { setActivePractice } from '@/features/toolkit/toolkitSlice'

// Emoji
import pencil from '@/assets/images/practice/emojis/Icon-Practice-Entry.png'

export interface PracticeTabProps {
  locked: boolean
  closeDrawer: () => void
}
export const ToolkitTabPractice: FC<PracticeTabProps> = ({
  locked,
  closeDrawer,
}) => {
  const dispatch = useDispatch()
  const practices = useSelector(selectPractices)

  const formattedPractices = practices.map((practice) => {
    return {
      date: dayjs(practice.dateCompleted).format('dddd D MMMM YYYY'),
      ...practice,
    }
  })

  const selectPractice = (practice: Practice) => {
    dispatch(setActivePractice(practice))
  }

  return (
    <div className="h-full pb-[120px]">
      {locked ? (
        <Empty
          cta={{
            label: 'Continue learning',
            onClick: closeDrawer,
          }}
          className="min-h-[400px] md:min-h-[600px]"
        >
          <p className="mb-4">Nothing here yet!</p>
          <p className="mb-4">
            Complete up to Module 6 to unlock the ability to exercise.
          </p>
        </Empty>
      ) : (
        <>
          {formattedPractices.length === 0 ? (
            <Empty className="min-h-[400px] md:min-h-[500px]">
              <p className="mb-4">Nothing here yet!</p>
            </Empty>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {formattedPractices.map((practice) => {
                return (
                  <Card
                    key={practice.id}
                    title={practice.date}
                    emoji={pencil}
                    onClick={() => selectPractice(practice)}
                  />
                )
              })}
            </div>
          )}
          <DrawerFooter gradient={false}>
            <Button
              asChild
              onClick={closeDrawer}
              variant="secondary"
              icon="plus"
            >
              <Link href={routes.practice.new}>New practice</Link>
            </Button>
          </DrawerFooter>
        </>
      )}
    </div>
  )
}
