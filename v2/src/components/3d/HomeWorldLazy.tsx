'use client';

import dynamic from 'next/dynamic';
import type { HomeWorldProps } from './HomeWorld';

export const HomeWorldLazy = dynamic<HomeWorldProps>(
  () => import('./HomeWorld').then((m) => m.HomeWorld),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 bg-[#05070f]"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(34,211,238,0.12), transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(167,139,250,0.1), transparent 50%), #05070f',
        }}
      />
    ),
  }
);
