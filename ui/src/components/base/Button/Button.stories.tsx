import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonProps } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: ButtonProps) => <Button {...args} />,
  args: {
    variant: 'primary',
    children: 'Hello world',
  },
}

export const Secondary: Story = {
  render: (args: ButtonProps) => (
    <div className="rounded bg-neutral p-10">
      <Button {...args}>Hello world</Button>
      <Button
        {...args}
        notifications={{
          amount: 1,
          message: 'items unlocked in toolkit',
        }}
        className="ml-4"
      >
        Hello world
      </Button>
    </div>
  ),
  args: {
    variant: 'secondary',
    size: 'medium',
  },
}
export const IconOnly: Story = {
  render: (args: ButtonProps) => (
    <div className="rounded bg-neutral p-10">
      <Button {...args} />
    </div>
  ),
  args: {
    variant: 'icon',
    icon: 'close',
    'aria-label': 'Close',
  },
}
