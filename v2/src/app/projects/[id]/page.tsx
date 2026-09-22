import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProject, projects } from '@/data/projects';
import { StatusBadge } from '@/components/StatusBadge';
import { withBase } from '@/lib/paths';

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = getProject(params.id);
  if (!p) return { title: 'Project' };
  return {
    title: p.title,
    description: p.tagline,
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const p = getProject(params.id);
  if (!p) notFound();

  return (
    <article className="section-pad pt-28">
      <div className="container-max max-w-3xl">
        <a href={withBase('/work/')} className="text-sm text-cyan-300 hover:underline">
          ← Back to work
        </a>
        <div className="mt-6 flex flex-wrap gap-2">
          <StatusBadge status={p.status} label={p.statusLabel} />
          {p.domains.map((d) => (
            <span key={d} className="chip capitalize">
              {d}
            </span>
          ))}
        </div>
        <h1 className="heading-display mt-4 text-4xl md:text-5xl">{p.title}</h1>
        <p className="mt-3 text-lg text-cyan-200/80">{p.tagline}</p>
        <p className="mt-6 text-base leading-relaxed text-slate-300">{p.description}</p>
        {p.honestyNote && (
          <p className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-amber-100/90">
            {p.honestyNote}
          </p>
        )}
        {p.links && p.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
