import { FC } from 'react'
import NextjsHead from 'next/head'

export interface HeadProps {
  title: string
  noIndex?: boolean
}

export const Head: FC<HeadProps> = ({ title, noIndex }) => {
  return (
    <NextjsHead>
      <title>Soundfair | {title}</title>
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}
    </NextjsHead>
  )
}
