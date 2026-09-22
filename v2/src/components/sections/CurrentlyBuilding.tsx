import { SectionHeading } from '@/components/SectionHeading';
import { projects } from '@/data/projects';
import { withBase } from '@/lib/paths';

export function CurrentlyBuilding() {
  const building = projects.filter((p) => p.currentlyBuilding);
  return (
    <section id="building" className="section-pad scroll-mt-20 !pt-4">
      <div className="container-max">
        <SectionHeading
          eyebrow="● Building"
          title="Currently in motion"
          description="Active development tracks — not finished products unless labeled otherwise."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {building.map((p) => (
            <a
              key={p.id}
              href={withBase(`/projects/${p.id}/`)}
              className="glass card-hover rounded-2xl p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                <span className="text-xs text-cyan-300">{p.statusLabel}</span>
              </div>
              <h3 className="font-display text-xl text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{p.tagline}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
