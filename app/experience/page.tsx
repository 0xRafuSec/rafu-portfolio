'use client'

import { useEffect } from 'react'
import PortfolioContent from '../../components/PortfolioContent'

export default function ExperiencePage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById('experience')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return <PortfolioContent />
}

