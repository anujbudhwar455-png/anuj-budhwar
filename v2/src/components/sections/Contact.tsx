'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { siteConfig } from '@/data/siteConfig';

const CHANNELS = [
  { label: 'Email', value: siteConfig.email, href: siteConfig.links.email, hint: 'Direct' },
  {
    label: 'LinkedIn',
    value: 'anuj-budhwar',
    href: siteConfig.links.linkedin,
    hint: 'Professional',
  },
  {
    label: 'GitHub',
    value: siteConfig.githubUsername,
    href: siteConfig.links.github,
    hint: 'Code',
  },
  { label: 'Spotify', value: 'Artist page', href: siteConfig.links.spotify, hint: 'Music' },
  {
    label: 'Instagram',
    value: '@dranujbudhwar',
    href: siteConfig.links.instagram,
    hint: 'Updates',
  },
];

export function Contact() {
  const reduced = useReducedMotion();
  return (
    <section id="contact" className="section-pad scroll-mt-20 !pt-6">
      <div className="container-max">
        <SectionHeading
          eyebrow="Uplink"
          title="Open channels"
          description="Public channels only — email, LinkedIn, GitHub, Spotify, and Instagram. No invented links."
        />

        <motion.div
          className="mb-8 overflow-hidden rounded-2xl border border-blue-400/25 bg-ink-950/70 font-mono text-sm shadow-glow"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-blue-500/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-blue-200/80">
              terminal · connect
            </span>
          </div>
          <div className="space-y-1.5 p-4 text-xs text-slate-300 sm:text-sm">
            <p>
              <span className="text-cyan-300">$</span> whoami
            </p>
            <p className="pl-4 text-slate-400">anuj-budhwar · rohtak · healthcare×ai×creativity</p>
            <p>
              <span className="text-cyan-300">$</span> status --channels
            </p>
            <p className="pl-4 text-emerald-300/90">online · 5 public endpoints</p>
            <p>
              <span className="text-cyan-300">$</span> open --select
              <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-cyan-300/80 align-middle" />
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={c.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="glass card-hover group rounded-2xl p-5"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">{c.label}</p>
                <span className="text-[10px] uppercase tracking-wider text-slate-500">{c.hint}</span>
              </div>
              <p className="mt-2 font-display text-lg text-white transition group-hover:text-cyan-100">
                {c.value}
              </p>
            </motion.a>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500">
          Phone number and physical address are not published on this site.
        </p>
      </div>
    </section>
  );
}
