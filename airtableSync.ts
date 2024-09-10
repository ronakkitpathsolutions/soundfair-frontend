import fs from 'fs'
import path from 'path'
import Airtable from 'airtable'
import { AirtableBase } from 'airtable/lib/airtable_base'
import Showdown from 'showdown'

const API_KEY =
  'patjYc72WqC745Y86.9b6cf76e833fb6ff8809f5a6653f41880036674d08ea70d2e4ad2f53be75ac9d'

interface ModuleRow extends Airtable.FieldSet {
  id: string
  Name: string
  Description: string
  'Topic Area': string[]
  Lessons: string[]
}

interface LessonRow extends Airtable.FieldSet {
  id: string
  Name: string
  Description: string
  'Lesson Type': string
  'Lesson Time': string
  'Related Module': string[]
  Strategies: string[]
  'Reading Lesson Steps': string[]
  'Activity Lesson Steps': string[]
}

interface TopicsRow extends Airtable.FieldSet {
  id: string
  Name: string
  'Description (Strong)': string
  'Description (Weak)': string
  'Description (Neutral)': string
  Questions: string[]
  Modules: string[]
}

interface QuestionOptionsRow extends Airtable.FieldSet {
  id: string
  Label: string
  Value: string
  QuestionActivityStep: string[]
  Questions: string[]
  ReadingLessonStep: string[]
}

type QuestionOptions = {
  [id: string]: {
    id: string
    label: string
    value: string
    questionActivityStep: string[]
    questions: string[]
    readingLessonStep: string[]
  }
}

interface QuizQuestionRow extends Airtable.FieldSet {
  id: string
  'Question Text': string
  'Emphasised Text': string
  'Question Options': string[]
  'Is Final Question?': boolean
  'Related Topic': string[]
  Tooltip: string
}

interface QuizRow extends Airtable.FieldSet {
  id: string
  Title: string
  'Time to Complete': string
  Description: string
}

interface ReadingLessonStepRow extends Airtable.FieldSet {
  id: string
  Title: string
  Content: string
  Quote: string
  Question: string
  'Question Options': string[]
  Tooltips: string[]
  'Reading Lessons': string[]
}

interface ActivityLessonStepRow extends Airtable.FieldSet {
  id: string
  Title: string
  Content: string
  Quote: string
  Question: string
  'Question Options': string[]
  Tooltips: string[]
  Lessons: string[]
}

interface StrategiesRow extends Airtable.FieldSet {
  id: string
  Name: string
  Description: string
  Content: string
  Image: string
  'PDF Link': string
  'PDF Image': string
  Lessons: string[]
  'Strategy Icon': string
}

interface TooltipRow extends Airtable.FieldSet {
  id: string
  'Link Text': string
  Title: string
  Description: string
}

interface CrisisSupport extends Airtable.FieldSet {
  id: string
  Name: string
  Content: string
}

export default class AirtableRetriever {
  private soundfairBase: AirtableBase

  private converter: Showdown.Converter

