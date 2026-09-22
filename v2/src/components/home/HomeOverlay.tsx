'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { withBase } from '@/lib/paths';
import { LAB_DESTINATIONS, LabDock } from '@/components/home/LabDock';

export function HomeOverlay({
  labEntered,
  onEnterLab,
  introReady,
  mobileUi = false,
  enterComplete = true,
  systemOnline = false,
}: {
  labEntered: boolean;
  onEnterLab: () => void;
  introReady: boolean;
  /** Touch / narrow / 3d-lite — use bottom dock instead of pill nav. */
  mobileUi?: boolean;
  enterComplete?: boolean;
  systemOnline?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-4 pt-20 sm:px-6 lg:px-8 ${
        labEntered && mobileUi ? 'pb-24' : 'pb-6'
      }`}
    >
      <AnimatePresence mode="wait">
        {!labEntered ? (
          <motion.div
            key="gate"
            className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-[#05070f]/72 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: introReady ? 1 : 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.75 }}
          >
            <div className="mx-auto max-w-2xl px-4 text-center">
              <motion.p
                className="text-[10px] font-semibold uppercase tracking-[0.45em] text-cyan-300/90 sm:text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
              >
                Digital Lab 2.1
              </motion.p>
              <motion.h1
                className="heading-display mt-5 text-5xl drop-shadow-lg sm:text-6xl md:text-7xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Anuj Budhwar
              </motion.h1>
              <motion.div
                className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.38, duration: 0.6 }}
              />
              <motion.p
                className="mt-4 text-sm font-medium tracking-[0.18em] text-cyan-100/90 sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
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
                className="mt-9 flex flex-wrap items-center justify-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.64 }}
              >
                <button
                  type="button"
                  className="btn-primary magnetic-cta !px-7 !py-3 !text-[13px] !tracking-[0.14em] uppercase"
                  onClick={onEnterLab}
                >
                  Enter the Lab
                </button>
                <a className="btn-secondary" href={withBase('/work/')}>
                  Explore Work
                </a>
              </motion.div>
              <motion.p
                className="mt-7 text-[11px] tracking-wide text-slate-500"
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
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto w-full max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-300/80 sm:text-xs">
                Digital Lab · Healthcare × AI × Creativity
              </p>
              <h1 className="heading-display mt-2 text-2xl drop-shadow-lg sm:text-4xl">
                Anuj Budhwar
              </h1>
              <AnimatePresence>
                {systemOnline && (
                  <motion.p
                    key="sys"
                    className="mt-3 font-mono text-[11px] tracking-[0.28em] text-cyan-300/90 sm:text-xs"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    ▸ SYSTEM ONLINE · PORTALS ARMED
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3">
              <p className="rounded-full border border-white/10 bg-ink-950/55 px-4 py-1.5 text-[11px] tracking-wide text-slate-300 backdrop-blur-md sm:text-xs">
                {mobileUi
                  ? enterComplete
                    ? 'Tap a portal or use the dock below'
                    : 'Systems powering up…'
                  : enterComplete
                    ? 'Drag to orbit · Hover a portal · Click to enter'
                    : 'Systems powering up…'}
              </p>

              {/* Desktop pill nav — hidden on mobile (dock replaces it) */}
              {!mobileUi && (
                <nav
                  aria-label="Jump to sections"
                  className="pointer-events-auto hidden flex-wrap justify-center gap-2 md:flex"
                >
                  {LAB_DESTINATIONS.map((l) => (
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
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {labEntered && mobileUi && <LabDock />}
    </div>
  );
}
