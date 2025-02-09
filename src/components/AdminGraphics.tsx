'use client'
import React from 'react'

export const Logo: React.FC = () => (
  <picture>
    {/* Dark Mode */}
    <source srcSet="/Delpuma2025WhiteLogo.svg" media="(prefers-color-scheme: dark)" />
    {/* Light Mode */}
    <img
      src="/Delpuma2025BlackLogo.svg"
      alt="DelPuma Consulting Group"
      style={{ height: '40px' }}
    />
  </picture>
)

export const Icon: React.FC = () => (
  <img src="/favicon.ico" alt="DelPuma Favicon" style={{ height: '32px' }} />
)
