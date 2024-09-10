import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Progress, ProgressProps } from './Progress'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: Progress,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: ProgressProps) => <Progress {...args} />,
  args: {
    value: 25,
    max: 100,
    variant: 'primary',
  },
}
