"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useMemo, useState, useEffect } from "react";
import type { Points as PointsType } from "three";
import { isLowEndDevice, isMobile, prefersReducedMotion } from "@/lib/performance";

// Generate sphere points manually to avoid NaN issues
function generateSpherePoints(count: number, radius: number): Float32Array {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        let x, y, z;
        do {
            x = (Math.random() - 0.5) * 2;
            y = (Math.random() - 0.5) * 2;
            z = (Math.random() - 0.5) * 2;
        } while (x * x + y * y + z * z > 1);

        positions[i * 3] = x * radius;
        positions[i * 3 + 1] = y * radius;
        positions[i * 3 + 2] = z * radius;
    }
    return positions;
}

interface StarFieldProps {
    starCount: number;
    rotationSpeed: number;
}

const StarField = ({ starCount, rotationSpeed }: StarFieldProps) => {
    const ref = useRef<PointsType | null>(null);
    const sphere = useMemo(() => generateSpherePoints(starCount, 2.0), [starCount]);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / rotationSpeed;
            ref.current.rotation.y -= delta / (rotationSpeed * 1.5);
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                stride={3}
                positions={sphere}
                frustumCulled
            >
                <PointMaterial
                    transparent
                    color="#00ff00"
                    size={0.0015}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

export const StarsCanvas = () => {
    const [config, setConfig] = useState({ stars: 12000, speed: 8, disabled: false });

    useEffect(() => {
        const lowEnd = isLowEndDevice();
        const mobile = isMobile();
        const reducedMotion = prefersReducedMotion();

        if (reducedMotion) {
            // User prefers no motion — show static starfield or nothing
            setConfig({ stars: 3000, speed: 200, disabled: false });
        } else if (lowEnd || mobile) {
            // Low-end: fewer stars, slower rotation (less GPU work)
            setConfig({ stars: 4000, speed: 12, disabled: false });
        } else {
            // High-end: full experience
            setConfig({ stars: 12000, speed: 8, disabled: false });
        }
    }, []);

    if (config.disabled) return null;

    return (
        <div className="w-full h-full fixed inset-0 z-[1] pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                dpr={[1, 1.5]} // Cap pixel ratio for performance
                gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            >
                <Suspense fallback={null}>
                    <StarField starCount={config.stars} rotationSpeed={config.speed} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default StarsCanvas;
