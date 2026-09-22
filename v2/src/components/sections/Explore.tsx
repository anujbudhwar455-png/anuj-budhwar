import { SectionHeading } from '@/components/SectionHeading';
import { withBase } from '@/lib/paths';

const links = [
  {
    label: 'About',
    href: '/about/',
    blurb: 'Bio, pharmacy & healthcare foundation, education.',
  },
  {
    label: 'Work',
    href: '/work/',
    blurb: 'Apps, products, and what I’m building now.',
  },
  {
    label: 'Lab',
    href: '/lab/',
    blurb: 'Experiments, prototypes, and systems in progress.',
  },
  {
    label: 'Writing',
    href: '/writing/',
    blurb: 'Amazon-live book series and volumes.',
  },
  {
    label: 'Music',
    href: '/music/',
    blurb: 'Original singles on Spotify.',
  },
  {
    label: 'Connect',
    href: '/connect/',
    blurb: 'Email, socials, and GitHub.',
  },
] as const;

export function Explore() {
  return (
    <section id="explore" className="section-pad scroll-mt-20 !pt-8">
      <div className="container-max">
        <SectionHeading
          eyebrow="Explore"
          title="Go deeper"
          description="This homepage is about who I am. Catalogs and tools live on dedicated pages."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((item, i) => (
            <a
              key={item.href}
              href={withBase(item.href)}
              className="glass card-hover group rounded-3xl p-6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl text-white group-hover:text-cyan-200">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.blurb}</p>
              <p className="mt-4 text-xs text-cyan-300/90">Open →</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
