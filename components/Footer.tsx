import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-8 border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-cyber-muted mb-2">
          &copy; {new Date().getFullYear()} Muhammad Rafay Ali. All rights reserved.
        </p>
        <p className="text-xs text-cyber-muted/50 font-mono">
          System Status: <span className="text-cyber-green">Operational</span> | Security Level: <span className="text-cyber-blue">High</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;