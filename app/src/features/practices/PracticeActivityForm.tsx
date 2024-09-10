import { FC, useState } from 'react'
import cn from 'clsx'

// Components
import { NavbarProgress } from '@ui/components/base/NavbarProgress'
import { Button } from '@ui/components/base/Button'
import { RadioGroup } from '@ui/components/base/Form/RadioGroup'

// Types
import { Practice, PracticeActivityFormStep } from '@/features/practices/types'
import { CheckboxGroup } from '@ui/components/base/Form/CheckboxGroup'
import { Markup } from '@ui/components/base/Markup/Markup'
import { DrawerFooter, DrawerHeader } from '@ui/components/base/Drawer'

export interface PracticeActivityFormProps {
  onOpenChange: (value: boolean) => void
  steps: PracticeActivityFormStep[]
  formData: Practice
  setFormData: (value: Practice) => void
}
export const PracticeActivityForm: FC<PracticeActivityFormProps> = ({
  steps,
  onOpenChange,
  formData,
  setFormData,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const currentStep = steps[currentStepIndex]
  const inputLabel = currentStep.id + '-label'
  const formValue = formData[currentStep.id as keyof Practice]
  const showResponseValue = formData[currentStep.showResponse as keyof Practice]

  const handleBack = () => {
    if (currentStepIndex === 0) return
    setCurrentStepIndex(currentStepIndex - 1)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    if (!formData) return
    if (currentStep.type !== 'custom' && !formValue) {
      return
    }

    const completed = currentStepIndex === steps.length - 1
    if (completed) {
      onOpenChange(false)
      return
    }
    setCurrentStepIndex(currentStepIndex + 1)
  }

  const handleChangeValue = (event: string | any) => {
    let value
    switch (currentStep.type) {
      case 'radio':
      case 'checkbox':
        value = event
        break
    }
    setFormData({ ...formData, [currentStep.id]: value })
  }

  if (!formData) return null

  const CustomComponent = currentStep.component || null

  return (
    <div>
      <DrawerHeader>
        <NavbarProgress
          title={`Step ${currentStepIndex + 1} of ${steps.length}`}
          showBackBtn={currentStepIndex !== 0}
          showCloseBtn={true}
          onBackClicked={handleBack}
          onCloseClicked={() => onOpenChange(false)}
          variant="secondary"
          className="mb-5 w-full"
        />
      </DrawerHeader>
      <form
        onSubmit={handleSubmit}
        className="mt-8 overflow-y-auto px-0.5 pb-32"
      >
        {currentStep.type !== 'custom' ? (
          <div className="mx-auto flex h-full flex-col items-center">
            <h2
              className={cn('mb-8 mt-8 text-center text-purple-60', {
                'text-display-md': !showResponseValue,
              })}
              id={inputLabel}
            >
              <Markup text={currentStep.text} />
            </h2>
            {showResponseValue ? (
              <p className="mb-12 text-display-md text-purple-60">
                {showResponseValue}
              </p>
            ) : null}
            {currentStep.type === 'radio' ? (
              <RadioGroup
                name={currentStep.id}
                options={currentStep.options || []}
                required
                aria-labelledby={inputLabel}
                onChange={handleChangeValue}
                value={formValue}
                className="w-full"
              />
            ) : null}
            {currentStep.type === 'checkbox' ? (
              <CheckboxGroup
                name={currentStep.id}
                options={currentStep.options || []}
                required
                aria-labelledby={inputLabel}
                onChange={handleChangeValue}
                value={formValue}
                className="w-full"
              />
            ) : null}
          </div>
        ) : null}
        {currentStep.type === 'custom' && CustomComponent ? (
          <CustomComponent formData={formData} />
        ) : null}
        <DrawerFooter>
          <Button onClick={handleSubmit} variant="primary">
            {currentStep.next?.text ? currentStep.next.text : 'Continue'}
          </Button>
        </DrawerFooter>
      </form>
    </div>
  )
}
