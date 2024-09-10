import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupProps } from './RadioGroup'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

const RadioGroupWrapper = (props: any) => {
  const [value, setValue] = useState('')
  return <RadioGroup {...props} value={value} onChange={setValue} />
}

export const Group: Story = {
  render: (args: RadioGroupProps) => {
    return <RadioGroupWrapper {...args} />
  },
  args: {
    name: 'test',
    label: 'Please select an option',
    variant: 'primary',
    options: [
      {
        label: 'Option 1',
        value: '1',
      },
      {
        label: 'Option 2',
        value: '2',
      },
      {
        label: 'Option 3',
        value: '3',
      },
      {
        label: 'Option 4',
        value: '4',
      },
      {
        label: 'Option 5',
        value: '5',
      },
      {
        label: 'Option 6',
        value: '6',
      },
      {
        label: 'Option 7',
        value: '7',
      },
    ],
  },
}
