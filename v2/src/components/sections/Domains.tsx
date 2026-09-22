import { SectionHeading } from '@/components/SectionHeading';
import { domains } from '@/data/skills';
import { withBase } from '@/lib/paths';

export function Domains() {
  return (
    <section id="domains" className="section-pad scroll-mt-20 !pt-8">
      <div className="container-max">
        <SectionHeading
          eyebrow="What I Build"
          title="Four domains. One builder."
          description="Healthcare grounding, AI/software craft, published writing, and original music — connected, not siloed."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {domains.map((d, i) => (
            <a
              key={d.id}
              href={withBase(d.href)}
              className="glass card-hover group rounded-3xl p-6 md:p-8"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl text-white group-hover:text-cyan-200">
                {d.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{d.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
