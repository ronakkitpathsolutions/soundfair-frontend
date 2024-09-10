import { FC, useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import { NavbarProgress } from '@ui/components/base/NavbarProgress'
import { Button } from '@ui/components/base/Button'
import { TextInput } from '@ui/components/base/Form'
import { Container } from '@ui/components/base/Grid'
import { RadioGroup } from '@ui/components/base/Form/RadioGroup'
import { useRouter } from 'next/router'
import { TransitionExpand } from '@ui/components/base/Transitions/TransitionExpand'

// Store
import { selectUserName } from '@/features/modules/modulesSlice'
import {
  setActivityOnComplete,
  toggleActivity,
} from '@/features/activities/activitiesSlice'
import {
  setVideoOnComplete,
  setVideoTitle,
  toggleVideo,
} from '@/features/videos/videosSlice'
import {
  openToStrategy,
  setTab,
  toggleToolkit,
} from '@/features/toolkit/toolkitSlice'

// Constants
import { routes } from '@/lib/constants/routes'
import { FormWizardStep } from '@/features/common/components/FormWizard'
import { Bluurb } from '@/features/common/components/Bluurb'
import { unlockPractices } from '@/features/practices/practicesSlice'
import { unlockStrategies } from '@/features/strategies/strategiesSlice'
import { AnimatedText } from '@/features/common/components/AnimatedText/AnimatedText'
import { useAnimatedText } from '@/features/common/components/AnimatedText/useAnimatedText'

// Types

export interface FormWizardProps {
  initialStep?: number
  initialData?: Record<string, any> | null
  title: string
  steps: FormWizardStep[]
  onSave: (data: OnSaveArgs) => void
  onComplete: (data: Record<string, any>) => void
}

export interface OnSaveArgs {
  currentStep: number
  completed: boolean
  data: Record<string, any>
}

export const FormWizard: FC<FormWizardProps> = ({
  initialStep = 0,
  initialData = null,
  title,
  steps,
  onSave,
  onComplete,
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const userName = useSelector(selectUserName)
  const [currentStepIndex, setCurrentStepIndex] = useState(
    initialStep >= steps.length ? 0 : Number(initialStep),
  )
  const [formData, setFormData] = useState<Record<string, any> | null>(
    initialData,
  )
  const currentStep = steps[currentStepIndex]
  const progress = (currentStepIndex / (steps.length - 1)) * 100

  const formattedText = useMemo(() => {
    const text =
      typeof currentStep.text === 'function'
        ? currentStep.text(formData || {})
        : currentStep.text

    return text.replace('[NAME]', userName || '').trim()
  }, [currentStep])
  const { showAnimation, animationFinished } = useAnimatedText(formattedText)

  useEffect(() => {
    setInitialFormData()
  }, [steps])

  const setInitialFormData = () => {
    if (initialData) {
      return
    }
    const initialFormData: Record<string, any> = {}
    steps.forEach((step) => {
      if (step.type !== 'dialog') {
        initialFormData[step.id] = ''
      }
    })
    setFormData(initialFormData)
  }

  const handleBack = () => {
    if (currentStepIndex === 0) return
    const previousStepIndex = currentStepIndex - 1
    setCurrentStepIndex(previousStepIndex)
    setStepInUrl(previousStepIndex)
  }

  const handleExit = async () => {
    await router.push(routes.home)
  }

  const handleNextStep = () => {
    const nextStepIndex = currentStepIndex + 1
    setCurrentStepIndex(nextStepIndex)
    setStepInUrl(nextStepIndex)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const completed = currentStepIndex === steps.length - 1

    // No data to update
    if (!formData) return

    // Inputs haven't been filled out
    if (currentStep.type !== 'dialog' && !formData[currentStep.id]) {
      return
    }

    // Save progress
    onSave({
      currentStep: currentStepIndex,
      completed,
      data: formData,
    })

    // Unlocks
    if (currentStep.unlock) {
      if (currentStep.unlock.type === 'strategy') {
        dispatch(unlockStrategies(currentStep.unlock.ids))
      } else if (currentStep.unlock.type === 'practice') {
        dispatch(unlockPractices())
      }
    }

    // Completed all steps
    if (completed) {
      onComplete(formData)
      return
    }

    // No actions go to next step
    if (!currentStep.next?.action) {
      handleNextStep()
      return
    }

    const action = currentStep.next.action
    switch (action.type) {
      case 'activity':
        dispatch(toggleActivity(action.id))
        dispatch(setActivityOnComplete(handleNextStep))
        break
      case 'video':
        dispatch(toggleVideo(action.id))
        dispatch(setVideoTitle(title))
        dispatch(setVideoOnComplete(handleNextStep))
        break
      case 'strategy':
        dispatch(openToStrategy(action.id))
        handleNextStep()
        break
      case 'toolkit':
        dispatch(toggleToolkit(true))
        dispatch(setTab(action.id))
        handleNextStep()
        break
      case 'link':
        await router.push({
          pathname: action.href,
        })
        break
      case 'callback':
        const route = action.callback(formData)
        if (route === 'next-step') {
          handleNextStep()
        } else if (route === 'crisis') {
          const returnTo =
            window.location.pathname + `?step=${currentStepIndex + 1}`

          await router.push({
            pathname: routes.crisis,
            query: {
              returnTo,
            },
          })
        }
        break
    }
  }

  const handleSecondaryClicked = async () => {
    if (!currentStep.secondary) return
    const action = currentStep.secondary.action

    switch (action.type) {
      case 'link':
        if (action.href) {
          await router.push({
            pathname: action.href,
          })
        }
        break
      case 'video':
        dispatch(toggleVideo(action.id))
        dispatch(setVideoTitle(title))
        dispatch(setVideoOnComplete(() => {}))
        break
      case 'strategy':
        dispatch(openToStrategy(action.id))
        break
      case 'toolkit':
        dispatch(toggleToolkit(true))
        dispatch(setTab(action.id))
        break
    }
  }

  const setStepInUrl = (index: number) => {
    const url = new URL(window.location.href)
    url.searchParams.set('step', String(index))
    history.replaceState({}, '', url)
  }

  const handleChangeValue = (event: string | any) => {
    const value = typeof event === 'string' ? event : event.target.value
    setFormData({ ...formData, [currentStep.id]: value })
  }

  const InputComponent = (step: FormWizardStep) => {
    if (!formData) return null

    switch (step.type) {
      case 'text-input':
        return (
          <TextInput
            name={step.id}
            placeholder="Write to bluurb..."
            required
            value={formData[step.id]}
            onChange={handleChangeValue}
            onClearInput={() => handleChangeValue('')}
          />
        )
      case 'radio':
        return (
          <RadioGroup
            name={step.id}
            options={step.options || []}
            required
            variant="secondary"
            onChange={handleChangeValue}
            value={formData[step.id]}
          />
        )
    }
  }

  return (
    <div>
      <NavbarProgress
        title={title}
        showBackBtn={currentStepIndex !== 0}
        showCloseBtn
        onBackClicked={handleBack}
        onCloseClicked={handleExit}
        progress={progress}
        className="mt-5 w-full"
      />
      <div className="mx-auto mb-10 flex h-full max-w-[372px] flex-col items-center">
        <Bluurb />
        <AnimatedText
          text={formattedText}
          secondaryText={currentStep.textHighlight}
          showAnimation={showAnimation}
          animationFinished={animationFinished}
        />
        <div className="fixed bottom-10 w-full">
          <form onSubmit={handleSubmit}>
            <Container className="flex flex-col gap-6">
              {InputComponent(currentStep)}
              <div className="mx-auto">
                <TransitionExpand
                  isVisible={
                    currentStep.type === 'dialog' ||
                    (formData && formData[currentStep.id])
                  }
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    {currentStep.secondary ? (
                      <Button
                        type="button"
                        variant="primary"
                        onClick={handleSecondaryClicked}
                      >
                        {currentStep.secondary.text}
                      </Button>
                    ) : null}
                    <Button type="submit" variant="primary">
                      {currentStep.next?.text
                        ? currentStep.next.text
                        : 'Continue'}
                    </Button>
                  </div>
                </TransitionExpand>
              </div>
            </Container>
          </form>
        </div>
      </div>
    </div>
  )
}
