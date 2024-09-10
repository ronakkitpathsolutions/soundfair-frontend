import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Spacer } from '../../components/base/Spacer'

import { StoryTemplate } from '../../components/docs/StoryTemplate'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Global/Spacing',
} satisfies Meta<typeof StoryTemplate>

export default meta

type Story = StoryObj<typeof StoryTemplate>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const scale = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']

export const Spacing: Story = {
  render: () => (
    <StoryTemplate
      title="Spacing"
      description="The spacing scale used throughout the site."
    >
      <div className="max-w-screen-sm">
        <ul>
          {scale.map((size) => (
            <li className="mb-4" key={size}>
              <p className="mb-2 inline-block rounded-sm bg-white px-2 py-1 text-xs">
                {size}
              </p>
              <div className="bg-neutral-90">
                <Spacer size={size} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </StoryTemplate>
  ),
}
