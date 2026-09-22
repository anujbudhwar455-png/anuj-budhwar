import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { bookSeries, getSeries } from '@/data/books';
import { withBase } from '@/lib/paths';
import { BackToLab } from '@/components/ui/BackToLab';
import { VolumeGrid } from '@/components/writing/VolumeGrid';

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
        <div className="flex flex-wrap items-center gap-3">
          <BackToLab />
          <a href={withBase('/writing/')} className="text-sm text-cyan-300 hover:underline">
            ← Writing archive
          </a>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800">
            {hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={withBase(hero)}
                alt={`${s.name} cover`}
                width={240}
                height={320}
                className="aspect-[3/4] w-full object-cover"
                decoding="async"
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
        <VolumeGrid volumes={s.volumes} />
      </div>
    </article>
  );
}
