import { SectionHeading } from '@/components/SectionHeading';
import { siteConfig } from '@/data/siteConfig';

export function GitHubSection() {
  return (
    <section id="github" className="section-pad scroll-mt-20 !pt-8">
      <div className="container-max">
        <div className="glass overflow-hidden rounded-[2rem] p-8 md:p-10">
          <SectionHeading
            className="mb-6"
            eyebrow="GitHub"
            title={`@${siteConfig.githubUsername}`}
            description="Open-source and public project work lives on GitHub. Explore repositories and experiment history there."
          />
          <a
            className="btn-primary"
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit GitHub profile
          </a>
        </div>
      </div>
    </section>
  );
}
