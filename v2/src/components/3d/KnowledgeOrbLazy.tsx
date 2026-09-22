'use client';

import dynamic from 'next/dynamic';

export const KnowledgeOrbLazy = dynamic(
  () => import('./KnowledgeOrb').then((m) => m.KnowledgeOrb),
  {
    ssr: false,
    loading: () => (
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 via-violet-500/15 to-fuchsia-500/20 blur-2xl" />
      </div>
    ),
  }
);
