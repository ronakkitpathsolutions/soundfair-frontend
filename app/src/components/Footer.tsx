import { Container } from '@ui/components/base/Grid'
import React from 'react'

import logo from '@/assets/images/SoundfairLogo.svg'

export default function Footer() {
  return (
    <div className="bg-blue-300 py-5">
      <Container>
        <img src={logo.src} alt="Soundfair" />
      </Container>
    </div>
  )
}
