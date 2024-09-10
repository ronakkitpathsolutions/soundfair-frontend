// Unique Page Types
interface LandingPage {
  title: string
  description: string
  image: string
}

interface CrisisSupport {
  content: string
}

// Quiz Data Types

// Question Data
export const comfortScale = [
  { label: 'Not at all', value: '1', comfortLevel: 1 },
  { label: 'Rarely', value: '2', comfortLevel: 2 },
  { label: 'Sometimes', value: '3', comfortLevel: 3 },
  { label: 'Often', value: '4', comfortLevel: 4 },
  { label: 'Most of the Time', value: '5', comfortLevel: 5 },
]

interface Option {
  label: string
  value: string
  comfortLevel?: number
}

interface Question {
  emphasisedText?: string
  questionText?: string
  questionOptions?: Option[]
  tooltip?: string
  isFinalQuestion?: boolean
  relatedTopic?: string
}

export interface Quiz {
  title: string
  timeToComplete: string
  description: string
  questions: Question[]
}

export interface QuizResult {
  quizResultMatrix: string[]
  finalQuestionValue: string[]
  finalReport: string
}
// User Data Types
export interface UserData {
  userActivity: { [key: string]: number }
  currentReport: { [key: string]: number }
  quizCompleted: boolean
  quizResults: QuizResults | undefined
  profile?: { [key: string]: number }
  loading?: boolean
  actionPlan?: UserModule[]
  unlockedLessons?: string[]
  newUnlockedLessons?: string[]
  lessonProgress?: {
    [lessonId: string]: {
      completed: boolean
      timeTaken: number
      lessonProgress: number
    }
  }
  unlockedStrategies?: string[]
  unlockedModules?: string[]
}

interface QuizResults {
  quizCompletedAt: Date
}

// Topic Areas
export interface TopicArea {
  id: string
  name: string
  description: {
    strong: string
    weak: string
    neutral: string
  }
}

interface UserTopicArea extends TopicArea {
  strength: 'strong' | 'weak' | 'neutral'
}

// Modules
export interface Module {
  id: string
  name: string
  description: string
  topicArea: string
  lessons: string[]
}

interface UserModule extends Module {
  completed: boolean
  strategies: Strategy[]
}

export interface Lesson {
  id: string
  name: string
  description: string
  lessonType: string
  lessonTime: string
  relatedModule: string // Module ID
  strategies?: string // Strategy ID
  lessonSteps: any // LessonStep Array
}

interface Activity {
  name: string
  description: string
  type: 'reading' | 'activity'
  activityTime: string
  strategy: Strategy
}

type ActivityStep = QuestionActivityStep | ContentActivityStep

interface ReadingActivity extends Activity {
  type: 'reading'
  steps: ContentActivityStep[]
}

interface ActivityActivity extends Activity {
  type: 'activity'
  steps: ActivityStep[]
}

interface QuestionActivityStep {
  question: string
  options: Option[]
}

interface ContentActivityStep {
  content: string // HTML
}

export interface Strategy {
  id: string
  name: string
  description: string
  content: string // HTML
  image: string
  pdfLink: string
  pdfImage: string
  strategyIcon: string
  relatedModule: string // Module ID
}

export interface Tooltip {
  id: string
  linkText?: string
  title?: string
  description: string
}
