'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { StatusBadge } from '@/components/StatusBadge';
import { BackToLab } from '@/components/ui/BackToLab';
import { projects } from '@/data/projects';
import { withBase } from '@/lib/paths';

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  const loreloom = featured.find((p) => p.id === 'loreloom');
  const others = featured.filter((p) => p.id !== 'loreloom');

  return (
    <section id="work" className="section-pad scroll-mt-20">
      <div className="container-max">
        <BackToLab className="mb-8" />
        <SectionHeading
          eyebrow="Featured"
          title="Projects & products"
          description="Apps, experiments, and creative releases — with honest status labels. Writing lives in the Books section (Amazon-live only)."
        />

        {loreloom && (
          <motion.article
            className="relative mb-8 overflow-hidden rounded-[1.75rem] border border-violet-400/25 bg-gradient-to-br from-violet-500/15 via-ink-900/80 to-cyan-500/10 p-6 shadow-glow-violet md:p-8"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl"
              aria-hidden
            />
            <div className="relative flex flex-wrap items-center gap-2">
              <span className="chip border-violet-300/40 bg-violet-400/15 text-violet-200">
                Featured · AI storytelling lab
              </span>
              <StatusBadge status={loreloom.status} label={loreloom.statusLabel} />
              {loreloom.domains.map((d) => (
                <span key={d} className="chip capitalize">
                  {d}
                </span>
              ))}
            </div>
            <h3 className="relative mt-4 font-display text-3xl text-white md:text-4xl">
              {loreloom.title}
            </h3>
            <p className="relative mt-1 text-sm text-violet-100/85">{loreloom.tagline}</p>
            <p className="relative mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
              {loreloom.description}
            </p>
            <p className="relative mt-3 text-xs text-amber-100/75">
              In active development — features and release timeline are not finalized. Shown here
              as the flagship AI writing experiment, not a shipped product.
            </p>
            <div className="relative mt-6 flex flex-wrap gap-3">
              <a
                className="btn-secondary !px-4 !py-2 text-xs"
                href={withBase(`/projects/${loreloom.id}/`)}
              >
                Details
              </a>
            </div>
          </motion.article>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {others.map((p, i) => (
            <motion.article
              key={p.id}
              className="glass card-hover flex flex-col rounded-3xl p-6 md:p-7"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={p.status} label={p.statusLabel} />
                {p.domains.map((d) => (
                  <span key={d} className="chip capitalize">
                    {d}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 font-display text-2xl text-white">{p.title}</h3>
              <p className="mt-1 text-sm text-cyan-200/80">{p.tagline}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
              {p.honestyNote && (
                <p className="mt-3 text-xs text-amber-200/80">{p.honestyNote}</p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  className="btn-secondary !px-4 !py-2 text-xs"
                  href={withBase(`/projects/${p.id}/`)}
                >
                  Details
                </a>
                {p.links?.map((l) => (
                  <a
                    key={l.href}
                    className="btn-secondary !px-4 !py-2 text-xs"
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
