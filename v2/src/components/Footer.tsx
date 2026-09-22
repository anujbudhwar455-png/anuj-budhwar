'use client';

import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/siteConfig';
import { withBase } from '@/lib/paths';

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

  if (isHome) return null;

  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-ink-950/80">
      <div className="container-max section-pad !py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg text-white">Anuj Budhwar</p>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Pharm.D student · AI builder · writer · music creator — from Rohtak, Haryana, India.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              {siteConfig.nav.map((item) => (
                <a key={item.href} className="hover:text-cyan-300" href={withBase(item.href)}>
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <a
                className="hover:text-cyan-300"
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="hover:text-cyan-300"
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="hover:text-cyan-300"
                href={siteConfig.links.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                Spotify
              </a>
              <a
                className="hover:text-cyan-300"
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a className="hover:text-cyan-300" href={siteConfig.links.email}>
                Email
              </a>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-slate-500">
          © {year} Anuj Budhwar. Built with care in Rohtak.
        </p>
      </div>
    </footer>
  );
}
