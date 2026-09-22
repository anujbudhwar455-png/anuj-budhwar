'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { BackToLab } from '@/components/ui/BackToLab';
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
  return (
    <section id="contact" className="section-pad scroll-mt-20">
      <div className="container-max">
        <BackToLab className="mb-8" />
        <SectionHeading
          eyebrow="Communications Terminal"
          title="Let’s connect"
          description="Public channels only — email, LinkedIn, GitHub, Spotify, and Instagram. No invented links."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={c.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="glass card-hover group rounded-2xl p-5"
              initial={{ opacity: 0, y: 10 }}
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
