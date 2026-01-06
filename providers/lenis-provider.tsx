'use client'

import React, { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

type LenisProviderProps = {
  children: ReactNode;
};

const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    const animate = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return <div>{children}</div>;
};

export default LenisProvider;
