'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { withBase } from '@/lib/paths';

const LINKS = [
  { label: 'About', href: '/about/', subtitle: 'Identity' },
  { label: 'Work', href: '/work/', subtitle: 'Products' },
  { label: 'Lab', href: '/lab/', subtitle: 'Experiments' },
  { label: 'Writing', href: '/writing/', subtitle: 'Archive' },
  { label: 'Music', href: '/music/', subtitle: 'Listening' },
  { label: 'Connect', href: '/connect/', subtitle: 'Channels' },
];

export function HomeOverlay({
  labEntered,
  onEnterLab,
  introReady,
}: {
  labEntered: boolean;
  onEnterLab: () => void;
  introReady: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-4 pb-6 pt-20 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        {!labEntered ? (
          <motion.div
            key="gate"
            className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-[#05070f]/78 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: introReady ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mx-auto max-w-2xl px-4 text-center">
              <motion.p
                className="text-[10px] font-semibold uppercase tracking-[0.4em] text-cyan-300/90 sm:text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Digital Lab 2.0
              </motion.p>
              <motion.h1
                className="heading-display mt-4 text-4xl drop-shadow-lg sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                Anuj Budhwar
              </motion.h1>
              <motion.p
                className="mt-3 text-sm font-medium tracking-wide text-cyan-100/90 sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Healthcare × AI × Creativity
              </motion.p>
              <motion.p
                className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-300/95 sm:text-base"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52 }}
              >
                Building at the intersection of science, technology and imagination.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <button type="button" className="btn-primary magnetic-cta" onClick={onEnterLab}>
                  Enter the Lab
                </button>
                <a className="btn-secondary" href={withBase('/work/')}>
                  Explore Work
                </a>
              </motion.div>
              <motion.p
                className="mt-6 text-[11px] tracking-wide text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
              >
                From Rohtak, Haryana · Pharm.D · AI builder · writer · music creator
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hud"
            className="flex h-full w-full flex-col justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mx-auto w-full max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-300/80 sm:text-xs">
                Digital Lab · Healthcare × AI × Creativity
              </p>
              <h1 className="heading-display mt-2 text-2xl drop-shadow-lg sm:text-4xl">
                Anuj Budhwar
              </h1>
            </div>

            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3">
              <p className="rounded-full border border-white/10 bg-ink-950/55 px-4 py-1.5 text-[11px] tracking-wide text-slate-300 backdrop-blur-md sm:text-xs">
                Drag to orbit · Click a portal to enter
              </p>

              <nav
                aria-label="Jump to sections"
                className="pointer-events-auto flex flex-wrap justify-center gap-2"
              >
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={withBase(l.href)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-300 backdrop-blur transition hover:border-cyan-300/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                    title={l.subtitle}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
