'use client';

import { motion } from 'framer-motion';
import { withBase } from '@/lib/paths';

const LINKS = [
  { label: 'About', href: '/about/' },
  { label: 'Work', href: '/work/' },
  { label: 'Lab', href: '/lab/' },
  { label: 'Writing', href: '/writing/' },
  { label: 'Music', href: '/music/' },
  { label: 'Connect', href: '/connect/' },
];

export function HomeOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-4 pb-6 pt-20 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto w-full max-w-3xl text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.55 }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90 sm:text-xs">
          Digital Lab · Healthcare × AI × Creativity
        </p>
        <h1 className="heading-display mt-2 text-3xl drop-shadow-lg sm:text-5xl md:text-6xl">
          Anuj Budhwar
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300/95 drop-shadow sm:text-base">
          Pharm.D student · AI builder · writer · music creator — from Rohtak, Haryana.
        </p>
      </motion.div>

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4">
        <motion.p
          className="rounded-full border border-white/10 bg-ink-950/55 px-4 py-1.5 text-[11px] tracking-wide text-slate-300 backdrop-blur-md sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Drag to explore · Click a portal
        </motion.p>

        <motion.div
          className="pointer-events-auto flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <a className="btn-primary" href={withBase('/lab/')}>
            Enter Lab
          </a>
          <a className="btn-secondary" href={withBase('/work/')}>
            Explore Work
          </a>
        </motion.div>

        {/* Keyboard / screen-reader accessible section links */}
        <nav
          aria-label="Jump to sections"
          className="pointer-events-auto flex flex-wrap justify-center gap-2"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={withBase(l.href)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300 backdrop-blur transition hover:border-cyan-300/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
