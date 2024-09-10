'use client'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

const typographyVariants = cva('', {
  variants: {
    variant: {
      'h1-lg': [
        'font-display',
        'text-display-lg',
        'md:text-display-3xl',
        'tracking-tight',
        'font-medium',
      ],
      h1: [
        'font-display',
        'text-display-xl',
        'md:text-display-2xl',
        'tracking-tight',
      ],
      'h1-sm': [
        'font-display',
        'text-display-lg',
        'md:text-display-xl',
        'tracking-tight',
      ],
      'h1-xs': [
        'font-display',
        'font-normal',
        'text-display-sm',
        'md:text-display-md',
        'md:tracking-tight',
      ],
      h2: [
        'font-display',
        'text-display-md',
        'md:text-display-lg',
        'tracking-tight',
      ],
      'h2-sm': ['text-base'],
      h3: ['font-display', 'text-lg', 'md:text-lg', 'md:tracking-tight'],
      h4: ['font-display', 'text-display-xs', 'md:text-display-sm'],
      'text-xl': ['text-base sm:text-lg md:text-xl'],
      'text-lg': ['text-base', 'text-lg'],
      'text-md': ['text-base'],
      'text-sm': ['text-sm'],
      'heading-l': ['text-heading-l'],
      'body-s': ['text-body-s'],
      body: ['text-body'],
      'heading-m': ['text-heading-m'],
      'heading-m-bold': ['text-heading-m', 'font-medium'],
    },
  },
  defaultVariants: {
    variant: 'text-md',
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  component?: string
  asChild?: boolean
}

export const Typography: React.FC<TypographyProps> = ({
  className,
  component,
  variant,
  asChild,
  ...props
}) => {
  const variantDefaultTag = {
    'h1-lg': 'h1',
    h1: 'h1',
    'h1-sm': 'h1',
    'h1-xs': 'h1',
    h2: 'h2',
    'h2-sm': 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    'text-body': 'p',
    'text-xl': 'p',
    'text-lg': 'p',
    'text-md': 'p',
    'text-sm': 'p',
    'heading-l': 'h1',
    'body-s': 'p',
    body: 'p',
    'heading-m': 'h2',
    'heading-m-bold': 'h2',
  }

  const Comp =
    (asChild ? Slot : false) ||
    component ||
    (variant ? variantDefaultTag[variant] : 'p')

  return (
    <Comp className={typographyVariants({ variant, className })} {...props} />
  )
}
