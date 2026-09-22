'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { StatusBadge } from '@/components/StatusBadge';
import { projects } from '@/data/projects';
import { withBase } from '@/lib/paths';

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  const loreloom = featured.find((p) => p.id === 'loreloom');
  const others = featured.filter((p) => p.id !== 'loreloom');
  const reduced = useReducedMotion();

  return (
    <section id="work" className="section-pad scroll-mt-20 !pt-6">
      <div className="container-max">
        <SectionHeading
          eyebrow="Featured"
          title="Projects & products"
          description="Apps, experiments, and creative releases — with honest status labels. Writing lives in the Books section (Amazon-live only)."
        />

        {loreloom && (
          <motion.article
            className="relative mb-10 overflow-hidden rounded-[2rem] border border-violet-400/30 bg-gradient-to-br from-violet-500/20 via-ink-900/90 to-cyan-500/10 p-6 shadow-glow-violet md:p-10"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Cinematic storytelling panel backdrop */}
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-400/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              aria-hidden
              style={{
                backgroundImage:
                  'linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at 70% 40%, black, transparent 75%)',
              }}
            />

            <div className="relative grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip border-violet-300/45 bg-violet-400/20 text-violet-100">
                    Flagship · AI storytelling lab
                  </span>
                  <StatusBadge status={loreloom.status} label={loreloom.statusLabel} />
                  {loreloom.domains.map((d) => (
                    <span key={d} className="chip capitalize">
                      {d}
                    </span>
                  ))}
                </div>
                <h3 className="relative mt-5 font-display text-4xl text-white md:text-5xl">
                  {loreloom.title}
                </h3>
                <p className="relative mt-2 text-base text-violet-100/90 md:text-lg">
                  {loreloom.tagline}
                </p>
                <p className="relative mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-[15px]">
                  {loreloom.description}
                </p>
                <p className="relative mt-4 text-xs leading-relaxed text-amber-100/80">
                  In active development — features and release timeline are not finalized. Shown
                  here as the flagship AI writing experiment, not a shipped product. No public
                  demo URL yet.
                </p>
                <div className="relative mt-7 flex flex-wrap gap-3">
                  <a
                    className="btn-primary !px-5 !py-2.5 text-xs"
                    href={withBase(`/projects/${loreloom.id}/`)}
                  >
                    Open project dossier
                  </a>
                </div>
              </div>

              {/* Abstract “story loom” visual — no fake UI / users */}
              <div
                className="relative mx-auto flex aspect-[4/5] w-full max-w-xs flex-col justify-between overflow-hidden rounded-3xl border border-violet-300/25 bg-ink-950/60 p-5 backdrop-blur-md"
                aria-hidden
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-300/80">
                    Storytelling lab
                  </p>
                  <p className="mt-3 font-display text-2xl text-white">Long-form fiction</p>
                  <p className="mt-1 text-xs text-slate-400">Worldbuilding workflows</p>
                </div>
                <div className="space-y-2">
                  {['Premise threads', 'Character arcs', 'Continuity checks'].map((row, i) => (
                    <div
                      key={row}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-violet-300"
                        style={{ opacity: 0.5 + i * 0.2 }}
                      />
                      <span className="text-[11px] text-slate-300">{row}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  Status · {loreloom.statusLabel}
                </p>
              </div>
            </div>
          </motion.article>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {others.map((p, i) => (
            <motion.article
              key={p.id}
              className="glass card-hover flex flex-col rounded-3xl p-6 md:p-7"
              initial={reduced ? false : { opacity: 0, y: 12 }}
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
