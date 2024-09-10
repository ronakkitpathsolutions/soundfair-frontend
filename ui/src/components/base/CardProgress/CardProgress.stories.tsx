import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CardProgress, CardProgressProps } from './CardProgress'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: CardProgress,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardProgress>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: CardProgressProps) => <CardProgress {...args} />,
  args: {
    title: 'Hello world',
    meta: '10 minutes left',
    status: 'in-progress',
    href: '#',
    progress: 25,
  },
}
