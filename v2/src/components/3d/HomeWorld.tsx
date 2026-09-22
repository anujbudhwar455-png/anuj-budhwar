'use client';

import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  ThreeEvent,
} from '@react-three/fiber';
import {
  ContactShadows,
  Float,
  Html,
  OrbitControls,
  RoundedBox,
  Text,
} from '@react-three/drei';
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { withBase } from '@/lib/paths';

export type PortalDef = {
  id: string;
  label: string;
  href: string;
  color: string;
  position: [number, number, number];
};

const PORTALS: PortalDef[] = [
  { id: 'about', label: 'About', href: '/about/', color: '#22d3ee', position: [-3.2, 0.55, 1.4] },
  { id: 'work', label: 'Work', href: '/work/', color: '#2dd4bf', position: [-1.8, 0.7, 2.6] },
  { id: 'lab', label: 'Lab', href: '/lab/', color: '#a78bfa', position: [0.15, 0.85, 3.1] },
  { id: 'writing', label: 'Writing', href: '/writing/', color: '#e879f9', position: [2.0, 0.7, 2.4] },
  { id: 'music', label: 'Music', href: '/music/', color: '#f472b6', position: [3.3, 0.55, 1.1] },
  { id: 'connect', label: 'Connect', href: '/connect/', color: '#60a5fa', position: [-2.8, 0.5, -0.9] },
];

const BOOK_COVERS = [
  { src: '/books/eternal-bloodline-1.jpg', position: [2.55, 0.35, 2.85] as [number, number, number], rot: 0.25 },
  { src: '/books/ashen-mage-ascendant-1.jpg', position: [1.55, 0.32, 3.05] as [number, number, number], rot: -0.35 },
];

const VINYL_COVERS = [
  { src: '/music/cocaine.jpg', position: [3.85, 0.08, 1.55] as [number, number, number] },
  { src: '/music/eternal.jpg', position: [3.95, 0.08, 0.55] as [number, number, number] },
];

function useAssetTexture(path: string) {
  const map = useLoader(THREE.TextureLoader, withBase(path));
  useEffect(() => {
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    map.minFilter = THREE.LinearMipmapLinearFilter;
    map.magFilter = THREE.LinearFilter;
    map.needsUpdate = true;
  }, [map]);
  return map;
}

function StudioEnvironment({ lite }: { lite: boolean }) {
  return (
    <>
      <color attach="background" args={['#05070f']} />
      <fog attach="fog" args={['#05070f', 8, lite ? 22 : 28]} />
      <ambientLight intensity={0.35} color="#9fb4ff" />
      <directionalLight
        position={[4.5, 7, 3]}
        intensity={1.35}
        color="#e8f0ff"
        castShadow={!lite}
        shadow-mapSize-width={lite ? 512 : 1024}
        shadow-mapSize-height={lite ? 512 : 1024}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <spotLight
        position={[-5, 6, -2]}
        intensity={1.1}
        angle={0.55}
        penumbra={0.7}
        color="#22d3ee"
      />
      <pointLight position={[0, 2.5, -4]} intensity={0.85} color="#a78bfa" />
      <pointLight position={[3, 1.2, 4]} intensity={0.45} color="#f472b6" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[9, 64]} />
        <meshStandardMaterial
          color="#0a0f1c"
          metalness={0.55}
          roughness={0.35}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* Soft ring platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.4]}>
        <ringGeometry args={[3.6, 4.05, 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.25}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {!lite && (
        <ContactShadows
          position={[0, 0.02, 0]}
          opacity={0.55}
          scale={14}
          blur={2.4}
          far={8}
          color="#000000"
        />
      )}

      {/* Back wall glow panels */}
      <mesh position={[0, 2.2, -4.2]}>
        <planeGeometry args={[12, 5]} />
        <meshStandardMaterial
          color="#0b1220"
          emissive="#1e1b4b"
          emissiveIntensity={0.35}
          roughness={0.9}
        />
      </mesh>
    </>
  );
}

function PortraitPanel({ lite }: { lite: boolean }) {
  const map = useAssetTexture('/images/anuj-profile.jpg');
  const frameRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!frameRef.current) return;
    const t = state.clock.elapsedTime;
    frameRef.current.position.y = 1.35 + Math.sin(t * 0.7) * 0.04;
  });

  return (
    <Float
      speed={lite ? 0.6 : 1.1}
      rotationIntensity={lite ? 0.05 : 0.12}
      floatIntensity={lite ? 0.15 : 0.25}
    >
      <group ref={frameRef} position={[0, 1.35, -0.2]}>
        {/* Frame */}
        <RoundedBox args={[1.55, 2.15, 0.08]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.25} />
        </RoundedBox>
        {/* Inner bevel */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[1.38, 1.98]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
        {/* Portrait — BasicMaterial keeps the photo sharp and bright */}
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[1.32, 1.92]} />
          <meshBasicMaterial map={map} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 0.4, 1.6]} intensity={0.55} color="#e2e8f0" distance={5} />
        {/* Accent rim light strip */}
        <mesh position={[0, -1.15, 0.06]}>
          <planeGeometry args={[1.2, 0.04]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.85} />
        </mesh>
        <Text
          position={[0, -1.35, 0.08]}
          fontSize={0.11}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.4}
        >
          Anuj Budhwar
        </Text>
      </group>
    </Float>
  );
}

