import { SectionHeading } from '@/components/SectionHeading';
import { labItems } from '@/data/lab';

export function Lab() {
  return (
    <section id="lab" className="section-pad scroll-mt-20">
      <div className="container-max">
        <SectionHeading
          eyebrow="The Lab"
          title="Experiments & systems"
          description="A workspace for prototypes, pipelines, and ideas that may become products — or stay as learning."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {labItems.map((item) => (
            <article key={item.id} className="glass card-hover rounded-3xl p-6">
              <p className="chip">{item.status}</p>
              <h3 className="mt-4 font-display text-xl text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
