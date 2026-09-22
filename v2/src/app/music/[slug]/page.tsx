import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { songs } from '@/data/songs';
import { withBase } from '@/lib/paths';

export function generateStaticParams() {
  return songs.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = songs.find((x) => x.slug === params.slug);
  if (!s) return { title: 'Song' };
  return {
    title: s.title,
    description: `${s.title} — ${s.year} single by Anuj Budhwar (${s.duration})`,
  };
}

export default function SongPage({ params }: { params: { slug: string } }) {
  const song = songs.find((x) => x.slug === params.slug);
  if (!song) notFound();

  return (
    <article className="section-pad pt-28">
      <div className="container-max max-w-4xl">
        <a href={withBase('/music/')} className="text-sm text-cyan-300 hover:underline">
          ← Back to music
        </a>
        <div className="mt-8 grid gap-8 md:grid-cols-[280px_1fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-glow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase(song.cover)}
              alt={`${song.title} cover art`}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div>
            <p className="chip">
              {song.type} · {song.year} · {song.duration}
            </p>
            <h1 className="heading-display mt-4 text-4xl md:text-5xl">{song.title}</h1>
            <p className="mt-3 text-slate-400">Anuj Budhwar</p>
            <a
              className="btn-primary mt-8"
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen on Spotify
            </a>
          </div>
        </div>

        <section className="mt-14 glass rounded-3xl p-6 md:p-8">
          <h2 className="font-display text-2xl text-white">Lyrics</h2>
          {song.lyrics ? (
            <pre className="mt-4 whitespace-pre-wrap font-body text-sm leading-relaxed text-slate-300">
              {song.lyrics}
            </pre>
          ) : (
            <div className="mt-4">
              <p className="text-slate-400">Lyrics not published yet.</p>
              <a
                className="btn-secondary mt-4 inline-flex"
                href={song.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen on Spotify
              </a>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
