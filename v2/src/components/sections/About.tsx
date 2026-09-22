'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { siteConfig } from '@/data/siteConfig';

const PILLARS = [
  {
    key: 'science',
    label: 'Science',
    detail: 'Pharm.D path · clinical training · evidence mindset',
    color: 'from-cyan-400/25 to-cyan-400/5',
    border: 'border-cyan-400/30',
  },
  {
    key: 'technology',
    label: 'Technology',
    detail: 'AI products · Android utilities · systems thinking',
    color: 'from-violet-400/25 to-violet-400/5',
    border: 'border-violet-400/30',
  },
  {
    key: 'creativity',
    label: 'Creativity',
    detail: 'Fiction on Amazon · original music on Spotify',
    color: 'from-fuchsia-400/25 to-fuchsia-400/5',
    border: 'border-fuchsia-400/30',
  },
];

export function About() {
  return (
    <section id="about" className="section-pad scroll-mt-20 !pt-6">
      <div className="container-max">
        <SectionHeading
          eyebrow="Identity"
          title="About Anuj"
          description="A Pharm.D student and builder working at the intersection of healthcare, AI, product software, writing, and music."
        />

        {/* Converging pillars → ANUJ */}
        <div className="relative mb-12">
          <div className="grid gap-4 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.key}
                className={`glass relative overflow-hidden rounded-3xl bg-gradient-to-br ${p.color} border ${p.border} p-6`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.55 }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-300">
                  Pillar 0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-3xl text-white">{p.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.detail}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="relative z-10 -mt-2 flex justify-center md:mt-6"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            <div className="glass rounded-full border border-cyan-300/35 px-10 py-4 text-center shadow-glow">
              <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-300/85">
                Science × Tech × Creativity
              </p>
              <p className="mt-1 font-display text-2xl tracking-[0.35em] text-white sm:text-3xl">
                ANUJ
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="glass card-hover rounded-3xl p-6 lg:col-span-3 md:p-8">
            <p className="text-base leading-relaxed text-slate-300 md:text-lg">
              I&apos;m <strong className="text-white">Anuj Budhwar</strong> from{' '}
              <strong className="text-white">Rohtak, Haryana, India</strong>. I hold a B.Pharm from
              Baba Mastnath University and I&apos;m pursuing Pharm.D (PB) at NIMS, with internship
              experience in pharmacy practice.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              The Rohtak story is simple: learn deeply in healthcare, build tools that respect that
              craft, and keep a creative practice alive through books and music. Alongside clinical
              training, I build AI-assisted products, Android utilities, publish fiction and
              non-fiction on Amazon, and release original music on Spotify.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              This portfolio is the public map of that work — honest status, no inflated claims.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {siteConfig.roles.map((role) => (
              <li key={role} className="glass rounded-2xl px-4 py-3 text-sm text-slate-200">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
