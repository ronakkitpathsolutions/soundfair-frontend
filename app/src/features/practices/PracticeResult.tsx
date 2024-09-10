import { FC, HTMLAttributes } from 'react'
import { cn } from '@ui/utils/cn'
import { Practice } from '@/features/practices/types'
import {
  IconBehaviour,
  IconFeeling,
  IconThought,
  IconTrigger,
} from '@ui/components/base/Icon'

export interface PracticeUserInputProps {
  text: string
  icon?: 'trigger' | 'behaviour' | 'feeling' | 'thought'
}
const PracticeUserInput = ({ text, icon }: any) => {
  let IconComp = null
  switch (icon) {
    case 'trigger':
      IconComp = IconTrigger
      break
    case 'behaviour':
      IconComp = IconBehaviour
      break
    case 'feeling':
      IconComp = IconFeeling
      break
    case 'thought':
      IconComp = IconThought
      break
  }

  return (
    <span className="text-purple-30">
      {IconComp ? <IconComp className="mb-1 mr-1" /> : null}
      {text}
    </span>
  )
}

export interface PracticeResultProps extends HTMLAttributes<HTMLDivElement> {
  practice: Practice
}

export const PracticeResult: FC<PracticeResultProps> = ({
  practice,
  className,
}) => {
  return (
    <div
      className={cn('text-center text-display-md text-purple-60', className)}
    >
      <p className="mb-6 text-display-md">
        <PracticeUserInput text={practice.trigger.trim()} icon="trigger" /> I
        will allow myself to feel{' '}
        <PracticeUserInput
          text={`“${practice.feeling.trim()}”`}
          icon="feeling"
        />{' '}
        by using{' '}
        {practice.feelingCope !== 'Slow breathing'
          ? `the ${practice.feelingCope}`
          : practice.feelingCope}
      </p>
      <p className="mb-6 text-display-md">
        I will postpone thoughts like{' '}
        <PracticeUserInput
          text={`“${practice.thought.trim()}”`}
          icon="thought"
        />{' '}
        and later in thinking time, if it’s still bothering me, use the{' '}
        {practice.thoughtCope.trim()}
      </p>
      <p className="mb-6 text-display-md">
        Instead of{' '}
        <PracticeUserInput text={`“${practice.behaviour}”`} icon="behaviour" />{' '}
        which is {practice.unhelpfulBehaviour.join(', ')} I will try “
        {practice.behaviourCope.trim()}”
      </p>
      <p className="mb-6 text-display-md">
        To keep my triangle strong I&apos;ll remember to{' '}
        {practice.helpfulHabits.trim()}
      </p>
    </div>
  )
}
