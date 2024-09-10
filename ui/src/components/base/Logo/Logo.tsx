'use client'
import React from 'react'
import Lottie from 'lottie-react'
import logoAnimation from './logo-animation.json'

export interface LogoProps {
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ className, ...props }) => {
  return (
    <Lottie
      animationData={logoAnimation}
      loop={true}
      {...props}
      className={className}
    />
  )
}
