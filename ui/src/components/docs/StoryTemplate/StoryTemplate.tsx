import React, { FC } from 'react'

export type StoryTemplateProps = {
  /**
   * Story title
   */
  title: string
  /**
   * Story description
   */
  description?: string
  /**
   * The child elements
   */
  children?: React.ReactNode
}

export const StoryTemplate: FC<StoryTemplateProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div>
      <h1 className="text-3xl mb-4 border-b border-current pb-2">{title}</h1>
      {description && <p className="mb-4">{description}</p>}
      <div className="h-4" />
      {children}
    </div>
  )
}
