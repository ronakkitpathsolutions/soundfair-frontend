import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Pill, PillProps } from './Pill'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: Pill,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Pill>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: PillProps) => (
    <div>
      <Pill {...args} />
    </div>
  ),
  args: {
    label: 'New',
    size: 'small',
    variant: 'primary',
  },
}
