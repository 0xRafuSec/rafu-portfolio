'use client'

import { useEffect } from 'react'
import PortfolioContent from '../../components/PortfolioContent'

export default function SkillsPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById('skills')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return <PortfolioContent />
}