  constructor() {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: API_KEY,
    })
    this.soundfairBase = Airtable.base('appv9WfCwVtsX5p76')
    this.converter = new Showdown.Converter()
  }

  private stringToID (string: string) {
    return string.replace(/ /g, '-').toLowerCase()
  }

  private isEmptyString (string: string) {
    // Strip whitespace and check if string is empty
    if (string.replace(/\s/g, '').length === 0) return true
  }

  private airtableMarkdownToHTML (markdown: string) {
    // Convert markdown to HTML
    const numberPointRegex = /\d+\.[^\n\s]*[\s\S]*?[\n\<]/g
    let html = this.converter.makeHtml(markdown)
    // console.log('Html', html)
    if (html) {
      // Preserve and inject HTML
      html = html.replace(
        /<pre><code>(.*?)<\/code><\/pre>/gs,
        (match, code) => {
          console.log('Code', code)
          return `${code}`
        },
      )
      // Replace any &lt; and &gt; with < and >
      html = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>')

      html = html.replaceAll(numberPointRegex, (match) => {
        // If match seems to contain URL or part of image files, don't replace
        if (
          match.includes('http') ||
          match.includes('png') ||
          match.includes('jpg') ||
          match.includes('jpeg')
        ) {
          return match
        }
        const number = match.match(/\d+/)?.[0] || ''
        // Get the text after the number
        const point = match
          .replace(number, '')
          .replace(/\n/g, '')
          .replace('/p>', '')
          .replace('.', '')
        if (this.isEmptyString(point) || typeof parseFloat(point) === 'number')
          return match
        // console.log('Replace HTML for Number Point', number, point, match)
        return `<div class="number-point"><span>${number}</span>${point}</div>`
      })
    }

    return html
  }

  private handleModuleData (data: ModuleRow[]) {
    let modules = {}
    data.forEach((row) => {
      modules = {
        [row.id]: {
          id: row.id,
          name: row.Name,
          description: this.airtableMarkdownToHTML(row.Description),
          topicArea: row['Topic Area'][0],
          lessons: row['Lessons'],
        },
        ...modules,
      }
    })
    return modules
  }

  public async getModuleData () {
    const moduleData = await this.soundfairBase<ModuleRow>('Modules')
      .select({ maxRecords: 100, view: 'Grid view' })
      .firstPage()
    return this.handleModuleData(
      moduleData.map((row) => ({ ...row.fields, id: row.id })),
    )
  }

  private handleLessonData (
    data: LessonRow[],
    readingLessonSteps: { [id: string]: any },
    activityLessonSteps: { [id: string]: any },
  ) {
    let lessons = {}
    data.forEach((row) => {
      lessons = {
        [row.id]: {
          id: row.id,
          name: row.Name,
          description: this.airtableMarkdownToHTML(row.Description),
          lessonType: row['Lesson Type'],
          lessonTime: row['Lesson Time'],
          relatedModule: row['Related Module'][0],
          strategies: row['Strategies']?.[0],
          lessonSteps:
            row['Lesson Type'] === 'Reading'
              ? row['Reading Lesson Steps'].map((id) => readingLessonSteps[id])
              : row['Activity Lesson Steps'].map(
                (id) => activityLessonSteps[id],
              ),
        },
        ...lessons,
      }
    })
    return lessons
  }

  public async getLessonData (
    readingLessonSteps: { [id: string]: any },
    activityLessonSteps: { [id: string]: any },
  ) {
    const lessonData = await this.soundfairBase<LessonRow>('Lessons')
      .select({ maxRecords: 100, view: 'Grid view' })
      .firstPage()
    return this.handleLessonData(
      lessonData.map((row) => ({ ...row.fields, id: row.id })),
      readingLessonSteps,
      activityLessonSteps,
    )
  }

  private handleTopicData (data: TopicsRow[]) {
    let topics = {}
    data.forEach((row) => {
      topics = {
        [row.id]: {
          id: row.id,
          name: row.Name,
          description: {
            strong: this.airtableMarkdownToHTML(row['Description (Strong)']),
            weak: this.airtableMarkdownToHTML(row['Description (Weak)']),
            neutral: this.airtableMarkdownToHTML(row['Description (Neutral)']),
          },
          questions: row['Questions'],
          Modules: row['Modules'],
        },
        ...topics,
      }
    })
    return topics
  }

  public async getTopicData () {
    const topicData = await this.soundfairBase<TopicsRow>('Topics')
      .select({ maxRecords: 100, view: 'Grid view' })
      .firstPage()
    return this.handleTopicData(
      topicData.map((row) => ({ ...row.fields, id: row.id })),
    )
  }

  private handleQuestionOptionsData (data: QuestionOptionsRow[]) {
    let options = {}
    data.forEach((row) => {
      options = {
        [row.id]: {
          id: row.id,
          label: row.Label,
          value: row.Value,
          questionActivityStep: row['QuestionActivityStep'],
          questions: row['Questions'],
          readingLessonStep: row['ReadingLessonStep'],
        },
        ...options,
      }
    })
    return options
  }

  public async getQuestionOptionsData () {
    const questionOptionsData = await this.soundfairBase<QuestionOptionsRow>(
      'Question Options',
    )
      .select({ maxRecords: 100, view: 'Grid view' })
      .firstPage()
    return this.handleQuestionOptionsData(
      questionOptionsData.map((row) => ({ ...row.fields, id: row.id })),
    )
  }

  private handleQuizQuestionData (
    data: QuizQuestionRow[],
    questionOptions: QuestionOptions,
  ) {
    let questions = {}
    data.forEach((row) => {
      questions = {
        ...questions,
        [row.id]: {
          id: row.id,
          questionText: row['Question Text'],
          emphasisedText: row['Emphasised Text'],
          questionOptions: row['Question Options']?.map(
            (option) => questionOptions[option],
          ),
          isFinalQuestion: row['Is Final Question?'],
          relatedTopic: row['Related Topic']?.[0],
          tooltip: row['Tooltip']?.[0],
        },
      }
    })
    return questions
  }

  public async getQuizQuestionData (questionOptions: QuestionOptions) {
    const quizQuestionData = await this.soundfairBase<QuizQuestionRow>(
      'Questions',
    )
      .select({ maxRecords: 100, view: 'Grid view' })
      .firstPage()
    return this.handleQuizQuestionData(
      quizQuestionData.map((row) => ({ ...row.fields, id: row.id })),
      questionOptions,
    )
  }

  private handleQuizData (data: QuizRow[]) {
    return {
      title: data[0].Title,
      timeToComplete: data[0]['Time to Complete'],
      description: this.airtableMarkdownToHTML(data[0].Description),
    }
  }

  public async getQuizData () {
    const quizData = await this.soundfairBase<QuizRow>('Quiz')
      .select({ maxRecords: 100, view: 'Grid view' })
      .firstPage()
    return this.handleQuizData(
      quizData.map((row) => ({ ...row.fields, id: row.id })),
    )
  }

  private handleReadingLessonStepData (
    data: ReadingLessonStepRow[],
    questionOptions: QuestionOptions,
  ) {
    let readingLessonSteps = {}
    data.forEach((row) => {
      readingLessonSteps = {
        [row.id]: {
          id: row.id,
          title: row.Title,
          content: this.airtableMarkdownToHTML(row.Content),
          quote: row.Quote,
          question: row.Question,
          questionOptions: row['Question Options']?.map(
            (option) => questionOptions[option],
          ),
          tooltip: row.Tooltips?.[0],
          readingLessons: row['Reading Lessons'],
        },
        ...readingLessonSteps,
      }
    })
    return readingLessonSteps
  }

  public async getReadingLessonStepData (questionOptions: QuestionOptions) {
    const readingLessonStepData =
      await this.soundfairBase<ReadingLessonStepRow>('Reading Lesson Step')
        .select({ maxRecords: 1000, view: 'Grid view' })
        .all()
    return this.handleReadingLessonStepData(
      readingLessonStepData.map((row) => ({ ...row.fields, id: row.id })),
      questionOptions,
    )
  }

  private handleActivityLessonStepData (
    data: ActivityLessonStepRow[],
    questionOptions: QuestionOptions,
  ) {
    let activityLessonSteps = {}
    data.forEach((row) => {
      activityLessonSteps = {
        [row.id]: {
          id: row.id,
          title: row.Title,
          content: this.airtableMarkdownToHTML(row.Content),
          quote: row.Quote,
          question: row.Question,
          questionOptions: row['Question Options']?.map(
            (option) => questionOptions[option],
          ),
          tooltip: row.Tooltips?.[0],
          lessons: row['Lessons'],
        },
        ...activityLessonSteps,
      }
    })
    return activityLessonSteps
  }

  public async getActivityLessonStepData (questionOptions: QuestionOptions) {
    const activityLessonStepData =
      await this.soundfairBase<ActivityLessonStepRow>('Activity Lesson Step')
        .select({ maxRecords: 1000, view: 'Grid view' })
        .all()
    return this.handleActivityLessonStepData(
      activityLessonStepData.map((row) => ({ ...row.fields, id: row.id })),
      questionOptions,
    )
  }

  private handleStrategyData (
    data: StrategiesRow[],
    lessons: { [id: string]: any },
  ) {
    let strategies = {}
    data.forEach((row) => {
      strategies = {
        [row.id]: {
          id: row.id,
          name: row.Name,
          description: this.airtableMarkdownToHTML(row.Description),
          content: this.airtableMarkdownToHTML(row.Content),
          image: row.Image,
          pdfLink: row['PDF Link'],
          pdfImage: row['PDF Image'],
          lessons: row['Lessons'],
          relatedModule: lessons[row['Lessons'][0]]?.relatedModule,
          strategyIcon: row['Strategy Icon'],
        },
        ...strategies,
      }
    })
    return strategies
  }

  public async getStrategyData (lessons: { [id: string]: any }) {
    const strategyData = await this.soundfairBase<StrategiesRow>('Strategies')
      .select({ maxRecords: 100, view: 'Grid view' })
      .firstPage()
    return this.handleStrategyData(
      strategyData.map((row) => ({ ...row.fields, id: row.id })),
      lessons,
    )
  }

  private handleTooltipData (data: TooltipRow[]) {
    let tooltips = {}
    data.forEach((row) => {
      tooltips = {
        [row.id]: {
          id: row.id,
          linkText: row['Link Text'],
          title: row.Title,
          description: this.airtableMarkdownToHTML(row.Description),
        },
        ...tooltips,
      }
    })
    return tooltips
  }

  public async getTooltipData () {
    const tooltipData = await this.soundfairBase<TooltipRow>('Tooltips')
      .select({ maxRecords: 100, view: 'Grid view' })
      .firstPage()
    return this.handleTooltipData(
      tooltipData.map((row) => ({ ...row.fields, id: row.id })),
    )
  }

  private handleCrisisSupportData (data: CrisisSupport[]) {
    return {
      'crisis-support': {
        id: 'crisis-support',
        title: data[0].Name,
        description: this.airtableMarkdownToHTML(data[0].Content),
      },
    }
  }

  public async getCrisisSupportData () {
    const crisisSupportData = await this.soundfairBase<CrisisSupport>(
      'Crisis Support',
    )
      .select({ maxRecords: 1, view: 'Grid view' })
      .firstPage()
    return this.handleCrisisSupportData(
      crisisSupportData.map((row) => ({ ...row.fields, id: row.id })),
    )
  }
}

async function sync () {
  console.log('Syncing Airtable data...')
  const airtable = new AirtableRetriever()

  const questionOptions = await airtable.getQuestionOptionsData()

  const readingLessonSteps = await airtable.getReadingLessonStepData(
    questionOptions,
  )
  const activityLessonSteps = await airtable.getActivityLessonStepData(
    questionOptions,
  )

  const modules = await airtable.getModuleData()
  const lessons = await airtable.getLessonData(
    readingLessonSteps,
    activityLessonSteps,
  )
  const topics = await airtable.getTopicData()
  const quizQuestions = await airtable.getQuizQuestionData(questionOptions)
  const quiz = await airtable.getQuizData()
  const strategies = await airtable.getStrategyData(lessons)
  const tooltips = await airtable.getTooltipData()

  const crisisSupport = await airtable.getCrisisSupportData()

  const extendedTooltips = {
    ...tooltips, ...crisisSupport
  }

  console.log('Writing data to file...')
  fs.writeFile(
    path.resolve('./data.airtable.json'),
    JSON.stringify({
      modules,
      lessons,
      topics,
      quizQuestions,
      quiz,
      strategies,
      tooltips: extendedTooltips,
    }),
    console.error,
  )
  console.log('Done!')
}

sync()
