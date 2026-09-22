'use client';

import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
} from '@react-three/fiber';
import {
  ContactShadows,
  Float,
  OrbitControls,
  RoundedBox,
  Text,
  Stars,
} from '@react-three/drei';
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { MutableRefObject, ReactNode } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { withBase } from '@/lib/paths';
import { BOOK_COVERS, PORTALS, PORTRAIT_TEXTURE, VINYL_COVERS, type PortalDef } from './portalDefs';
import { PortalStation } from './PortalObjects';

export type { PortalDef } from './portalDefs';

function useAssetTexture(path: string) {
  const map = useLoader(THREE.TextureLoader, withBase(path));
  useEffect(() => {
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
    map.minFilter = THREE.LinearMipmapLinearFilter;
    map.magFilter = THREE.LinearFilter;
    map.needsUpdate = true;
  }, [map]);
  return map;
}

function AtmosphereParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const y = Math.random() * 4.5 - 0.2;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * r * 0.85;
    }
    return arr;
  }, [count]);

  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8ec5ff"
        transparent
        opacity={0.45}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function StudioEnvironment({
  lite,
  powerRef,
}: {
  lite: boolean;
  powerRef: MutableRefObject<number>;
}) {
  const amb = useRef<THREE.AmbientLight>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const fill = useRef<THREE.DirectionalLight>(null);
  const rim = useRef<THREE.SpotLight>(null);
  const p1 = useRef<THREE.PointLight>(null);
  const p2 = useRef<THREE.PointLight>(null);
  const ringMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const p = powerRef.current;
    if (amb.current) amb.current.intensity = 0.12 + 0.2 * p;
    if (key.current) key.current.intensity = 0.35 + 0.8 * p;
    if (fill.current) fill.current.intensity = 0.1 + 0.22 * p;
    if (rim.current) rim.current.intensity = 0.18 + 0.54 * p;
    if (p1.current) p1.current.intensity = 0.12 + 0.3 * p;
    if (p2.current) p2.current.intensity = 0.06 + 0.16 * p;
    if (ringMat.current) ringMat.current.emissiveIntensity = 0.06 + 0.12 * p;
  });

  return (
    <>
      <color attach="background" args={['#05070f']} />
      <fog attach="fog" args={['#05070f', 7.5, lite ? 20 : 26]} />
      <ambientLight ref={amb} intensity={0.32} color="#b8c4e0" />
      <directionalLight
        ref={key}
        position={[4.2, 7.5, 3.2]}
        intensity={1.15}
        color="#f0f4ff"
        castShadow={!lite}
        shadow-mapSize-width={lite ? 512 : 1024}
        shadow-mapSize-height={lite ? 512 : 1024}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      {/* Soft fill — cool pewter, not neon */}
      <directionalLight ref={fill} position={[-3.5, 3.5, 2]} intensity={0.32} color="#c7d2fe" />
      {/* Rim — restrained cyan */}
      <spotLight
        ref={rim}
        position={[-5, 6.5, -2]}
        intensity={0.72}
        angle={0.48}
        penumbra={0.82}
        color="#7dd3fc"
      />
      <pointLight ref={p1} position={[0, 2.8, -3.8]} intensity={0.42} color="#a5b4fc" />
      <pointLight ref={p2} position={[3.2, 1.4, 3.8]} intensity={0.22} color="#c4b5fd" />

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[9.5, 72]} />
        <meshStandardMaterial
          color="#070b14"
          metalness={0.72}
          roughness={0.28}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Subtle grid ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0.35]}>
        <ringGeometry args={[3.55, 4.15, 72]} />
        <meshStandardMaterial
          ref={ringMat}
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.18}
          transparent
          opacity={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Concentric floor guides */}
      {[1.6, 2.6, 5.2].map((r) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0.2]}>
          <ringGeometry args={[r, r + 0.015, 64]} />
          <meshBasicMaterial color="#1e293b" transparent opacity={0.45} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {!lite && (
        <ContactShadows
          position={[0, 0.02, 0]}
          opacity={0.58}
          scale={14}
          blur={2.5}
          far={8}
          color="#000000"
        />
      )}

      {/* Back wall atmospheric panels */}
      <mesh position={[0, 2.3, -4.4]}>
        <planeGeometry args={[14, 5.5]} />
        <meshStandardMaterial
          color="#080d18"
          emissive="#15102e"
          emissiveIntensity={0.4}
          roughness={0.92}
        />
      </mesh>
      <mesh position={[-5.5, 1.8, -2]} rotation={[0, Math.PI / 2.4, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#060a14" emissive="#0c1a2e" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[5.5, 1.8, -2]} rotation={[0, -Math.PI / 2.4, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#060a14" emissive="#1a1030" emissiveIntensity={0.22} />
      </mesh>

      {!lite && <Stars radius={40} depth={30} count={520} factor={2.0} saturation={0} fade speed={0.35} />}
      <AtmosphereParticles count={lite ? 48 : 140} />
    </>
  );
}

