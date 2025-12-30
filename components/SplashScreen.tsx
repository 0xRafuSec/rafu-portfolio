import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootSequence = [
    { text: "Initializing secure kernel...", delay: 200 },
    { text: "Loading security modules...", delay: 600 },
    { text: "Mounting file system...", delay: 1000 },
    { text: "Verifying encryption keys...", delay: 1400 },
    { text: "Establishing secure connection...", delay: 1800 },
    { text: "Access Granted.", delay: 2200 },
  ];

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    // Line animation
    bootSequence.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLines((prev) => [...prev, text]);
      }, delay);
    });

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Completion
    timeoutId = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col items-center justify-center font-mono text-cyber-green p-4">
      <div className="w-full max-w-lg space-y-4">
        <div className="h-48 overflow-hidden bg-black/50 p-4 border border-cyber-green/20 rounded-lg shadow-[0_0_20px_rgba(0,255,136,0.1)]">
          {lines.map((line, index) => (
            <div key={index} className="flex items-center gap-2 text-sm md:text-base">
              <span className="text-cyber-blue">➜</span>
              <span className={index === lines.length - 1 ? "animate-pulse" : ""}>
                {line}
              </span>
              {index === lines.length - 1 && index < bootSequence.length - 1 && (
                <span className="inline-block w-2 h-4 bg-cyber-green animate-pulse ml-1"/>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-cyber-muted uppercase tracking-wider">
            <span>System Load</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyber-green shadow-[0_0_10px_#00ff88] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-center mt-8 opacity-50 text-xs text-cyber-muted">
          ENCRYPTED CONNECTION ESTABLISHED
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;