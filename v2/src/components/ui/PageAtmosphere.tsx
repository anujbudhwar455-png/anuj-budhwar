'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { BackToLab } from '@/components/ui/BackToLab';

export type AtmosphereVariant =
  | 'about'
  | 'work'
  | 'lab'
  | 'writing'
  | 'music'
  | 'connect';

const ATMOS: Record<
  AtmosphereVariant,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    accent: string;
    glowA: string;
    glowB: string;
    particleTint: string;
  }
> = {
  about: {
    eyebrow: 'Identity Portal',
    title: 'About',
    subtitle: 'Science × Technology × Creativity → ANUJ',
    accent: '#22d3ee',
    glowA: 'rgba(34,211,238,0.18)',
    glowB: 'rgba(167,139,250,0.12)',
    particleTint: 'rgba(103,232,249,0.55)',
  },
  work: {
    eyebrow: 'Build Console',
    title: 'Work',
    subtitle: 'Products · experiments · honest status',
    accent: '#2dd4bf',
    glowA: 'rgba(45,212,191,0.16)',
    glowB: 'rgba(167,139,250,0.12)',
    particleTint: 'rgba(94,234,212,0.5)',
  },
  lab: {
    eyebrow: 'Experiment Chamber',
    title: 'Lab',
    subtitle: 'Prototypes · systems · ideas in motion',
    accent: '#a78bfa',
    glowA: 'rgba(167,139,250,0.18)',
    glowB: 'rgba(34,211,238,0.1)',
    particleTint: 'rgba(196,181,253,0.55)',
  },
  writing: {
    eyebrow: 'Digital Archive',
    title: 'Writing',
    subtitle: 'Amazon-live series only · catalog verified',
    accent: '#e879f9',
    glowA: 'rgba(232,121,249,0.16)',
    glowB: 'rgba(244,114,182,0.1)',
    particleTint: 'rgba(240,171,252,0.5)',
  },
  music: {
    eyebrow: 'Listening Room',
    title: 'Music',
    subtitle: '12 singles · Spotify artist page',
    accent: '#f472b6',
    glowA: 'rgba(244,114,182,0.16)',
    glowB: 'rgba(167,139,250,0.12)',
    particleTint: 'rgba(249,168,212,0.5)',
  },
  connect: {
    eyebrow: 'Communications Terminal',
    title: 'Connect',
    subtitle: 'Channels online · collaboration open',
    accent: '#60a5fa',
    glowA: 'rgba(96,165,250,0.16)',
    glowB: 'rgba(34,211,238,0.1)',
    particleTint: 'rgba(147,197,253,0.55)',
  },
};

function AmbientParticles({ color, reduced }: { color: string; reduced: boolean }) {
  if (reduced) return null;
  const dots = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 70}%`,
    size: 2 + (i % 3),
    delay: (i % 7) * 0.35,
    dur: 6 + (i % 5),
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full opacity-40"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: color,
            animation: `lab-float ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function PageAtmosphere({
  variant,
  children,
  hideBack,
}: {
  variant: AtmosphereVariant;
  children?: ReactNode;
  hideBack?: boolean;
}) {
  const cfg = ATMOS[variant];
  const reduced = useReducedMotion();

  return (
    <div className="page-shell relative overflow-hidden pt-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] sm:h-[480px]"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${cfg.glowA}, transparent 70%), radial-gradient(ellipse 50% 40% at 85% 20%, ${cfg.glowB}, transparent 55%), linear-gradient(180deg, rgba(5,7,15,0.2), transparent)`,
        }}
      />
      <AmbientParticles color={cfg.particleTint} reduced={Boolean(reduced)} />

      {/* Soft scanline / archive grid for writing & connect */}
      {(variant === 'writing' || variant === 'connect') && !reduced && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[380px] opacity-[0.07]"
          aria-hidden
          style={{
            backgroundImage:
              variant === 'connect'
                ? 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(96,165,250,0.35) 3px)'
                : 'linear-gradient(rgba(232,121,249,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(232,121,249,0.25) 1px, transparent 1px)',
            backgroundSize: variant === 'connect' ? '100% 6px' : '48px 48px',
            maskImage: 'linear-gradient(180deg, black, transparent)',
          }}
        />
      )}

      <div className="container-max relative z-10 px-4 pb-6 pt-8 sm:px-6 lg:px-8">
        {!hideBack && <BackToLab className="mb-8" />}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.38em] sm:text-xs"
            style={{ color: cfg.accent }}
          >
            {cfg.eyebrow}
          </p>
          <h1 className="heading-display mt-3 text-4xl sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              {cfg.title}
            </span>
          </h1>
          <motion.p
            className="mt-3 max-w-xl text-sm text-slate-300/95 sm:text-base"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
          >
            {cfg.subtitle}
          </motion.p>
          <motion.div
            className="mt-5 h-px max-w-xs"
            style={{
              background: `linear-gradient(90deg, ${cfg.accent}, transparent)`,
            }}
            initial={reduced ? false : { scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          />
        </motion.div>
        {children}
      </div>
    </div>
  );
}
