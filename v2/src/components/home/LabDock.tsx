'use client';

import { withBase } from '@/lib/paths';

export const LAB_DESTINATIONS = [
  { label: 'About', href: '/about/', subtitle: 'Identity', short: 'AB' },
  { label: 'Work', href: '/work/', subtitle: 'Products', short: 'WK' },
  { label: 'Lab', href: '/lab/', subtitle: 'Experiments', short: 'LB' },
  { label: 'Writing', href: '/writing/', subtitle: 'Archive', short: 'WR' },
  { label: 'Music', href: '/music/', subtitle: 'Listening', short: 'MU' },
  { label: 'Connect', href: '/connect/', subtitle: 'Channels', short: 'CN' },
] as const;

/** Fixed bottom dock for touch / narrow viewports — large tap targets. */
export function LabDock() {
  return (
    <nav
      aria-label="Lab destinations"
      className="pointer-events-auto fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#05070f]/92 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-6 gap-0.5 px-1.5">
        {LAB_DESTINATIONS.map((d) => (
          <li key={d.href}>
            <a
              href={withBase(d.href)}
              className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-xl px-0.5 py-2 text-center active:bg-white/10"
              title={d.subtitle}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-[9px] font-bold tracking-wide text-cyan-200">
                {d.short}
              </span>
              <span className="text-[10px] font-medium leading-tight text-slate-200">{d.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
