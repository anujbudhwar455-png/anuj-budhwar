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
          transition={{ duration: reduced ? 0.15 : 0.5 }}
          aria-hidden={!show}
        >
          <div className="text-center">
            <motion.div
              className="mx-auto mb-6 h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 via-violet-400 to-fuchsia-400 opacity-90 shadow-glow"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.p
              className="font-display text-sm tracking-[0.35em] text-slate-300 uppercase"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Anuj Budhwar
            </motion.p>
            <motion.p
              className="mt-2 text-xs text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Healthcare × AI × Creativity
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
