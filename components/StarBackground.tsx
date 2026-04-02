"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * Global "Threat Network" background — visible across ALL sections.
 * 
 * Two layers drawn on Canvas 2D (no Three.js):
 * 1. Starfield: ~300 tiny dim particles with random blink/pulse
 * 2. Network Nodes: ~25 larger brighter nodes with proximity lines + mouse repulsion
 * 
 * Position: fixed, covers full viewport, z-index: 1
 */

const R = 0, G = 255, B = 157; // cyber-green #00ff9d

// ─── Types ───

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  blinkTimer: number;    // countdown to next blink
  blinkDuration: number; // how long the blink lasts
  isBlinking: boolean;
}

interface NetworkNode {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
}

// ─── Factories ───

function createParticles(count: number, w: number, h: number): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 0.8 + 0.3,   // tiny: 0.3 – 1.1px
      baseAlpha: Math.random() * 0.15 + 0.15, // dim: 0.15 – 0.30
      alpha: 0,
      pulseSpeed: Math.random() * 0.03 + 0.008,
      pulsePhase: Math.random() * Math.PI * 2,
      blinkTimer: Math.random() * 400 + 100,
      blinkDuration: 0,
      isBlinking: false,
    });
  }
  return out;
}

function createNodes(count: number, w: number, h: number): NetworkNode[] {
  const out: NetworkNode[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: Math.random() * 1.5 + 2.5,    // larger: 2.5 – 4px
      alpha: Math.random() * 0.2 + 0.45,    // brighter: 0.45 – 0.65
    });
  }
  return out;
}

// ─── Component ───

function ThreatNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<NetworkNode[]>([]);
  const dimRef = useRef({ w: 0, h: 0 });
  const timeRef = useRef(0);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dimRef.current = { w, h };

    // Reduce counts on high-DPR for perf
    const scale = dpr > 1.5 ? 0.7 : 1;
    particlesRef.current = createParticles(Math.round(300 * scale), w, h);
    nodesRef.current = createNodes(Math.round(25 * scale), w, h);
  }, []);

  useEffect(() => {
    setup();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    let resizeT: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(setup, 200); };

    window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    const animate = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { w, h } = dimRef.current;
      const particles = particlesRef.current;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      timeRef.current++;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // ─── LAYER 1: STARFIELD ───
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -2) p.x = w + 2;
        if (p.x > w + 2) p.x = -2;
        if (p.y < -2) p.y = h + 2;
        if (p.y > h + 2) p.y = -2;

        // Random blink effect
        if (p.isBlinking) {
          p.blinkDuration--;
          if (p.blinkDuration <= 0) p.isBlinking = false;
          p.alpha = p.baseAlpha + 0.4; // flash bright
        } else {
          p.blinkTimer--;
          if (p.blinkTimer <= 0) {
            p.isBlinking = true;
            p.blinkDuration = Math.random() * 12 + 4;
            p.blinkTimer = Math.random() * 600 + 200;
          }
          // Subtle sine pulse
          p.alpha = p.baseAlpha + Math.sin(t * p.pulseSpeed + p.pulsePhase) * 0.08;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R},${G},${B},${p.alpha})`;
        ctx.fill();
      }

      // ─── LAYER 2: NETWORK ───

      // Connection lines — subtle
      const CD = 130, CD2 = CD * CD;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CD2) {
            const lineAlpha = (1 - Math.sqrt(d2) / CD) * 0.12; // max 12% opacity
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${R},${G},${B},${lineAlpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Nodes with mouse repulsion
      const REPEL = 120, FORCE = 1.2;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Mouse repulsion
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REPEL * REPEL && d2 > 0) {
            const d = Math.sqrt(d2);
            const f = ((REPEL - d) / REPEL) * FORCE;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
        }

        n.vx *= 0.97;
        n.vy *= 0.97;
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd > 1.5) { n.vx = (n.vx / spd) * 1.5; n.vy = (n.vy / spd) * 1.5; }
        if (spd < 0.06) { n.vx += (Math.random() - 0.5) * 0.05; n.vy += (Math.random() - 0.5) * 0.05; }

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -15) n.x = w + 15;
        if (n.x > w + 15) n.x = -15;
        if (n.y < -15) n.y = h + 15;
        if (n.y > h + 15) n.y = -15;

        // Node dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R},${G},${B},${n.alpha})`;
        ctx.fill();

        // Glow halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R},${G},${B},${n.alpha * 0.08})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeT);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [setup]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}

export const StarsCanvas = () => <ThreatNetwork />;
export default StarsCanvas;
