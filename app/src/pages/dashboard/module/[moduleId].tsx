import { LayoutDefault } from '@/features/common/layouts/LayoutDefault'
import {
  getModuleById,
  selectLessonsForIdArray,
  selectStrategiesForModuleId,
  selectorModule,
} from '@/features/soundfair/modules'
import {
  selectorLessonProgress,
  selectorUnlockedLessons,
  selectorUnlockedStrategies,
} from '@/features/soundfair/userData'
import {
  fetchAllSessions,
  fetchMyModuleProgress,
  setModuleProgress,
  setUnlockedSessions,
} from '@/features/soundfair/userSession'
import { Button } from '@ui/components/base/Button'
import { CardProgress } from '@ui/components/base/CardProgress'
import { Container } from '@ui/components/base/Grid'
import { Icon } from '@ui/components/base/Icon'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ui/components/base/Tabs'
import { TransitionExpand } from '@ui/components/base/Transitions'
import { Typography } from '@ui/components/base/Typography'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ModulePage() {
  const router = useRouter()

  const { moduleId } = router.query
  const singleModule = useSelector((state) => state?.modules?.singleModule)
  const { user } = useSelector((state) => state?.auth)
  const dispatch = useDispatch()

  const lessons = useSelector(selectLessonsForIdArray(module?.lessons))

  const { moduleProgress, currentModule, currentSession } = useSelector(
    (state) => state?.userSession,
  )
  const { sessions } = currentModule
  const lessonProgress = useSelector(selectorLessonProgress)

  const [accordionOpen, setAccordion] = React.useState(false)

  const handleAccordionClick = () => {
    setAccordion(!accordionOpen)
  }

  // If came from Strategy Page, set the tab to Practice
  const [currentTab, setCurrentTab] = React.useState('practice')

  React.useEffect(() => {
    if (moduleId) {
      dispatch(fetchAllSessions({ params: { module_id: moduleId } }))
    }
    if (router.query.tab === 'practice') {
      setCurrentTab('practice')
    } else {
      setCurrentTab('learn')
    }
  }, [router.query, setCurrentTab, moduleId])

  React.useEffect(() => {
    if (moduleId) {
      dispatch(getModuleById({ params: { module_id: moduleId } }))
      dispatch(fetchMyModuleProgress({ params: { user_id: user?.id } }))
    }
  }, [dispatch, moduleId])

  const createLessonUrl = (lessonId: string) => {
    return `/dashboard/module/${moduleId}/lesson/${lessonId}`
  }

  const getLessonStatus = (
    lessonId: string,
    allSessions: any,
    sessionProgress: any,
  ) => {
    if (
      sessionProgress?.id === lessonId &&
      sessionProgress?.completed === sessionProgress?.total
    ) {
      return 'completed'
    }
    if (allSessions) {
      let currentSessionIndex = allSessions.findIndex(
        (item) => Number(item?.session_id) === Number(lessonId),
      )
      let isFirstSession = currentSessionIndex === 0

      let allPreviausSession = allSessions.filter(
        (item, index) => index < currentSessionIndex,
      )

      let isAllPreviousSessionIsCompleted =
        allPreviausSession?.filter((item) => {
          let session = moduleProgress
            ?.find((module) => Number(module.id) === Number(moduleId))

            ?.sessions?.find(
              (session) => Number(session?.id) === Number(item?.session_id),
            )

          if (session) {
            return session?.completed === session?.total
          } else {
            return false
          }
        }).length === allPreviausSession.length

      if (isFirstSession || isAllPreviousSessionIsCompleted) {
        return 'in-progress'
      }

      return 'locked'
    }

    return 'locked'
  }

  const getLessonProgressPercentage = (lesson: any, sessionProgress: any) => {
    if (sessionProgress) {
      return Math.round(
        (sessionProgress?.completed / sessionProgress?.total) * 100,
      )
    }
    return 0
  }

  const getlessonProgressMeta = (lesson: any, sessionProgress: any) => {
    if (!sessionProgress) {
      return 'Not Started'
    }
    if (sessionProgress?.completed === sessionProgress?.total) {
      return 'Completed'
    }
    if (!sessionProgress?.completed) {
      return 'Not Started'
    }
    return `${sessionProgress?.completed} / ${sessionProgress?.total} complete`
  }

  const getStrategyStatus = (strategyId: string, sessionProgress) => {
    if (sessionProgress?.id === strategyId) {
      return 'not-started'
    }

    return 'locked'
  }

  const createStrategyUrl = (strategyId: string) => {
    return `/dashboard/module/${moduleId}/strategy/${strategyId}`
  }

  const handleBackClick = () => {
    router.push({
      pathname: `/dashboard`,
    })
  }

  const isActivityUnlocked = useMemo(() => {
    if (!sessions || !moduleProgress || !moduleId) return false
    const cloneSessions = [...sessions]
    const progressModules = [...moduleProgress]
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
  }, [moduleId, moduleProgress, sessions])

  const unlockedActivities = useMemo(() => {
    if (!sessions || !moduleProgress || !moduleId) return []
    const cloneSessions = [...sessions]
    const progressModules = [...moduleProgress]
    let completedSessions = []

    const activities = cloneSessions.filter(
      (session) => session?.type === 'Activity',
    )

    progressModules.forEach((module) => {
      if (module.id === Number(moduleId)) {
        const progressSessions = [...module?.sessions]
        completedSessions = progressSessions
          .filter((val) => val?.total === val?.completed)
          .map((v) => v.id)
      }
    })
    return activities.filter((val) =>
      completedSessions.includes(val.session_id),
    )
  }, [moduleId, moduleProgress, sessions])

  return (
    <LayoutDefault>
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <div className="module-header">
          <Container>
            <Button icon="back" variant={'link'} onClick={handleBackClick}>
              Back
            </Button>
            <Typography variant={'h1-sm'}>{singleModule?.name}</Typography>
            <div className="accordion mt-5 border-b border-t border-neutral">
              <button
                onClick={handleAccordionClick}
                className="flex w-full flex-row items-center justify-between py-4"
              >
                What&apos;s in this module?
                <Icon
                  className={`h-[35px] w-[35px] text-blue transition-transform`}
                  style={{
                    transform: `rotate(${accordionOpen ? '180deg' : '0deg'})`,
                  }}
                  name="down"
                  circle={false}
                />
              </button>
              <TransitionExpand isVisible={accordionOpen}>
                <div
                  className="pb-5 [&>*]:my-4"
                  dangerouslySetInnerHTML={{
                    __html: singleModule?.description,
                  }}
                />
              </TransitionExpand>
            </div>
            <div>
              <TabsList className="mt-5">
                <TabsTrigger value="learn">Learn</TabsTrigger>
                {isActivityUnlocked ? (
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                ) : null}
              </TabsList>
            </div>
          </Container>
        </div>
        <TabsContent className="mb-20" value="learn">
          {sessions?.length ? (
            sessions.map((session) => {
              const sessionProgress = moduleProgress
                ?.find((item) => Number(item?.id) === Number(moduleId))
                ?.sessions?.find(
                  (item) => Number(item.id) === Number(session.session_id),
                )

              return (
                <Container
                  key={session.session_id}
                  className="my-5 flex flex-col gap-5"
                >
                  <CardProgress
                    key={session.session_id}
                    // @ts-ignore
                    type={session.type}
                    title={session.name}
                    status={getLessonStatus(
                      session.session_id,
                      sessions,
                      sessionProgress,
                    )}
                    href={createLessonUrl(session.session_id)}
                    meta={session.reading_time}
                    progress={getLessonProgressPercentage(
                      session,
                      sessionProgress,
                    )}
                    progressMeta={getlessonProgressMeta(
                      session,
                      sessionProgress,
                    )}
                  />
                </Container>
              )
            })
          ) : (
            <p className="mt-2 w-full text-center">No Lessons</p>
          )}
        </TabsContent>
        <TabsContent className="mb-20" value="practice">
          {unlockedActivities?.length
            ? unlockedActivities?.map((strategy) => {
              const sessionProgress = moduleProgress
                ?.find((item) => Number(item?.id) === Number(moduleId))
                ?.sessions?.find(
                  (item) => Number(item.id) === Number(strategy.session_id),
                )
              return (
                <Container
                  key={strategy?.session_id}
                  className="my-5 flex flex-col gap-5"
                >
                  <CardProgress
                    key={strategy?.session_id}
                    type={'Strategy'}
                    title={strategy?.activity_title}
                    status={getStrategyStatus(
                      strategy?.session_id,
                      sessionProgress,
                    )}
                    href={createStrategyUrl(strategy?.session_id)}
                    description={strategy?.activity_description}
                    icon={'Masks'}
                  />
                </Container>
              )
            })
            : null}
        </TabsContent>
      </Tabs>
    </LayoutDefault>
  )
}
