'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/**
 * Subtle easter eggs: Konami → mini diagnostic; type "lab" → hidden quote.
 */
export function EasterEggs() {
  const [terminal, setTerminal] = useState(false);
  const [quote, setQuote] = useState(false);
  const buffer = useRef<string[]>([]);
  const chord = useRef('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Konami
      buffer.current = [...buffer.current, e.key].slice(-KONAMI.length);
      if (buffer.current.join(',') === KONAMI.join(',')) {
        setTerminal(true);
        buffer.current = [];
      }

      // "lab" chord (letters only, resets on non-letter after 1.2s)
      if (/^[a-zA-Z]$/.test(e.key)) {
        chord.current = (chord.current + e.key.toLowerCase()).slice(-3);
        if (chord.current === 'lab') {
          setQuote(true);
          chord.current = '';
          setTimeout(() => setQuote(false), 4200);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <AnimatePresence>
        {terminal && (
          <motion.div
            className="fixed bottom-4 left-4 z-[80] w-[min(92vw,340px)] rounded-2xl border border-cyan-400/30 bg-ink-950/95 p-4 font-mono text-[11px] text-cyan-100 shadow-glow backdrop-blur-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            role="status"
          >
            <div className="mb-2 flex items-center justify-between text-cyan-300">
              <span>lab://diagnostic</span>
              <button
                type="button"
                className="text-slate-400 hover:text-white"
                onClick={() => setTerminal(false)}
                aria-label="Close diagnostic"
              >
                ×
              </button>
            </div>
            <p className="text-slate-400">status: online</p>
            <p className="text-slate-400">owner: Anuj Budhwar · Rohtak</p>
            <p className="text-slate-400">stack: healthcare × ai × creativity</p>
            <p className="mt-2 text-cyan-200/90">No secrets here — just curiosity rewarded.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {quote && (
          <motion.div
            className="fixed left-1/2 top-24 z-[80] w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border border-violet-400/25 bg-ink-950/90 px-5 py-4 text-center shadow-glow-violet backdrop-blur-xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-violet-300/80">Hidden note</p>
            <p className="mt-2 text-sm text-slate-200">
              “Build quietly. Ship honestly. Let the work speak.”
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
