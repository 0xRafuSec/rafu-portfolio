'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { isLowEndDevice, prefersReducedMotion } from '@/lib/performance'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Certifications from './Certifications'
import Experience from './Experience'
import Education from './Education'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
import SplashScreen from './SplashScreen'

const Terminal = dynamic(() => import('./Terminal'))
const HackingSim = dynamic(() => import('./HackingSim'))
const PasswordAnalyzer = dynamic(() => import('./PasswordAnalyzer'))
const Konami = dynamic(() => import('./Konami'), { ssr: false })
const BackToTop = dynamic(() => import('./BackToTop'))
const Encryption = dynamic(() => import('./Encryption'))
const StarsCanvas = dynamic(() => import('./StarBackground'), { ssr: false })

export default function PortfolioContent() {
  const [loading, setLoading] = useState(true)
  const mainRef = useRef<HTMLElement>(null)

  // GSAP ScrollTrigger — animate sections on scroll
  useEffect(() => {
    if (loading || !mainRef.current) return

    const reducedMotion = prefersReducedMotion()
    if (reducedMotion) return

    const lowEnd = isLowEndDevice()

    // Small delay to ensure DOM is fully painted before GSAP measures positions
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const sections = mainRef.current!.querySelectorAll('section')

        sections.forEach((section) => {
          // Animate section heading
          const heading = section.querySelector('h2')
          if (heading) {
            gsap.fromTo(heading,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: lowEnd ? 0.4 : 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: heading,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                },
              }
            )
          }

          // Stagger animate cards/items within sections
          const cards = section.querySelectorAll(
            '.grid > a, .grid > div, .space-y-12 > div, .space-y-24 > div'
          )
          if (cards.length > 0) {
            gsap.fromTo(cards,
              { y: lowEnd ? 15 : 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: lowEnd ? 0.3 : 0.5,
                stagger: lowEnd ? 0.05 : 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            )
          }
        })
      }, mainRef)

      return () => ctx.revert()
    }, 100)

    return () => clearTimeout(timer)
  }, [loading])

  const loadingClass = loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'

  return (
    <>
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}

      {/* Hidden Hint for CTF Players */}
      {/* Hint: Try the Konami Code... (Up, Up, Down, Down, Left, Right, Left, Right, B, A) */}

      <div className={`min-h-screen relative font-sans selection:bg-cyber-green-dark dark:selection:bg-cyber-green selection:text-white dark:selection:text-black transition-colors duration-300 ${loadingClass}`}>

        {!loading && (
          <>
            <Konami />

            {/* Global Backgrounds - Space Theme with GREEN tint */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#020a05] via-[#030a06] to-[#020a04]"></div>
            <div className="fixed inset-0 z-[0] bg-[radial-gradient(ellipse_at_top,_#00ff9d10_0%,_transparent_100%)] pointer-events-none"></div>
            <StarsCanvas />

            <Navbar />

            <main id="main-content" ref={mainRef} className="relative z-20">
              <Hero />
              <About />
              <Skills />
              <Certifications />
              <Experience />
              <Education />
              <Projects />
              <Encryption />

              {/* Interactive Zone */}
              <section id="interactive" className="py-20 relative overflow-hidden scroll-mt-20">
                <div className="container mx-auto px-4 space-y-24 relative z-10">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-sans">
                      Interactive <span className="text-cyber-green-dark dark:text-cyber-green">Terminal</span>
                    </h2>
                    <p className="text-gray-600 dark:text-cyber-muted mt-2 font-mono">Execute commands, simulate attacks, and analyze security.</p>
                  </div>
                  <Terminal />
                  <HackingSim />
                  <PasswordAnalyzer />
                </div>
              </section>

              <Contact />
              <Footer />
            </main>
            <BackToTop />
          </>
        )}
      </div>
    </>
  )
}
