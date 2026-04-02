'use client'

import React, { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

type LenisProviderProps = {
  children: ReactNode;
};

const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 0.5,
      easing: (t) => 1 - Math.pow(1 - t, 2),
      touchMultiplier: 1.5,
    });

    const animate = (time: number) => {
      lenisRef.current?.raf(time);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};

export default LenisProvider;
