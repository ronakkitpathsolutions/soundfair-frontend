import { FeelingOption } from '@/features/check-in/types'

export const calculateCheckinScore = (formData: Record<string, any>) => {
  const scale: Record<FeelingOption, number> = {
    Never: 0,
    Rarely: 1,
    Sometimes: 2,
    Often: 3,
    Mostly: 4,
    Always: 5,
  }

  const fieldsToCheck: Array<string> = [
    'felt-cheerful',
    'felt-calm-relaxed',
    'felt-active-energetic',
    'felt-refreshed-rested',
    'felt-interested',
  ]

  const total = fieldsToCheck
    .map((field) => {
      const value: keyof typeof scale = formData[field]
      return scale[value]
    })
    .reduce((a, b) => a + b, 0)

  const average = total / fieldsToCheck.length
  return average
}
