import { SectionHeading } from '@/components/SectionHeading';
import { timeline } from '@/data/timeline';

export function Journey() {
  return (
    <section id="journey" className="section-pad scroll-mt-20">
      <div className="container-max">
        <SectionHeading
          eyebrow="Journey"
          title="Path so far"
          description="Education, publishing, music, and product building — a factual timeline."
        />
        <ol className="relative space-y-6 border-l border-white/10 pl-6 md:pl-8">
          {timeline.map((item) => (
            <li key={item.title} className="relative">
              <span className="absolute -left-[1.64rem] top-1.5 h-3 w-3 rounded-full border border-cyan-300/50 bg-cyan-400 shadow-glow md:-left-[2.15rem]" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
                {item.year}
              </p>
              <h3 className="mt-1 font-display text-xl text-white">{item.title}</h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">{item.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
