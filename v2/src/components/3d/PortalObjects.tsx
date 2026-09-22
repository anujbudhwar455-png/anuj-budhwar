'use client';

import { Html, RoundedBox } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import type { PortalDef } from './portalDefs';

function Pedestal({ color, active }: { color: string; active: boolean }) {
  return (
    <>
      <mesh position={[0, -0.42, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.42, 0.55, 28]} />
        <meshStandardMaterial color="#0c1220" metalness={0.72} roughness={0.28} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.14, 0]}>
        <ringGeometry args={[0.34, 0.48, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 0.55 : 0.22}
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

function ScannerBody({ color, active }: { color: string; active: boolean }) {
  const scan = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!scan.current) return;
    const y = ((s.clock.elapsedTime * 0.55) % 1.1) - 0.55;
    scan.current.position.y = y;
  });
  return (
    <group position={[0, 0.35, 0]}>
      <RoundedBox args={[0.55, 1.15, 0.08]} radius={0.03} smoothness={4} castShadow>
        <meshStandardMaterial color="#101827" metalness={0.65} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[0.42, 0.95]} />
        <meshStandardMaterial
          color="#041018"
          emissive={color}
          emissiveIntensity={active ? 0.45 : 0.18}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={scan} position={[0, 0, 0.055]}>
        <planeGeometry args={[0.4, 0.035]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      {/* Side rails */}
      {[-0.3, 0.3].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.04, 1.2, 0.06]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function ConsoleBody({ color, active }: { color: string; active: boolean }) {
  return (
    <group position={[0, 0.15, 0]}>
      <mesh position={[0, -0.05, 0.05]} rotation={[-0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.85, 0.08, 0.55]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.28, -0.12]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.72, 0.48, 0.05]} />
        <meshStandardMaterial
          color="#020617"
          emissive={color}
          emissiveIntensity={active ? 0.55 : 0.22}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
      {/* Soft UI bars */}
      {[-0.12, 0, 0.12].map((y, i) => (
        <mesh key={i} position={[0, 0.28 + y, -0.09]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[0.5, 0.035]} />
          <meshBasicMaterial color={color} transparent opacity={0.35 + i * 0.15} />
        </mesh>
      ))}
      <mesh position={[0.22, -0.02, 0.18]}>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1.2 : 0.5} />
      </mesh>
    </group>
  );
}

