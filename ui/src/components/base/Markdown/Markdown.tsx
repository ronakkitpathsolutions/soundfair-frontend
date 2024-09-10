import React, { Fragment } from 'react'
import { cn } from 'ui/src/utils/cn'

import { IconBehaviour, IconFeeling, IconThought, IconTrigger } from '../Icon'
import ReactMarkdown from 'react-markdown'

export interface MarkdownProps {
  text: string
  className?: string
  invert?: boolean
  basic?: boolean
  purple?: boolean
}
export const Markdown = ({
  text,
  className,
  invert,
  purple,
}: MarkdownProps) => {
  // @ts-ignore
  const codeHandler = ({ node, inline, className, children, ...props }) => {
    const match =
      /(\[TRIGGER]|\[BEHAVIOUR]|\[THOUGHT]|\[FEELING]|\[THINKING])/gm.exec(
        children,
      )

    if (match) {
      const iconName = String(children)
        .replace('[', '')
        .replace(']', '')
        .toLowerCase()

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
    }

    return children
  }

  const components: any = {
    code: codeHandler,
  }

  return (
    <ReactMarkdown
      className={cn(
        {
          prose: true,
          invert: invert,
          'prose-purple': purple,
        },
        className,
      )}
      components={components}
    >
      {text}
    </ReactMarkdown>
  )
}
