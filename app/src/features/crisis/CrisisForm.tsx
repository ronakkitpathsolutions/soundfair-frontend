import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// Components
import { Button } from '@ui/components/base/Button'
import { Container } from '@ui/components/base/Grid'

// Store
import { selectUserName } from '@/features/modules/modulesSlice'

// Types
import { TransitionFade } from '@ui/components/base/Transitions'
import { CrisisAction } from '@/features/crisis/types'

// Constants
import { crisisSteps } from '@/features/crisis/content/steps'
import { routes } from '@/lib/constants/routes'
import { toggleSupport } from '@/features/crisis/crisisSlice'
import { Bluurb } from '@/features/common/components/Bluurb'
import { AnimatedText } from '@/features/common/components/AnimatedText/AnimatedText'
import { useAnimatedText } from '@/features/common/components/AnimatedText/useAnimatedText'

export interface CrisisFormProps {
  returnTo: string | null
}

export const CrisisForm: FC<CrisisFormProps> = ({ returnTo }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const userName = useSelector(selectUserName)
  const [currentStepId, setCurrentStepId] = useState('initial')
  const currentStep = crisisSteps[currentStepId]
  const actions = currentStep.actions
  const text = currentStep.text.trim().replace('[NAME]', userName || '')
  const { showAnimation } = useAnimatedText(text)

  const handleAction = async (action: CrisisAction | undefined) => {
    if (!action) return

    switch (action.type) {
      case 'next':
        setCurrentStepId(action.id || 'initial')
        break
      case 'exit':
        if (returnTo) {
          await router.replace(returnTo)
        } else {
          await router.replace(routes.home)
        }
        break
      case 'crisis-support':
        dispatch(toggleSupport(true))
        break
      case 'link':
        window.open(action.href)
        break
    }
  }

  return (
    <TransitionFade keyValue={currentStepId}>
      <div>
        <div className="mx-auto mb-10 flex h-full max-w-[372px] flex-col items-center">
          <Bluurb />
          <AnimatedText text={text} showAnimation={showAnimation} />
          <div className="fixed bottom-10 w-full">
            <Container className="flex flex-col">
              <div className="mx-auto flex gap-x-2">
                <Button
                  type="submit"
                  variant="primary"
                  onClick={() => handleAction(actions.primary)}
                >
                  {actions.primary.text}
                </Button>
                {actions.secondary ? (
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={() => handleAction(actions.secondary)}
                  >
                    {actions.secondary.text}
                  </Button>
                ) : null}
              </div>
              {actions.cta ? (
                <Button
                  type="submit"
                  variant="primary"
                  onClick={() => handleAction(actions.cta)}
                  className="mx-auto mt-2"
                >
                  {actions.cta.text}
                </Button>
              ) : null}
            </Container>
          </div>
        </div>
      </div>
    </TransitionFade>
  )
}