function ChamberBody({ color, active }: { color: string; active: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ring.current) ring.current.rotation.y += d * (active ? 1.2 : 0.4);
  });
  return (
    <group position={[0, 0.35, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.38, 0.42, 0.85, 6]} />
        <meshStandardMaterial
          color="#0b1220"
          metalness={0.55}
          roughness={0.35}
          transparent
          opacity={0.75}
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
        <torusGeometry args={[0.48, 0.02, 10, 48]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.95 : 0.55} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <icosahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 1.3 : 0.6}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function ArchiveBody({ color, active }: { color: string; active: boolean }) {
  return (
    <group position={[0, 0.25, 0]}>
      {[
        { y: 0.05, z: 0.02, rot: 0.12, w: 0.48, h: 0.62 },
        { y: 0.12, z: -0.04, rot: -0.18, w: 0.44, h: 0.58 },
        { y: 0.22, z: 0.06, rot: 0.08, w: 0.4, h: 0.52 },
      ].map((b, i) => (
        <group key={i} position={[0, b.y, b.z]} rotation={[0, b.rot, 0.05]}>
          <mesh castShadow>
            <boxGeometry args={[b.w, b.h, 0.05]} />
            <meshStandardMaterial color="#1e293b" metalness={0.25} roughness={0.55} />
          </mesh>
          <mesh position={[0, 0, 0.028]}>
            <planeGeometry args={[b.w * 0.9, b.h * 0.88]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive={color}
              emissiveIntensity={active ? 0.35 : 0.12 + i * 0.05}
            />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1.4 : 0.6} />
      </mesh>
    </group>
  );
}

function AudioBody({ color, active }: { color: string; active: boolean }) {
  const disc = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (disc.current) disc.current.rotation.y += d * (active ? 1.6 : 0.5);
  });
  return (
    <group position={[0, 0.12, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.1, 0.55]} />
        <meshStandardMaterial color="#0f172a" metalness={0.75} roughness={0.28} />
      </mesh>
      <group ref={disc} position={[-0.18, 0.08, 0]} rotation={[Math.PI / 2.05, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 0.02, 40]} />
          <meshStandardMaterial color="#0b1220" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
      {/* Faders */}
      {[0.18, 0.28, 0.38].map((x, i) => (
        <mesh key={i} position={[x, 0.08, 0.05]}>
          <boxGeometry args={[0.04, 0.06, 0.12]} />
          <meshStandardMaterial
            color="#1e293b"
            emissive={color}
            emissiveIntensity={active ? 0.4 : 0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

function TerminalBody({ color, active }: { color: string; active: boolean }) {
  const dish = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!dish.current) return;
    dish.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.6) * 0.35;
  });
  return (
    <group position={[0, 0.2, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.35, 0.45]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.12, 0.23]}>
        <planeGeometry args={[0.5, 0.18]} />
        <meshStandardMaterial
          color="#020617"
          emissive={color}
          emissiveIntensity={active ? 0.7 : 0.28}
        />
      </mesh>
      <mesh ref={dish} position={[0, 0.42, -0.05]} rotation={[0.4, 0, 0]}>
        <sphereGeometry args={[0.22, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.85}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.55, -0.05]}>
        <cylinderGeometry args={[0.015, 0.015, 0.28, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1 : 0.4} />
      </mesh>
    </group>
  );
}

function PortalMesh({ portal, active }: { portal: PortalDef; active: boolean }) {
  switch (portal.kind) {
    case 'scanner':
      return <ScannerBody color={portal.color} active={active} />;
    case 'console':
      return <ConsoleBody color={portal.color} active={active} />;
    case 'chamber':
      return <ChamberBody color={portal.color} active={active} />;
    case 'archive':
      return <ArchiveBody color={portal.color} active={active} />;
    case 'audio':
      return <AudioBody color={portal.color} active={active} />;
    case 'terminal':
      return <TerminalBody color={portal.color} active={active} />;
  }
}

export function PortalStation({
  portal,
  onSelect,
  hoveredId,
  setHoveredId,
  interactive,
  largeHit,
}: {
  portal: PortalDef;
  onSelect: (portal: PortalDef) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  interactive: boolean;
  largeHit?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const active = hoveredId === portal.id;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y =
      portal.position[1] + Math.sin(t * 1.15 + portal.position[0]) * 0.05;
    const targetScale = active ? 1.1 : 1;
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    pointer.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    if (!pointer.current) return;
    const dx = e.clientX - pointer.current.x;
    const dy = e.clientY - pointer.current.y;
    pointer.current = null;
    if (Math.hypot(dx, dy) < 10) onSelect(portal);
  };

  return (
    <group
      ref={group}
      position={portal.position}
      onPointerOver={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        setHoveredId(portal.id);
      }}
      onPointerOut={() => {
        if (hoveredId === portal.id) setHoveredId(null);
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <Pedestal color={portal.color} active={active} />
      <PortalMesh portal={portal} active={active} />
      {/* Invisible hit area */}
      <mesh visible={false} position={[0, 0.35, 0]}>
        <sphereGeometry args={[largeHit ? 0.85 : 0.65, 16, 16]} />
      </mesh>
      <Html
        position={[0, 1.18, 0]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div
          className="flex min-w-[132px] flex-col items-center gap-0.5 rounded-2xl border px-3.5 py-2 shadow-glow backdrop-blur-md transition-transform"
          style={{
            borderColor: active ? `${portal.color}99` : `${portal.color}44`,
            background: active ? 'rgba(5,7,15,0.92)' : 'rgba(5,7,15,0.72)',
            color: portal.color,
            transform: active ? 'scale(1.06)' : 'scale(1)',
            boxShadow: active ? `0 0 24px ${portal.color}33` : 'none',
          }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">{portal.label}</span>
          <span
            className="text-[9px] font-medium tracking-wide"
            style={{ color: active ? '#e2e8f0' : 'rgba(203,213,225,0.85)' }}
          >
            {portal.subtitle}
          </span>
          {active && (
            <span className="mt-0.5 text-[8px] uppercase tracking-[0.28em] text-slate-400">
              Click to enter
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}
