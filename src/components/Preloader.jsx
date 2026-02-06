import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const PHASE_A_MS = 600;
const PHASE_B_MS = 1600;
const PHASE_C_MS = 2600;
const REVEAL_MS = 300;
const TOTAL_MS = 2900;
const REDUCED_MOTION_MS = 500;

const LOADING_LABELS = ['Initializing', 'Calibrating', 'Syncing Vision'];
const GOLD = '#D4AF37';
const OBSIDIAN = '#030303';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [loadingLabelIndex, setLoadingLabelIndex] = useState(0);
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const timelineRef = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => { reducedMotion.current = mq.matches; };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion.current) {
      const t = setTimeout(() => onComplete(), REDUCED_MOTION_MS);
      return () => clearTimeout(t);
    }
    const t = [
      setTimeout(() => setPhase(1), PHASE_A_MS),
      setTimeout(() => setPhase(2), PHASE_B_MS),
      setTimeout(() => setLoadingLabelIndex(1), PHASE_B_MS + 200),
      setTimeout(() => setPhase(3), PHASE_C_MS),
      setTimeout(() => setLoadingLabelIndex(2), PHASE_C_MS + 300),
      setTimeout(onComplete, TOTAL_MS),
    ];
    timelineRef.current = t;
    return () => t.forEach((id) => clearTimeout(id));
  }, [onComplete]);

  if (reducedMotion.current) {
    return (
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: OBSIDIAN }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.p
          className="font-mono text-sm uppercase tracking-[0.4em] text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {LOADING_LABELS[0]}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: OBSIDIAN }}
      initial={false}
      animate={{
        clipPath: phase >= 3 ? 'inset(0 0 100% 0)' : 'inset(0 0 0 0)',
      }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{
        duration: phase >= 3 ? REVEAL_MS / 1000 : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="preloader-grain" />

      <div className="preloader-glow-center" style={{ opacity: phase >= 1 ? 1 : 0 }} />
      <div className="preloader-glow-edge" />

      <motion.div
        className="absolute left-0 right-0 h-[2px] z-10"
        style={{ backgroundColor: GOLD, top: '50%', transform: 'translateY(-50%)' }}
        initial={{ scaleX: 0, transformOrigin: 'center' }}
        animate={{ scaleX: phase >= 0 ? 1 : 0, transformOrigin: 'center' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />

      <motion.div
        className="relative flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase >= 1 ? 1 : 0,
          filter: phase >= 1 ? 'blur(0px)' : 'blur(12px)',
        }}
        transition={{
          opacity: { duration: 0.4, delay: 0 },
          filter: { duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <motion.h1
          className="text-8xl md:text-[10rem] font-black tracking-tighter"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: GOLD,
            textShadow: `0 0 20px ${GOLD}40, 0 0 40px ${GOLD}20`,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          gethr<span className="opacity-90">.</span>
        </motion.h1>
        <motion.h1
          className="absolute text-8xl md:text-[10rem] font-black tracking-tighter pointer-events-none select-none"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: 'transparent',
            WebkitTextStroke: `1px ${GOLD}40`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) translateX(2px)',
          }}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 0.35 : 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          gethr.
        </motion.h1>
      </motion.div>

      <motion.p
        className="mt-8 font-mono text-sm uppercase tracking-[0.5em] text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {LOADING_LABELS[loadingLabelIndex]}
      </motion.p>

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            backgroundColor: `${GOLD}30`,
            left: `${20 + i * 30}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: phase >= 1 ? 0.4 : 0,
            x: [0, 8, 0],
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.3 + i * 0.1 },
            x: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}
    </motion.div>
  );
}
