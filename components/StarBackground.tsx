"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

/**
 * Warp Speed Hyperspace Background
 * 
 * Raw Three.js implementation — WebGLRenderer, BufferGeometry, Points.
 * Two particle layers: primary stars + dim depth layer.
 * GSAP tweens the speed for warp-in ramp and mouse parallax.
 * 
 * Mounted globally in PortfolioContent.tsx, position: fixed, z-index: 0.
 */

// Performance scaling
const isLowEnd =
  typeof navigator !== "undefined"
    ? (navigator.hardwareConcurrency ?? 8) <= 4
    : false;

const STAR_COUNT = isLowEnd ? 700 : 1500;
const MAX_SPEED = isLowEnd ? 12 : 18;

export default function WarpSpeedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // ─── Scene ───
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);

    // ─── Renderer ───
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isLowEnd,
    });
    renderer.setPixelRatio(isLowEnd ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ─── Star Geometry (primary layer) ───
    const positions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;     // x: -800 to 800
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;  // y: -600 to 600
      positions[i * 3 + 2] = Math.random() * -2000;          // z: -2000 to 0
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.8,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // ─── Depth layer (streak trail effect) ───
    const depthPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      depthPositions[i * 3] = positions[i * 3];
      depthPositions[i * 3 + 1] = positions[i * 3 + 1];
      depthPositions[i * 3 + 2] = positions[i * 3 + 2] - 2;
    }

    const depthGeometry = new THREE.BufferGeometry();
    depthGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(depthPositions, 3)
    );

    const depthMaterial = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.3,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const depthStars = new THREE.Points(depthGeometry, depthMaterial);
    scene.add(depthStars);

    // ─── State for GSAP tweening ───
    const state = { speed: 3 };

    // Warp ramp-in
    gsap.to(state, {
      speed: MAX_SPEED,
      duration: 2,
      ease: "power2.in",
    });

    // ─── Mouse parallax ───
    const mouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;

      gsap.to(camera.position, {
        x: mouse.x * 30,
        y: -mouse.y * 20,
        duration: 1.5,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ─── Resize handler ───
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    // ─── Animation loop ───
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const depthAttr = depthGeometry.attributes
      .position as THREE.BufferAttribute;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const arr = posAttr.array as Float32Array;
      const dArr = depthAttr.array as Float32Array;

      for (let i = 0; i < STAR_COUNT; i++) {
        const zi = i * 3 + 2;

        // Move stars forward
        arr[zi] += state.speed;
        dArr[zi] += state.speed;

        // Reset star when it passes the camera
        if (arr[zi] > 100) {
          arr[zi] = -2000;
          arr[i * 3] = (Math.random() - 0.5) * 1600;
          arr[i * 3 + 1] = (Math.random() - 0.5) * 1200;

          dArr[zi] = arr[zi] - 2;
          dArr[i * 3] = arr[i * 3];
          dArr[i * 3 + 1] = arr[i * 3 + 1];
        }
      }

      posAttr.needsUpdate = true;
      depthAttr.needsUpdate = true;

      // Scale star size with speed (streak effect)
      material.size = 0.8 + (state.speed / MAX_SPEED) * 2.5;

      renderer.render(scene, camera);
    };

    frameRef.current = requestAnimationFrame(animate);

    // ─── Cleanup ───
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      depthGeometry.dispose();
      depthMaterial.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} />;
}

export const StarsCanvas = WarpSpeedBackground;
