import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardProgressProps } from './Card'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: CardProgressProps) => (
    <div className="grid w-[320px] grid-cols-2 gap-4">
      <Card {...args} />
      <Card {...args} />
      <Card {...args} />
      <Card {...args} />
    </div>
  ),
  args: {
    title: 'Unhelpful thoughts',
    emoji: 'yoga',
    notification: 'New',
    href: '#',
  },
}