function PortraitPanel({ lite }: { lite: boolean }) {
  const map = useAssetTexture(PORTRAIT_TEXTURE);
  const frameRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!frameRef.current) return;
    const t = state.clock.elapsedTime;
    frameRef.current.position.y = 1.38 + Math.sin(t * 0.65) * 0.035;
  });

  return (
    <Float
      speed={lite ? 0.5 : 0.95}
      rotationIntensity={lite ? 0.04 : 0.08}
      floatIntensity={lite ? 0.12 : 0.2}
    >
      <group ref={frameRef} position={[0, 1.38, -0.15]}>
        {/* Pedestal plinth */}
        <mesh position={[0, -1.55, 0.05]} castShadow>
          <cylinderGeometry args={[0.55, 0.7, 0.18, 40]} />
          <meshStandardMaterial color="#0c1220" metalness={0.75} roughness={0.28} />
        </mesh>
        <mesh position={[0, -1.42, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.52, 0.62, 48]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.25}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Metal frame */}
        <RoundedBox args={[1.58, 2.18, 0.09]} radius={0.045} smoothness={4} castShadow>
          <meshStandardMaterial color="#111827" metalness={0.78} roughness={0.22} />
        </RoundedBox>
        {/* Holographic bezel glow */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[1.48, 2.08]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.08} />
        </mesh>
        <mesh position={[0, 0, 0.048]}>
          <planeGeometry args={[1.4, 2.0]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
        {/* Portrait — BasicMaterial keeps photo sharp */}
        <mesh position={[0, 0, 0.058]}>
          <planeGeometry args={[1.34, 1.94]} />
          <meshBasicMaterial map={map} toneMapped={false} />
        </mesh>

        {/* Rim lights */}
        <pointLight position={[0.9, 0.5, 1.2]} intensity={0.45} color="#67e8f9" distance={4} />
        <pointLight position={[-0.9, 0.2, 1.0]} intensity={0.3} color="#c4b5fd" distance={4} />
        <pointLight position={[0, 0.5, 1.7]} intensity={0.4} color="#e2e8f0" distance={5} />

        <mesh position={[0, -1.18, 0.07]}>
          <planeGeometry args={[1.15, 0.035]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.85} />
        </mesh>
        <Text
          position={[0, -1.38, 0.09]}
          fontSize={0.105}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.4}
        >
          Anuj Budhwar
        </Text>
        <Text
          position={[0, -1.52, 0.09]}
          fontSize={0.055}
          color="#67e8f9"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
        >
          Lab Owner · Rohtak
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
    if (ref.current) ref.current.rotation.y += d * 0.32;
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

function WorldParallax({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current || !enabled) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.055,
      0.045
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.035,
      0.045
    );
  });

  return <group ref={group}>{children}</group>;
}

