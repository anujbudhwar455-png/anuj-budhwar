'use client';

import { useEffect, useState } from 'react';
import { HomeWorldLazy } from '@/components/3d/HomeWorldLazy';
import { HomeOverlay } from '@/components/home/HomeOverlay';
import { HomeFallback } from '@/components/home/HomeFallback';

type Mode = 'loading' | '3d' | '3d-lite' | 'fallback';

function detectMode(): Mode {
  if (typeof window === 'undefined') return 'loading';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return 'fallback';

  // @ts-expect-error deviceMemory is experimental
  const mem: number | undefined = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency || 8;
  const lowEnd = (typeof mem === 'number' && mem < 4) || cores <= 2;

  // WebGL probe (allow software GL; only bail if completely unavailable)
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return 'fallback';
  } catch {
    return 'fallback';
  }

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 768;
  // Low-end / mobile → lighter scene (still 3D), not a hard fallback
  if (lowEnd || coarse || narrow) return '3d-lite';

  return '3d';
}

export function HomeExperience() {
  const [mode, setMode] = useState<Mode>('loading');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    setMode(detectMode());

    const onChange = () => setMode(detectMode());
    mq.addEventListener?.('change', onChange);
    window.addEventListener('resize', onChange, { passive: true });
    return () => {
      mq.removeEventListener?.('change', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);

  if (mode === 'fallback') {
    return <HomeFallback />;
  }

  return (
    <section
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#05070f]"
      aria-label="Immersive 3D portfolio home"
    >
      {(mode === '3d' || mode === '3d-lite') && (
        <HomeWorldLazy lite={mode === '3d-lite'} reducedMotion={reducedMotion} />
      )}
      {mode === 'loading' && (
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(34,211,238,0.12), transparent 55%), #05070f',
          }}
        />
      )}
      <HomeOverlay />
      <p className="sr-only">
        Interactive 3D laboratory. Drag to orbit the camera. Click glowing portals or use the links
        below to open About, Work, Lab, Writing, Music, or Connect.
      </p>
    </section>
  );
}
