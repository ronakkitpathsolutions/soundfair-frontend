import { calculateCheckinScore } from '@/features/check-in/calculate-checkin-score'
import { FormWizardStep } from '@/features/common/components/FormWizard'
import { FeelingOption } from '@/features/check-in/types'

export const feelingOptions: FeelingOption[] = [
  'Never',
  'Rarely',
  'Sometimes',
  'Often',
  'Mostly',
  'Always',
]

export const checkinSteps: FormWizardStep[] = [
  {
    id: 'start',
    text: "Let's do a check in together",
    type: 'dialog',
    next: {
      text: 'Begin',
    },
  },
  {
    id: 'feeling-today',
    text: 'So, [NAME], how are you feeling today?',
    type: 'text-input',
  },
  {
    id: 'why-feeling',
    text: (formData) => {
      const feeling = formData['feeling-today']
        ? formData['feeling-today'].toLowerCase()
        : 'that way'

      return `What's causing you to feel ${feeling}?`
    },
    type: 'text-input',
  },
  {
    id: 'felt-cheerful',
    text: 'In the past week how often have you felt',
    textHighlight: 'Cheerful and in good spirits',
    type: 'radio',
    options: feelingOptions,
  },
  {
    id: 'felt-calm-relaxed',
    text: 'In the past week how often have you felt',
    textHighlight: 'Calm and relaxed',
    type: 'radio',
    options: feelingOptions,
  },
  {
    id: 'felt-active-energetic',
    text: 'In the past week how often have you felt',
    textHighlight: 'Active and energetic',
    type: 'radio',
    options: feelingOptions,
  },
  {
    id: 'felt-refreshed-rested',
    text: 'In the past week how often have you felt',
    textHighlight: 'Refreshed and rested',
    type: 'radio',
    options: feelingOptions,
  },
  {
    id: 'felt-interested',
    text: 'In the past week how often have you felt',
    textHighlight: 'Interested in things around me or in my life day to day',
    type: 'radio',
    options: feelingOptions,
    next: {
      action: {
        type: 'callback',
        callback: (formData) => {
          const score = calculateCheckinScore(formData)
          if (score <= 1) {
            return 'crisis'
          }
          return 'next-step'
        },
      },
    },
  },
  {
    id: 'result',
    text: (formData) => {
      const score = calculateCheckinScore(formData)
      let answer = ''

      if (score <= 1) {
        answer = `
        I'm sorry to hear you're not  feeling like your best self, [NAME]

        But I hope you're proud for taking the time to check in with yourself.
        `
      } else if (score <= 3) {
        const answers = [
          `We're always going to have good and bad days.`,
          "It takes courage to reflect on where you're at.",
          "It's really brave to be honest about your feelings.",
          "How you're feeling is totally normal.",
        ]
        answer = answers[Math.floor(Math.random() * answers.length)]
      } else if (score <= 5) {
        const answers = [
          "How you're feeling is totally normal.",
          'Awesome to hear things are going well!',
          "So happy you're feeling good, [NAME]",
        ]
        answer = answers[Math.floor(Math.random() * answers.length)]
      }

      return answer
    },
    type: 'dialog',
  },
  {
    id: 'checkin-with-yourself',
    text: "Checking in with yourself is a great first step to understand how you're feeling.",
    type: 'dialog',
  },
  {
    id: 'complete',
    text: `
    You can check in with me any time! Just hit the X at the top of the screen and find the Check-in button
    `,
    type: 'dialog',
  },
]