const IDLE_CAM = new THREE.Vector3(0, 2.15, 7.35);
const IDLE_TARGET = new THREE.Vector3(0, 0.95, 0.35);
/** Pre-enter: slightly back + elevated (darker framing). */
const ENTER_START = new THREE.Vector3(0, 3.35, 11.2);
const ENTER_DURATION = 4.0; // seconds — cinematic dolly + lights ramp

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function CameraDirector({
  reduced,
  labEntered,
  focusPortal,
  onFocusComplete,
  onEnterComplete,
  powerRef,
}: {
  reduced: boolean;
  labEntered: boolean;
  focusPortal: PortalDef | null;
  onFocusComplete: (href: string) => void;
  onEnterComplete: () => void;
  powerRef: MutableRefObject<number>;
}) {
  const { camera } = useThree();
  const phase = useRef<'boot' | 'enter' | 'idle' | 'focus' | 'done'>('boot');
  const focusPos = useRef(new THREE.Vector3());
  const lookAt = useRef(IDLE_TARGET.clone());
  const hrefRef = useRef('');
  const enterStart = useRef(0);
  const enterDone = useRef(false);
  const fromPos = useRef(ENTER_START.clone());

  useEffect(() => {
    if (reduced) {
      camera.position.copy(IDLE_CAM);
      camera.lookAt(IDLE_TARGET);
      powerRef.current = 1;
      phase.current = 'idle';
      if (labEntered && !enterDone.current) {
        enterDone.current = true;
        onEnterComplete();
      }
      return;
    }
    if (phase.current === 'focus' || phase.current === 'done' || phase.current === 'enter') return;
    if (!labEntered && phase.current === 'boot') {
      camera.position.copy(ENTER_START);
      camera.lookAt(IDLE_TARGET);
      powerRef.current = 0.22;
    }
  }, [camera, reduced, labEntered, onEnterComplete, powerRef]);

  useEffect(() => {
    if (!labEntered || enterDone.current) return;
    if (reduced) {
      powerRef.current = 1;
      camera.position.copy(IDLE_CAM);
      camera.lookAt(IDLE_TARGET);
      phase.current = 'idle';
      enterDone.current = true;
      onEnterComplete();
      return;
    }
    fromPos.current.copy(camera.position);
    enterStart.current = -1; // latch on next frame with clock
    phase.current = 'enter';
  }, [labEntered, reduced, camera, onEnterComplete, powerRef]);

  useEffect(() => {
    if (!focusPortal) return;
    const [x, y, z] = focusPortal.position;
    const dir = new THREE.Vector3(x, 0, z).normalize();
    focusPos.current.set(x - dir.x * 2.4, y + 1.35, z - dir.z * 2.4 + 1.1);
    lookAt.current.set(x, y + 0.35, z);
    hrefRef.current = focusPortal.href;
    phase.current = 'focus';
  }, [focusPortal]);

  useFrame((state) => {
    if (reduced) return;

    if (phase.current === 'boot') {
      // Subtle pre-enter drift (still dark)
      const target = new THREE.Vector3(0, 3.05, 10.4);
      camera.position.lerp(target, 0.018);
      camera.lookAt(lookAt.current);
      powerRef.current = THREE.MathUtils.lerp(powerRef.current, 0.28, 0.02);
      return;
    }

    if (phase.current === 'enter') {
      if (enterStart.current < 0) enterStart.current = state.clock.elapsedTime;
      const raw = (state.clock.elapsedTime - enterStart.current) / ENTER_DURATION;
      const t = Math.min(1, Math.max(0, raw));
      const e = easeInOutCubic(t);
      camera.position.lerpVectors(fromPos.current, IDLE_CAM, e);
      lookAt.current.lerp(IDLE_TARGET, 0.08);
      camera.lookAt(lookAt.current);
      // Lights / portals: ramp harder in the middle third
      const powerCurve = easeInOutCubic(Math.min(1, t * 1.15));
      powerRef.current = 0.22 + 0.78 * powerCurve;
      if (t >= 1) {
        camera.position.copy(IDLE_CAM);
        powerRef.current = 1;
        phase.current = 'idle';
        if (!enterDone.current) {
          enterDone.current = true;
          onEnterComplete();
        }
      }
      return;
    }

    if (phase.current === 'focus') {
      camera.position.lerp(focusPos.current, 0.048);
      lookAt.current.lerp(
        new THREE.Vector3(
          focusPortal?.position[0] ?? 0,
          (focusPortal?.position[1] ?? 0) + 0.38,
          focusPortal?.position[2] ?? 0
        ),
        0.07
      );
      camera.lookAt(lookAt.current);
      if (camera.position.distanceTo(focusPos.current) < 0.16) {
        phase.current = 'done';
        onFocusComplete(hrefRef.current);
      }
    }
  });

  return null;
}

function CursorBridge({
  hoveredId,
  enabled,
}: {
  hoveredId: string | null;
  enabled: boolean;
}) {
  useEffect(() => {
    if (!enabled) return;
    document.body.dataset.labCursor = hoveredId ? 'view' : 'lab';
    return () => {
      delete document.body.dataset.labCursor;
    };
  }, [hoveredId, enabled]);
  return null;
}

