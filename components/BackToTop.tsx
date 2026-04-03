import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const nextVisible = window.scrollY > 300;
        setIsVisible((prev) => (prev === nextVisible ? prev : nextVisible));
        ticking = false;
      });
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 z-50 p-4 text-cyber-green transition-all duration-700 ease-out group ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-50 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <div className="relative flex flex-col items-center justify-center pointer-events-none">
        {/* Soft glowing ambient circle */}
        <div className="absolute inset-0 bg-cyber-green rounded-full blur-[25px] opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
        <div className="absolute inset-0 border border-cyber-green/30 rounded-full scale-150 animate-[ping_3s_ease-out_infinite] group-hover:border-cyber-green/80 transition-colors"></div>
        
        {/* Floating Arrows Container */}
        <div className="relative z-10 flex flex-col items-center transform group-hover:-translate-y-2 transition-transform duration-300">
           {/* Top arrow */}
           <ArrowUp 
             size={28} 
             strokeWidth={2.5} 
             className="relative z-20 drop-shadow-[0_0_12px_#00ff9d] animate-pulse group-hover:animate-none" 
           />
           {/* Sub-arrow that slides up on hover */}
           <ArrowUp 
             size={20} 
             strokeWidth={3} 
             className="absolute top-4 opacity-0 text-cyber-green/60 z-10 drop-shadow-[0_0_8px_#00ff9d] group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 delay-75" 
           />
           {/* Third trailing arrow */}
           <ArrowUp 
             size={14} 
             strokeWidth={4} 
             className="absolute top-8 opacity-0 text-cyber-green/40 z-0 drop-shadow-[0_0_4px_#00ff9d] group-hover:opacity-100 group-hover:-translate-y-4 transition-all duration-500 delay-150" 
           />
        </div>
      </div>
    </button>
  );
};

export default BackToTop;
