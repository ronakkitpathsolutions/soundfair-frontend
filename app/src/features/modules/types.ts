export interface ModulePartProgress {
  title: string
  href: string
  progress: number
  status: 'not-started' | 'in-progress' | 'completed' | 'locked'
  timeLeft?: string
  optional?: boolean
}
export interface ModuleProgress {
  title: string
  description: string
  parts: ModulePartProgress[]
}

interface Module {
  module_id: number
  name: string
  category: string
}

interface Session {
  session_id: number
  name: string
  reading_time: string
  description: string
  deleted: number
  type: string
  activity_title: string | null
  activity_description: string | null
  activity_file: string | null
  createdAt: string
  updatedAt: string
  module_id: number
  Module: Module
  strategyIcon?: string // Add the strategyIcon property if applicable
}

interface SessionProgress {
  id: number
  total: number
  completed: number
}

interface ModuleProgressData {
  id: number
  total: number
  sessions: SessionProgress[]
  completed: number
}
