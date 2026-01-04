import React from 'react';
import { ChevronRight, Download, Github, Linkedin, Terminal, Instagram } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
      {/* Background Gradient Spotlights - Enhanced */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-green/10 dark:bg-cyber-green/20 rounded-full blur-[128px] pointer-events-none animate-pulse-fast" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 dark:bg-cyber-blue/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-green-dark/30 dark:border-cyber-green/30 bg-cyber-green/5 text-cyber-green-dark dark:text-cyber-green text-sm font-mono mb-6 shadow-none dark:shadow-neon-green animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green-dark dark:bg-cyber-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green-dark dark:bg-cyber-green"></span>
          </span>
          Available For Hire
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white font-sans animate-fade-in-up [animation-delay:200ms]">
          Muhammad <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green-dark to-cyber-blue-dark dark:from-cyber-green dark:to-cyber-blue">Rafay Ali</span>
        </h1>
        
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-up [animation-delay:400ms]">
            <Terminal className="text-cyber-green-dark dark:text-cyber-green w-5 h-5 md:w-8 md:h-8" />
            <h2 className="text-xl md:text-3xl text-gray-800 dark:text-gray-200 font-mono font-bold tracking-wider bg-black/5 dark:bg-black/30 px-4 py-1 rounded border-l-4 border-cyber-green-dark dark:border-cyber-green">
            CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green-dark to-cyber-blue-dark dark:from-cyber-green dark:to-cyber-blue">SECURITY ENGINEER</span>
            </h2>
        </div>
        
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-cyber-muted mb-10 leading-relaxed font-mono text-sm md:text-base border-t border-b border-gray-200 dark:border-white/5 py-4 bg-white/5 dark:bg-black/20 backdrop-blur-sm animate-fade-in-up [animation-delay:600ms]">
          <span className="text-cyber-blue-dark dark:text-cyber-blue">&gt;&gt;</span> Transforming logs into intelligence and vulnerabilities into fortifications through precision threat detection and automated incident response.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up [animation-delay:800ms]">
          {/* Primary Action */}
          <a 
            href="/contact" 
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="group relative px-8 py-3 bg-cyber-green-dark dark:bg-cyber-green text-white dark:text-black font-bold font-mono rounded-sm overflow-hidden hover:shadow-[0_0_20px_rgba(0,163,101,0.5)] dark:hover:shadow-[0_0_20px_#00ff9d] transition-all duration-300 flex items-center gap-2 skew-x-[-10deg] hover:scale-105 cursor-pointer"
          >
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer skew-x-[10deg]"></div>
            <span className="skew-x-[10deg] flex items-center gap-2 relative z-10">
                Initiate Contact
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          
          {/* Secondary Action */}
          <a 
            href="/projects" 
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('projects');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="group relative px-8 py-3 border border-cyber-green-dark dark:border-cyber-green text-cyber-green-dark dark:text-cyber-green font-bold font-mono rounded-sm overflow-hidden hover:bg-cyber-green-dark/5 dark:hover:bg-cyber-green/10 transition-all duration-300 flex items-center gap-2 skew-x-[-10deg] hover:shadow-[0_0_10px_rgba(0,163,101,0.3)] dark:hover:shadow-[0_0_10px_#00ff9d] hover:scale-105 cursor-pointer"
          >
             <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-cyber-green-dark/10 dark:via-cyber-green/20 to-transparent group-hover:animate-shimmer skew-x-[10deg]"></div>
            <span className="skew-x-[10deg] relative z-10">View Projects</span>
          </a>
          
          {/* Download CV */}
          <a 
            href="https://rafucybersec.vercel.app/resume" 
            target="_blank" 
            className="group relative px-8 py-3 border border-cyber-blue-dark dark:border-cyber-blue text-cyber-blue-dark dark:text-cyber-blue font-bold font-mono rounded-sm overflow-hidden hover:bg-cyber-blue-dark/5 dark:hover:bg-cyber-blue/10 transition-all duration-300 flex items-center gap-2 skew-x-[-10deg] hover:shadow-[0_0_10px_rgba(0,150,170,0.3)] dark:hover:shadow-[0_0_10px_#00e1ff] hover:scale-105"
          >
             <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-cyber-blue-dark/10 dark:via-cyber-blue/20 to-transparent group-hover:animate-shimmer skew-x-[10deg]"></div>
             <span className="skew-x-[10deg] flex items-center gap-2 relative z-10">
                <Download size={18} />
                Download CV
             </span>
          </a>
        </div>

        <div className="flex justify-center gap-6 text-gray-500 dark:text-cyber-muted animate-fade-in-up [animation-delay:1000ms]">
           <a href="https://github.com/0xRafuSec" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green-dark dark:hover:text-cyber-green transition-colors hover:scale-110 transform duration-200">
             <Github size={24} />
           </a>
           <a href="https://www.linkedin.com/in/muhammadrafayali/" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-blue-dark dark:hover:text-cyber-blue transition-colors hover:scale-110 transform duration-200">
             <Linkedin size={24} />
           </a>
           <a href="https://www.instagram.com/rafucybersec/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 dark:hover:text-pink-500 transition-colors hover:scale-110 transform duration-200">
             <Instagram size={24} />
           </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;