import { activities } from '@/features/activities/content'
import { videos } from '@/features/videos/content'
import { Options } from '@ui/components/base/Form/RadioGroup'
import { ToolkitTab } from '@/features/toolkit/toolkitSlice'
import { StrategyId } from '@/features/strategies/types'

export interface FormWizardStep {
  id: string
  text: string | ((formData: Record<string, any>) => string)
  type: 'dialog' | 'text-input' | 'radio'
  textHighlight?: string
  options?: Options
  unlock?: FormWizardUnlock
  next?: {
    text?: string
    action?: FormWizardStepAction
  }
  secondary?: {
    text: string
    action: FormWizardStepSecondaryAction
  }
  exit?: {
    text: string
  }
}

export type FormWizardStepAction =
  | {
      type: 'activity'
      id: keyof typeof activities
    }
  | {
      type: 'video'
      id: keyof typeof videos
    }
  | {
      type: 'strategy'
      id: StrategyId
    }
  | {
      type: 'callback'
      callback: (formData: Record<any, any>) => 'next-step' | 'crisis'
    }
  | {
      type: 'toolkit'
      id: ToolkitTab
    }
  | {
      type: 'link'
      href: string
    }

export type FormWizardStepSecondaryAction =
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
  | {
      type: 'link'
      href: string
    }

export type FormWizardUnlock =
  | {
      type: 'strategy'
      ids: StrategyId[]
    }
  | {
      type: 'practice'
    }
