import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import { Quit } from '@/features/common/templates/Quit'
import { NavbarProgress } from '@ui/components/base/NavbarProgress'
import { Button } from '@ui/components/base/Button'
import { TextInput } from '@ui/components/base/Form'
import { Container } from '@ui/components/base/Grid'
import { TransitionExpand } from '@ui/components/base/Transitions/TransitionExpand'

// Store
import { selectUserName } from '@/features/modules/modulesSlice'
import { togglePracticeActivity } from '@/features/practices/practicesSlice'

// Types
import { Practice, PracticeFormStep } from '@/features/practices/types'
import { TransitionFade } from '@ui/components/base/Transitions'
import { Bluurb } from '@/features/common/components/Bluurb'
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
import { useAnimatedText } from '@/features/common/components/AnimatedText/useAnimatedText'
import { AnimatedText } from '@/features/common/components/AnimatedText/AnimatedText'

export interface PracticeFormProps {
  id: string
  title: string
  steps: PracticeFormStep[]
  formData: Practice
  setFormData: (value: Practice) => void
  handleComplete: () => void
}

export const PracticeForm: FC<PracticeFormProps> = ({
  title,
  steps,
  formData,
  setFormData,
  handleComplete,
}) => {
  const dispatch = useDispatch()
  const [showQuit, setShowQuit] = useState(false)
  const userName = useSelector(selectUserName)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const currentStep = steps[currentStepIndex]
  const progress = (currentStepIndex / (steps.length - 1)) * 100
  const inputLabel = currentStep.id + '-label'
  const text = currentStep.text.trim().replace('[NAME]', userName || '')
  const formValue = formData[currentStep.id as keyof Practice]
  const showResponseValue =
    (formData[currentStep.showResponse as keyof Practice] as string) || ''
  const { showAnimation, setShowAnimation, animationFinished } =
    useAnimatedText(text)

  const handleBack = () => {
    if (currentStepIndex === 0) return
    const previousStepIndex = currentStepIndex - 1
    setCurrentStepIndex(previousStepIndex)
    setShowAnimation(false)
  }

  const handleExit = async () => {
    setShowQuit(true)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const nextStepIndex = currentStepIndex + 1

    // Stop progressing if no input
    if (currentStep.type !== 'dialog' && !formValue) {
      return
    }

    const completed = currentStepIndex === steps.length - 1

    if (completed) {
      handleComplete()
      return
    }

    setCurrentStepIndex(nextStepIndex)

    // Handle actions
    if (currentStep.next?.action) {
      const { type, id } = currentStep.next.action

      switch (type) {
        case 'practice-activity':
          dispatch(togglePracticeActivity(id))
          break
      }
    }
  }

  const handleSecondaryClicked = async () => {
    if (!currentStep.secondary) return
    const action = currentStep.secondary.action

    switch (action.type) {
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

  const handleChangeValue = (event: string | any) => {
    const value = typeof event === 'string' ? event : event.target.value
    setFormData({ ...formData, [currentStep.id]: value })
  }

  const InputComponent = (step: PracticeFormStep) => {
    if (!formData) return null

    switch (step.type) {
      case 'text-input':
        return (
          <TextInput
            name={step.id}
            placeholder={step.placeholder}
            required
            aria-describedby={inputLabel}
            value={formValue}
            onChange={handleChangeValue}
            onClearInput={() => handleChangeValue('')}
          />
        )
    }
  }

  return (
    <TransitionFade keyValue={showQuit ? 'show-quit' : 'practice'}>
      {showQuit ? (
        <Quit onCancel={() => setShowQuit(false)} />
      ) : (
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
              text={text}
              showAnimation={showAnimation}
              animationFinished={animationFinished}
              secondaryText={showResponseValue}
            />

            <div className="fixed bottom-10 w-full">
              <form onSubmit={handleSubmit}>
                <Container className="flex flex-col gap-2">
                  {InputComponent(currentStep)}
                  <div className="mx-auto">
                    <TransitionExpand
                      isVisible={
                        currentStep.type === 'dialog' ||
                        (formData && !!formValue)
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
      )}
    </TransitionFade>
  )
}
