import React from 'react';
import { ChevronRight, Download, Github, Linkedin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ff88" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Background Gradient Spotlights */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-green/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-green/30 bg-cyber-green/5 text-cyber-green text-sm font-mono mb-6 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
          </span>
          Available for Hire
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
          Muhammad <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-blue">Rafay Ali</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-cyber-muted font-light mb-8">
          Cyber Security Engineer
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-cyber-muted mb-10 leading-relaxed">
          Experienced in SOC operations, SIEM engineering, threat detection, and incident response. 
          Expert in building scalable, compliance-aligned detection frameworks (ISO 27001, NCA-ECC, SAMA).
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a href="#contact" className="group px-8 py-3 bg-gradient-to-r from-cyber-green to-cyber-blue text-black font-bold rounded-full transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] flex items-center gap-2">
            Get In Touch
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a href="#projects" className="px-8 py-3 border border-cyber-green text-cyber-green font-bold rounded-full hover:bg-cyber-green hover:text-black transition-all duration-300 flex items-center gap-2">
            View Projects
          </a>
          
          <a 
            href="https://1drv.ms/b/c/2812bdd673d78bce/IQBDoBQRIr2fRoRQUNC1D3QOAa_V-N_VL5eUqDP-49d-zLI?e=e1yhiE" 
            target="_blank" 
            className="px-8 py-3 border border-gray-400 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold rounded-full hover:border-cyber-blue hover:text-cyber-blue transition-all duration-300 flex items-center gap-2"
          >
            <Download size={18} />
            Resume
          </a>
        </div>

        <div className="flex justify-center gap-6 text-gray-500 dark:text-cyber-muted">
           <a href="https://github.com/0xRafuSec" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green transition-colors">
             <Github size={24} />
           </a>
           <a href="https://www.linkedin.com/in/muhammadrafayali/" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-blue transition-colors">
             <Linkedin size={24} />
           </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;