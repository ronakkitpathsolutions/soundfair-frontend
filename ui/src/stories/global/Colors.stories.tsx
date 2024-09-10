import React from 'react'
import cx from 'clsx'
import type { Meta, StoryObj } from '@storybook/react'

import { StoryTemplate } from '../../components/docs/StoryTemplate'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Global/Colors',
} satisfies Meta<typeof StoryTemplate>

export default meta

type Story = StoryObj<typeof meta>

const colors = [
  { name: 'Purple light', className: 'bg-purple-30' },
  { name: 'Purple', className: 'bg-purple-30' },
  {
    name: 'Purple dark',
    className: 'bg-purple-60 border border-sm border-purple-70',
  },
  { name: 'Purple darkest', className: 'bg-purple-70' },
  { name: 'Pink', className: 'bg-pink' },
  { name: 'Pewter', className: 'bg-pewter' },
  { name: 'Green', className: 'bg-green' },
  { name: 'Orange', className: 'bg-orange' },
  { name: 'Yellow', className: 'bg-yellow text-purple-60' },
  { name: 'Grey', className: 'bg-neutral text-purple-60' },
  { name: 'White', className: 'bg-white text-purple-60' },
  { name: 'Black', className: 'bg-black' },
  { name: 'Blue', className: 'bg-blue' },
]

export const Colors: Story = {
  args: {},
  render: () => (
    <StoryTemplate
      title="Colors"
      description="The color palette used throughout the site."
    >
      <div className="max-w-screen-sm">
        <ul className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <li
              className={cx('h-32 rounded p-4', color.className)}
              key={color.name}
            >
              <p className="inline-block rounded-sm px-2 py-1 text-xs">
                {color.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </StoryTemplate>
  ),
}
