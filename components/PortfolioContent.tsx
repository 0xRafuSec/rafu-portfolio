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

        {/* Global Backgrounds */}
        <div className="fixed inset-0 z-[-1] bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300"></div>
        <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none"></div>
        <div className="fixed inset-0 z-[-1] bg-gradient-to-tr from-transparent via-transparent to-cyber-green/5 dark:to-cyber-green/10 pointer-events-none"></div>
        
        <Navbar />
        
        <main id="main-content" className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Certifications />
          <Experience />
          <Education />
          <Projects />
          
          {/* Interactive Zone */}
          <section id="interactive" className="py-20 relative overflow-hidden scroll-mt-20 border-t border-gray-200 dark:border-white/5">
            <div className="absolute inset-0 bg-gray-100/50 dark:bg-cyber-dark/50 pointer-events-none"></div>
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
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  )
}

