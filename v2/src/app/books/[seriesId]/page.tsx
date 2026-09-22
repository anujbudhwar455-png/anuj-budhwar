import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { bookSeries, getSeries } from '@/data/books';
import { withBase } from '@/lib/paths';

export function generateStaticParams() {
  return bookSeries.map((s) => ({ seriesId: s.id }));
}

export function generateMetadata({ params }: { params: { seriesId: string } }): Metadata {
  const s = getSeries(params.seriesId);
  if (!s) return { title: 'Book series' };
  return {
    title: s.name,
    description: s.blurb.slice(0, 160),
  };
}

export default function BookSeriesPage({ params }: { params: { seriesId: string } }) {
  const s = getSeries(params.seriesId);
  if (!s) notFound();
  const hero = s.volumes[0]?.cover;

  return (
    <article className="section-pad pt-28">
      <div className="container-max">
        <a href={withBase('/writing/')} className="text-sm text-cyan-300 hover:underline">
          ← Back to writing
        </a>
        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800">
            {hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={withBase(hero)}
                alt={`${s.name} cover`}
                className="aspect-[3/4] w-full object-cover"
              />
            ) : null}
          </div>
          <div>
            <p className="chip">
              {s.volumeCount} volume{s.volumeCount === 1 ? '' : 's'} · Amazon
            </p>
            <h1 className="heading-display mt-4 text-4xl md:text-5xl">{s.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{s.blurb}</p>
          </div>
        </div>

        <h2 className="heading-display mt-14 text-2xl">Volumes</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {s.volumes.map((v) => (
            <a
              key={v.num}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass card-hover overflow-hidden rounded-2xl"
            >
              <div className="aspect-[3/4] bg-ink-800">
                {v.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={withBase(v.cover)}
                    alt={v.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="p-3">
                <p className="text-xs text-cyan-300">Vol. {v.num}</p>
                <p className="mt-1 line-clamp-2 text-sm text-white">{v.title}</p>
                <p className="mt-2 text-xs text-slate-500">View on Amazon →</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
