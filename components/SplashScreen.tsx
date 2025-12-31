'use client';

import React, { useEffect, useState, useRef } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bootSequence = [
    { text: "Initializing kernel...", delay: 100 },
    { text: "Loading security modules [OK]", delay: 400 },
    { text: "Verifying encrypted handshake...", delay: 800 },
    { text: "Bypassing firewall...", delay: 1200 },
    { text: "Mounting virtual file system...", delay: 1600 },
    { text: "Establishing secure tunnel...", delay: 2000 },
    { text: "ACCESS GRANTED", delay: 2400 },
  ];

  // Matrix Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);
    return () => clearInterval(intervalId);
  }, []);

  // Boot Sequence Logic
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    bootSequence.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLines((prev) => [...prev, text]);
      }, delay);
    });

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4; // Faster load
      });
    }, 80);

    timeoutId = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono text-green-500 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />
      
      <div className="relative z-10 w-full max-w-lg p-6 bg-black/80 border border-green-500/30 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.1)] backdrop-blur-sm">
        <div className="h-64 overflow-hidden mb-6 font-mono text-sm md:text-base">
          {lines.map((line, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <span className="text-blue-400">{'>'}</span>
              <span className={index === lines.length - 1 ? "text-white font-bold" : "text-green-500/80"}>
                {line}
              </span>
              {index === lines.length - 1 && index < bootSequence.length - 1 && (
                <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1"/>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-green-400 uppercase tracking-wider">
            <span>System Integrity</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-gray-900 rounded-full overflow-hidden border border-green-900">
            <div 
              className="h-full bg-green-500 shadow-[0_0_15px_#00ff00] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;