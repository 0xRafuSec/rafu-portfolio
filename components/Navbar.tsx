import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Force dark mode always
    document.documentElement.classList.add('dark');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled
      ? 'bg-[#03001417] backdrop-blur-md shadow-lg shadow-[#00ff9d]/5'
      : 'bg-transparent py-4'
      }`}>
      <div className="w-full px-6 md:px-12 flex justify-between items-center">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-3 group hover-glitch">
          <div className="relative">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              className="text-[#00ff9d] group-hover:text-[#00ff9d] transition-all duration-300 group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6 L10 9.5 L10 18 C10 23.5 18 28 18 28 C18 28 26 23.5 26 18 L26 9.5 Z"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 18 L18 21 L21 18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-mono relative">
            <span className="text-[#00ff9d] group-hover:text-[#00ff9d] transition-colors duration-300">0xRafuSec</span>
          </span>
        </Link>

        {/* Desktop Menu - Center with transparent container */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-6 px-6 py-2.5 rounded-full border border-[#00ff9d] backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                aria-label={`Navigate to ${link.name} section`}
                className="text-sm font-medium text-[#00ff9d] hover-glitch duration-300 font-mono tracking-wide cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Social Icons - Right (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://github.com/0xRafuSec" target="_blank" rel="noopener noreferrer" className="text-[#00ff9d] hover-glitch">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="https://linkedin.com/in/muhammadrafayali/" target="_blank" rel="noopener noreferrer" className="text-[#00ff9d] hover-glitch">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-[#00ff9d]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#030014]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-[#00ff9d] hover:text-[#00a3ff] font-medium py-2 px-4 hover:bg-white/5 rounded-lg transition-colors font-mono cursor-pointer"
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