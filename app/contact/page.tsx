'use client'

import { useEffect } from 'react'
import PortfolioContent from '../../components/PortfolioContent'

export default function ContactPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById('contact')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return <PortfolioContent />
}