function BookMesh({
  src,
  position,
  rot,
}: {
  src: string;
  position: [number, number, number];
  rot: number;
}) {
  const map = useAssetTexture(src);
  return (
    <group position={position} rotation={[0, rot, 0.08]}>
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.82, 0.06]} />
        <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[0.52, 0.78]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
    </group>
  );
}

function VinylDisc({
  src,
  position,
}: {
  src: string;
  position: [number, number, number];
}) {
  const map = useAssetTexture(src);
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.35;
  });
  return (
    <group position={position}>
      <group ref={ref} rotation={[Math.PI / 2.1, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.025, 48]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.014, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.28, 48]} />
          <meshBasicMaterial map={map} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.04, 0.07, 24]} />
          <meshBasicMaterial color="#e2e8f0" />
        </mesh>
      </group>
    </group>
  );
}

function PortalStation({
  portal,
  onNavigate,
  hoveredId,
  setHoveredId,
}: {
  portal: PortalDef;
  onNavigate: (href: string) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const active = hoveredId === portal.id;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y =
      portal.position[1] + Math.sin(t * 1.2 + portal.position[0]) * 0.06;
    const targetScale = active ? 1.12 : 1;
    group.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.12
    );
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    pointer.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!pointer.current) return;
    const dx = e.clientX - pointer.current.x;
    const dy = e.clientY - pointer.current.y;
    pointer.current = null;
    if (Math.hypot(dx, dy) < 8) onNavigate(portal.href);
  };

  return (
    <group
      ref={group}
      position={portal.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredId(portal.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHoveredId(null);
        document.body.style.cursor = 'auto';
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* Pedestal */}
      <mesh position={[0, -0.35, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.38, 0.5, 24]} />
        <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Core orb */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color={portal.color}
          emissive={portal.color}
          emissiveIntensity={active ? 1.4 : 0.7}
          metalness={0.35}
          roughness={0.2}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
        <torusGeometry args={[0.42, 0.018, 12, 48]} />
        <meshBasicMaterial color={portal.color} transparent opacity={active ? 0.95 : 0.55} />
      </mesh>
      <Html
        position={[0, 0.72, 0]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div
          className="rounded-full border border-white/20 bg-ink-950/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-glow backdrop-blur-md"
          style={{ borderColor: `${portal.color}66`, color: portal.color }}
        >
          {portal.label}
        </div>
      </Html>
    </group>
  );
}

function WorldParallax({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current || !enabled) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.06,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.04,
      0.05
    );
  });

  return <group ref={group}>{children}</group>;
}

function CameraIntro({ reduced }: { reduced: boolean }) {
  const { camera } = useThree();
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      camera.position.set(0, 2.1, 7.2);
      camera.lookAt(0, 0.9, 0);
      return;
    }
    camera.position.set(0, 3.8, 12);
    camera.lookAt(0, 0.9, 0);
    started.current = true;
  }, [camera, reduced]);

  useFrame(() => {
    if (!started.current || reduced) return;
    camera.position.lerp(new THREE.Vector3(0, 2.1, 7.2), 0.035);
    if (camera.position.distanceTo(new THREE.Vector3(0, 2.1, 7.2)) < 0.08) {
      started.current = false;
    }
  });

  return null;
}

function SceneContent({
  lite,
  reduced,
}: {
  lite: boolean;
  reduced: boolean;
}) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const onNavigate = useCallback(
    (href: string) => {
      document.body.style.cursor = 'auto';
      router.push(href);
    },
    [router]
  );

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <StudioEnvironment lite={lite} />
      <WorldParallax enabled={!reduced}>
        <PortraitPanel lite={lite} />
        {PORTALS.map((p) => (
          <PortalStation
            key={p.id}
            portal={p}
            onNavigate={onNavigate}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
        {!lite &&
          BOOK_COVERS.map((b) => (
            <BookMesh key={b.src} src={b.src} position={b.position} rot={b.rot} />
          ))}
        {!lite &&
          VINYL_COVERS.map((v) => (
            <VinylDisc key={v.src} src={v.src} position={v.position} />
          ))}
      </WorldParallax>

      <CameraIntro reduced={reduced} />

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={4.2}
        maxDistance={11}
        maxPolarAngle={Math.PI / 2.05}
        minPolarAngle={0.35}
        target={[0, 0.9, 0.4]}
        makeDefault
      />
    </>
  );
}

export type HomeWorldProps = {
  lite?: boolean;
  reducedMotion?: boolean;
};

export function HomeWorld({ lite = false, reducedMotion = false }: HomeWorldProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        className="!absolute inset-0 h-full w-full touch-none"
        dpr={[1, lite ? 1.25 : 1.5]}
        camera={{ position: [0, 2.1, 7.2], fov: 42, near: 0.1, far: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        shadows={!lite}
        onCreated={({ gl }) => {
          gl.setClearColor('#05070f', 1);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <Suspense fallback={null}>
          <SceneContent lite={lite} reduced={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export const HOME_PORTALS = PORTALS;
