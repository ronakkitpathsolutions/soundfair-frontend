import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Head } from '@/features/common/components/Head'
import { Typography } from '@ui/components/base/Typography'
import { Button } from '@ui/components/base/Button'
import { Container } from '@ui/components/base/Grid'
import { NavTabs, NavTabsContent } from '@ui/components/base/NavTabs'
import { TransitionExpand } from '@ui/components/base/Transitions'
import Quiz from '@/components/Quiz'
import {
  getAllModule,
  getModuleByUser,
  selectModuleList,
  selectStrategiesForIdArray,
} from '@/features/soundfair/modules'
import {
  selectorLessonProgress,
  selectorProfile,
  selectorQuizResults,
  selectorUnlockedModules,
  selectorUnlockedStrategies,
} from '@/features/soundfair/userData'
import TopicCard from '@/components/TopicCard'
import { selectorTopicAreas } from '@/features/soundfair/topics'
import HeatGraph from '@/components/HeatGraph'
import ModuleCard from '@ui/components/base/ModuleCard'
import { Link } from '@ui/components/base/Link'
import { getReportByUser, setIsEdit } from '@/features/soundfair/quizResult'

import withUser from '@/hoc/withUser'
import { LayoutDefault } from '@/features/common/layouts/LayoutDefault'
import { fetchMyModuleProgress } from '@/features/soundfair/userSession'

type ActionCardProps = {
  children: React.ReactNode
  onClick?: () => void
  buttonLabel?: string
  isIcon?: boolean
}

interface Module {
  module_id: number
  name: string
  category: string
  score?: number
}

interface ModulesState {
  userModules: Module[]
  moduleData: Module[]
}

interface AuthState {
  user: {
    id: number
    name: string
    email: string
  }
  // Add other properties related to auth here
}

interface RootState {
  modules: ModulesState
  auth: AuthState
  [key: string]: any // This allows dynamic keys
}
export function ActionCard({
  children,
  onClick,
  buttonLabel,
  isIcon = false,
}: ActionCardProps) {
  const [display, setDisplay] = useState(true)

  return (
    <TransitionExpand isVisible={display}>
      <div className="mb-5 flex flex-col rounded-md bg-white p-5 text-neutral-dark shadow-card">
        {children}
        <Button
          icon={isIcon && 'down'}
          className="mt-2"
          onClick={onClick}
          variant={'link'}
          noPadding
        >
          {buttonLabel}
        </Button>
      </div>
    </TransitionExpand>
  )
}

