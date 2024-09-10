import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox, CheckboxProps } from './Checkbox'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

const CheckboxWrapper = (props: any) => {
  const [value, setValue] = useState(false)

  return <Checkbox {...props} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: (args: CheckboxProps) => <CheckboxWrapper {...args} />,
  args: {
    label: 'Accept terms and conditions.',
    variant: 'default',
  },
}
