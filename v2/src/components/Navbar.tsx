'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { withBase } from '@/lib/paths';
import { cn } from '@/lib/cn';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open ? 'glass-strong' : 'bg-transparent'
      )}
    >
      <nav className="container-max flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <a
          href={withBase('/')}
          className="font-display text-sm font-semibold tracking-wide text-white"
          title="Back to Digital Lab"
        >
          Anuj<span className="text-cyan-300">.</span>
          <span className="ml-2 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/70 sm:inline">
            Lab
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <a
                href={withBase(item.href)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm text-slate-300 transition hover:text-white',
                  'badge' in item && item.badge && 'inline-flex items-center gap-1.5'
                )}
              >
                {'badge' in item && item.badge && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                  </span>
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-full border border-white/10 p-2 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-16 z-40 flex flex-col bg-ink-950/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-2 px-6 pb-16">
              {siteConfig.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={withBase(item.href)}
                    className="flex items-center gap-3 border-b border-white/5 py-4 text-2xl font-display text-white"
                    onClick={() => setOpen(false)}
                  >
                    {'badge' in item && item.badge && (
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-glow" />
                    )}
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