export function Dashboard() {
  const [currentTab, setCurrentTab] = useState('action-plan')
  const dispatch = useDispatch()
  const { finalReport } = useSelector((state) => state?.quizResult)
  const navTabList = useRef<HTMLDivElement>(null)
  const navButtons = {
    'action-plan': useRef<HTMLButtonElement>(null),
    profile: useRef<HTMLButtonElement>(null),
    'full-program': useRef<HTMLButtonElement>(null),
  }
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state?.auth)
  const { userModules, moduleData } = useSelector(
    (state: RootState) => state?.modules,
  )

  const { moduleProgress: moduleProgressServerData } = useSelector(
    (state) => state?.userSession,
  )

  const quizResults = useSelector(selectorQuizResults)

  const timeSinceLastQuiz = useMemo(() => {
    if (!quizResults) return undefined
    const timeSince =
      Date.now() - new Date(quizResults.quizCompletedAt).valueOf()
    const daysSince = Math.floor(timeSince / (1000 * 60 * 60 * 24))

    if (daysSince === 0) return 'today'
    if (daysSince === 1) return 'yesterday'
    if (daysSince < 7) return `${daysSince} days ago`
    if (daysSince < 14) return 'last week'
    if (daysSince < 30) return `${Math.floor(daysSince / 7)} weeks ago`
    if (daysSince < 60) return 'last month'
    return daysSince
  }, [quizResults])

  useEffect(() => {
    dispatch(getAllModule()).then((res: any) => {
      if (!!user?.id && !!user?.email) {
        dispatch(
          getModuleByUser({
            params: { user_id: user.id },
            allData: res?.payload || [],
          }),
        )
        dispatch(getReportByUser({ params: { user_id: user?.id } }))
        dispatch(fetchMyModuleProgress({ params: { user_id: user?.id } }))
      }
    })
  }, [dispatch, user?.email, user.id])

  const isActivityUnlocked = (moduleId: number, sessions: any) => {
    if (!sessions || !moduleProgressServerData || !moduleId) return false
    const cloneSessions = [...sessions]
    const progressModules = [...moduleProgressServerData]
    let completedSessions = []
    const activities = cloneSessions
      .filter((session) => session?.type === 'Activity')
      .map((active) => active?.session_id)

    progressModules.forEach((module) => {
      if (module.id === Number(moduleId)) {
        const progressSessions = [...module?.sessions]
        completedSessions = progressSessions
          .filter((val) => val?.total === val?.completed)
          .map((session) => session?.id)
      }
    })
    return Boolean(
      completedSessions.filter((val) => activities.includes(val)).length,
    )
  }

  let startX = 0
  let currentTranslateX = 0
  let isDragging = false

  let isQuizRoute = useMemo(() => {
    return router.query.slug?.[0] === 'quiz'
  }, [router.query.slug])

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (navTabList.current) {
      startX = event.touches[0].clientX
      currentTranslateX = navTabList.current.getBoundingClientRect().left
      isDragging = true
    }
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (
      isDragging &&
      navTabList.current &&
      navTabList.current.offsetWidth > window.innerWidth
    ) {
      const touchX = event.touches[0].clientX
      const deltaX = touchX - startX
      const translateX = currentTranslateX + deltaX

      let clampedTranslateX = Math.min(0, translateX)
      clampedTranslateX = Math.max(
        -navTabList.current.offsetWidth + window.innerWidth - 30,
        clampedTranslateX,
      )

      navTabList.current.style.transform = `translateX(${clampedTranslateX}px)`

      // Change Transition Timing to 0
      navTabList.current.style.transitionDuration = `0s`
    }
  }

  const handleTouchEnd = () => {
    isDragging = false
    if (navTabList.current)
      navTabList.current.style.transitionDuration = `150ms`
  }

  const handleNavValueChange = (value: string) => {
    console.log(value)
    setCurrentTab(value)
    // Translate the nav tab list so current tab is in the middle
    console.log(navTabList.current)
    if (navTabList.current) {
      // @ts-ignore
      const buttonOffsetLeft = navButtons[value].current?.offsetLeft

      const modifiedOffsetLeft = buttonOffsetLeft - 90

      const clampOffsetLeft = Math.max(0, modifiedOffsetLeft)
      console.log('Doing Scroll Style', clampOffsetLeft)

      navTabList.current.style.transform = `translateX(-${clampOffsetLeft}px)`
    }
  }

  const handleRebuildProfileClick = async () => {
    if (finalReport?.user_id === user?.id) {
      dispatch(setIsEdit(true))
      router.push({
        pathname: '/dashboard/quiz',
      })
    }
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  }

  const buildGraphData = () => {
    const data = [] as number[]
    const labels = [] as string[]
    if (finalReport && finalReport?.report_data?.length > 0) {
      finalReport?.report_data.forEach(
        (element: { score: number; category: string }) => {
          data.push(element?.score || 0)
          labels.push(element.category)
        },
      )
    }
    return {
      labels,
      data,
    }
  }
  const graphData = buildGraphData()

  useEffect(() => {
    finalReport?.user_id != user?.id && router.push('/')
  }, [finalReport?.user_id, router, user?.id])

  return (
    <>
      <LayoutDefault>
        {isQuizRoute && <Quiz />}
        <Head title="Dashboard" />
        <NavTabs value={currentTab} onValueChange={handleNavValueChange}>
          <div className="overflow-hidden bg-blue-300">
            <Container>
              {/* <NavTabsList
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              ref={navTabList}
            >
              <NavTabsTrigger
                ref={navButtons['action-plan']}
                value="action-plan"
              >
                Action Plan
              </NavTabsTrigger>
              <NavTabsTrigger ref={navButtons['profile']} value="profile">
                Profile
              </NavTabsTrigger>
              <NavTabsTrigger
                ref={navButtons['full-program']}
                value="full-program"
              >
                Full Program
              </NavTabsTrigger>
            </NavTabsList> */}
            </Container>
          </div>
          <NavTabsContent value="action-plan">
            <Container className="mb-20 mt-5 flex min-h-screen flex-col gap-5">
              <Typography variant={'heading-l'} className="mb-10">
                Your program
              </Typography>
              {/* <ModuleCard /> */}
              <ActionCard
                onClick={scrollToBottom}
                buttonLabel="Add more modules"
              >
                <Typography variant={'text-md'}>
                  Welcome to your personalised Hearing Wellbeing Program! These
                  modules are recommended based on what you’ve told us. You can
                  complete them in any order and repeat them as often as you’d
                  like.
                </Typography>
              </ActionCard>
              {userModules?.length > 0 &&
                userModules?.map((module, index) => {
                  const profileValue = module?.score || 0
                  const colourForModule =
                    profileValue < 2
                      ? 'green'
                      : profileValue < 4
                        ? 'yellow'
                        : 'red'

                  const moduleProgressData = moduleProgressServerData?.find(
                    (item) => Number(item?.id) === Number(module?.module_id),
                  )
                  return (
                    <>
                      <TopicCard
                        key={`${module.Module?.name}-${index}`}
                        border={false}
                        title={module.Module?.category}
                        colour={colourForModule}
                      />
                      <ModuleCard
                        moduleId={module.module_id}
                        title={module.Module?.name}
                        // @ts-ignore
                        status={
                          moduleProgressData?.completed
                            ? 'in-progress'
                            : 'not-started'
                        }
                        progress={Math.round(
                          (moduleProgressData?.completed /
                            moduleProgressData?.total) *
                          100,
                        )}
                        progressMeta={`${moduleProgressData?.completed}/${moduleProgressData?.total}`}
                        hasStrategies={isActivityUnlocked(
                          module.module_id,
                          module?.Sessions,
                        )}
                        newStrategy={true}
                      />
                      {/* <CardProgress
                    key={`${module.name}-${index}`}
                    title={module.name}
                    // @ts-ignore
                    status={moduleProgress.status}
                    href={`module/${module.id}`}
                    progressMeta={moduleProgress.meta}
                    progress={moduleProgress.percentage}
                  /> */}
                    </>
                  )
                })}
              <Typography className="mb-5 mt-20" variant={'heading-l'}>
                Your overall profile
              </Typography>
              <div className="m-auto w-full max-w-md p-3">
                <HeatGraph labels={graphData.labels} data={graphData.data} />
              </div>
              {finalReport?.user_id === user?.id ? (
                <ActionCard
                  onClick={handleRebuildProfileClick}
                  buttonLabel="Update your profile"
                  IsIcon
                >
                  Welcome to your action plan. The order of modules in your
                  action plan is tailored to you, based on your profile results.
                  This is simply a recommended flow—you can complete modules in
                  any order.
                </ActionCard>
              ) : null}
              {/* <div className="mb-5 flex flex-row items-center">
                <Typography className="text-neutral-dark" variant={'text-md'}>
                  Last updated {timeSinceLastQuiz}
                </Typography>
                <Button variant={'link'} onClick={handleRebuildProfileClick}>
                  <Typography variant={'text-md'}>Update</Typography>
                </Button>
              </div> */}
              <Typography className="mb-5 mt-20" variant={'heading-l'}>
                {moduleData?.length - (userModules?.length || 0)} modules not in
                your plan
              </Typography>
              <Typography
                className="mb-5 mt-4 text-neutral-dark"
                variant={'text-md'}
              >
                You’re strong in these areas already, so these modules aren’t in
                your plan. You can still complete them to further build your
                capability.
              </Typography>
              <div>
                <Link href="/dashboard/edit">
                  <Button noPadding variant={'link'}>
                    Show modules
                  </Button>
                </Link>
              </div>
            </Container>
          </NavTabsContent>
          <NavTabsContent value="profile">
            <Container>Profile</Container>
          </NavTabsContent>
          <NavTabsContent value="full-program">
            <Container>Full program</Container>
          </NavTabsContent>
        </NavTabs>
      </LayoutDefault>
    </>
  )
}

export default withUser(Dashboard)
