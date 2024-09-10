import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Logo, LogoProps } from './Logo'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: Logo,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: LogoProps) => <Logo {...args} />,
}
