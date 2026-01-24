import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load theme preference from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      setIsDark(false);
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  const navLinks = [
    { name: 'Skills', href: 'skills', id: 'skills' },
    { name: 'Experience', href: 'experience', id: 'experience' },
    { name: 'Projects', href: 'projects', id: 'projects' },
    { name: 'Contact', href: 'contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-cyber-black/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Clean Professional Cyber Logo */}
          <div className="relative">
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 36 36" 
              className="text-cyber-green-dark dark:text-cyber-green group-hover:text-cyber-blue-dark dark:group-hover:text-cyber-blue transition-all duration-300 group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Shield */}
              <path 
                d="M18 6 L10 9.5 L10 18 C10 23.5 18 28 18 28 C18 28 26 23.5 26 18 L26 9.5 Z" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Lock/Check inside */}
              <path 
                d="M15 18 L18 21 L21 18" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Hex badge */}
              <text 
                x="18" 
                y="15" 
                fontSize="7" 
                fill="currentColor" 
                textAnchor="middle"
                className="font-mono font-bold"
                opacity="0.8"
              >
                0x
              </text>
            </svg>
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-cyber-green-dark/20 dark:bg-cyber-green/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white font-mono relative hover-glitch">
            <span className="text-cyber-green-dark dark:text-cyber-green group-hover:text-cyber-blue-dark dark:group-hover:text-cyber-blue relative z-10 transition-colors duration-300">0xRafuSec</span>
            {/* Clean underline on hover */}
            <span className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-cyber-green-dark to-cyber-blue-dark dark:from-cyber-green dark:to-cyber-blue w-0 group-hover:w-full transition-all duration-500" />
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              aria-label={`Navigate to ${link.name} section`}
              className="relative text-sm font-medium text-cyber-green-dark dark:text-cyber-green hover:text-cyber-blue-dark dark:hover:text-cyber-blue transition-colors duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-cyber-blue-dark dark:before:bg-cyber-blue before:transition-all before:duration-300 hover:before:w-full font-mono tracking-wide cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyber-green-dark dark:focus:ring-cyber-green rounded px-2 py-1"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full transition-all duration-700 ease-out focus:outline-none overflow-hidden group"
            aria-label="Toggle Theme"
          >
            {/* Background with gradient - matches website theme */}
            <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
              isDark 
                ? 'bg-[#0a0a0a] border border-white/10' 
                : 'bg-gray-100 border border-gray-300'
            }`} />
            
            {/* Stars for dark mode */}
            {isDark && (
              <>
                <div className="absolute top-1 left-2 w-1 h-1 bg-cyber-green rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                <div className="absolute top-3 left-6 w-0.5 h-0.5 bg-cyber-blue rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-2 right-4 w-0.5 h-0.5 bg-cyber-green rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </>
            )}
            
            {/* Sun rays for light mode */}
            {!isDark && (
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/2 w-0.5 h-full bg-yellow-400 transform -translate-x-1/2" />
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-yellow-400 transform -translate-y-1/2" />
                <div className="absolute top-0 left-1/2 w-0.5 h-full bg-yellow-400 transform -translate-x-1/2 rotate-45" />
                <div className="absolute top-0 left-1/2 w-0.5 h-full bg-yellow-400 transform -translate-x-1/2 -rotate-45" />
              </div>
            )}
            
            {/* Toggle circle */}
            <div className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full transform transition-all duration-700 ease-out flex items-center justify-center shadow-xl ${
              isDark 
                ? 'translate-x-7 bg-cyber-green border border-cyber-green/50' 
                : 'translate-x-0 bg-yellow-400 border border-yellow-500'
            }`}>
              <div className={`transform transition-all duration-700 ${isDark ? 'rotate-0' : 'rotate-180'}`}>
                {isDark ? (
                  <Moon size={14} className="text-black drop-shadow-[0_0_4px_rgba(0,255,157,0.6)]" />
                ) : (
                  <Sun size={14} className="text-yellow-800 drop-shadow-[0_0_4px_rgba(255,200,0,0.6)]" />
                )}
              </div>
            </div>
            
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-full transition-opacity duration-700 ${
              isDark 
                ? 'bg-cyber-green/20 opacity-0 group-hover:opacity-100' 
                : 'bg-yellow-400/30 opacity-0 group-hover:opacity-100'
            }`} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
             onClick={toggleTheme}
             className="relative w-12 h-6 rounded-full transition-all duration-700 ease-out focus:outline-none overflow-hidden group"
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
              isDark 
                ? 'bg-[#0a0a0a] border border-white/10' 
                : 'bg-gray-100 border border-gray-300'
            }`} />
            {isDark && (
              <>
                <div className="absolute top-0.5 left-1.5 w-0.5 h-0.5 bg-cyber-green rounded-full animate-pulse" />
                <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-cyber-blue rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              </>
            )}
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-all duration-700 ease-out flex items-center justify-center shadow-lg ${
              isDark 
                ? 'translate-x-5.5 bg-cyber-green border border-cyber-green/50' 
                : 'translate-x-0 bg-yellow-400 border border-yellow-500'
            }`}>
              <div className={`transform transition-all duration-700 ${isDark ? 'rotate-0' : 'rotate-180'}`}>
                {isDark ? (
                  <Moon size={12} className="text-black" />
                ) : (
                  <Sun size={12} className="text-yellow-800" />
                )}
              </div>
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
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-cyber-green-dark dark:text-cyber-green hover:text-cyber-blue-dark dark:hover:text-cyber-blue font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors font-mono cursor-pointer"
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