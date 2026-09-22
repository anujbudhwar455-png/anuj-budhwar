import { SectionHeading } from '@/components/SectionHeading';
import { bookSeries } from '@/data/books';
import { featuredWritingSeriesIds } from '@/data/projects';
import { withBase } from '@/lib/paths';
import { siteConfig } from '@/data/siteConfig';

export function Writing() {
  const featured = bookSeries.filter((s) =>
    (featuredWritingSeriesIds as readonly string[]).includes(s.id)
  );
  const rest = bookSeries.filter(
    (s) => !(featuredWritingSeriesIds as readonly string[]).includes(s.id)
  );

  return (
    <section id="writing" className="section-pad scroll-mt-20">
      <div className="container-max">
        <SectionHeading
          eyebrow="Writing & Books"
          title="Amazon-live series & volumes"
          description="Only titles verified live on Amazon from the catalog. Explore series pages for covers, blurbs, and volume links."
        />

        <div className="mb-6 flex flex-wrap gap-3">
          <a
            className="btn-secondary !py-2 text-xs"
            href={siteConfig.links.instagramWriting}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram writing
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => {
            const cover = s.volumes[0]?.cover;
            return (
              <a
                key={s.id}
                href={withBase(`/books/${s.id}/`)}
                className="glass card-hover group overflow-hidden rounded-3xl"
              >
                <div className="aspect-[3/4] overflow-hidden bg-ink-800">
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={withBase(cover)}
                      alt={`${s.name} cover`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-500">No cover</div>
                  )}
                </div>
                <div className="p-5">
                  <p className="chip">{s.volumeCount} volume{s.volumeCount === 1 ? '' : 's'}</p>
                  <h3 className="mt-3 font-display text-xl text-white">{s.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-400">{s.blurb}</p>
                </div>
              </a>
            );
          })}
        </div>

        {rest.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-4 font-display text-lg text-slate-200">More series on Amazon</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((s) => (
                <a
                  key={s.id}
                  href={withBase(`/books/${s.id}/`)}
                  className="glass card-hover flex items-center gap-3 rounded-2xl p-3"
                >
                  {s.volumes[0]?.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={withBase(s.volumes[0].cover)}
                      alt=""
                      className="h-14 w-10 rounded object-cover"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-white">{s.name}</p>
                    <p className="text-xs text-slate-500">
                      {s.volumeCount} volume{s.volumeCount === 1 ? '' : 's'}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
