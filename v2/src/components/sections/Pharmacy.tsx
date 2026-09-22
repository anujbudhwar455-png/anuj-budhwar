import { SectionHeading } from '@/components/SectionHeading';

export function Pharmacy() {
  return (
    <section id="pharmacy" className="section-pad scroll-mt-20">
      <div className="container-max grid gap-8 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          className="mb-0"
          eyebrow="Pharmacy & Healthcare"
          title="Clinical foundation, builder mindset"
          description="Pharm.D (PB) at NIMS, B.Pharm from Baba Mastnath University (Rohtak), and internship experience inform how I design learning tools and health-adjacent software."
        />
        <div className="glass rounded-3xl p-6 md:p-8">
          <ul className="space-y-4 text-sm text-slate-300">
            <li className="border-b border-white/5 pb-4">
              <strong className="text-white">Education</strong>
              <p className="mt-1 text-slate-400">
                B.Pharm — Baba Mastnath University, Rohtak · Pharm.D (PB) — NIMS
              </p>
            </li>
            <li className="border-b border-white/5 pb-4">
              <strong className="text-white">Practice</strong>
              <p className="mt-1 text-slate-400">Pharm.D Intern — patient-care oriented training</p>
            </li>
            <li>
              <strong className="text-white">Product crossover</strong>
              <p className="mt-1 text-slate-400">
                Pharmacy Study App (in development) — education-focused Android learning flows
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
