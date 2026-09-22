'use client';

import { useCallback, useEffect, useState } from 'react';
import { HomeWorldLazy } from '@/components/3d/HomeWorldLazy';
import { HomeOverlay } from '@/components/home/HomeOverlay';
import { HomeFallback } from '@/components/home/HomeFallback';
import { LabCursor } from '@/components/ui/LabCursor';
import { AmbientAudioToggle } from '@/components/ui/AmbientAudioToggle';
import { withBase } from '@/lib/paths';

type Mode = 'loading' | '3d' | '3d-lite' | 'fallback';

function detectMode(): Mode {
  if (typeof window === 'undefined') return 'loading';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return 'fallback';

  // @ts-expect-error deviceMemory is experimental
  const mem: number | undefined = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency || 8;
  const lowEnd = (typeof mem === 'number' && mem < 4) || cores <= 2;

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return 'fallback';
  } catch {
    return 'fallback';
  }

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 768;
  if (lowEnd || coarse || narrow) return '3d-lite';

  return '3d';
}

export function HomeExperience() {
  const [mode, setMode] = useState<Mode>('loading');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [labEntered, setLabEntered] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [worldReady, setWorldReady] = useState(false);
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    setMode(detectMode());

    // Preload critical portrait texture only (not the book archive)
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = withBase('/textures/portrait-lab.webp');
    link.type = 'image/webp';
    document.head.appendChild(link);

    // Align with LoadingIntro fade (~1.6s) then reveal gate + mount world
    const tIntro = setTimeout(() => setIntroReady(true), mq.matches ? 250 : 1700);
    const tWorld = setTimeout(() => setWorldReady(true), mq.matches ? 100 : 900);

    const onChange = () => setMode(detectMode());
    mq.addEventListener?.('change', onChange);
    window.addEventListener('resize', onChange, { passive: true });
    return () => {
      clearTimeout(tIntro);
      clearTimeout(tWorld);
      mq.removeEventListener?.('change', onChange);
      window.removeEventListener('resize', onChange);
      link.remove();
    };
  }, []);

  const onEnterLab = useCallback(() => setLabEntered(true), []);

  if (mode === 'fallback') {
    return <HomeFallback />;
  }

  const showCursor = mode === '3d' && labEntered;
  const canMountWorld = worldReady && (mode === '3d' || mode === '3d-lite');

  return (
    <section
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#05070f]"
      aria-label="Immersive 3D portfolio home"
    >
      {canMountWorld && (
        <HomeWorldLazy
          lite={mode === '3d-lite'}
          reducedMotion={reducedMotion}
          labEntered={labEntered}
          onHoverPortal={setHoveredPortal}
        />
      )}
      {!canMountWorld && (
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(34,211,238,0.12), transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(167,139,250,0.08), transparent 50%), #05070f',
          }}
        />
      )}
      <HomeOverlay
        labEntered={labEntered}
        onEnterLab={onEnterLab}
        introReady={introReady || mode !== 'loading'}
      />
      {labEntered && (
        <div className="pointer-events-auto absolute bottom-20 right-4 z-20 sm:bottom-24 sm:right-6">
          <AmbientAudioToggle />
        </div>
      )}
      {showCursor && <LabCursor active={Boolean(hoveredPortal)} />}
      <p className="sr-only">
        Interactive 3D laboratory. Enter the lab, drag to orbit, then click glowing portals or use
        the links to open About, Work, Lab, Writing, Music, or Connect.
      </p>
    </section>
  );
}
