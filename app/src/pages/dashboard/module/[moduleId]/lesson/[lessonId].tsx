'use client'
import {
  selectLessonForId,
  selectStrategyForId,
  selectTooltipForId,
  selectorModule,
  setCurrentTooltip,
} from '@/features/soundfair/modules'
import {
  completeLesson,
  selectorLessonProgressForId,
  startLesson,
  unlockLessons,
  unlockStrategy,
  updateLessonProgress,
} from '@/features/soundfair/userData'
import { CardProgress } from '@ui/components/base/CardProgress'
import { Container } from '@ui/components/base/Grid'
import { Typography } from '@ui/components/base/Typography'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModulePage from '../../[moduleId]'
import { Progress } from '@ui/components/base/Progress'
import { Button } from '@ui/components/base/Button'
import { RadioGroup } from '@ui/components/base/Form/RadioGroup'
import cx from 'clsx'
import { Icon } from '@ui/components/base/Icon'
import { TransitionSlide } from '@ui/components/base/Transitions'
import { LayoutDefault } from '@/features/common/layouts/LayoutDefault'
import { fetchSessionById } from '@/slices/sessionSlice'
import {
  fetchAllTips,
  initialState,
  setSessionProgress,
  setFinalSessionProgress,
  setModuleProgress,
  fetchMyModuleProgress,
} from '@/features/soundfair/userSession'
import { current } from '@reduxjs/toolkit'
import { api } from '@/api/client'
import { RootState } from '@/features/common/store'

