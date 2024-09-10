'use client'
import React from 'react'
import * as RadixAvatar from '@radix-ui/react-avatar'

export interface AvatarProps {
  src?: string
  alt?: string
  fallbackText: string
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export const avatarSizeClasses = {
  small: 'h-8 w-8',
  medium: 'h-16 w-16',
  large: 'h-32 w-32',
}
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallbackText,
  size = 'medium',
  className,
}) => {
  const sizeClass = avatarSizeClasses[size] || avatarSizeClasses['medium']
  return (
    <RadixAvatar.Root
      className={`flex items-center justify-center overflow-hidden rounded-full ${sizeClass} ${className}`}
    >
      <RadixAvatar.Image src={src} alt={alt} className="h-full w-full" />
      <RadixAvatar.Fallback
        className="flex h-full w-full items-center justify-center bg-gray-500 text-white"
        delayMs={600}
      >
        <span className="text-[1.87rem]">{fallbackText}</span>
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

Avatar.displayName = 'Avatar'
