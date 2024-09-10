import { StaticImageData } from 'next/image'
import { videos } from '@/features/videos/content'
import { strategies } from '@/features/strategies/content/strategies'

export type StrategyId = (typeof strategies)[number]['id']

export interface Strategy {
  id: string
  emoji: StaticImageData
  name: string
  image?: StaticImageData
  videoId?: keyof typeof videos
  type: 'video' | 'image'
}
