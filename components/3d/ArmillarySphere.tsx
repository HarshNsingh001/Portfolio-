import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────
   RING — one rotating orbital ring
   ───────────────────────────────────────── */
interface RingProps {
  rotationAxis: THREE.Vector3;
  speed: number;
  radius: number;
  tubeRadius: number;
  color: string;
  opacity: number;
  scrollProgress: number;
  offsetAngle?: number;
}

function OrbitalRing({ rotationAxis, speed, radius, tubeRadius, color, opacity, scrollProgress, offsetAngle = 0 }: RingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseQuaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromAxisAngle(rotationAxis.normalize(), offsetAngle);
    return q;
  }, [rotationAxis, offsetAngle]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    const spinQ = new THREE.Quaternion();
    spinQ.setFromAxisAngle(rotationAxis.normalize(), t);
    meshRef.current.quaternion.multiplyQuaternions(spinQ, baseQuaternion);

    // On scroll: rings expand outward
    const scatterScale = 1 + scrollProgress * 2.5;
    meshRef.current.scale.setScalar(scatterScale);
    meshRef.current.material.opacity = opacity * (1 - scrollProgress * 0.9);
  });

  const geometry = useMemo(() => new THREE.TorusGeometry(radius, tubeRadius, 32, 200), [radius, tubeRadius]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={opacity}
        envMapIntensity={1}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   ORBIT PARTICLES — dots circling the sphere
   ───────────────────────────────────────── */
function OrbitParticles({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, count } = useMemo(() => {
    const count = 280;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Place particles in 3 shell radii
      const shell = [1.6, 2.2, 2.8][Math.floor(Math.random() * 3)];
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = shell * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = shell * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = shell * Math.cos(phi);
    }
    return { positions, count };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.04;
    ref.current.rotation.x = clock.getElapsedTime() * 0.02;

    // Scatter on scroll
    const s = 1 + scrollProgress * 3;
    ref.current.scale.setScalar(s);
    (ref.current.material as THREE.PointsMaterial).opacity = 0.7 * (1 - scrollProgress);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#E8C87A"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

/* ─────────────────────────────────────────
   CORE SPHERE — subtle wireframe center
   ───────────────────────────────────────── */
function CoreSphere({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.12;
    ref.current.rotation.x = clock.getElapsedTime() * 0.07;
    const s = 1 + scrollProgress * 1.5;
    ref.current.scale.setScalar(s);
    (ref.current.material as THREE.MeshStandardMaterial).opacity = 0.25 * (1 - scrollProgress * 1.2);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.55, 2]} />
      <meshStandardMaterial
        color="#C9A84C"
        wireframe
        transparent
        opacity={0.25}
        metalness={1}
        roughness={0.2}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   AMBIENT PARTICLES — background dust
   ───────────────────────────────────────── */
function AmbientDust() {
  const ref = useRef<THREE.Points>(null);
  const count = 600;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C9A84C"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.25}
      />
    </Points>
  );
}

/* ─────────────────────────────────────────
   SCENE WRAPPER
   ───────────────────────────────────────── */
function ArmillaryScene({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    // Gentle mouse parallax
    groupRef.current.rotation.y += (mouse.x * 0.15 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-mouse.y * 0.08 - groupRef.current.rotation.x) * 0.04;
  });

  const GOLD = '#C9A84C';
  const GOLD_LIGHT = '#E8C87A';
  const GOLD_DARK = '#8B6914';

  return (
    <group ref={groupRef}>
      {/* Outer ring — equatorial, slow */}
      <OrbitalRing
        rotationAxis={new THREE.Vector3(0, 1, 0)}
        speed={0.12}
        radius={2.1}
        tubeRadius={0.009}
        color={GOLD_LIGHT}
        opacity={1.0}
        scrollProgress={scrollProgress}
      />

      {/* Middle ring — tilted 60° on X, medium speed */}
      <OrbitalRing
        rotationAxis={new THREE.Vector3(1, 0, 0)}
        speed={0.18}
        radius={1.9}
        tubeRadius={0.011}
        color={GOLD}
        opacity={1.0}
        scrollProgress={scrollProgress}
        offsetAngle={Math.PI / 3}
      />

      {/* Inner ring — tilted 45° diagonal, faster */}
      <OrbitalRing
        rotationAxis={new THREE.Vector3(1, 1, 0)}
        speed={0.26}
        radius={1.65}
        tubeRadius={0.013}
        color={GOLD_DARK}
        opacity={0.9}
        scrollProgress={scrollProgress}
        offsetAngle={Math.PI / 4}
      />

      {/* Innermost bright ring — nearly vertical */}
      <OrbitalRing
        rotationAxis={new THREE.Vector3(0.2, 1, 0.5)}
        speed={0.35}
        radius={1.35}
        tubeRadius={0.015}
        color={GOLD_LIGHT}
        opacity={0.85}
        scrollProgress={scrollProgress}
        offsetAngle={Math.PI / 6}
      />

      {/* Core wireframe sphere */}
      <CoreSphere scrollProgress={scrollProgress} />

      {/* Orbiting particles */}
      <OrbitParticles scrollProgress={scrollProgress} />

      {/* Background dust */}
      <AmbientDust />
    </group>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────── */
interface ArmillarySphereProps {
  scrollProgress?: number;
}

export default function ArmillarySphere({ scrollProgress = 0 }: ArmillarySphereProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={3} color="#FFE090" />
      <pointLight position={[-5, -3, -5]} intensity={1.2} color="#C9A84C" />
      <pointLight position={[0, 0, 3]} intensity={2} color="#fff8e7" />
      <pointLight position={[3, -5, 2]} intensity={0.8} color="#8B6914" />

      <ArmillaryScene scrollProgress={scrollProgress} />
    </Canvas>
  );
}
