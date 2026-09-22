'use client';

import { motion } from 'framer-motion';
import { withBase } from '@/lib/paths';
import { siteConfig } from '@/data/siteConfig';

const LINKS = [
  { label: 'About', href: '/about/', tone: 'from-cyan-400/30 to-cyan-400/5', sub: 'Identity' },
  { label: 'Work', href: '/work/', tone: 'from-teal-400/30 to-teal-400/5', sub: 'Products' },
  { label: 'Lab', href: '/lab/', tone: 'from-violet-400/30 to-violet-400/5', sub: 'Experiments' },
  {
    label: 'Writing',
    href: '/writing/',
    tone: 'from-fuchsia-400/30 to-fuchsia-400/5',
    sub: 'Archive',
  },
  { label: 'Music', href: '/music/', tone: 'from-pink-400/30 to-pink-400/5', sub: 'Listening' },
  {
    label: 'Connect',
    href: '/connect/',
    tone: 'from-blue-400/30 to-blue-400/5',
    sub: 'Channels',
  },
];

export function HomeFallback() {
  return (
    <div className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-20">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(34,211,238,0.18), transparent 45%), radial-gradient(ellipse at 80% 70%, rgba(167,139,250,0.16), transparent 40%), linear-gradient(180deg, #05070f 0%, #0a1020 55%, #05070f 100%)',
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-[50vh] max-w-lg px-6 sm:top-20"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative mx-auto aspect-[3/4] max-h-full overflow-hidden rounded-[1.75rem] border border-white/15 shadow-glow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBase(siteConfig.profileImage)}
            alt=""
            className="h-full w-full object-cover"
            width={640}
            height={860}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
        </div>
      </motion.div>

      <div className="relative z-10 px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Digital Lab 2.0 · Healthcare × AI × Creativity
          </p>
          <h1 className="heading-display mt-3 text-4xl sm:text-5xl">Anuj Budhwar</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
            Building at the intersection of science, technology and imagination. From Rohtak,
            Haryana — Pharm.D student, AI builder, writer &amp; music creator.
          </p>
        </div>

        <nav
          aria-label="Portfolio sections"
          className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3"
        >
          {LINKS.map((item, i) => (
            <motion.a
              key={item.href}
              href={withBase(item.href)}
              className={`glass card-hover rounded-2xl bg-gradient-to-br ${item.tone} px-4 py-4 text-center`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <span className="block text-sm font-semibold text-white">{item.label}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-wider text-slate-300/80">
                {item.sub}
              </span>
            </motion.a>
          ))}
        </nav>

        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-3">
          <a className="btn-primary" href={withBase('/lab/')}>
            Enter Lab
          </a>
          <a className="btn-secondary" href={withBase('/work/')}>
            Explore Work
          </a>
        </div>
      </div>
    </div>
  );
}
