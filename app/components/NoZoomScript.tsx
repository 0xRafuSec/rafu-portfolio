'use client'

import { useEffect } from 'react'

export default function NoZoomScript() {
  useEffect(() => {
    // Only prevent accidental double-tap zoom on mobile.
    // Pinch-to-zoom is intentionally allowed for accessibility.
    let lastTouchEnd = 0
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    }

    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false })

    return () => {
      document.removeEventListener('touchend', preventDoubleTapZoom)
    }
  }, [])

  return null
}
