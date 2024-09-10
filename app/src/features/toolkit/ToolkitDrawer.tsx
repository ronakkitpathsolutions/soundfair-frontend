import { FC } from 'react'
import { useRouter } from 'next/router'

// Components
import { Drawer, DrawerHeader } from '@ui/components/base/Drawer'
import { Button } from '@ui/components/base/Button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ui/components/base/Tabs'
import { ToolkitTabPractice } from '@/features/toolkit/ToolkitTabPractice'

// Store
import { useDispatch, useSelector } from 'react-redux'
import {
  clearActiveElements,
  setActiveStrategy,
  setTab,
  toggleToolkit,
  type ToolkitTab,
} from '@/features/toolkit/toolkitSlice'
import {
  selectToComplete,
  toggleModulesDrawer,
} from '@/features/modules/modulesSlice'
import { strategies } from '@/features/strategies/content/strategies'

// Types
import { RootState } from '@/features/common/store'

// Constants
import { ToolkitTabStrategies } from '@/features/toolkit/ToolkitTabStrategies'
import { ToolkitActiveStrategy } from '@/features/toolkit/ToolkitActiveStrategy'
import { ToolkitActivePractice } from '@/features/toolkit/ToolkitActivePractice'

export interface ToolkitDrawerProps {}

export const ToolkitDrawer: FC<ToolkitDrawerProps> = ({}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const toolkitState = useSelector((state: RootState) => state.toolkit)
  const modulesToComplete = useSelector(selectToComplete)
  const continueModule = modulesToComplete[0]

  const onOpenChange = (value: boolean) => {
    dispatch(toggleToolkit(value))
  }

  const closeDrawer = () => {
    dispatch(toggleToolkit(false))
    dispatch(setActiveStrategy(null))
  }

  const goBackToPractice = () => {
    // If we're on module 6, go back to the final screen
    if (
      continueModule?.moduleId === 'module-6' &&
      continueModule?.partId === 'helpful-reminders-practice-unlocked'
    ) {
      router.push(
        `/modules/${continueModule.moduleId}/${continueModule.partId}?step=4`,
      )
      closeDrawer()
      return
    }

    dispatch(setTab('practice'))
    dispatch(clearActiveElements())
  }

  const goBackToStrategies = () => {
    dispatch(setTab('strategies'))
    dispatch(clearActiveElements())
    clearScroll()
  }

  const clearScroll = () => {
    const drawerEl = document.querySelector('[vaul-drawer]')

    // Reset the scroll position
    if (drawerEl) {
      drawerEl.children[0].scrollTop = 0
    }
  }

  return (
    <Drawer
      open={toolkitState.open}
      onOpenChange={onOpenChange}
      variant="primary"
    >
      {!toolkitState.activeStrategy && !toolkitState.activePractice ? (
        <>
          <DrawerHeader>
            <div className="absolute right-5 top-5">
              <Button
                onClick={closeDrawer}
                variant="icon"
                aria-label="Close toolkit"
                icon="close"
              />
            </div>
            <h2 className="mb-6 mt-4 text-center text-display-lg text-purple-60">
              Toolkit
            </h2>
          </DrawerHeader>
          <div className="mx-auto h-full max-w-5xl pb-10 pt-[90px]">
            <Tabs defaultValue={toolkitState.tab}>
              <TabsList>
                <TabsTrigger
                  value="strategies"
                  onClick={() => dispatch(setTab('strategies'))}
                >
                  Strategies
                </TabsTrigger>
                <TabsTrigger
                  value="practice"
                  onClick={() => dispatch(setTab('practice'))}
                >
                  Practice
                </TabsTrigger>
              </TabsList>
              <TabsContent value="strategies">
                <ToolkitTabStrategies closeDrawer={closeDrawer} />
              </TabsContent>
              <TabsContent value="practice" className="h-full">
                <ToolkitTabPractice closeDrawer={closeDrawer} locked={false} />
              </TabsContent>
            </Tabs>
          </div>
        </>
      ) : null}

      {toolkitState.activeStrategy ? (
        <ToolkitActiveStrategy
          strategy={toolkitState.activeStrategy}
          onBackClicked={goBackToStrategies}
          onCloseClicked={() => onOpenChange(false)}
        />
      ) : null}

      {toolkitState.activePractice ? (
        <ToolkitActivePractice
          practice={toolkitState.activePractice}
          onBackClicked={goBackToPractice}
          onCloseClicked={closeDrawer}
        />
      ) : null}
    </Drawer>
  )
}
