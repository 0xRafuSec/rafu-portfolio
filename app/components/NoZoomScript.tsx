'use client'

import { useEffect } from 'react'

export default function NoZoomScript() {
  useEffect(() => {
    // Prevent zoom on double tap and pinch
    let lastTouchEnd = 0
    const preventZoom = (e: TouchEvent) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    }

    // Prevent zoom via meta tag manipulation
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      )
    }

    // Prevent double-tap zoom on mobile
    if (typeof window !== 'undefined') {
      document.addEventListener('touchend', preventZoom, { passive: false })
      
      // Ensure viewport scale is correct
      const setViewportScale = () => {
        const viewport = document.querySelector('meta[name="viewport"]')
        if (viewport) {
          viewport.setAttribute(
            'content',
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          )
        }
      }
      
      setViewportScale()
      window.addEventListener('resize', setViewportScale)
      
      return () => {
        document.removeEventListener('touchend', preventZoom)
        window.removeEventListener('resize', setViewportScale)
      }
    }
  }, [])

  return null
}

