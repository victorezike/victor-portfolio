"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Float,
  Stars,
} from "@react-three/drei";
import type * as THREE from "three";

// Enhanced 3D Components with better lighting and effects
export function FloatingGeometry({
  position,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;

      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * speed * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }

    if (lightRef.current) {
      lightRef.current.intensity =
        2 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group>
      <pointLight
        ref={lightRef}
        position={position}
        color={color}
        intensity={2}
        distance={10}
      />
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

export function AnimatedSphere({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity =
        0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[0.4, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={3}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </Sphere>
    </Float>
  );
}

export function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2DD4BF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#14B8A6" />

      <Stars
        radius={300}
        depth={60}
        count={1000}
        factor={7}
        saturation={0}
        fade
        speed={1}
      />

      <FloatingGeometry position={[-4, 2, -2]} color="#2DD4BF" speed={1.5} />
      <FloatingGeometry position={[4, -2, -1]} color="#14B8A6" speed={1.2} />
      <FloatingGeometry position={[-2, -3, -3]} color="#99F6E4" speed={0.8} />
      <FloatingGeometry position={[2, 3, -4]} color="#0D9488" speed={1.1} />

      <AnimatedSphere position={[3, 3, -2]} color="#2DD4BF" />
      <AnimatedSphere position={[-3, -1, -1]} color="#14B8A6" />
      <AnimatedSphere position={[1, -2, -4]} color="#99F6E4" />
      <AnimatedSphere position={[-1, 2, -3]} color="#0D9488" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}