function SceneContent({
  lite,
  reduced,
  labEntered,
  enterComplete,
  onEnterComplete,
  onHoverPortal,
}: {
  lite: boolean;
  reduced: boolean;
  labEntered: boolean;
  enterComplete: boolean;
  onEnterComplete: () => void;
  onHoverPortal?: (id: string | null) => void;
}) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusPortal, setFocusPortal] = useState<PortalDef | null>(null);
  const navigating = Boolean(focusPortal);
  const powerRef = useRef(labEntered && (reduced || enterComplete) ? 1 : 0.22);
  const [powerTick, setPowerTick] = useState(powerRef.current);

  // Sync powerRef → React for portal emissive without per-frame setState spam
  useFrame(() => {
    const p = powerRef.current;
    if (Math.abs(p - powerTick) > 0.04) setPowerTick(p);
  });

  const setHover = useCallback(
    (id: string | null) => {
      setHoveredId(id);
      onHoverPortal?.(id);
    },
    [onHoverPortal]
  );

  const onSelect = useCallback(
    (portal: PortalDef) => {
      if (navigating || !labEntered || !enterComplete) return;
      setHover(null);
      setFocusPortal(portal);
    },
    [navigating, labEntered, enterComplete, setHover]
  );

  const onFocusComplete = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router]
  );

  useEffect(() => {
    return () => {
      delete document.body.dataset.labCursor;
    };
  }, []);

  const orbitReady = labEntered && enterComplete && !navigating && !reduced;

  return (
    <>
      <StudioEnvironment lite={lite} powerRef={powerRef} />
      <WorldParallax enabled={!reduced && enterComplete && !navigating}>
        <PortraitPanel lite={lite} />
        {PORTALS.map((p) => (
          <PortalStation
            key={p.id}
            portal={p}
            onSelect={onSelect}
            hoveredId={hoveredId}
            setHoveredId={setHover}
            interactive={labEntered && enterComplete && !navigating}
            largeHit={lite}
            powerUp={powerTick}
          />
        ))}
        {/* Deferred décor textures — only after ENTER (keeps first paint light) */}
        {!lite && labEntered && (
          <Suspense fallback={null}>
            {BOOK_COVERS.map((b) => (
              <BookMesh key={b.src} src={b.src} position={b.position} rot={b.rot} />
            ))}
            {VINYL_COVERS.map((v) => (
              <VinylDisc key={v.src} src={v.src} position={v.position} />
            ))}
          </Suspense>
        )}
      </WorldParallax>

      <CameraDirector
        reduced={reduced}
        labEntered={labEntered}
        focusPortal={focusPortal}
        onFocusComplete={onFocusComplete}
        onEnterComplete={onEnterComplete}
        powerRef={powerRef}
      />
      <CursorBridge hoveredId={hoveredId} enabled={!lite && enterComplete} />

      <OrbitControls
        enabled={orbitReady}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={4.2}
        maxDistance={11}
        maxPolarAngle={Math.PI / 2.05}
        minPolarAngle={0.35}
        target={[0, 0.95, 0.35]}
        makeDefault
      />
    </>
  );
}

export type HomeWorldProps = {
  lite?: boolean;
  reducedMotion?: boolean;
  labEntered?: boolean;
  enterComplete?: boolean;
  onEnterComplete?: () => void;
  onHoverPortal?: (id: string | null) => void;
};

export function HomeWorld({
  lite = false,
  reducedMotion = false,
  labEntered = true,
  enterComplete = true,
  onEnterComplete,
  onHoverPortal,
}: HomeWorldProps) {
  const handleEnterComplete = useCallback(() => {
    onEnterComplete?.();
  }, [onEnterComplete]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        className="!absolute inset-0 h-full w-full touch-none"
        dpr={[1, lite ? 1 : 1.25]}
        camera={{
          position: labEntered && enterComplete ? [0, 2.15, 7.35] : [0, 3.35, 11.2],
          fov: 42,
          near: 0.1,
          far: 70,
        }}
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
          gl.toneMappingExposure = 1.02;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            lite={lite}
            reduced={reducedMotion}
            labEntered={labEntered}
            enterComplete={enterComplete}
            onEnterComplete={handleEnterComplete}
            onHoverPortal={onHoverPortal}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export const HOME_PORTALS = PORTALS;
