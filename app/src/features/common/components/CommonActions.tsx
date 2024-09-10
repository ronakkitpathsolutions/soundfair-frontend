import { useDispatch, useSelector } from 'react-redux'
import {
  selectProgress,
  selectToComplete,
  toggleModulesDrawer,
} from '@/features/modules/modulesSlice'
import { Button } from '@ui/components/base/Button'
import { routes } from '@/lib/constants/routes'
import { Link } from '@/features/common/components/Link'

export const CommonActions = () => {
  const dispatch = useDispatch()
  const modulesToComplete = useSelector(selectToComplete)
  const continueModule = modulesToComplete[0]
  const multipleModulesToComplete = modulesToComplete.length > 1
  const moduleProgress = useSelector(selectProgress)
  const allModulesComplete = modulesToComplete.length === 0

  const openModulesDrawer = () => {
    dispatch(toggleModulesDrawer(true))
  }

  // Check if all module 6 parts are complete
  const isModule6Complete = Object.values(moduleProgress['module-6']).every(
    Boolean,
  )

  return (
    <>
      {multipleModulesToComplete || allModulesComplete ? (
        <Button onClick={openModulesDrawer}>Continue learning</Button>
      ) : (
        <Button asChild>
          <Link
            href={{
              pathname: `/modules/${continueModule.moduleId}/${continueModule.partId}`,
              query: { step: continueModule?.step || 0 },
            }}
          >
            Continue learning
          </Link>
        </Button>
      )}
      <div className="flex gap-2">
        <Button asChild>
          <Link href={routes.checkin}>Check-in</Link>
        </Button>
        {isModule6Complete && (
          <Button asChild>
            <Link href={routes.practice.new}>Practice</Link>
          </Button>
        )}
      </div>
    </>
  )
}
