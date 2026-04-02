import React, { useEffect, useState, useRef } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

/**
 * Matrix Rain — lightweight canvas animation for splash screen only.
 * Uses a small character set and throttled frame rate for performance.
 */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const fontSize = 14;
    const cols = Math.floor(w / fontSize);
    const drops: number[] = new Array(cols).fill(0).map(() => Math.random() * -50);
    const chars = '01アイウエオカキクケコサシスセソ▓░▒█'.split('');

    let animId: number;
    let lastTime = 0;
    const FPS = 18; // throttled for performance
    const interval = 1000 / FPS;

    const draw = (time: number) => {
      animId = requestAnimationFrame(draw);
      if (time - lastTime < interval) return;
      lastTime = time;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character is bright white-green, trail is dimmer
        if (Math.random() > 0.6) {
          ctx.fillStyle = '#00ff9d';
        } else {
          ctx.fillStyle = `rgba(0, 255, 100, ${Math.random() * 0.4 + 0.1})`;
        }

        ctx.fillText(char, x, y);

        if (y > h && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i] += 0.6 + Math.random() * 0.4;
      }
    };

    animId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-40"
      aria-hidden="true"
    />
  );
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<Array<{ text: string; displayed: string }>>([]);
  const [progress, setProgress] = useState(0);

  const bootSequence = [
    { text: "Initializing kernel...", delay: 50 },
    { text: "Loading security modules [OK]", delay: 200 },
    { text: "Verifying encrypted handshake...", delay: 350 },
    { text: "Bypassing firewall...", delay: 500 },
    { text: "Mounting virtual file system...", delay: 650 },
    { text: "Establishing secure tunnel...", delay: 800 },
    { text: "ACCESS GRANTED", delay: 1000 },
  ];

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const lineTimeouts: ReturnType<typeof setTimeout>[] = [];
    const typingIntervals: ReturnType<typeof setInterval>[] = [];

    bootSequence.forEach(({ text, delay }, index) => {
      const lineTimeout = setTimeout(() => {
        setLines((prev) => [...prev, { text, displayed: '' }]);

        let charIndex = 0;
        const typingInterval = setInterval(() => {
          setLines((prev) => {
            const newLines = [...prev];
            if (newLines[index]) {
              newLines[index] = {
                ...newLines[index],
                displayed: text.substring(0, charIndex + 1)
              };
            }
            return newLines;
          });

          charIndex++;
          if (charIndex >= text.length) {
            clearInterval(typingInterval);
          }
        }, 20);

        typingIntervals.push(typingInterval);
      }, delay);
      lineTimeouts.push(lineTimeout);
    });

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 8;
      });
    }, 50);

    timeoutId = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
      lineTimeouts.forEach((lineTimeout) => clearTimeout(lineTimeout));
      clearInterval(progressInterval);
      typingIntervals.forEach(interval => clearInterval(interval));
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono text-green-500 overflow-hidden">
      {/* Matrix Rain Canvas Background */}
      <MatrixRain />

      <div className="relative z-10 w-full max-w-lg p-6 bg-black/80 border border-green-500/30 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.1)]">
        <div className="h-64 overflow-hidden mb-6 font-mono text-sm md:text-base">
          {lines.map((line, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <span className="text-blue-400">{'>'}</span>
              <span className={index === lines.length - 1 ? "text-white font-bold" : "text-green-500/80"}>
                {line.displayed}
                {line.displayed.length < line.text.length && (
                  <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1"/>
                )}
              </span>
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
