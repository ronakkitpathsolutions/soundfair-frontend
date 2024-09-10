import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextInput, TextInputProps } from './TextInput'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: TextInput,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInput>

export default meta

type Story = StoryObj<typeof meta>

const TextInputWrapper = (props: any) => {
  const [value, setValue] = useState('')

  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <TextInput
      {...props}
      value={value}
      onChange={onChange}
      onClearInput={() => setValue('')}
    />
  )
}

export const Default: Story = {
  render: (args: TextInputProps) => <TextInputWrapper {...args} />,
  args: {
    name: 'test',
    placeholder: 'Write to Bluurb',
  },
}
