import { SectionHeading } from '@/components/SectionHeading';
import { songs, spotifyArtistUrl } from '@/data/songs';
import { withBase } from '@/lib/paths';

export function Music() {
  return (
    <section id="music" className="section-pad scroll-mt-20">
      <div className="container-max">
        <SectionHeading
          eyebrow="Music"
          title="12 singles on Spotify"
          description="Only tracks live on the Anuj Budhwar Spotify artist page. Open a song for cover, duration, and listen links."
        />
        <div className="mb-8">
          <a
            className="btn-primary"
            href={spotifyArtistUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Spotify artist
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {songs.map((song) => (
            <a
              key={song.slug}
              href={withBase(`/music/${song.slug}/`)}
              className="glass card-hover group overflow-hidden rounded-2xl"
            >
              <div className="aspect-square overflow-hidden bg-ink-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBase(song.cover)}
                  alt={`${song.title} cover art`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-base text-white">{song.title}</h3>
                <p className="mt-1 text-xs text-slate-400">
                  {song.year} · {song.duration} · {song.type}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
