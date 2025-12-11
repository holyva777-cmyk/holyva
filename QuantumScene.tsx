/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Box, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing JSX intrinsic elements types in R3F
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      capsuleGeometry: any;
      dodecahedronGeometry: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

// --- COMPONENTS ---

// 1. Mini Donut (Colorful, small background items)
const MiniDonut = ({ position, color, rotation, scale = 0.3 }: { position: [number, number, number]; color: string; rotation: [number, number, number]; scale?: number }) => {
    const ref = useRef<THREE.Group>(null);
    // Random rotation speed
    const rotSpeed = useRef({ x: Math.random() * 0.01, y: Math.random() * 0.01 });

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.x += rotSpeed.current.x;
            ref.current.rotation.y += rotSpeed.current.y;
        }
    });

    return (
        <group ref={ref} position={position} rotation={rotation} scale={scale}>
            {/* Dough */}
            <Torus args={[1, 0.4, 16, 32]}>
                <meshStandardMaterial color="#E6C9A8" />
            </Torus>
            {/* Icing */}
            <Torus args={[1, 0.35, 16, 32]} position={[0, 0.1, 0]}>
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
            </Torus>
            {/* Sprinkles */}
            <group position={[0,0.15,0]}>
                {[...Array(6)].map((_, i) => (
                    <mesh key={i} position={[Math.cos(i) * 0.8, 0.2, Math.sin(i) * 0.8]} rotation={[Math.random(), Math.random(), 0]}>
                        <Box args={[0.1, 0.1, 0.3]}>
                             <meshStandardMaterial color="#FFF" />
                        </Box>
                    </mesh>
                ))}
            </group>
        </group>
    );
};

// 2. Classic Tiramisu (Refined Look: Double Layer + Better Textures)
const ClassicTiramisu = ({ position, rotation, scale = 0.8 }: { position: [number, number, number]; rotation: [number, number, number]; scale?: number }) => {
    const ref = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
            ref.current.rotation.x = rotation[0] + Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    // Material Colors
    const SPONGE = "#E6C9A8";
    const COFFEE = "#3E2723"; // Darker, richer coffee
    const CREAM = "#FFFBE6"; // Rich mascarpone
    const COCOA = "#2D1E1B"; // Very dark matte cocoa

    const width = 1.3;

    return (
        <group ref={ref} position={position} rotation={rotation} scale={scale}>
             {/* -- BOTTOM TIER -- */}
             {/* Sponge */}
             <Box args={[width, 0.25, width]} position={[0, -0.6, 0]}>
                 <meshStandardMaterial color={SPONGE} roughness={0.8} />
             </Box>
             {/* Coffee Soak Line */}
             <Box args={[width + 0.02, 0.06, width + 0.02]} position={[0, -0.45, 0]}>
                 <meshStandardMaterial color={COFFEE} roughness={0.6} />
             </Box>
             {/* Cream */}
             <Box args={[width, 0.35, width]} position={[0, -0.25, 0]}>
                 <meshStandardMaterial color={CREAM} roughness={0.4} />
             </Box>

             {/* -- TOP TIER -- */}
             {/* Sponge */}
             <Box args={[width, 0.25, width]} position={[0, 0.05, 0]}>
                 <meshStandardMaterial color={SPONGE} roughness={0.8} />
             </Box>
             {/* Coffee Soak Line */}
             <Box args={[width + 0.02, 0.06, width + 0.02]} position={[0, 0.2, 0]}>
                 <meshStandardMaterial color={COFFEE} roughness={0.6} />
             </Box>
             {/* Cream */}
             <Box args={[width, 0.35, width]} position={[0, 0.4, 0]}>
                 <meshStandardMaterial color={CREAM} roughness={0.4} />
             </Box>

             {/* Cocoa Powder Top - Slightly wider to look dusted */}
             <Box args={[width, 0.02, width]} position={[0, 0.58, 0]}>
                 <meshStandardMaterial color={COCOA} roughness={1} />
             </Box>
        </group>
    );
};

// 3. Fruit Tiramisu
const FruitTiramisu = ({ position, rotation, scale = 0.8, flavorColor, fruitColor, fruitScale = 1 }: { position: [number, number, number]; rotation: [number, number, number]; scale?: number; flavorColor: string; fruitColor: string; fruitScale?: number }) => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if(ref.current) {
             ref.current.rotation.y += 0.002;
             ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <group ref={ref} position={position} rotation={rotation} scale={scale}>
             <Box args={[1.3, 0.35, 1.3]} position={[0, -0.4, 0]}>
                 <meshStandardMaterial color="#E6C9A8" roughness={0.8} />
             </Box>
             <Box args={[1.3, 0.6, 1.3]} position={[0, 0.075, 0]}>
                 <meshStandardMaterial color="#FFF8E7" roughness={0.5} />
             </Box>
             <Box args={[1.25, 0.1, 1.25]} position={[0, 0.4, 0]}>
                 <meshStandardMaterial color={flavorColor} roughness={0.1} metalness={0.1} transparent opacity={0.9} />
             </Box>
             <group position={[0, 0.45, 0]}>
                 <Sphere args={[0.25 * fruitScale, 16, 16]} position={[-0.3, 0.1, -0.3]}>
                     <meshStandardMaterial color={fruitColor} roughness={0.2} />
                 </Sphere>
                 <Sphere args={[0.3 * fruitScale, 16, 16]} position={[0.2, 0.05, 0.2]}>
                     <meshStandardMaterial color={fruitColor} roughness={0.2} />
                 </Sphere>
                 <Sphere args={[0.35 * fruitScale, 16, 16]} position={[0, 0.15, 0]}>
                      <meshStandardMaterial color={fruitColor} roughness={0.2} />
                 </Sphere>
             </group>
        </group>
    );
};

