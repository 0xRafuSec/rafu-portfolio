import React, { useEffect, useRef, useState } from 'react';
import { Unlock, X } from 'lucide-react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const Konami: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const inputHistoryRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const normalizedKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const history = [...inputHistoryRef.current, normalizedKey].slice(-KONAMI_CODE.length);
      inputHistoryRef.current = history;

      const isMatch = history.length === KONAMI_CODE.length && history.every((key, index) => key === KONAMI_CODE[index]);
      if (isMatch) {
        setShowModal(true);
        inputHistoryRef.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in-up">
      <div className="bg-gray-900 border-2 border-cyber-green rounded-lg p-8 max-w-md w-full text-center relative shadow-[0_0_50px_rgba(0,255,157,0.3)]">
        <button 
          onClick={() => setShowModal(false)}
          aria-label="Close dialog"
          className="absolute top-2 right-2 text-gray-500 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-6 text-cyber-green animate-pulse">
          <Unlock size={32} />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2 font-mono">ACCESS GRANTED</h2>
        <p className="text-cyber-green font-mono text-sm mb-6">You found the hidden flag!</p>
        
        <div className="bg-black p-4 rounded border border-gray-700 font-mono text-cyber-blue text-lg">
          {`{FLAG: HIRED_ME_YET?}`}
        </div>
        
        <p className="mt-6 text-gray-500 text-xs">
          Great job with the recon.
        </p>
      </div>
    </div>
  );
};

export default Konami;