export default function LessonPage() {
  const dispatch = useDispatch()
  const staticProgress = [
    {
      id: 19,
      completed: 4,
      total: 8,
      tips: [
        {
          id: 4,
          completed: 1,
          total: 4,
        },
        // {
        //   id: 17,
        //   completed: 5,
        //   total: 5,
        // },
      ],
    },
  ]

  const router = useRouter()
  const { moduleId, lessonId } = router.query
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { currentSession, finalSession } = useSelector(
    (state) => state?.userSession,
  )

  const lessonProgress = useSelector(
    selectorLessonProgressForId(lessonId as string),
  )

  const [currentIndex, setCurrentIndex] = React.useState(-1)

  // const currentIndex = useMemo(() => {
  //   if (
  //     currentSession?.currentIndex === null ||
  //     currentSession?.currentIndex === undefined
  //   )
  //     return -1
  //   return currentSession?.currentIndex
  // }, [currentSession?.currentIndex])

  const [direction, setDirection] = React.useState('forward')

  const lesson = useSelector(selectLessonForId(lessonId as string))

  //progress

  const { session } = useSelector((state) => state?.adminSession)

  const singleModule = useSelector((state) => state?.modules?.singleModule)
  const { user } = useSelector((state: RootState) => state?.auth)
  const { unlockedSession, moduleProgress } = useSelector(
    (state) => state?.userSession,
  )

  const tooltip = useSelector(
    selectTooltipForId(lesson?.lessonSteps[currentIndex]?.tooltip as string),
  )
  const currentLessonNumber = singleModule?.Sessions?.findIndex(
    (value: any) => Number(value?.session_id) === Number(lessonId),
  )

  const nextLessonIdInModule =
    currentLessonNumber !== undefined
      ? singleModule?.Sessions[currentLessonNumber + 1]
      : undefined

  const nextLesson = useSelector(
    selectLessonForId(nextLessonIdInModule as string),
  )

  // const strategy = useSelector(
  //   selectStrategyForId(lesson?.strategies as string),
  // )

  const tips = useMemo(() => {
    if (!currentSession?.tips || !currentSession?.tips?.length) return []
    const clone = [...currentSession.tips]
    return clone
  }, [currentSession.tips])

  const currentLessonStep = useMemo(() => {
    if (!tips.length || currentIndex === -1) return {}
    const clone = [...tips]
    return clone[currentIndex]
  }, [currentIndex, tips])

  const troubleshoot = useMemo(() => {
    if (
      currentLessonStep &&
      (currentLessonStep?.troubleshoot_description ||
        currentLessonStep?.troubleshoot_info_title ||
        currentLessonStep?.troubleshoot_title)
    ) {
      const {
        troubleshoot_description,
        troubleshoot_title,
        troubleshoot_info_title,
      } = currentLessonStep
      return {
        troubleshoot_description,
        troubleshoot_title,
        troubleshoot_info_title,
      }
    } else return null
  }, [currentLessonStep])

  const strategy = useMemo(() => {
    if (session && session?.type === 'Activity') {
      const { type, activity_title, activity_description, activity_file } =
        session
      return {
        type,
        activity_title,
        activity_description,
        activity_file,
      }
    } else return null
  }, [session])

  const hasStrategy = strategy ? true : false

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (currentIndex !== -1) {
      let currentProgress = [...moduleProgress]

      const currentModuleIndex = currentProgress?.findIndex(
        (item) => Number(item?.id) === Number(moduleId),
      )

      const currentSessionIndex = currentProgress
        ?.find((item) => Number(item?.id) === Number(moduleId))
        ?.sessions?.findIndex((item) => Number(item?.id) === Number(lessonId))

      currentProgress = currentProgress?.map((module, index) => {
        if (Number(module?.id) === Number(moduleId)) {
          return {
            ...module,
            completed:
              currentIndex + 1 === tips.length &&
                currentProgress[currentModuleIndex].total !==
                currentProgress[currentModuleIndex].completed
                ? module.completed + 1
                : module.completed,
            sessions: module?.sessions?.map((session) => {
              if (Number(session?.id) === Number(lessonId)) {
                if (currentIndex + 1 >= session?.completed) {
                  return {
                    ...session,
                    completed: currentIndex,
                  }
                } else {
                  return session
                }
              } else {
                return session
              }
            }),
          }
        } else {
          return module
        }
      })

      if (
        currentProgress[currentModuleIndex]?.sessions[currentSessionIndex]
          ?.completed !==
        moduleProgress[currentModuleIndex]?.sessions[currentSessionIndex]
          ?.completed ||
        currentProgress[currentModuleIndex]?.completed !==
        moduleProgress[currentModuleIndex]?.completed
      ) {
        dispatch(setModuleProgress(currentProgress))
        api.modules.addMyProgress({
          user_id: user?.id,
          progress_data: currentProgress,
        })
      }
    }
  }, [currentIndex, moduleId, lessonId])

  const handleStartClick = () => {
    const currentModuleIndex = moduleProgress?.findIndex(
      (item) => Number(item?.id) === Number(moduleId),
    )

    const currentSessionIndex = moduleProgress
      ?.find((item) => Number(item?.id) === Number(moduleId))
      ?.sessions?.findIndex((item) => Number(item?.id) === Number(lessonId))
    setCurrentIndex(
      moduleProgress?.[currentModuleIndex]?.sessions?.[currentSessionIndex]
        ?.completed || 0,
    )
  }

  const handleCancelClick = () => {
    // Go Back to Module Page
    router.push({
      pathname: `/dashboard/module/${moduleId}`,
    })
  }

  const handleBackClick = () => {
    setDirection('back')
    setCurrentIndex(-1)
  }

  const handleNextClick = () => {
    setDirection('forward')
    scrollToTop()
    setCurrentIndex(currentIndex + 1)
  }

  const getCurrentPercentage = () => {
    return ((currentIndex + 1) / tips?.length) * 100
  }

  const isIntro = useMemo(() => currentIndex === -1, [currentIndex])

  const isEnd = useMemo(
    () => currentIndex === tips?.length,
    [currentIndex, tips?.length],
  )

  React.useEffect(() => {
    if (isEnd) {
      dispatch(completeLesson(lessonId as string))
      if (nextLessonIdInModule) {
        dispatch(unlockLessons([nextLessonIdInModule as string]))
      }

      if (hasStrategy && strategy) {
        dispatch(unlockStrategy(strategy.id))
      }
    }
  }, [isEnd])

  // React.useEffect(() => {
  //   dispatch(
  //     setSessionProgress({
  //       ...currentSession,
  //       session_id: lessonId,
  //     }),
  //   )
  // }, [dispatch, lessonId])

  const moduleProgressData = useMemo(() => {
    return moduleProgress
      ? moduleProgress?.find((item) => Number(item?.id) === Number(moduleId))
      : []
  }, [lessonId])

  React.useEffect(() => {
    if (lessonId) {
      dispatch(fetchAllTips({ params: { session_id: lessonId } }))
      dispatch(fetchSessionById({ params: { session_id: lessonId } }))
      dispatch(fetchMyModuleProgress({ params: { user_id: user?.id } }))
    }
  }, [dispatch, lessonId])

  const handleLessonCardClick = (lessonId: string) => {
    // Set to Start of Lesson
    // dispatch(
    //   setSessionProgress({
    //     session_id: lessonId,
    //     currentIndex: -1,
    //   }),
    // )
    setCurrentIndex(-1)
    router.push({
      pathname: `/dashboard/module/${moduleId}/lesson/${lessonId}`,
    })
  }

  const handleTooltipClick = (tooltipId: string, troubleshoot: any) => {
    dispatch(setCurrentTooltip(troubleshoot))
  }

  const lessonIcon = (lessonType: string) => {
    switch (lessonType) {
      case 'Reading':
        return 'book'
      case 'Activity':
        return 'brain'
      case 'Strategy':
        return 'star'
      default:
        return 'folder'
    }
  }

  return (
    <>
      <div
        ref={scrollRef}
        className={cx(
          'lesson-overlay fixed inset-0 z-50 overflow-auto',
          session?.type === 'Reading' && !isIntro && !isEnd
            ? 'bg-blue-400'
            : 'bg-white',
        )}
      >
        <LayoutDefault>
          <Container className="quiz-header flex-col pt-3 text-center">
            <div
              className={
                'my-5 flex' + (!isIntro ? ' justify-between' : 'justify-center')
              }
            >
              {!isIntro && (
                <Button
                  icon="back"
                  onClick={handleBackClick}
                  className="flex flex-row-reverse"
                  variant={'link'}
                >
                  Back
                </Button>
              )}
              {!isIntro && !isEnd && (
                <Typography variant={'text-sm'} className="text-neutral-dark">
                  Step {currentIndex + 1} of {tips?.length}
                </Typography>
              )}
              {isIntro && (
                <Button
                  icon="close"
                  onClick={handleCancelClick}
                  className=" flex flex-row [&_i]:px-1 [&_i]:py-1"
                  variant={'link'}
                >
                  Exit
                </Button>
              )}
            </div>
            {!isIntro && !isEnd && (
              <Progress variant="secondary" value={getCurrentPercentage()} />
            )}
          </Container>
          <Container
            // Must Set Height to be Max, - Nav Height - Sticky Button Area Height
            style={{ minHeight: 'calc(100vh - 86px - 45px)' }}
            className="py-12"
          >
            {isIntro ? (
              <>
                <Typography variant={'heading-l'}>{session?.name}</Typography>
                <Typography
                  className="mt-4 text-neutral-dark"
                  variant={'body-s'}
                >
                  <Icon
                    circle={false}
                    className="mr-2 text-neutral-dark"
                    name={lessonIcon(session?.type)}
                  />
                  {session?.type}
                  <span className="ml-5">{session?.reading_time}</span>
                </Typography>
                <Typography
                  className="mt-4 whitespace-pre-wrap [&>*]:my-4"
                  variant={'body'}
                  dangerouslySetInnerHTML={{ __html: session?.description }}
                />
              </>
            ) : isEnd ? (
              hasStrategy && strategy ? (
                <>
                  <Typography className="mb-5 text-center" variant={'h1-sm'}>
                    You've collected a strategy
                  </Typography>
                  <CardProgress
                    icon={'Masks'}
                    type="Strategy"
                    title={strategy?.activity_title || ''}
                    status="not-started"
                    description={strategy.activity_description || ''}
                    href={`/dashboard/module/${moduleId}/lesson/${lessonId}/strategy/${session?.session_id}`}
                  />
                  <Typography className="mt-5 text-center" variant={'text-lg'}>
                    You now have everything you need to practice this Strategy
                    everyday.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography className="text-center" variant={'h1-sm'}>
                    You've completed '{session?.name}'
                  </Typography>
                  {nextLessonIdInModule && (
                    <>
                      <Typography
                        className="mb-5 mt-10 text-center text-neutral-dark"
                        variant={'text-sm'}
                      >
                        Continue learning
                      </Typography>
                      <CardProgress
                        onClick={() =>
                          handleLessonCardClick(
                            nextLessonIdInModule?.session_id,
                          )
                        }
                        title={nextLessonIdInModule?.name}
                        status="not-started"
                        href={`/dashboard/module/${moduleId}/lesson/${nextLessonIdInModule?.session_id}`}
                        // @ts-ignore
                        type={nextLessonIdInModule?.type}
                      />
                    </>
                  )}
                </>
              )
            ) : (
              currentLessonStep && (
                <>
                  <TransitionSlide
                    reverse={direction === 'back'}
                    keyValue={
                      session?.type === 'Reading'
                        ? (currentIndex + 1).toString()
                        : undefined
                    }
                  >
                    {currentLessonStep?.description && (
                      <Typography
                        className={cx(
                          'mt-4 whitespace-pre-wrap rounded-md bg-white p-2 [&>*]:my-4',
                          session?.type === 'Reading' ? 'p-5' : '',
                        )}
                        variant={'heading-m'}
                        dangerouslySetInnerHTML={{
                          __html: currentLessonStep?.description,
                        }}
                      />
                    )}
                    {currentLessonStep.quote && (
                      <Typography
                        className={cx(
                          'mt-4 whitespace-pre-wrap rounded-md bg-white [&>*]:my-4',
                          session?.type === 'Reading' ? 'p-5' : '',
                        )}
                        variant={
                          session?.type === 'Reading' ? 'heading-m' : 'body'
                        }
                        dangerouslySetInnerHTML={{
                          __html: currentLessonStep.quote,
                        }}
                      />
                    )}
                    {troubleshoot && (
                      <div
                        className={cx(
                          '',
                          session?.type === 'Reading'
                            ? 'mt-2 rounded-md bg-white px-5 pt-5'
                            : '',
                        )}
                      >
                        <Button
                          icon="info"
                          variant="link"
                          onClick={() =>
                            handleTooltipClick(
                              currentLessonStep.tip_id,
                              troubleshoot,
                            )
                          }
                        >
                          {troubleshoot?.troubleshoot_title}
                        </Button>
                      </div>
                    )}
                    <Typography variant={'h1-sm'}>
                      {currentLessonStep.question_title}
                    </Typography>
                    {currentLessonStep?.options && (
                      <RadioGroup
                        label="Choose one option"
                        name="lessonOptions"
                        options={JSON.parse(currentLessonStep?.options)}
                      />
                    )}
                  </TransitionSlide>
                </>
              )
            )}
          </Container>
          <Container className="sticky bottom-0 flex-col">
            {isIntro ? (
              <Button
                onClick={handleStartClick}
                className="mb-5 w-full"
                variant={'primary'}
              >
                Get started
              </Button>
            ) : isEnd ? (
              <Button
                onClick={handleCancelClick}
                className="mb-5 w-full"
                variant={'secondary'}
              >
                Back to Module
              </Button>
            ) : (
              <Button
                onClick={handleNextClick}
                className="mb-5 w-full"
                variant={'primary'}
                icon="next"
              >
                Next
              </Button>
            )}
          </Container>
        </LayoutDefault>
      </div>
      <ModulePage />
    </>
  )
}
