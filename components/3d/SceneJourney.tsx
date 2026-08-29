import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────
   GLOSSY METALLIC ORBITAL RING COMPONENT
   ───────────────────────────────────────── */
interface RingProps {
  rotationAxis: THREE.Vector3;
  speed: number;
  radius: number;
  tubeRadius: number;
  color: string;
  emissiveColor: string;
  opacity: number;
  offsetAngle?: number;
  phase: number;
}

function MorphingRing({
  rotationAxis,
  speed,
  radius,
  tubeRadius,
  color,
  emissiveColor,
  opacity,
  offsetAngle = 0,
  phase
}: RingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseQuaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromAxisAngle(rotationAxis.clone().normalize(), offsetAngle);
    return q;
  }, [rotationAxis, offsetAngle]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    const spinQ = new THREE.Quaternion();
    spinQ.setFromAxisAngle(rotationAxis.clone().normalize(), t);
    meshRef.current.quaternion.multiplyQuaternions(spinQ, baseQuaternion);

    // Subtle rhythmic breath
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.5 + phase) * 0.03;
    meshRef.current.scale.setScalar(pulse);
  });

  const geometry = useMemo(() => new THREE.TorusGeometry(radius, tubeRadius, 32, 220), [radius, tubeRadius]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={emissiveColor}
        emissiveIntensity={0.25}
        metalness={0.96}
        roughness={0.06}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   QUANTUM DATA PARTICLES (SWARM)
   ───────────────────────────────────────── */
function QuantumSwarm({ totalProgress }: { totalProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 480;

  const { positions } = useMemo(() => {
    const curr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 1.3 + Math.random() * 2.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      curr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      curr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      curr[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions: curr };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.05 + totalProgress * Math.PI;
    pointsRef.current.rotation.x = t * 0.025 + Math.sin(totalProgress * Math.PI * 2) * 0.2;

    const dynamicScale = 1 + Math.sin(t * 1.2) * 0.05 + Math.sin(totalProgress * Math.PI * 4) * 0.12;
    pointsRef.current.scale.setScalar(dynamicScale);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#E0F2FE"
        size={0.032}
        sizeAttenuation
        depthWrite={false}
        opacity={0.88}
      />
    </Points>
  );
}

/* ─────────────────────────────────────────
   GLOWING WIREFRAME CORE
   ───────────────────────────────────────── */
function CentralCore({ totalProgress }: { totalProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.z = t * 0.06;

    const s = 0.58 + Math.sin(t * 2) * 0.04 + (totalProgress > 0.85 ? 0.2 : 0);
    meshRef.current.scale.setScalar(s);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color="#93C5FD"
        emissive="#3B82F6"
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.45}
        metalness={1}
        roughness={0.05}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   NEBULA STARDUST FIELD
   ───────────────────────────────────────── */
function DeepStardust() {
  const ref = useRef<THREE.Points>(null);
  const count = 800;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.01;
    ref.current.rotation.x = clock.getElapsedTime() * 0.005;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#BAE6FD"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
      />
    </Points>
  );
}

/* ─────────────────────────────────────────
   MAIN 3D KINETIC TRAVELER SCENE
   ───────────────────────────────────────── */
interface JourneySceneProps {
  totalProgress: number;
}

function JourneyScene({ totalProgress }: JourneySceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetPos = useRef(new THREE.Vector3(1.7, 0, 0));

  useFrame(({ mouse }) => {
    if (!groupRef.current) return;

    let destX = 1.7;
    let destY = 0;
    let destZ = 0;
    let scaleVal = 1.05;

    if (totalProgress <= 0.15) {
      // Hero stage (Right side)
      destX = 1.7;
      destY = 0;
      destZ = 0;
      scaleVal = 1.05;
    } else if (totalProgress <= 0.35) {
      // About stage (Left side)
      const p = (totalProgress - 0.15) / 0.20;
      destX = THREE.MathUtils.lerp(1.7, -1.8, p);
      destY = THREE.MathUtils.lerp(0, 0.2, p);
      destZ = THREE.MathUtils.lerp(0, -0.2, p);
      scaleVal = THREE.MathUtils.lerp(1.05, 1.2, p);
    } else if (totalProgress <= 0.55) {
      // Experience stage (Right side timeline)
      const p = (totalProgress - 0.35) / 0.20;
      destX = THREE.MathUtils.lerp(-1.8, 1.8, p);
      destY = THREE.MathUtils.lerp(0.2, -0.2, p);
      destZ = THREE.MathUtils.lerp(-0.2, 0.2, p);
      scaleVal = THREE.MathUtils.lerp(1.2, 1.05, p);
    } else if (totalProgress <= 0.72) {
      // Skills stage (Center background between cards)
      const p = (totalProgress - 0.55) / 0.17;
      destX = THREE.MathUtils.lerp(1.8, 0, p);
      destY = THREE.MathUtils.lerp(-0.2, 0.1, p);
      destZ = THREE.MathUtils.lerp(0.2, -0.6, p);
      scaleVal = THREE.MathUtils.lerp(1.05, 1.4, p);
    } else if (totalProgress <= 0.88) {
      // Projects stage (Left float)
      const p = (totalProgress - 0.72) / 0.16;
      destX = THREE.MathUtils.lerp(0, -1.9, p);
      destY = THREE.MathUtils.lerp(0.1, -0.1, p);
      destZ = THREE.MathUtils.lerp(-0.6, 0.1, p);
      scaleVal = THREE.MathUtils.lerp(1.4, 1.15, p);
    } else {
      // Contact & Resume stage (Center glowing core)
      const p = (totalProgress - 0.88) / 0.12;
      destX = THREE.MathUtils.lerp(-1.9, 0, p);
      destY = THREE.MathUtils.lerp(-0.1, -0.4, p);
      destZ = THREE.MathUtils.lerp(0.1, 0.4, p);
      scaleVal = THREE.MathUtils.lerp(1.15, 1.3, p);
    }

    targetPos.current.set(destX, destY, destZ);

    const mouseParallaxX = mouse.x * 0.4;
    const mouseParallaxY = -mouse.y * 0.3;

    groupRef.current.position.x += (targetPos.current.x + mouseParallaxX - groupRef.current.position.x) * 0.06;
    groupRef.current.position.y += (targetPos.current.y + mouseParallaxY - groupRef.current.position.y) * 0.06;
    groupRef.current.position.z += (targetPos.current.z - groupRef.current.position.z) * 0.06;

    const currentScale = groupRef.current.scale.x;
    const newScale = currentScale + (scaleVal - currentScale) * 0.06;
    groupRef.current.scale.setScalar(newScale);

    groupRef.current.rotation.y += 0.003;
  });

  const ICE_POLAR = '#FFFFFF';
  const ICE_LIGHT = '#E0F2FE';
  const ICE_MAIN = '#93C5FD';
  const ICE_DARK = '#3B82F6';

  return (
    <group ref={groupRef} position={[1.7, 0, 0]}>
      {/* 4 Glossy Titanium Orbital Rings (Enhanced Visibility & Tube Radius) */}
      <MorphingRing
        rotationAxis={new THREE.Vector3(0, 1, 0)}
        speed={0.12}
        radius={2.15}
        tubeRadius={0.013}
        color={ICE_POLAR}
        emissiveColor={ICE_LIGHT}
        opacity={1.0}
        phase={0}
      />
      <MorphingRing
        rotationAxis={new THREE.Vector3(1, 0, 0)}
        speed={0.18}
        radius={1.92}
        tubeRadius={0.015}
        color={ICE_LIGHT}
        emissiveColor={ICE_MAIN}
        opacity={0.98}
        offsetAngle={Math.PI / 3}
        phase={1}
      />
      <MorphingRing
        rotationAxis={new THREE.Vector3(1, 1, 0)}
        speed={0.24}
        radius={1.66}
        tubeRadius={0.016}
        color={ICE_MAIN}
        emissiveColor={ICE_DARK}
        opacity={0.92}
        offsetAngle={Math.PI / 4}
        phase={2}
      />
      <MorphingRing
        rotationAxis={new THREE.Vector3(0.2, 1, 0.5)}
        speed={0.32}
        radius={1.38}
        tubeRadius={0.018}
        color={ICE_POLAR}
        emissiveColor={ICE_LIGHT}
        opacity={0.95}
        offsetAngle={Math.PI / 6}
        phase={3}
      />

      {/* Wireframe Quantum Core */}
      <CentralCore totalProgress={totalProgress} />

      {/* Quantum Swarm Particles */}
      <QuantumSwarm totalProgress={totalProgress} />

      {/* Ambient Stardust Field */}
      <DeepStardust />
    </group>
  );
}

/* ─────────────────────────────────────────
   PERSISTENT FULLPAGE CANVAS EXPORT
   ───────────────────────────────────────── */
export default function SceneJourney({ totalProgress = 0 }: { totalProgress?: number }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    >
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
        {/* Enhanced High-Gloss Studio Lighting */}
        <ambientLight intensity={0.55} color="#ffffff" />
        <pointLight position={[6, 6, 6]} intensity={5.0} color="#FFFFFF" />
        <pointLight position={[-6, -4, -6]} intensity={2.8} color="#93C5FD" />
        <pointLight position={[0, 0, 4]} intensity={3.0} color="#E0F2FE" />
        <pointLight position={[4, -6, 3]} intensity={1.5} color="#3B82F6" />

        <JourneyScene totalProgress={totalProgress} />
      </Canvas>
    </div>
  );
}
