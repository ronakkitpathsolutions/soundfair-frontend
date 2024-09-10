import { forwardRef } from 'react'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import cx from 'clsx'

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    NextLinkProps {
  /**
   * Card link
   */
  href: string
  /**
   * Sets the appropriate `target` and `rel` props
   */
  external?: boolean
  /**
   * Styled
   */
  styled?: boolean
  /**
   * As button
   */
  asButton?: boolean
}

const isExternal = (href: string): boolean => {
  const regexp = /^(?:[a-z]+:)?\/\//i
  return regexp.test(href)
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      external = false,
      className,
      children,
      styled = false,
      asButton = false,
      ...props
    },
    ref,
  ) => {
    const attrs: any = {
      ...props,
    }

    if (external) {
      attrs.rel = 'noopener'
      attrs.target = '_blank'
    }

    const classList = cx(
      styled && [
        'font-semibold',
        'underline decoration-[0.075em] underline-offset-[0.25em]',
        'decoration-current',
        'hover:decoration-primary-main',
        'active:decoration-primary-pressed',
        'text-base md:text-lg',
      ],
      className,
    )

    if (asButton) {
      return (
        <button type="button" className={classList} {...attrs} ref={ref}>
          {children}
        </button>
      )
    }

    if (isExternal(href) || href.startsWith('#')) {
      return (
        <a href={href} className={classList} {...attrs} ref={ref}>
          {children}
        </a>
      )
    }

    return (
      <NextLink
        href={href}
        className={classList}
        {...attrs}
        ref={ref}
        prefetch={false}
      >
        {children}
      </NextLink>
    )
  },
)

Link.displayName = 'Link'
