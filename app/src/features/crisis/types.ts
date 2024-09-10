export type CrisisActionType = 'next' | 'exit' | 'link' | 'crisis-support'
export interface CrisisAction {
  text: string
  type: 'next' | 'exit' | 'link' | 'crisis-support'
  id?: string
  href?: string
}

export interface CrisisStep {
  text: string
  actions: {
    primary: CrisisAction
    secondary?: CrisisAction
    cta?: CrisisAction
  }
}
