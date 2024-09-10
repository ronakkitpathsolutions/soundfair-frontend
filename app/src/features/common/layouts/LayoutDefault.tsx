import { FC, useCallback } from 'react'
import { Navbar, NavbarItem } from '@ui/components/base/Navbar'
import { ModuleDrawer } from '@/features/modules/ModuleDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { ToolkitDrawer } from '@/features/toolkit/ToolkitDrawer'
import { selectStrategyNotifications } from '@/features/strategies/strategiesSlice'
import { ActivityDrawer } from '@/features/activities/ActivityDrawer'
import {
  selectorOnComplete,
  selectorOpenActivity,
  toggleActivity,
} from '@/features/activities/activitiesSlice'
import {
  selectModuleProgress,
  selectModulesDrawerOpen,
  toggleModulesDrawer,
} from '@/features/modules/modulesSlice'
import { toggleToolkit } from '@/features/toolkit/toolkitSlice'
import { VideoDrawer } from '@/features/videos/VideoDrawer'
import { toggleVideo } from '@/features/videos/videosSlice'
import { RootState } from '@/features/common/store'
import { CrisisSupportDrawer } from '@/features/crisis/CrisisSupportDrawer'
import {
  selectCrisisOpenSupport,
  toggleSupport,
} from '@/features/crisis/crisisSlice'
import TooltipDrawer from '@/features/soundfair/TooltipDrawer'
import Footer from '@/components/Footer'
import { setCurrentTooltip } from '@/features/soundfair/modules'
import { useRouter } from 'next/router'
import { initialAuth } from '@/features/auth/authSlice'

export interface LayoutProps {
  children: React.ReactNode
}
export const LayoutDefault: FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const openActivity = useSelector(selectorOpenActivity)
  const onActivityComplete = useSelector(selectorOnComplete)
  const openModules = useSelector(selectModulesDrawerOpen)
  const moduleProgress = useSelector(selectModuleProgress)
  const strategyNotifications = useSelector(selectStrategyNotifications)
  const videoState = useSelector((state: RootState) => state.videos)
  const openCrisisSupport = useSelector(selectCrisisOpenSupport)

  const navItems: NavbarItem[] = [
    { label: 'Modules', onClick: () => dispatch(toggleModulesDrawer(true)) },
    {
      label: 'Toolkit',
      onClick: () => dispatch(toggleToolkit(true)),
      notifications: {
        amount: strategyNotifications,
        message: 'items unlocked in toolkit',
      },
    },
  ]

  const auth = useSelector(({ auth }) => auth)

  const onCrisisSupport = () => dispatch(toggleSupport(true))

  const handleRedirect = (redirectTo: string) => {
    router.push(redirectTo)
  }

  const handleLogout = useCallback(() => {
    dispatch(initialAuth({}))
    localStorage.clear()
    router.push('/login')
  }, [dispatch, router])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        {...{
          handleLogout,
          items: navItems,
          handleRedirect,
          onCrisisSupport,
          user: auth?.user,
        }}
      />
      {children}
      <ModuleDrawer
        open={openModules}
        onOpenChange={(val) => dispatch(toggleModulesDrawer(val))}
        moduleProgress={moduleProgress}
      />
      <ToolkitDrawer />
      <ActivityDrawer
        activityId={openActivity}
        open={!!openActivity}
        onComplete={onActivityComplete}
        onOpenChange={(val) => (!val ? dispatch(toggleActivity(null)) : null)}
      />
      <VideoDrawer
        title={videoState.title}
        videoId={videoState.openVideo}
        open={!!videoState.openVideo}
        onComplete={videoState.onComplete}
        onOpenChange={(val) => (!val ? dispatch(toggleVideo(null)) : null)}
      />
      <CrisisSupportDrawer
        open={openCrisisSupport}
        onOpenChange={(val) => dispatch(toggleSupport(val))}
      />
      <TooltipDrawer />
      <Footer />
    </div>
  )
}
