import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Empty, EmptyProps } from './Empty'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: Empty,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Empty>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: EmptyProps) => <Empty {...args} />,
  args: {
    children: (
      <>
        <p className="mb-4">Nothing here yet!</p>
        <p>Complete up to Module 6 to unlock the ability to exercise.</p>
      </>
    ),
    cta: {
      label: 'Continue learning',
      onClick: () => {},
    },
  },
}
