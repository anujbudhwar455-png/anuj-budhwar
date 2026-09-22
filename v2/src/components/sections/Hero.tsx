'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { withBase } from '@/lib/paths';
import { KnowledgeOrbLazy } from '@/components/3d/KnowledgeOrbLazy';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" aria-hidden />
      <div className="container-max section-pad grid items-center gap-12 lg:grid-cols-2 lg:!pt-24">
        <div>
          <motion.p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            From Rohtak · Healthcare × AI × Creativity
          </motion.p>
          <motion.h1
            className="heading-display text-4xl leading-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            Anuj Budhwar
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-lg text-slate-300 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Pharm.D student at NIMS · B.Pharm, Baba Mastnath University · AI builder, product
            developer, writer & music creator.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <a className="btn-primary" href={withBase('/work/')}>
              Explore My Work
            </a>
            <a className="btn-secondary" href={withBase('/about/')}>
              About Me
            </a>
            <a className="btn-secondary" href={withBase('/lab/')}>
              Enter The Lab
            </a>
            <a className="btn-secondary" href={withBase('/music/')}>
              Listen
            </a>
          </motion.div>

          <motion.div
            className="mt-10 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/15 shadow-glow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase(siteConfig.profileImage)}
                alt="Portrait of Anuj Budhwar"
                className="h-full w-full object-cover"
                width={64}
                height={64}
              />
            </div>
            <div className="text-sm text-slate-400">
              <p className="font-medium text-slate-200">Pharm.D Intern · Builder</p>
              <p>Rohtak, Haryana, India</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-400/10 to-violet-500/10 blur-2xl" />
          <div className="relative glass rounded-[2rem] p-4 sm:p-6">
            <div className="relative overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase(siteConfig.profileImage)}
                alt="Anuj Budhwar"
                className="aspect-[4/5] w-full object-cover"
                width={640}
                height={800}
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-4 w-[55%] sm:w-[60%]">
              <KnowledgeOrbLazy />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
