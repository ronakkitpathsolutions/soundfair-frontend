import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Video, VideoProps } from './Video'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: Video,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Video>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: VideoProps) => (
    <div>
      <Video {...args} />
    </div>
  ),
  args: {
    playbackId: 'Hf9URUxK01iGOZ9U028yNia3IX6iU02RsKj7jOI4F3oMEs',
    videoId: 'v0X00X00X00X00X00X00X00X00X00X00X',
    videoTitle: 'Video Title',
  },
}
