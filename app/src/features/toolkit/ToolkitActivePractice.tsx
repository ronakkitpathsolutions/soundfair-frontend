import { FC, useEffect } from 'react'
import { DrawerFooter, DrawerHeader } from '@ui/components/base/Drawer'
import { NavbarProgress } from '@ui/components/base/NavbarProgress'
import { Button } from '@ui/components/base/Button'
import dayjs from 'dayjs'
import { Practice } from '@/features/practices/types'
import { PracticeResult } from '@/features/practices/PracticeResult'
import { Link } from '@/features/common/components/Link'
import { routes } from '@/lib/constants/routes'

export interface ToolkitActivePracticeProps {
  practice: Practice
  onBackClicked: () => void
  onCloseClicked: () => void
}

export const ToolkitActivePractice: FC<ToolkitActivePracticeProps> = ({
  practice,
  onBackClicked,
  onCloseClicked,
}) => {
  useEffect(() => {
    const drawerEl = document.querySelector('[vaul-drawer]')

    // Reset the scroll position
    if (drawerEl) {
      drawerEl.children[0].scrollTop = 0
    }
  }, [])

  return (
    <>
      <DrawerHeader>
        <NavbarProgress
          title={
            'Practice: ' +
            dayjs(practice.dateCompleted).format('dddd D MMMM YYYY')
          }
          showBackBtn={true}
          onBackClicked={onBackClicked}
        />
      </DrawerHeader>
      <PracticeResult practice={practice} className="mt-[90px]" />
      <DrawerFooter>
        <Button onClick={onCloseClicked} asChild>
          <Link
            href={{
              pathname: routes.practice.delete,
              query: {
                id: practice.id,
              },
            }}
          >
            Delete
          </Link>
        </Button>
        <Button onClick={onBackClicked}>Done</Button>
      </DrawerFooter>
    </>
  )
}
