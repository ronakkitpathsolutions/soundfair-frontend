import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { Drawer } from './Drawer'
import { Typography } from '../Typography'
import { NavbarProgress } from '../NavbarProgress'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: Drawer,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Drawer>

export default meta

type Story = StoryObj<typeof meta>

const DrawerWrapper = (props: any) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Drawer {...props} open={open} onOpenChange={setOpen}>
        <NavbarProgress
          title="Step 1 of 4"
          showBackBtn
          showCloseBtn
          onCloseClicked={() => setOpen(false)}
          className="mb-6"
        />
        <Typography variant="text-sm" className="text-purple-60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Drawer>
    </div>
  )
}

export const Primary: Story = {
  render: (args: any) => <DrawerWrapper {...args} />,
  args: {
    variant: 'secondary',
  },
}
