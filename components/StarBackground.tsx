"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useMemo } from "react";
import type { Points as PointsType } from "three";

// Generate sphere points manually to avoid NaN issues
function generateSpherePoints(count: number, radius: number): Float32Array {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Generate random point in sphere using rejection sampling
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

export const StarBackground = () => {
    const ref = useRef<PointsType | null>(null);
    // More stars, larger radius for better coverage
    const sphere = useMemo(() => generateSpherePoints(12000, 2.0), []);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 8;
            ref.current.rotation.y -= delta / 12;
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

export const StarsCanvas = () => (
    <div className="w-full h-full fixed inset-0 z-[1] pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                <StarBackground />
            </Suspense>
        </Canvas>
    </div>
);

export default StarsCanvas;
