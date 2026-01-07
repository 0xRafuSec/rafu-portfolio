'use client'

import { useState, useEffect } from 'react'
import Navbar from './common/Navbar'
import Hero3D from './sections/Hero3D'
import About3D from './sections/About3D'
import Skills3D from './sections/Skills3D'
import Projects3D from './sections/Projects3D'
import Experience3D from './sections/Experience3D'
import Education3D from './sections/Education3D'
import Certifications3D from './sections/Certifications3D'
import Terminal3D from './sections/Terminal3D'
import PasswordAnalyzer3D from './sections/PasswordAnalyzer3D'
import Contact from './common/Contact'
import Footer from './common/Footer'
import SplashScreen from './common/SplashScreen'
import BackToTop from './common/BackToTop'
import Konami from './common/Konami'

export default function PortfolioContent() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}

      <div className={`min-h-screen relative font-sans selection:bg-cyber-green-dark dark:selection:bg-cyber-green selection:text-white dark:selection:text-black transition-colors duration-300 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        {/* Global Backgrounds */}
        <div className="fixed inset-0 z-[-1] bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300"></div>
        <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none"></div>
        <div className="fixed inset-0 z-[-1] bg-gradient-to-tr from-transparent via-transparent to-cyber-green/5 dark:to-cyber-green/10 pointer-events-none"></div>

        <Navbar />
        <Konami />

        <main id="main-content" className="relative z-10">
          <Hero3D />
          <About3D />
          <Skills3D />
          <Projects3D />
          <Experience3D />
          <Education3D />
          <Certifications3D />
          <Terminal3D />
          <PasswordAnalyzer3D />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  )
}

