import { SectionHeading } from '@/components/SectionHeading';
import { StatusBadge } from '@/components/StatusBadge';
import { projects } from '@/data/projects';
import { withBase } from '@/lib/paths';

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section id="work" className="section-pad scroll-mt-20">
      <div className="container-max">
        <SectionHeading
          eyebrow="Featured"
          title="Projects & products"
          description="Apps, experiments, and creative releases — with honest status labels. Writing lives in the Books section (Amazon-live only)."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((p) => (
            <article key={p.id} className="glass card-hover flex flex-col rounded-3xl p-6 md:p-7">
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
                <a className="btn-secondary !px-4 !py-2 text-xs" href={withBase(`/projects/${p.id}/`)}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
