import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Terminal from './components/Terminal';
import HackingSim from './components/HackingSim';
import PasswordAnalyzer from './components/PasswordAnalyzer';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import Konami from './components/Konami';
import BackToTop from './components/BackToTop';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      
      {/* Hidden Hint for CTF Players */}
      {/* Hint: Try the Konami Code... (Up, Up, Down, Down, Left, Right, Left, Right, B, A) */}
      
      <div className={`min-h-screen relative font-sans selection:bg-cyber-green-dark dark:selection:bg-cyber-green selection:text-white dark:selection:text-black transition-colors duration-300 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        
        <Konami />

        {/* Global Backgrounds */}
        <div className="fixed inset-0 z-[-1] bg-gray-50 dark:bg-cyber-black transition-colors duration-300"></div>
        <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none"></div>
        <div className="fixed inset-0 z-[-1] bg-gradient-to-tr from-transparent via-transparent to-cyber-green/5 dark:to-cyber-green/10 pointer-events-none"></div>
        
        <Navbar />
        
        <main className="relative z-10">
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
  );
};

export default App;