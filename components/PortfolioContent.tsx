'use client'

import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Certifications from './Certifications'
import Experience from './Experience'
import Education from './Education'
import Projects from './Projects'
import Terminal from './Terminal'
import HackingSim from './HackingSim'
import PasswordAnalyzer from './PasswordAnalyzer'
import Contact from './Contact'
import Footer from './Footer'
import SplashScreen from './SplashScreen'
import Konami from './Konami'
import BackToTop from './BackToTop'
import Encryption from './Encryption'
import StarsCanvas from './StarBackground'

export default function PortfolioContent() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simple Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    // Attach observer to sections
    const interval = setInterval(() => {
      document.querySelectorAll('section:not(.observed)').forEach(section => {
        section.classList.add('reveal-on-scroll', 'observed')
        observer.observe(section)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}

      {/* Hidden Hint for CTF Players */}
      {/* Hint: Try the Konami Code... (Up, Up, Down, Down, Left, Right, Left, Right, B, A) */}

      <div className={`min-h-screen relative font-sans selection:bg-cyber-green-dark dark:selection:bg-cyber-green selection:text-white dark:selection:text-black transition-colors duration-300 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>

        <Konami />

        {/* Global Backgrounds - Space Theme with GREEN tint */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#020a05] via-[#030a06] to-[#020a04]"></div>
        <div className="fixed inset-0 z-[0] bg-[radial-gradient(ellipse_at_top,_#00ff9d10_0%,_transparent_50%)] pointer-events-none"></div>
        <StarsCanvas />

        <Navbar />

        <main id="main-content" className="relative z-20">
          <Hero />
          <About />
          <Skills />
          <Encryption />
          <Certifications />
          <Experience />
          <Education />
          <Projects />

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
      </div>
    </>
  )
}

