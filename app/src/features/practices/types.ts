import { Options } from '@ui/components/base/Form/RadioGroup'
import { StaticImageData } from 'next/image'
import { videos } from '@/features/videos/content'
import { StrategyId } from '@/features/strategies/types'
import { ToolkitTab } from '@/features/toolkit/toolkitSlice'

export interface Practice {
  id: string
  dateCompleted: string
  trigger: string
  thought: string
  feeling: string
  behaviour: string
  feelingCope: string
  thoughtCope: string
  unhelpfulBehaviour: []
  helpfulHabits: string
  behaviourCope: string
}

export interface PracticeFormStep {
  id: string
  text: string
  type: 'dialog' | 'text-input'
  options?: Options
  placeholder?: string
  showResponse?: string
  next?: {
    text?: string
    action?: PracticeFormStepAction
  }
  secondary?: {
    text: string
    action: PracticeFormStepSecondaryAction
  }
}

export interface PracticeActivityFormStep {
  id: string
  text: string
  placeholder?: string
  type: 'custom' | 'radio' | 'checkbox'
  showResponse?: string
  imageUrl?: StaticImageData
  options?: Options
  component?: React.FC<any>
  next?: {
    text?: string
  }
}

export type PracticeFormStepSecondaryAction =
  | {
      type: 'video'
      id: keyof typeof videos
    }
  | {
      type: 'strategy'
      id: StrategyId
    }
  | {
      type: 'toolkit'
      id: ToolkitTab
    }

interface PracticeFormStepAction {
  type: 'practice-activity'
  id: string
}
