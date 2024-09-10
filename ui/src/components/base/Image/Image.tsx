'use client'
import NextImage, { StaticImageData } from 'next/image'
import { cn } from '../../../utils/cn'

export interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Image src
   */
  src: string | StaticImageData
  /**
   * Image alt text
   */
  alt: string
  /**
   * Object fit
   */
  fit?: 'contain' | 'cover' | 'fill'
  /**
   * Object position
   */
  position?: string
  imageClass?: string
  /**
   * Aspect ratio
   */
  aspectRatio?: number
  /**
   * Element class name
   */
  className?: string
  /**
   * Expandable
   */
  expandable?: boolean
  /**
   * Enlarged image src
   */
  enlargedSrc?: string
  /**
   * Width
   */
  width?: number
  /**
   * Height
   */
  height?: number
  /*
   * Loading mode
   */
  loading?: 'lazy' | 'eager'
  /**
   * Quality
   */
  quality?: number
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  fit = 'cover',
  position = '50% 50%',
  aspectRatio,
  className,
  imageClass,
  width,
  height,
  loading = 'lazy',
  quality = 90,
  ...props
}) => {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={
        aspectRatio
          ? {
              paddingBottom: `${aspectRatio * 100}%`,
            }
          : undefined
      }
      {...props}
    >
      <NextImage
        src={src}
        alt={alt || ''}
        fill={!(width && height)}
        width={width}
        height={height}
        quality={quality}
        className={cn(
          {
            'absolute h-full w-full': aspectRatio,
          },
          imageClass,
        )}
        loading={loading}
        style={{
          objectFit: fit,
          objectPosition: position,
        }}
      />
    </div>
  )
}
