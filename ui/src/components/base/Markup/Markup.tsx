import React, { Fragment } from 'react'
import { cn } from 'ui/src/utils/cn'
import reactStringReplace from 'react-string-replace'
import { IconBehaviour, IconFeeling, IconThought, IconTrigger } from '../Icon'

export interface IconTextProps {
  text: string
  className?: string
}
export const Markup = ({ text, className }: IconTextProps) => {
  // Replace icons
  let markup = reactStringReplace(
    text,
    /(\[TRIGGER]|\[BEHAVIOUR]|\[THOUGHT]|\[FEELING]|\[THINKING])/gm,
    (match) => {
      const iconName = match.replace('[', '').replace(']', '').toLowerCase()

      let IconComp = null
      switch (iconName) {
        case 'trigger':
          IconComp = IconTrigger
          break
        case 'behaviour':
          IconComp = IconBehaviour
          break
        case 'feeling':
          IconComp = IconFeeling
          break
        case 'thinking':
        case 'thought':
          IconComp = IconThought
          break
      }

      return (
        <Fragment key={iconName}>
          {IconComp ? (
            <IconComp className={cn('mb-1 mr-1', className)} />
          ) : null}
          <span className={'font-bold capitalize'}>{iconName}</span>
        </Fragment>
      )
    },
  )

  // Replace bold
  markup = reactStringReplace(markup, /(\*\*.*?\*\*)/gm, (match) => {
    const boldText = match.replace(/\*/g, '')
    return <span className={'font-bold'}>{boldText}</span>
  })

  // Replace italic
  markup = reactStringReplace(markup, /(\_.*?\_)/gm, (match) => {
    const italicText = match.replace(/\_/g, '')
    return <span className={'italic'}>{italicText}</span>
  })

  return markup
}
