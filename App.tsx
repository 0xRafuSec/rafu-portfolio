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

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      
      <div className={`min-h-screen bg-white dark:bg-cyber-black text-gray-900 dark:text-cyber-text font-sans selection:bg-cyber-green selection:text-black transition-colors duration-300 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Certifications />
          <Experience />
          <Education />
          <Projects />
          
          {/* Interactive Zone */}
          <section id="interactive" className="py-20 bg-gray-50 dark:bg-cyber-dark relative overflow-hidden scroll-mt-20 transition-colors duration-300">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
            <div className="container mx-auto px-4 space-y-24 relative z-10">
              <Terminal />
              <HackingSim />
              <PasswordAnalyzer />
            </div>
          </section>

          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;