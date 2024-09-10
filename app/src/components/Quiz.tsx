import { useEffect, useState, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// Steps
import { Typography } from '@ui/components/base/Typography'
import { Button } from '@ui/components/base/Button'
import { Container } from '@ui/components/base/Grid'
import { RadioGroup } from '@ui/components/base/Form/RadioGroup'
import { Progress } from '@ui/components/base/Progress'
import { selectorQuiz, selectorQuizQuestions } from '@/features/soundfair/quiz'
import {
  selectorTopicArea,
  selectorTopicAreas,
} from '@/features/soundfair/topics'
import {
  addModule,
  completeQuiz,
  setProfile,
  unlockLessons,
} from '@/features/soundfair/userData'
import { CheckboxGroup } from '@ui/components/base/Form/CheckboxGroup'
import {
  getModuleByUser,
  selectTooltipForId,
  selectorModules,
  setCurrentTooltip,
} from '@/features/soundfair/modules'
import HeatGraph from './HeatGraph'
import { TransitionFade } from '@ui/components/base/Transitions'
import { Icon } from '@ui/components/base/Icon'
import cx from 'clsx'
import {
  addFinalReport,
  setFinalQuestionValue,
  setIsEdit,
  setQuizResultMatrix,
  updateFinalReport,
} from '@/features/soundfair/quizResult'
import { api } from '@/api/client'
import { updateToast } from '@/features/toast'
import TooltipDrawer from '@/features/soundfair/TooltipDrawer'

const TopicCard = ({
  title,
  description,
  colour = 'green',
}: {
  title: string
  description: string
  colour?: 'red' | 'green' | 'yellow'
}) => {
  return (
    <div className="mt-8 flex flex-col gap-2 border-b border-neutral-dark pb-4">
      <Typography variant={'h3'} className="inline-flex items-center">
        <div
          className={cx('marker mr-2 h-4 w-4 rounded-lg', {
            'bg-green': colour === 'green',
            'bg-yellow': colour === 'yellow',
            'bg-red': colour === 'red',
          })}
        />
        {title}
      </Typography>
      <Typography
        dangerouslySetInnerHTML={{ __html: description }}
        className="text-neutral-dark [&>*]:my-4"
        variant={'body-s'}
      ></Typography>
    </div>
  )
}

function StoryLayoutManager({
  stories,
  loopStories = false,
  onStoryComplete,
  scrollToTop,
}: any) {
  const [currentStory, setCurrentStory] = useState(-1)
  const { reportLoading } = useSelector((state) => state?.quizResult)
  const storyIntervalinSeconds = 10
  const startDelayInSeconds = 0.1

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined
    if (currentStory === -1) {
      interval = setTimeout(() => {
        setCurrentStory(0)
      }, startDelayInSeconds * 1000)
    } else {
      interval = setInterval(() => {
        setCurrentStory((currentStory) => {
          if (scrollToTop) {
            scrollToTop()
          }
          if (currentStory === stories.length - 1) {
            if (!loopStories) {
              return stories.length - 1
            }
            return -1
          } else {
            return currentStory + 1
          }
        })
      }, storyIntervalinSeconds * 1000)
    }

    return () => clearInterval(interval)
  }, [currentStory])

  const handleStoryNext = () => {
    if (scrollToTop) {
      scrollToTop()
    }
    if (currentStory === stories.length - 1) {
      if (!loopStories) {
        onStoryComplete()
      } else {
        setCurrentStory(-1)
      }
    } else {
      setCurrentStory(currentStory + 1)
    }
  }

  return (
    <>
      <Container>
        <div className="story wrapper">
          <div className="story-header">
            <div className="story-header__title my-5 text-center text-body-s">
              Your Hearing Wellbeing Profile
            </div>
            <div className="flex flex-row gap-2">
              {stories.map((_: any, index: any) => (
                <div
                  key={index}
                  className="story-progress-bar relative h-[8px] w-full rounded bg-blue-50"
                >
                  {currentStory > index ? (
                    <div className="story-progress-bar__indicator--complete h-[8px] w-full rounded bg-green"></div>
                  ) : (
                    <div
                      className="story-progress-bar__indicator h-[8px] w-[0%] animate-pulse rounded bg-green transition-all"
                      style={{
                        transition:
                          currentStory === index
                            ? `width ${storyIntervalinSeconds}s linear`
                            : 'none',
                        width: currentStory === index ? '100%' : '0%',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="story-content">{stories[currentStory]}</div>
        </div>
      </Container>
      <Container className="sticky bottom-0 mt-20 flex-col">
        <Button
          onClick={handleStoryNext}
          className="mb-5 w-full"
          variant={'primary'}
        >
          {!loopStories && currentStory === stories.length - 1
            ? reportLoading
              ? 'loading'
              : 'Done'
            : 'Next'}
        </Button>
      </Container>
    </>
  )
}

export function QuizOutro({ data, scrollToTop }: any) {
  const dispatch = useDispatch()
  const modules = useSelector(selectorModules)
  const topicAreas = useSelector(selectorTopicAreas)
  const router = useRouter()
  const { finalQuestionValue, quizResultMatrix, isEdit } = useSelector(
    (state) => state?.quizResult,
  )
  const { user } = useSelector((state) => state?.auth)
  const quizQuestions = useSelector(selectorQuizQuestions)
  const { finalReport, reportLoading } = useSelector(
    (state) => state?.quizResult,
  )

  useEffect(() => {
    console.log('Quiz Completed - Running Effect')
    dispatch(completeQuiz())
    dispatch(setProfile(data))
    const lessonsToUnlock: string[] = []
    const modulesToUnlock: string[] = []
    Object.entries<any>(data).forEach(([topicId, value]) => {
      const module = Object.values(modules).find(
        (module) => module.topicArea === topicId,
      )
      if (value > 3 && module) {
        modulesToUnlock.push(module.id)
        lessonsToUnlock.push(module.lessons[0])
      }
    })
    modulesToUnlock.forEach((moduleId) => {
      dispatch(addModule(moduleId))
    })
    // dispatch(unlockLessons(lessonsToUnlock))
  }, [data])

  const dataForHeatGraph = () => {
    const graphData = []
    const labels = []

    for (const [key, value] of Object.entries(topicAreas)) {
      graphData.push(data[key])
      labels.push(value.name)
    }

    return {
      labels,
      data: graphData,
    }
  }

  const bindGraphData = (
    graphData: number[],
    binding?: 'strong' | 'medium' | 'weak',
  ) => {
    return graphData.map((value) => {
      if (binding === 'strong') {
        if (value >= 2) {
          return 0
        } else return value
      } else if (binding === 'medium') {
        if (value < 2 || value >= 4) {
          return 0
        } else return value
      } else if (binding === 'weak') {
        if (value < 4) {
          return 0
        } else return value
      }
      return value
    })
  }

  const graphData = dataForHeatGraph()

  const getTopicsForStrength = (strength: 'strong' | 'medium' | 'weak') => {
    const topics: any[] = []
    Object.entries<any>(data).forEach(([topicId, value]) => {
      if (value > 3 && strength === 'weak') {
        topics.push(topicId)
      } else if (value >= 2 && value < 4 && strength === 'medium') {
        topics.push(topicId)
      } else if (value < 2 && strength === 'strong') {
        topics.push(topicId)
      }
    })
    return topics
  }

  const StrongAreas = (
    <TransitionFade keyValue="StrongAreas">
      <div className="mt-8">
        <Typography variant={'heading-m-bold'} className="mb-9 text-center">
          Strengths
        </Typography>
        <div className="m-auto w-full max-w-md px-8">
          <HeatGraph
            labels={graphData.labels}
            data={bindGraphData(graphData.data, 'strong')}
          />
        </div>
        <Typography className="mt-9" variant={'h3'}>
          Your strengths are where you are managing well - high five!
        </Typography>
        {getTopicsForStrength('strong').map((topicId) => {
          const topicArea = topicAreas[topicId]
          return (
            <TopicCard
              key={topicId}
              colour="green"
              title={topicArea.name}
              description={topicArea.description['strong']}
            />
          )
        })}
      </div>
    </TransitionFade>
  )

  const MediumAreas = (
    <TransitionFade keyValue="MediumAreas">
      <div className="mt-8">
        <Typography variant={'heading-m-bold'} className="mb-9 text-center">
          Challenges
        </Typography>
        <div className="m-auto w-full max-w-md px-8">
          <HeatGraph
            labels={graphData.labels}
            data={bindGraphData(graphData.data, 'medium')}
          />
        </div>
        <Typography className="mt-9" variant={'h3'}>
          Challenges are where you have some difficulties due to your hearing
          loss.
        </Typography>
        {getTopicsForStrength('medium').map((topicId) => {
          const topicArea = topicAreas[topicId]
          return (
            <TopicCard
              key={topicId}
              colour="yellow"
              title={topicArea.name}
              description={topicArea.description['neutral']}
            />
          )
        })}
      </div>
    </TransitionFade>
  )

  const WeakAreas = (
    <TransitionFade keyValue="WeakAreas">
      <div className="mt-8">
        <Typography variant={'heading-m-bold'} className="mb-9 text-center">
          Focus Areas
        </Typography>
        <div className="m-auto w-full max-w-md px-8">
          <HeatGraph
            labels={graphData.labels}
            data={bindGraphData(graphData.data, 'weak')}
          />
        </div>
        <Typography className="mt-9" variant={'h3'}>
          Your focus areas are where hearing loss impacts your life the most.
        </Typography>
        {getTopicsForStrength('weak').map((topicId) => {
          const topicArea = topicAreas[topicId]
          return (
            <TopicCard
              key={topicId}
              colour="red"
              title={topicArea.name}
              description={topicArea.description['weak']}
            />
          )
        })}
      </div>
    </TransitionFade>
  )

  const Overall = (
    <TransitionFade keyValue="Overall">
      <div className="mt-8">
        <Typography
          variant={'heading-m-bold'}
          className="mb-9 text-center text-green"
        >
          Overall
        </Typography>
        <div className="m-auto w-full max-w-md px-8">
          <HeatGraph labels={graphData.labels} data={graphData.data} />
        </div>
        <Typography className="mb-2 mt-9" variant={'h3'}>
          It's ok if you see lots of orange and red right now, we've designed a
          personalised action plan to support you to strengthen these areas.
        </Typography>
        <Typography className="mb-2" variant={'h3'}>
          Your profile will change as you learn new strategies in the program.
          The questionnaire is a great tool to help benchmark your progress as
          you move through modules. We’ll remind you to revisit the
          questionnaire from time to time as a way to track your wellbeing.
        </Typography>
        <Typography className="mb-2" variant={'h3'}>
          What’s next?
        </Typography>
        <Typography className="mb-2" variant={'h3'}>
          We’ve put together a tailored action plan so you can begin
          strengthening your focus areas and improve your hearing wellbeing.
        </Typography>
        {getTopicsForStrength('weak').map((topicId) => {
          const topicArea = topicAreas[topicId]
          return (
            <TopicCard
              key={topicId}
              colour="red"
              title={topicArea.name}
              description={topicArea.description['weak']}
            />
          )
        })}
        {getTopicsForStrength('medium').map((topicId) => {
          const topicArea = topicAreas[topicId]
          return (
            <TopicCard
              key={topicId}
              colour="yellow"
              title={topicArea.name}
              description={topicArea.description['neutral']}
            />
          )
        })}
        {getTopicsForStrength('strong').map((topicId) => {
          const topicArea = topicAreas[topicId]
          return (
            <TopicCard
              key={topicId}
              colour="green"
              title={topicArea.name}
              description={topicArea.description['strong']}
            />
          )
        })}
      </div>
    </TransitionFade>
  )

  let displayStories = []

  if (getTopicsForStrength('strong').length > 0) {
    displayStories.push(StrongAreas)
  }
  if (getTopicsForStrength('medium').length > 0) {
    displayStories.push(MediumAreas)
  }
  if (getTopicsForStrength('weak').length > 0) {
    displayStories.push(WeakAreas)
  }
  displayStories.push(Overall)

  const getLabelColour = (labelIndex: number) => {
    if (labelIndex === 0) return 'transparent'
    return labelIndex < 2 ? '#02D496' : labelIndex < 4 ? '#FFBA62' : '#EF3131'
  }
  const onStoryComplete = async () => {
    try {
      const reportData = Object.entries(quizResultMatrix).map(
        ([key, value]) => {
          return {
            category: topicAreas[key].name,
            score: value,
            color: getLabelColour(value || 0),
          }
        },
      )
      if (isEdit && Object.entries(finalReport).length) {
        dispatch(
          updateFinalReport({
            report_id: finalReport?.report_id,
            report_data: reportData,
          }),
        ).then((res: any) => {
          const { message } = res?.payload
          dispatch(setFinalQuestionValue([]))
          dispatch(
            updateToast({
              open: true,
              message: message || '',
              variant: 'success',
            }),
          )
          dispatch(setIsEdit(false))
          dispatch(getModuleByUser({ params: { user_id: user.id } }))
        })
      } else {
        dispatch(addFinalReport({ report_data: reportData })).then(
          (res: any) => {
            const { message } = res?.payload
            dispatch(setFinalQuestionValue([]))
            dispatch(
              updateToast({
                open: true,
                message: message || '',
                variant: 'success',
              }),
            )
          },
        )
      }
    } catch (error) {
      dispatch(
        updateToast({
          open: true,
          message: error?.message || '',
          variant: 'error',
        }),
      )
    }

    //     return response?.data?.result

    router.push('/dashboard')
  }

  return (
    <StoryLayoutManager
      scrollToTop={scrollToTop}
      stories={displayStories}
      onStoryComplete={onStoryComplete}
    />
  )
}

export function QuizIntro() {
  const quiz = useSelector(selectorQuiz)

  return (
    <div>
      <Typography className="my-8" variant={'heading-l'}>
        {quiz.title}
      </Typography>
      <Typography className="mb-8 text-neutral-dark" variant={'body-s'}>
        <Icon name="clock" className="mr-2 bg-transparent" />
        {quiz.timeToComplete} to complete
      </Typography>
      <Typography
        variant={'body'}
        className="mt-8 [&>*]:my-4"
        dangerouslySetInnerHTML={{ __html: quiz.description }}
      />
    </div>
  )
}

export default function Quiz() {
  const dispatch = useDispatch()
  const router = useRouter()

  const { finalQuestionValue, quizResultMatrix, isEdit } = useSelector(
    (state) => state?.quizResult,
  )
  const scrollRef = useRef(null)

  const [currentIndex, setIndex] = useState(-1)
  const quizQuestions = useSelector(selectorQuizQuestions)
  const currentQuestion = quizQuestions[currentIndex]

  const [currentValue, setCurrentValue] = useState('1')
  const relatedTopic = currentQuestion?.relatedTopic

  const topicAreas = useSelector(selectorTopicAreas)

  const topicArea = useSelector(selectorTopicArea(relatedTopic))

  const tooltip = useSelector(
    selectTooltipForId(currentQuestion?.tooltip as string),
  )

  const isQuizIntro = useMemo(() => {
    return currentIndex === -1
  }, [currentIndex])

  const getCurrentPercentage = () => {
    return ((currentIndex + 1) / quizQuestions.length) * 100
  }

  const scrollToTop = () => {
    // @ts-ignore
    scrollRef?.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleNextClick = () => {
    if (relatedTopic) {
      const currentValueNumber = parseInt(currentValue)
      const local = { ...quizResultMatrix }
      if (!local[relatedTopic]) {
        local[relatedTopic] = 0
      }
      local[relatedTopic] = currentValueNumber
      if (finalQuestionValue.length > 0) {
        finalQuestionValue.forEach((topicId: string) => {
          if (!local[topicId]) {
            local[topicId] = 0
          }
          local[topicId] += 3
        })
      }
      dispatch(setQuizResultMatrix(local))
    }
    scrollToTop()
    const nextQuestion = quizQuestions[currentIndex + 1]

    const nextFirstValue =
      nextQuestion?.questionOptions && nextQuestion.questionOptions[0].value
    setIndex(currentIndex + 1)

    setCurrentValue(nextFirstValue || '')
  }

  const handleBackClick = () => {
    const backQuestion = quizQuestions[currentIndex - 1]
    const nextFirstValue =
      backQuestion &&
      backQuestion.questionOptions &&
      backQuestion.questionOptions[0].value
    setCurrentValue(nextFirstValue || '')
    setIndex(currentIndex - 1)
  }

  const handleCancelClick = () => {
    if (isEdit) dispatch(setIsEdit(false))
    router.push('/dashboard')
  }

  const handleFinalQuestionValue = (newValue: any) => {
    if (newValue.length <= 3) {
      dispatch(setFinalQuestionValue(newValue))
    }
  }

  const handleTooltipClick = (tooltipId: string, tooltip: any) => {
    dispatch(setCurrentTooltip(tooltip))
  }

  return (
    <div ref={scrollRef} className="fixed inset-0 z-50 overflow-auto bg-white">
      {currentIndex >= quizQuestions.length ? (
        <QuizOutro scrollToTop={scrollToTop} data={quizResultMatrix} />
      ) : (
        <>
          <Container className="quiz-header flex-col pt-3 text-center">
            {isQuizIntro && (
              <Button
                onClick={handleCancelClick}
                className="flex flex-row [&_i]:px-1 [&_i]:py-1"
                variant={'link'}
                icon="close"
              >
                Cancel
              </Button>
            )}
            <div
              className={
                'flex' + (!isQuizIntro ? ' justify-between' : 'justify-center')
              }
            >
              {!isQuizIntro && (
                <Button
                  icon="back"
                  onClick={handleBackClick}
                  className="flex flex-row-reverse"
                  variant={'link'}
                >
                  Back
                </Button>
              )}
              {!isQuizIntro && (
                <Typography
                  variant={'text-sm'}
                  className="my-1 text-neutral-dark"
                >
                  Question {currentIndex + 1} of {quizQuestions.length}
                </Typography>
              )}
            </div>
            {!isQuizIntro && (
              <Progress
                className="mt-2"
                variant="secondary"
                value={getCurrentPercentage()}
              />
            )}
          </Container>
          <Container
            // Must Set Height to be Max, - Nav Height - Sticky Button Area Height
            style={{ minHeight: 'calc(100vh - 86px - 45px)' }}
          // className="py-5"
          >
            {isQuizIntro ? (
              <QuizIntro />
            ) : (
              <>
                <Typography className="mt-8">
                  {currentQuestion.questionText}
                </Typography>
                <Typography className="mb-11" variant={'heading-m'}>
                  {currentQuestion.emphasisedText}
                </Typography>
                {tooltip && (
                  <Button
                    icon="info"
                    variant="link"
                    className="mb-8 flex flex-row"
                    onClick={() => handleTooltipClick(tooltip.id, tooltip)}
                  >
                    {tooltip.linkText}
                  </Button>
                )}
                {currentQuestion.questionOptions && (
                  <RadioGroup
                    required
                    defaultValue={currentQuestion.questionOptions[0].value}
                    value={currentValue}
                    onChange={(e: any) => setCurrentValue(e)}
                    label="Choose one option"
                    name="quizOptions"
                    options={currentQuestion.questionOptions}
                  />
                )}
                {currentQuestion.isFinalQuestion && (
                  <CheckboxGroup
                    value={finalQuestionValue}
                    onChange={(e: any) => handleFinalQuestionValue(e)}
                    label="Choose up to 3"
                    name="quizOptions"
                    options={Object.values(topicAreas).map((topicArea) => {
                      return {
                        label: topicArea?.name,
                        value: topicArea?.id,
                        disabled:
                          finalQuestionValue?.length >= 3
                            ? !finalQuestionValue?.includes(topicArea?.id)
                            : false,
                      }
                    })}
                  />
                )}
              </>
            )}
          </Container>
          <Container className="sticky bottom-0 flex-col">
            <Button
              onClick={handleNextClick}
              className="mb-5 w-full"
              variant={'primary'}
              icon="next"
            >
              Next
            </Button>
          </Container>
        </>
      )}

      <TooltipDrawer />
    </div>
  )
}
