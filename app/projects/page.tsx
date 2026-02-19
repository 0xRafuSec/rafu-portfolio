'use client'

import { useEffect } from 'react'
import PortfolioContent from '../../components/PortfolioContent'

export default function ProjectsPage() {
  useEffect(() => {
    let cancelled = false
    const startedAt = Date.now()

    const scrollToSection = () => {
      if (cancelled) return

      const element = document.getElementById('projects')
      const isReady = element && element.getBoundingClientRect().height > 0

      if (isReady && element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      if (Date.now() - startedAt < 8000) {
        requestAnimationFrame(scrollToSection)
      }
    }

    const timer = setTimeout(() => {
      scrollToSection()
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  return <PortfolioContent />
}
