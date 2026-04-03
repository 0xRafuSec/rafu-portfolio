"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

/**
 * RadarPulse — decorative radar overlay for the HeroSkillsCircle.
 * Pure CSS + GSAP. No Three.js, no Canvas.
 * Sits behind the skill icons at z-index: 0.
 */

// Hardcoded blip positions (around the ring at various radii)
const blips = [
  { top: "18%", left: "45%" },
  { top: "35%", left: "82%" },
  { top: "62%", left: "85%" },
  { top: "78%", left: "55%" },
  { top: "65%", left: "12%" },
  { top: "28%", left: "18%" },
];

export default function RadarPulse() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Sweep arm rotation
      if (sweepRef.current) {
        gsap.to(sweepRef.current, {
          rotation: 360,
          duration: 4,
          ease: "none",
          repeat: -1,
        });
      }

      // Sweep trail rotation (synced)
      if (trailRef.current) {
        gsap.to(trailRef.current, {
          rotation: 360,
          duration: 4,
          ease: "none",
          repeat: -1,
        });
      }

      // Expanding pulse rings
      const pulseEls = pulseRefs.current.filter(Boolean) as HTMLDivElement[];
      if (pulseEls.length > 0) {
        gsap.to(pulseEls, {
          scale: 5,
          opacity: 0,
          duration: 3.6,
          ease: "power1.out",
          repeat: -1,
          stagger: 1.2,
        });
      }

      // Random blip flicker
      blipRefs.current.forEach((blip) => {
        if (!blip) return;
        gsap.to(blip, {
          opacity: 0,
          duration: 0.2,
          ease: "power1.in",
          repeat: -1,
          repeatDelay: Math.random() * 2 + 1,
          yoyo: true,
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] pointer-events-none overflow-visible"
      style={{ borderRadius: "50%", zIndex: 0 }}
    >
      {/* A) Static dashed rings */}
      {[85, 65, 42].map((size) => (
        <div
          key={size}
          className="absolute"
          style={{
            width: `${size}%`,
            height: `${size}%`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "1px dashed rgba(0, 255, 136, 0.12)",
          }}
        />
      ))}

      {/* B) Rotating sweep arm */}
      <div
        ref={sweepRef}
        className="absolute"
        style={{
          width: "50%",
          height: "1px",
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          background:
            "linear-gradient(to right, transparent, rgba(0, 255, 136, 0.6))",
        }}
      />

      {/* C) Sweep glow trail */}
      <div
        ref={trailRef}
        className="absolute inset-0"
        style={{
          borderRadius: "50%",
          background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0, 255, 136, 0.15) 60deg, transparent 60deg, transparent 360deg)",
        }}
      />

      {/* D) Expanding pulse rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={`pulse-${i}`}
          ref={(el) => { pulseRefs.current[i] = el; }}
          className="absolute"
          style={{
            width: "20%",
            height: "20%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "1px solid rgba(0, 255, 136, 0.5)",
          }}
        />
      ))}

      {/* E) Random blip dots */}
      {blips.map((pos, i) => (
        <div
          key={`blip-${i}`}
          ref={(el) => { blipRefs.current[i] = el; }}
          className="absolute"
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "#00ff88",
            top: pos.top,
            left: pos.left,
            boxShadow: "0 0 6px 1px rgba(0, 255, 136, 0.6)",
          }}
        />
      ))}
    </div>
  );
}
