import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────
   ORBITAL RING COMPONENT
   ───────────────────────────────────────── */
interface RingProps {
  rotationAxis: THREE.Vector3;
  speed: number;
  radius: number;
  tubeRadius: number;
  color: string;
  opacity: number;
  offsetAngle?: number;
  phase: number;
}

function MorphingRing({ rotationAxis, speed, radius, tubeRadius, color, opacity, offsetAngle = 0, phase }: RingProps) {
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

    // Dynamic wave expansion based on phase
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.5 + phase) * 0.04;
    meshRef.current.scale.setScalar(pulse);
  });

  const geometry = useMemo(() => new THREE.TorusGeometry(radius, tubeRadius, 32, 180), [radius, tubeRadius]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.1}
        transparent
        opacity={opacity}
        wireframe={false}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   QUANTUM DATA PARTICLES (SWARM)
   ───────────────────────────────────────── */
function QuantumSwarm({ totalProgress }: { totalProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 450;

  const { originalPositions, positions } = useMemo(() => {
    const orig = new Float32Array(count * 3);
    const curr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Shell radii with mathematical spiral
      const r = 1.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      curr[i * 3] = x;
      curr[i * 3 + 1] = y;
      curr[i * 3 + 2] = z;
    }
    return { originalPositions: orig, positions: curr };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.04 + totalProgress * Math.PI;
    pointsRef.current.rotation.x = t * 0.02 + Math.sin(totalProgress * Math.PI * 2) * 0.2;

    // Pulse scale dynamically
    const dynamicScale = 1 + Math.sin(t * 1.2) * 0.05 + Math.sin(totalProgress * Math.PI * 4) * 0.15;
    pointsRef.current.scale.setScalar(dynamicScale);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#E0F2FE"
        size={0.028}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

/* ─────────────────────────────────────────
   CORE WIREFRAME ICOSAHEDRON
   ───────────────────────────────────────── */
function CentralCore({ totalProgress }: { totalProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.x = t * 0.09;
    meshRef.current.rotation.z = t * 0.05;

    // Breath effect
    const s = 0.55 + Math.sin(t * 2) * 0.04 + (totalProgress > 0.85 ? 0.2 : 0);
    meshRef.current.scale.setScalar(s);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color="#93C5FD"
        wireframe
        transparent
        opacity={0.35}
        metalness={1}
        roughness={0.1}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   NEBULA STARDUST FIELD
   ───────────────────────────────────────── */
function DeepStardust() {
  const ref = useRef<THREE.Points>(null);
  const count = 750;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.008;
    ref.current.rotation.x = clock.getElapsedTime() * 0.004;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#93C5FD"
        size={0.014}
        sizeAttenuation
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

/* ─────────────────────────────────────────
   MAIN 3D KINETIC TRAVELER SCENE
   ───────────────────────────────────────── */
interface JourneySceneProps {
  totalProgress: number; // 0.0 (top) to 1.0 (bottom)
}

function JourneyScene({ totalProgress }: JourneySceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetPos = useRef(new THREE.Vector3(1.7, 0, 0));
  const targetRot = useRef(new THREE.Euler(0, 0, 0));
  const targetScale = useRef(1.0);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;

    // SECTION COORDINATE MAPPING:
    // 0.00 - 0.15 (Hero): Right side hero stage
    // 0.15 - 0.35 (About): Moves to Left background, expands
    // 0.35 - 0.55 (Experience): Shifts to Right timeline side
    // 0.55 - 0.72 (Skills): Deep center background
    // 0.72 - 0.88 (Projects): Left side balance
    // 0.88 - 1.00 (Contact): Center bottom glowing beacon

    let destX = 1.7;
    let destY = 0;
    let destZ = 0;
    let scaleVal = 1.0;
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    if (totalProgress <= 0.15) {
      // Hero stage
      destX = 1.7;
      destY = 0;
      destZ = 0;
      scaleVal = 1.0;
    } else if (totalProgress <= 0.35) {
      // About stage (Left side)
      const p = (totalProgress - 0.15) / 0.20;
      destX = THREE.MathUtils.lerp(1.7, -1.8, p);
      destY = THREE.MathUtils.lerp(0, 0.2, p);
      destZ = THREE.MathUtils.lerp(0, -0.4, p);
      scaleVal = THREE.MathUtils.lerp(1.0, 1.15, p);
      rotY = p * Math.PI * 0.5;
    } else if (totalProgress <= 0.55) {
      // Experience stage (Right side timeline)
      const p = (totalProgress - 0.35) / 0.20;
      destX = THREE.MathUtils.lerp(-1.8, 1.8, p);
      destY = THREE.MathUtils.lerp(0.2, -0.2, p);
      destZ = THREE.MathUtils.lerp(-0.4, 0.2, p);
      scaleVal = THREE.MathUtils.lerp(1.15, 0.95, p);
      rotX = p * Math.PI * 0.4;
    } else if (totalProgress <= 0.72) {
      // Skills stage (Center deep)
      const p = (totalProgress - 0.55) / 0.17;
      destX = THREE.MathUtils.lerp(1.8, 0, p);
      destY = THREE.MathUtils.lerp(-0.2, 0.1, p);
      destZ = THREE.MathUtils.lerp(0.2, -1.2, p);
      scaleVal = THREE.MathUtils.lerp(0.95, 1.35, p);
      rotZ = p * Math.PI * 0.3;
    } else if (totalProgress <= 0.88) {
      // Projects stage (Left float)
      const p = (totalProgress - 0.72) / 0.16;
      destX = THREE.MathUtils.lerp(0, -1.9, p);
      destY = THREE.MathUtils.lerp(0.1, -0.1, p);
      destZ = THREE.MathUtils.lerp(-1.2, 0, p);
      scaleVal = THREE.MathUtils.lerp(1.35, 1.05, p);
      rotY = p * Math.PI * 0.6;
    } else {
      // Contact & Resume stage (Center glowing core)
      const p = (totalProgress - 0.88) / 0.12;
      destX = THREE.MathUtils.lerp(-1.9, 0, p);
      destY = THREE.MathUtils.lerp(-0.1, -0.4, p);
      destZ = THREE.MathUtils.lerp(0, 0.3, p);
      scaleVal = THREE.MathUtils.lerp(1.05, 1.25, p);
    }

    targetPos.current.set(destX, destY, destZ);

    // Mouse parallax offsets
    const mouseParallaxX = mouse.x * 0.35;
    const mouseParallaxY = -mouse.y * 0.25;

    // Smooth LERP movement (super buttery smooth)
    groupRef.current.position.x += (targetPos.current.x + mouseParallaxX - groupRef.current.position.x) * 0.06;
    groupRef.current.position.y += (targetPos.current.y + mouseParallaxY - groupRef.current.position.y) * 0.06;
    groupRef.current.position.z += (targetPos.current.z - groupRef.current.position.z) * 0.06;

    const currentScale = groupRef.current.scale.x;
    const newScale = currentScale + (scaleVal - currentScale) * 0.06;
    groupRef.current.scale.setScalar(newScale);

    groupRef.current.rotation.y += 0.003;
  });

  const ICE_LIGHT = '#E0F2FE';
  const ICE_MAIN = '#93C5FD';
  const ICE_DARK = '#3B82F6';

  return (
    <group ref={groupRef} position={[1.7, 0, 0]}>
      {/* 4 Titanium Orbital Rings */}
      <MorphingRing
        rotationAxis={new THREE.Vector3(0, 1, 0)}
        speed={0.12}
        radius={2.1}
        tubeRadius={0.009}
        color={ICE_LIGHT}
        opacity={0.95}
        phase={0}
      />
      <MorphingRing
        rotationAxis={new THREE.Vector3(1, 0, 0)}
        speed={0.18}
        radius={1.88}
        tubeRadius={0.011}
        color={ICE_MAIN}
        opacity={0.9}
        offsetAngle={Math.PI / 3}
        phase={1}
      />
      <MorphingRing
        rotationAxis={new THREE.Vector3(1, 1, 0)}
        speed={0.24}
        radius={1.62}
        tubeRadius={0.013}
        color={ICE_DARK}
        opacity={0.8}
        offsetAngle={Math.PI / 4}
        phase={2}
      />
      <MorphingRing
        rotationAxis={new THREE.Vector3(0.2, 1, 0.5)}
        speed={0.32}
        radius={1.35}
        tubeRadius={0.014}
        color={ICE_LIGHT}
        opacity={0.85}
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
        {/* Dynamic Studio Lighting tuned for Frost Titanium */}
        <ambientLight intensity={0.35} color="#ffffff" />
        <pointLight position={[6, 6, 6]} intensity={3.2} color="#E0F2FE" />
        <pointLight position={[-6, -4, -6]} intensity={1.5} color="#93C5FD" />
        <pointLight position={[0, 0, 4]} intensity={2} color="#ffffff" />
        <pointLight position={[3, -6, 2]} intensity={0.9} color="#3B82F6" />

        <JourneyScene totalProgress={totalProgress} />
      </Canvas>
    </div>
  );
}
