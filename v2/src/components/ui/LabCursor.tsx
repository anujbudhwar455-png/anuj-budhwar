'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/** Subtle custom cursor for desktop lab — disabled on touch via parent. */
export function LabCursor({ active }: { active: boolean }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.body.classList.add('lab-cursor-hide-native');

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('lab-cursor-hide-native');
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[90] hidden mix-blend-difference md:block"
      style={{ left: pos.x, top: pos.y }}
      animate={{
        width: active ? 56 : 18,
        height: active ? 56 : 18,
        x: active ? -28 : -9,
        y: active ? -28 : -9,
      }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
    >
      <div
        className={`flex h-full w-full items-center justify-center rounded-full border ${
          active
            ? 'border-cyan-300/80 bg-cyan-300/10 text-[9px] font-semibold tracking-[0.2em] text-cyan-200'
            : 'border-white/50 bg-white/20'
        }`}
      >
        {active ? 'VIEW' : null}
      </div>
    </motion.div>
  );
}
