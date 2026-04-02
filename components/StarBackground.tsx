"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * Global "Threat Network" background — visible across ALL sections.
 * 
 * Replaces the old static starfield. Uses Canvas 2D API only (no Three.js).
 * Renders as position:fixed covering full viewport, behind all page content.
 * 
 * Two layers:
 * 1. Starfield: ~150 tiny drifting particles with subtle pulse/blink
 * 2. Network Nodes: ~30 larger nodes with proximity-based connecting lines
 *    and mouse-repulsion interaction that works across all sections.
 */

// ─── Color tokens (matching tailwind: cyber-green = #00ff9d) ───
const ACCENT_R = 0;
const ACCENT_G = 255;
const ACCENT_B = 157;

// ─── Types ───

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

// ─── Factory functions ───

function createParticles(count: number, w: number, h: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.2 + 0.3,
      baseAlpha: Math.random() * 0.2 + 0.35,
      alpha: 0,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

function createNodes(count: number, w: number, h: number): NetworkNode[] {
  const nodes: NetworkNode[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: Math.random() * 1.5 + 2,
      alpha: Math.random() * 0.25 + 0.35,
    });
  }
  return nodes;
}

// ─── Component ───

function ThreatNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<NetworkNode[]>([]);
  const dimensionsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const timeRef = useRef<number>(0);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    dimensionsRef.current = { w, h };

    // Scale particle count for performance on high-DPR screens
    const scaleFactor = dpr > 1.5 ? 0.7 : 1;
    const particleCount = Math.round(150 * scaleFactor);
    const nodeCount = Math.round(30 * scaleFactor);

    particlesRef.current = createParticles(particleCount, w, h);
    nodesRef.current = createNodes(nodeCount, w, h);
  }, []);

  useEffect(() => {
    setupCanvas();

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse tracking — use window-level events so it works across all sections
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupCanvas, 200);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // ─── Animation loop ───
    const animate = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w, h } = dimensionsRef.current;
      const particles = particlesRef.current;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      timeRef.current += 1;
      const time = timeRef.current;

      // Clear entire canvas
      ctx.clearRect(0, 0, w, h);

      // ─── LAYER 1: STARFIELD PARTICLES ───
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges seamlessly
        if (p.x < -2) p.x = w + 2;
        if (p.x > w + 2) p.x = -2;
        if (p.y < -2) p.y = h + 2;
        if (p.y > h + 2) p.y = -2;

        // Subtle pulse/blink
        p.alpha =
          p.baseAlpha +
          Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.15;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT_R}, ${ACCENT_G}, ${ACCENT_B}, ${p.alpha})`;
        ctx.fill();
      }

      // ─── LAYER 2: NETWORK NODES + CONNECTING LINES ───

      // Connection lines (drawn first, behind nodes)
      const CONNECTION_DIST = 130;
      const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.2;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${ACCENT_R}, ${ACCENT_G}, ${ACCENT_B}, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Move & draw nodes
      const REPEL_DIST = 100;
      const REPEL_FORCE = 0.6;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Mouse repulsion (works globally since we track window-level mouse)
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < REPEL_DIST * REPEL_DIST && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = ((REPEL_DIST - dist) / REPEL_DIST) * REPEL_FORCE;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }

        // Velocity damping
        n.vx *= 0.985;
        n.vy *= 0.985;

        // Clamp max speed
        const maxV = 1.0;
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > maxV) {
          n.vx = (n.vx / speed) * maxV;
          n.vy = (n.vy / speed) * maxV;
        }

        // Keep a minimum drift so they don't freeze
        if (speed < 0.06) {
          n.vx += (Math.random() - 0.5) * 0.04;
          n.vy += (Math.random() - 0.5) * 0.04;
        }

        // Move
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around viewport with padding
        if (n.x < -15) n.x = w + 15;
        if (n.x > w + 15) n.x = -15;
        if (n.y < -15) n.y = h + 15;
        if (n.y > h + 15) n.y = -15;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT_R}, ${ACCENT_G}, ${ACCENT_B}, ${n.alpha})`;
        ctx.fill();

        // Soft glow halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT_R}, ${ACCENT_G}, ${ACCENT_B}, ${n.alpha * 0.1})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [setupCanvas]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}

// Export matches the old StarsCanvas API so PortfolioContent.tsx import works unchanged
export const StarsCanvas = () => <ThreatNetwork />;
export default StarsCanvas;
