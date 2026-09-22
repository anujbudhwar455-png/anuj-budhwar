import { SectionHeading } from '@/components/SectionHeading';
import { siteConfig } from '@/data/siteConfig';

export function About() {
  return (
    <section id="about" className="section-pad scroll-mt-20">
      <div className="container-max">
        <SectionHeading
          eyebrow="Identity"
          title="About Anuj"
          description="A Pharm.D student and builder working at the intersection of healthcare, AI, product software, writing, and music."
        />
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="glass card-hover rounded-3xl p-6 lg:col-span-3 md:p-8">
            <p className="text-base leading-relaxed text-slate-300 md:text-lg">
              I&apos;m <strong className="text-white">Anuj Budhwar</strong> from{' '}
              <strong className="text-white">Rohtak, Haryana, India</strong>. I hold a B.Pharm from
              Baba Mastnath University and I&apos;m pursuing Pharm.D (PB) at NIMS, with internship
              experience in pharmacy practice.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              Alongside clinical training, I build AI-assisted products, Android utilities, publish
              fiction and non-fiction on Amazon, and release original music on Spotify. This
              portfolio is the public map of that work — honest status, no inflated claims.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {siteConfig.roles.map((role) => (
              <li key={role} className="glass rounded-2xl px-4 py-3 text-sm text-slate-200">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
