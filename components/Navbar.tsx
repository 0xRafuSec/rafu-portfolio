import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check system preference or default to dark
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-cyber-black/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group hover-glitch">
          <Shield className="w-8 h-8 text-cyber-green-dark dark:text-cyber-green group-hover:text-cyber-blue-dark dark:group-hover:text-cyber-blue transition-colors duration-300" />
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white font-mono group-hover:text-shadow-neon">Rafu<span className="text-cyber-green-dark dark:text-cyber-green group-hover:text-cyber-blue-dark dark:group-hover:text-cyber-blue"> CyberSec</span></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-cyber-green-dark dark:text-cyber-green hover:text-cyber-blue-dark dark:hover:text-cyber-blue transition-colors duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-cyber-blue-dark dark:before:bg-cyber-blue before:transition-all before:duration-300 hover:before:w-full font-mono tracking-wide"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="relative w-14 h-7 bg-gray-300 dark:bg-gray-800 rounded-full transition-colors duration-300 focus:outline-none shadow-inner border border-gray-400 dark:border-gray-700"
            aria-label="Toggle Theme"
          >
             <div className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-7 bg-cyber-black text-cyber-green' : 'translate-x-0 bg-white text-orange-500'}`}>
                {isDark ? <Moon size={14} /> : <Sun size={14} />}
             </div>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
             onClick={toggleTheme}
             className="relative w-12 h-6 bg-gray-300 dark:bg-gray-800 rounded-full transition-colors duration-300 focus:outline-none shadow-inner border border-gray-400 dark:border-gray-700"
          >
             <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-6 bg-cyber-black text-cyber-green' : 'translate-x-0 bg-white text-orange-500'}`}>
                {isDark ? <Moon size={12} /> : <Sun size={12} />}
             </div>
          </button>
          
          <button 
            className="text-gray-900 dark:text-cyber-text hover:text-cyber-green-dark dark:hover:text-cyber-green"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-cyber-black/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-cyber-green-dark dark:text-cyber-green hover:text-cyber-blue-dark dark:hover:text-cyber-blue font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors font-mono"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;