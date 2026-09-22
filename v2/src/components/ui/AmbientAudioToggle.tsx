'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/** Procedural ambient bed — muted by default, never autoplays unmuted. */
export function AmbientAudioToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    return () => {
      oscsRef.current.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* noop */
        }
      });
      oscsRef.current = [];
      void ctxRef.current?.close();
      ctxRef.current = null;
      gainRef.current = null;
    };
  }, []);

  const toggle = async () => {
    if (on) {
      const ctx = ctxRef.current;
      const gain = gainRef.current;
      if (ctx && gain) {
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      }
      setTimeout(() => {
        oscsRef.current.forEach((o) => {
          try {
            o.stop();
          } catch {
            /* noop */
          }
        });
        oscsRef.current = [];
        gainRef.current = null;
      }, 400);
      setOn(false);
      return;
    }

    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    if (ctx.state === 'suspended') await ctx.resume();

    const gain = ctx.createGain();
    gain.gain.value = 0.0001;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 280;
    filter.connect(gain);

    const makeOsc = (type: OscillatorType, freq: number) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      osc.connect(filter);
      osc.start();
      return osc;
    };

    const o1 = makeOsc('sine', 78);
    const o2 = makeOsc('triangle', 104);
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 14;
    lfo.connect(lfoGain);
    lfoGain.connect(o1.frequency);
    lfo.start();

    oscsRef.current = [o1, o2, lfo];
    gain.gain.exponentialRampToValueAtTime(0.016, ctx.currentTime + 1.1);
    setOn(true);
  };

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      className="glass flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-medium text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
      aria-pressed={on}
      aria-label={on ? 'Mute ambient audio' : 'Enable ambient audio (muted by default)'}
      title="Ambient audio — off by default"
    >
      {on ? <Volume2 size={14} /> : <VolumeX size={14} />}
      <span className="hidden sm:inline">{on ? 'Ambient on' : 'Ambient'}</span>
    </button>
  );
}
