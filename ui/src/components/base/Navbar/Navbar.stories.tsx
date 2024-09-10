import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Navbar, NavbarProps } from './Navbar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: Navbar,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Navbar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: NavbarProps) => <Navbar {...args} />,
  args: {
    items: [
      { label: 'Modules', onClick: () => {} },
      {p
        label: 'Toolkit',
        onClick: () => {},
        notifications: { amount: 1, message: 'items unlocked in toolkit' },
      },
    ],
  },
}