// --- MAIN SCENE ---

export const BakeryScene: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive Configuration
  const layout = useMemo(() => {
      if (isMobile) {
          // Mobile: Optimized for visibility
          return {
              cameraZ: 18, // Pulled camera back further for better spacing
              // Classic Tiramisu: Moved DOWN significantly (y=2.0) to clear the logo, and reduced scale
              classic: { pos: [-2.0, 2.0, 0], scale: 0.55 },      
              // Strawberry: Top-right, reduced scale
              strawberry: { pos: [2.0, 3.2, -1], scale: 0.5 },  
              // Blueberry: Bottom-left, reduced scale
              blueberry: { pos: [-2.0, -3.5, 0], scale: 0.55 },   
              // Mango: Bottom-right, reduced scale
              mango: { pos: [2.0, -4.5, -1], scale: 0.5 },      
              miniDonutSpread: { x: 7, y: 12, z: -2 }
          };
      } else {
          // Desktop: Original sizing
          return {
              cameraZ: 10,
              classic: { pos: [-4.5, 2.5, -2], scale: 0.75 },
              strawberry: { pos: [5, 3, -3], scale: 0.65 },
              blueberry: { pos: [-5, -3, -1], scale: 0.7 },
              mango: { pos: [5.5, -2.5, -2], scale: 0.65 },
              miniDonutSpread: { x: 20, y: 14, z: -3 }
          };
      }
  }, [isMobile]);

  const miniDonuts = useMemo(() => {
      const colors = [
          '#FF1744', '#D500F9', '#00E5FF', '#76FF03', 
          '#FFC400', '#FF4081', '#2979FF', '#FF9100'
      ];
      return Array.from({ length: 20 }).map((_, i) => ({
          position: [
              (Math.random() - 0.5) * layout.miniDonutSpread.x, 
              (Math.random() - 0.5) * layout.miniDonutSpread.y, 
              (Math.random() * -6) - 3
          ] as [number, number, number],
          rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
          color: colors[i % colors.length],
          // Restored donut scale for visibility
          scale: (0.2 + Math.random() * 0.2) * (isMobile ? 1.0 : 1.0) 
      }));
  }, [layout.miniDonutSpread, isMobile]); 

  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, layout.cameraZ], fov: 35 }}>
        <ambientLight intensity={1.5} color="#FFF8E7" />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} color="#FFF" />
        <pointLight position={[-10, -5, -5]} intensity={0.5} color="#C5A059" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8} floatingRange={[-0.2, 0.2]}>
          
          {/* 1. Classic Tiramisu */}
          <ClassicTiramisu 
            position={layout.classic.pos as [number, number, number]} 
            rotation={[0.3, 0.5, 0]} 
            scale={layout.classic.scale} 
          />

          {/* 2. Strawberry Tiramisu */}
          <FruitTiramisu 
            position={layout.strawberry.pos as [number, number, number]} 
            rotation={[0.2, -0.4, 0.1]} 
            scale={layout.strawberry.scale} 
            flavorColor="#FF1744" 
            fruitColor="#D50000" 
          />

          {/* 3. Blueberry Tiramisu */}
          <FruitTiramisu 
            position={layout.blueberry.pos as [number, number, number]} 
            rotation={[-0.1, 0.3, -0.1]} 
            scale={layout.blueberry.scale} 
            flavorColor="#5E35B1" 
            fruitColor="#311B92" 
          />
          
          {/* 4. Mango Tiramisu */}
          <FruitTiramisu 
            position={layout.mango.pos as [number, number, number]} 
            rotation={[-0.2, -0.3, 0.1]} 
            scale={layout.mango.scale} 
            flavorColor="#FFB300" 
            fruitColor="#FF8F00" 
          />
          
        </Float>

        <group>
            {miniDonuts.map((d, i) => (
                <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={1}>
                    <MiniDonut 
                        position={d.position} 
                        rotation={d.rotation} 
                        color={d.color} 
                        scale={d.scale} 
                    />
                </Float>
            ))}
        </group>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const FloatingTiramisu: React.FC = () => {
    return null; 
}