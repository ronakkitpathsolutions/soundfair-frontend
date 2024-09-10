import React, { FC } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Button } from '../Button'
import { Icon } from '../Icon'
import iconPaths from '../../../assets/icons/lib'

export interface ButtonShareProps {
  label: string
  title: string
  url: string
  variant?: 'primary' | 'secondary'
  className?: string
}

interface ShareLink {
  text: string
  icon: keyof typeof iconPaths
  href: string
}

export const ButtonShare: FC<ButtonShareProps> = ({
  label,
  title,
  url,
  variant = 'primary',
  className,
}) => {
  const shareLinks: ShareLink[] = [
    {
      text: 'Facebook',
      icon: 'facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url,
      )}`,
    },
    {
      text: 'X',
      icon: 'twitter',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      text: 'Instagram',
      icon: 'instagram',
      href: `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
    },
  ]

  const handleNativeShare = async () => {
    if (navigator && navigator.share) {
      await navigator.share({
        title,
        url,
      })
    }
  }

  return navigator.canShare && navigator.canShare() ? (
    <Button onClick={handleNativeShare} variant={variant} icon="share">
      {label}
    </Button>
  ) : (
    <Popover.Root modal>
      <Popover.Trigger asChild>
        <Button variant={variant} icon="share" className={className}>
          {label}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade rounded-xl border border-purple-70 bg-white p-3 text-purple-60 shadow-card will-change-[transform,opacity] "
          sideOffset={5}
          side="top"
        >
          <div className="flex items-center gap-3">
            {shareLinks.map((link) => (
              <Button
                key={link.text}
                variant="icon"
                icon={link.icon}
                aria-label={'Share to ' + link.text}
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="before:absolute before:inset-0"
                />
              </Button>
            ))}
          </div>
          <Popover.Close className="absolute right-0 top-0" asChild>
            <Button type="button" variant="icon" aria-label="Close" />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
