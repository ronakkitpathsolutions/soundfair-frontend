import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TransitionExpand } from './TransitionExpand'
import { Button } from '../Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: TransitionExpand,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TransitionExpand>

export default meta

type Story = StoryObj<typeof meta>

const AnimationWrapper = ({ args }: any) => {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <>
      <Button onClick={() => setIsVisible(!isVisible)}>Toggle</Button>
      <TransitionExpand isVisible={isVisible} {...args}>
        <div className="mt-8 flex h-40 w-40 items-center justify-center rounded-xl bg-orange">
          Hello
        </div>
      </TransitionExpand>
    </>
  )
}

export const Primary: Story = {
  render: (args: any) => <AnimationWrapper {...args} />,
  args: {
    isVisible: false,
    children: null,
  },
}
