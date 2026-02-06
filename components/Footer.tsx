import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent py-3 border-t border-[#00ff9d]/10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-cyber-green-dark dark:text-cyber-green mb-2">
          &copy; {new Date().getFullYear()} 0xRafuSec. All rights reserved.
        </p>
        <p className="text-xs text-cyber-green-dark dark:text-cyber-green/50 font-mono">
          System Status: <span className="text-cyber-green-dark dark:text-cyber-green">Operational</span> | Security Level: <span className="text-cyber-blue-dark dark:text-cyber-blue">High</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;