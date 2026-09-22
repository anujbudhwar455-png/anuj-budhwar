import { SectionHeading } from '@/components/SectionHeading';
import { withBase } from '@/lib/paths';

const items = [
  {
    title: 'Loreloom',
    detail: 'AI writing companion for long-form fiction — in development.',
    href: '/projects/loreloom/',
  },
  {
    title: 'PDF Merger',
    detail: 'Android PDF utility — closed testing on Google Play.',
    href: '/projects/pdf-merger/',
  },
  {
    title: 'GFX Booster',
    detail: 'Android gaming utility experiment — early development.',
    href: '/projects/gfx-booster/',
  },
  {
    title: 'Desrein',
    detail: 'Experimental Web3/simulation concept — not a crypto product.',
    href: '/projects/desrein/',
  },
];

export function AISoftware() {
  return (
    <section id="ai" className="section-pad scroll-mt-20 !pt-8">
      <div className="container-max">
        <SectionHeading
          eyebrow="AI & Software"
          title="Tools that turn ideas into prototypes"
          description="From AI writing pipelines to Android utilities — shipping carefully labeled work."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <a key={item.title} href={withBase(item.href)} className="glass card-hover rounded-2xl p-5">
              <h3 className="font-display text-xl text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
