import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'
import { TabsProps } from '@radix-ui/react-tabs'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className="max-w-screen-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: TabsProps) => (
    <div className="min-h-[500px] max-w-md rounded-lg bg-neutral p-5 text-purple-60">
      <Tabs {...args}>
        <TabsList>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>
        <TabsContent value="strategies">Content 1</TabsContent>
        <TabsContent value="practice">Content 2</TabsContent>
      </Tabs>
    </div>
  ),
  args: {
    defaultValue: 'strategies',
  },
}
