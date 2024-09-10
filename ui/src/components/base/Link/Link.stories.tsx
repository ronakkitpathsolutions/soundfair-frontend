import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Link as BaseLink } from './Link'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: BaseLink,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaseLink>

export default meta

type Story = StoryObj<typeof meta>

export const Link: Story = {
  args: {
    href: '#',
    underline: 'always',
    external: false,
    children: 'Learn more',
  },
}
