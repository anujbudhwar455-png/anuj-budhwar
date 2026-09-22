'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function LoadingIntro() {
  const [show, setShow] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const t = setTimeout(() => setShow(false), mq.matches ? 200 : 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.55 }}
          aria-hidden={!show}
        >
          <div className="text-center">
            <motion.div
              className="mx-auto mb-6 h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400/90 via-violet-400/90 to-fuchsia-400/80 opacity-90 shadow-glow"
              initial={{ scale: 0.55, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55 }}
            />
            <motion.p
              className="font-display text-sm tracking-[0.4em] text-slate-200 uppercase"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              Anuj Budhwar
            </motion.p>
            <motion.p
              className="mt-2 text-xs tracking-[0.22em] text-cyan-300/80 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Healthcare × AI × Creativity
            </motion.p>
            <motion.div
              className="mx-auto mt-6 h-[2px] w-24 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-violet-400"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: reduced ? 0.1 : 1.2, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
