import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black py-8 border-t border-gray-800 dark:border-white/10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 dark:text-cyber-muted mb-2">
          &copy; {new Date().getFullYear()} Muhammad Rafay Ali. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 dark:text-cyber-muted/50 font-mono">
          System Status: <span className="text-cyber-green-dark dark:text-cyber-green">Operational</span> | Security Level: <span className="text-cyber-blue-dark dark:text-cyber-blue">High</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;