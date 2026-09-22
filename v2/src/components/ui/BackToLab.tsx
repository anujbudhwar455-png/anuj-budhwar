'use client';

import { ArrowLeft } from 'lucide-react';
import { withBase } from '@/lib/paths';

export function BackToLab({ className = '' }: { className?: string }) {
  return (
    <a
      href={withBase('/')}
      className={`group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-200 ${className}`}
    >
      <ArrowLeft
        size={14}
        className="transition group-hover:-translate-x-0.5"
        aria-hidden
      />
      Back to Lab
    </a>
  );
}
