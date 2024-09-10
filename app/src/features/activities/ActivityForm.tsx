import { FC, useEffect, useState, useMemo } from 'react'
import { NavbarProgress } from '@ui/components/base/NavbarProgress'
import { Button } from '@ui/components/base/Button'
import { Options, RadioGroup } from '@ui/components/base/Form/RadioGroup'
import {
  TransitionExpand,
  TransitionFade,
} from '@ui/components/base/Transitions'
import { CheckboxGroup } from '@ui/components/base/Form/CheckboxGroup'

export interface ActivityFormStep {
  id: string
  label: string
  options?: Options | ((formData: Record<string, any>) => Options)
  type: 'radio' | 'checkbox'
  correctOption?: string
  next?: {
    text?: string
  }
}

export interface ActivityFormProps {
  onOpenChange: (value: boolean) => void
  onComplete: (() => void) | null
  steps: ActivityFormStep[]
}

export const ActivityForm: FC<ActivityFormProps> = ({
  steps,
  onOpenChange,
  onComplete,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const currentStep = steps[currentStepIndex]

  const options = useMemo(() => {
    return typeof currentStep.options === 'function'
      ? currentStep.options(formData)
      : currentStep.options
  }, [currentStep])

  useEffect(() => {
    const initialFormData: Record<string, any> = {}
    steps.forEach((step) => {
      initialFormData[step.id] = step.type === 'checkbox' ? [] : ''
    })

    setFormData(initialFormData)
  }, [])

  const handleBack = () => {
    if (currentStepIndex === 0) return
    setCurrentStepIndex(currentStepIndex - 1)
  }

  const handleNext = () => {
    if (currentStep.correctOption) {
      if (formData[currentStep.id] !== currentStep.correctOption) {
        setError("Oops that's not quite right, try again")
        return
      }
    }

    if (currentStepIndex === steps.length - 1) {
      if (onComplete) {
        onComplete()
      }
      onOpenChange(false)
      return
    }
    setCurrentStepIndex(currentStepIndex + 1)
  }

  const handleChangeValue = (value: string | string[]) => {
    setFormData({ ...formData, [currentStep.id]: value })
    setError(null)
  }

  return (
    <div>
      <NavbarProgress
        title={`Step ${currentStepIndex + 1} of ${steps.length}`}
        showBackBtn={currentStepIndex !== 0}
        showCloseBtn={true}
        onBackClicked={handleBack}
        onCloseClicked={() => onOpenChange(false)}
        variant="secondary"
        className="mb-5 w-full"
      />
      <div className="mx-auto h-full">
        <h2 className="mb-8 text-center font-display text-display-sm text-purple-60 md:text-display-md md:tracking-tight">
          {currentStep.label}
        </h2>
        <TransitionFade keyValue={currentStep.id}>
          {currentStep.type === 'radio' ? (
            <RadioGroup
              name={currentStep.id}
              options={options || []}
              className="mb-6"
              value={formData[currentStep.id]}
              onChange={handleChangeValue}
            />
          ) : null}
          {currentStep.type === 'checkbox' ? (
            <CheckboxGroup
              name={currentStep.id}
              options={options || []}
              className="mb-6"
              value={formData[currentStep.id]}
              onChange={handleChangeValue}
            />
          ) : null}
        </TransitionFade>
      </div>
      <div className="absolute inset-x-0 bottom-12 flex flex-col items-center justify-center">
        <TransitionExpand isVisible={error != null}>
          <p className="mb-4 block text-center text-purple-60">{error}</p>
        </TransitionExpand>
        <TransitionExpand
          isVisible={formData && formData[currentStep.id] != false}
        >
          <Button onClick={handleNext} variant="primary">
            {currentStep.next?.text ? currentStep.next.text : 'Continue'}
          </Button>
        </TransitionExpand>
      </div>
    </div>
  )
}
