import { SectionHeading } from '@/components/SectionHeading';
import { skillGroups } from '@/data/skills';

export function Skills() {
  return (
    <section id="skills" className="section-pad scroll-mt-20 !pt-8">
      <div className="container-max">
        <SectionHeading
          eyebrow="Skills"
          title="Capabilities across domains"
          description="A practical stack — not a buzzword wall."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.title} className="glass rounded-3xl p-6">
              <h3 className="font-display text-xl text-white">{g.title}</h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
