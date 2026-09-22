'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { songs, spotifyArtistUrl } from '@/data/songs';
import { withBase } from '@/lib/paths';

export function Music() {
  return (
    <section id="music" className="section-pad scroll-mt-20 relative overflow-hidden !pt-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(244,114,182,0.12), transparent 45%), radial-gradient(ellipse at 80% 40%, rgba(167,139,250,0.1), transparent 40%)',
        }}
      />
      <div className="container-max relative">
        <SectionHeading
          eyebrow="Singles"
          title="12 tracks on Spotify"
          description="Only tracks live on the Anuj Budhwar Spotify artist page. Open a song for cover, duration, and listen links — no invented lyrics."
        />
        <div className="mb-8 flex flex-wrap gap-3">
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
          {songs.map((song, i) => (
            <motion.a
              key={song.slug}
              href={withBase(`/music/${song.slug}/`)}
              className="glass card-hover group overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.03 * i }}
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
