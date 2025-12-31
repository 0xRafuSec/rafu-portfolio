import React from 'react';
import { ChevronRight, Download, Github, Linkedin, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
      {/* Background Gradient Spotlights - Enhanced */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-green/20 rounded-full blur-[128px] pointer-events-none animate-pulse-fast" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-green/30 bg-cyber-green/5 text-cyber-green text-sm font-mono mb-6 shadow-neon-green animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
          </span>
          System Status: Online
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white font-sans animate-fade-in-up [animation-delay:200ms]">
          Muhammad <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-blue">Rafay Ali</span>
        </h1>
        
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-up [animation-delay:400ms]">
            <Terminal className="text-cyber-green w-5 h-5 md:w-8 md:h-8" />
            <h2 className="text-xl md:text-3xl text-gray-800 dark:text-gray-200 font-mono font-bold tracking-wider bg-black/5 dark:bg-black/30 px-4 py-1 rounded border-l-4 border-cyber-green">
            CYBER SECURITY ENGINEER
            </h2>
        </div>
        
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-cyber-muted mb-10 leading-relaxed font-mono text-sm md:text-base border-t border-b border-gray-200 dark:border-white/5 py-4 bg-white/5 dark:bg-black/20 backdrop-blur-sm animate-fade-in-up [animation-delay:600ms]">
          <span className="text-cyber-blue">&gt;&gt;</span> Experienced in SOC operations, SIEM engineering, threat detection, and incident response. 
          Expert in building scalable, compliance-aligned detection frameworks.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up [animation-delay:800ms]">
          {/* Primary Action */}
          <a href="#contact" className="group px-8 py-3 bg-cyber-green text-black font-bold font-mono rounded-sm transition-all hover:bg-white hover:text-black hover:shadow-neon-green flex items-center gap-2 skew-x-[-10deg]">
            <span className="skew-x-[10deg] flex items-center gap-2">
                Initiate Contact
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          
          {/* Secondary Action */}
          <a href="#projects" className="px-8 py-3 border border-cyber-green text-cyber-green font-bold font-mono rounded-sm hover:bg-cyber-green/10 transition-all duration-300 flex items-center gap-2 skew-x-[-10deg]">
            <span className="skew-x-[10deg]">View Projects</span>
          </a>
          
          {/* Download CV */}
          <a 
            href="https://1drv.ms/b/c/2812bdd673d78bce/IQBDoBQRIr2fRoRQUNC1D3QOAa_V-N_VL5eUqDP-49d-zLI?e=e1yhiE" 
            target="_blank" 
            className="px-8 py-3 border border-cyber-blue text-cyber-blue font-bold font-mono rounded-sm hover:bg-cyber-blue/10 transition-all duration-300 flex items-center gap-2 skew-x-[-10deg]"
          >
             <span className="skew-x-[10deg] flex items-center gap-2">
                <Download size={18} />
                Download CV
             </span>
          </a>
        </div>

        <div className="flex justify-center gap-6 text-gray-500 dark:text-cyber-muted animate-fade-in-up [animation-delay:1000ms]">
           <a href="https://github.com/0xRafuSec" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green transition-colors hover:scale-110 transform duration-200">
             <Github size={24} />
           </a>
           <a href="https://www.linkedin.com/in/muhammadrafayali/" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-blue transition-colors hover:scale-110 transform duration-200">
             <Linkedin size={24} />
           </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;