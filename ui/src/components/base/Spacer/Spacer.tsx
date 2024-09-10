import React, { FC } from 'react'
import cx from 'clsx'

export type SpacerProps = {
  /**
   * Spacer size
   */
  size:
    | string
    | {
        _?: string
        sm?: string
        md?: string
        lg?: string
        xl?: string
        '2xl'?: string
      }
  /**
   * Element class name
   */
  className?: string
}

export const Spacer: FC<SpacerProps> = ({ size, className }) => {
  let sizeClassList: string = ''

  if (typeof size === 'string') {
    sizeClassList = `h-${size}`
  } else {
    for (const bp in size) {
      if (bp === '_') {
        sizeClassList += ` h-${size[bp]}`
      } else {
        // @ts-ignore
        sizeClassList += ` ${bp}:h-${size[bp]}`
      }
    }
  }

  const classList = cx('w-full', sizeClassList, className)

  return <div className={classList} />
}
