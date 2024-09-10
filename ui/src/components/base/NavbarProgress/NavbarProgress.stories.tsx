import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NavbarProgress, NavbarProgressProps } from './NavbarProgress'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: NavbarProgress,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavbarProgress>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: NavbarProgressProps) => <NavbarProgress {...args} />,
  args: {
    title: 'The ME Triangle: Introduction',
    backClick: () => {},
    closeClick: () => {},
    progress: 35,
  },
}
