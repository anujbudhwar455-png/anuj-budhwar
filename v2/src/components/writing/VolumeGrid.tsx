'use client';

import { useMemo, useState } from 'react';
import { withBase } from '@/lib/paths';

export type VolumeItem = {
  num: number;
  title: string;
  url?: string;
  cover?: string | null;
};

const PAGE_SIZE = 12;

export function VolumeGrid({ volumes }: { volumes: VolumeItem[] }) {
  const [visible, setVisible] = useState(Math.min(PAGE_SIZE, volumes.length));
  const shown = useMemo(() => volumes.slice(0, visible), [volumes, visible]);
  const remaining = volumes.length - visible;

  return (
    <div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((v) => (
          <a
            key={v.num}
            href={v.url || '#'}
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
                  width={240}
                  height={320}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
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

      {remaining > 0 && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            type="button"
            className="btn-secondary !px-6 !py-2.5 text-sm"
            onClick={() => setVisible((n) => Math.min(n + PAGE_SIZE, volumes.length))}
          >
            Load more · {Math.min(PAGE_SIZE, remaining)} of {remaining} remaining
          </button>
          <p className="text-[11px] text-slate-500">
            Showing {visible} of {volumes.length} volumes
          </p>
        </div>
      )}
    </div>
  );
}
