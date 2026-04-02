"use client";

import { useRef, useEffect } from "react";

/**
 * Lightweight CSS + Canvas star background.
 * Replaces the Three.js WebGL implementation which was causing
 * severe lag on older/integrated GPUs (like HD 4600 in HP 850 G1).
 * 
 * This uses a simple 2D canvas with pre-rendered static stars
 * and a very gentle CSS rotation for the parallax effect,
 * leveraging GPU-composited CSS transforms instead of per-frame
 * WebGL rendering.
 */

function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const dpr = Math.min(window.devicePixelRatio, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);

        // Draw stars once (no animation loop needed)
        const starCount = 800;
        for (let i = 0; i < starCount; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const radius = Math.random() * 1.2;
            const opacity = Math.random() * 0.7 + 0.1;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 100, ${opacity})`;
            ctx.fill();
        }

        // Handle resize
        const handleResize = () => {
            const newDpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = window.innerWidth * newDpr;
            canvas.height = window.innerHeight * newDpr;
            ctx.scale(newDpr, newDpr);

            for (let i = 0; i < starCount; i++) {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                const radius = Math.random() * 1.2;
                const opacity = Math.random() * 0.7 + 0.1;

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 100, ${opacity})`;
                ctx.fill();
            }
        };

        let resizeTimer: ReturnType<typeof setTimeout>;
        const debouncedResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 250);
        };

        window.addEventListener('resize', debouncedResize);
        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{
                animation: 'starRotate 120s linear infinite',
            }}
            aria-hidden="true"
        />
    );
}

export const StarsCanvas = () => (
    <div className="w-full h-full fixed inset-0 z-[1] pointer-events-none opacity-60">
        <StarField />
        <style jsx global>{`
            @keyframes starRotate {
                from { transform: rotate(0deg) scale(1.2); }
                to { transform: rotate(360deg) scale(1.2); }
            }
        `}</style>
    </div>
);

export default StarsCanvas;
