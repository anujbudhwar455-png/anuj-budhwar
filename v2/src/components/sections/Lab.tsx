'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { BackToLab } from '@/components/ui/BackToLab';
import { labItems } from '@/data/lab';

const STATUS_TONE: Record<string, string> = {
  'Active experiment': 'border-cyan-400/35 bg-cyan-400/10 text-cyan-200',
  'In development': 'border-violet-400/35 bg-violet-400/10 text-violet-200',
  'Mixed maturity': 'border-teal-400/35 bg-teal-400/10 text-teal-200',
  'Concept only': 'border-amber-400/35 bg-amber-400/10 text-amber-200',
  Ongoing: 'border-fuchsia-400/35 bg-fuchsia-400/10 text-fuchsia-200',
  'Shipped / iterating': 'border-emerald-400/35 bg-emerald-400/10 text-emerald-200',
};

export function Lab() {
  const building = labItems.filter((i) =>
    ['Active experiment', 'In development', 'Ongoing', 'Mixed maturity'].includes(i.status)
  );
  const ideas = labItems.filter((i) => i.status === 'Concept only');
  const shipped = labItems.filter((i) => i.status === 'Shipped / iterating');

  const groups = [
    { title: 'Currently building', items: building },
    { title: 'Experiments & ideas', items: ideas },
    { title: 'Shipped systems', items: shipped },
  ];

  return (
    <section id="lab" className="section-pad scroll-mt-20">
      <div className="container-max">
        <BackToLab className="mb-8" />
        <SectionHeading
          eyebrow="The Lab"
          title="Experiments & systems"
          description="A workspace for prototypes, pipelines, and ideas that may become products — or stay as learning. Status badges reflect real maturity only."
        />

        <div className="space-y-10">
          {groups.map(
            (g) =>
              g.items.length > 0 && (
                <div key={g.title}>
                  <h3 className="mb-4 font-display text-lg text-slate-200">{g.title}</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((item, i) => (
                      <motion.article
                        key={item.id}
                        className="glass card-hover rounded-3xl p-6"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.04 * i }}
                      >
                        <p
                          className={`chip ${STATUS_TONE[item.status] ?? 'border-white/15 bg-white/5 text-slate-300'}`}
                        >
                          {item.status}
                        </p>
                        <h3 className="mt-4 font-display text-xl text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          {item.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((t) => (
                            <span key={t} className="chip">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}
