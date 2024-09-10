import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ButtonShare, ButtonShareProps } from './ButtonShare'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: ButtonShare,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ButtonShare>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: ButtonShareProps) => (
    <div>
      <ButtonShare {...args} />
    </div>
  ),
  args: {
    label: 'Share',
    variant: 'secondary',
    url: 'https://google.com',
    title: 'Google',
  },
}
