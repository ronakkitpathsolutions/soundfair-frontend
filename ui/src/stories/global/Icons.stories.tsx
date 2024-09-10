import React from 'react'
import cx from 'clsx'
import type { Meta, StoryObj } from '@storybook/react'

import { StoryTemplate } from '../../components/docs/StoryTemplate'
import iconPaths from '../../assets/icons/lib'
import {
  Icon,
  IconBehaviour,
  IconFeeling,
  IconThought,
  IconTrigger,
} from '../../components/base/Icon'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Global/Icons',
} satisfies Meta<typeof StoryTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Icons: Story = {
  args: {},
  render: () => (
    <StoryTemplate
      title="Icons"
      description="These icons are used throughout the site."
    >
      <div className="max-w-screen-sm">
        <ul className="grid grid-cols-4 gap-2">
          {Object.keys(iconPaths).map((icon: any) => (
            <li className={cx('rounded')} key={icon}>
              <p className="inline-block rounded-sm px-2 py-1 text-purple-60">
                <Icon name={icon} className="h-12 w-12" circle />
              </p>
            </li>
          ))}
          <li className={cx('rounded')}>
            <p className="inline-block rounded-sm px-2 py-1 text-white">
              <IconBehaviour className="h-12 w-12" />
            </p>
          </li>
          <li className={cx('rounded')}>
            <p className="inline-block rounded-sm px-2 py-1 text-white">
              <IconFeeling className="h-12 w-12" />
            </p>
          </li>
          <li className={cx('rounded')}>
            <p className="inline-block rounded-sm px-2 py-1 text-white">
              <IconThought className="h-12 w-12" />
            </p>
          </li>
          <li className={cx('rounded')}>
            <p className="text-whit inline-block rounded-sm px-2 py-1">
              <IconTrigger className="h-12 w-12" />
            </p>
          </li>
        </ul>
      </div>
    </StoryTemplate>
  ),
}
