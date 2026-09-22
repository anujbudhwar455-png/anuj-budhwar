import { SectionHeading } from '@/components/SectionHeading';
import { siteConfig } from '@/data/siteConfig';

export function Contact() {
  return (
    <section id="contact" className="section-pad scroll-mt-20">
      <div className="container-max">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s connect"
          description="Public channels only — email, LinkedIn, GitHub, Spotify, and Instagram."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Email', value: siteConfig.email, href: siteConfig.links.email },
            { label: 'LinkedIn', value: 'anuj-budhwar', href: siteConfig.links.linkedin },
            { label: 'GitHub', value: siteConfig.githubUsername, href: siteConfig.links.github },
            { label: 'Spotify', value: 'Artist page', href: siteConfig.links.spotify },
            {
              label: 'Instagram',
              value: '@dranujbudhwar',
              href: siteConfig.links.instagram,
            },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={c.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="glass card-hover rounded-2xl p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">{c.label}</p>
              <p className="mt-2 font-display text-lg text-white">{c.value}</p>
            </a>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500">
          Phone number and physical address are not published on this site.
        </p>
      </div>
    </section>
  );
}
