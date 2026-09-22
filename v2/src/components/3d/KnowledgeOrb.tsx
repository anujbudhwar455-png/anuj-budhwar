'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function OrbitalSystem({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      [
        { color: '#22d3ee', pos: [1.6, 0.2, 0] as [number, number, number], label: 'AI' },
        { color: '#2dd4bf', pos: [-1.2, 0.9, 0.4] as [number, number, number], label: 'Health' },
        { color: '#a78bfa', pos: [-0.4, -1.3, 0.6] as [number, number, number], label: 'Create' },
        { color: '#e879f9', pos: [0.8, -0.6, -1.1] as [number, number, number], label: 'Write' },
      ],
    []
  );

  useFrame((_, delta) => {
    if (reduced || !group.current) return;
    group.current.rotation.y += delta * 0.25;
    group.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.15;
  });

  return (
    <group ref={group}>
      <Float speed={reduced ? 0 : 1.2} rotationIntensity={reduced ? 0 : 0.4} floatIntensity={reduced ? 0 : 0.6}>
        <Sphere args={[0.85, 48, 48]}>
          <MeshDistortMaterial
            color="#67e8f9"
            attach="material"
            distort={reduced ? 0.1 : 0.35}
            speed={reduced ? 0.5 : 1.6}
            roughness={0.25}
            metalness={0.55}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>
      {nodes.map((n) => (
        <mesh key={n.label} position={n.pos}>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={0.6} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[1.55, 0.01, 12, 80]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[0.4, 0.8, Math.PI / 3]}>
        <torusGeometry args={[1.85, 0.008, 12, 90]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
      </mesh>
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 2, 2]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-3, -1, -2]} intensity={0.8} color="#a78bfa" />
    </group>
  );
}

function FallbackGradient() {
  return (
    <div
      className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 via-violet-500/20 to-fuchsia-500/25 blur-2xl"
      aria-hidden
    />
  );
}

export function KnowledgeOrb() {
  const [ready, setReady] = useState(false);
  const [use3d, setUse3d] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const lowMem =
      // @ts-expect-error deviceMemory is not in all TS libs
      (navigator.deviceMemory && navigator.deviceMemory < 4) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const allow3d = !mq.matches && !lowMem && window.innerWidth >= 768 && !coarse.matches;
    setReduced(mq.matches);
    setUse3d(!!allow3d);
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="relative aspect-square w-full max-w-md">
        <FallbackGradient />
      </div>
    );
  }

  if (!use3d) {
    return (
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <FallbackGradient />
        <div className="absolute inset-[18%] rounded-full border border-cyan-300/20 bg-gradient-to-br from-cyan-400/20 to-violet-500/20 shadow-glow animate-float" />
        <div className="absolute inset-[32%] rounded-full bg-gradient-to-tr from-teal-300/40 to-fuchsia-400/30 blur-sm" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-3 text-[10px] uppercase tracking-widest text-slate-300/80">
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">AI</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Health</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Write</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Music</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <FallbackGradient />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          <OrbitalSystem reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
