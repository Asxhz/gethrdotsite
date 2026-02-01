/**
 * Page 4: Waitlist CTA + Contact + LinkedIn. Bigger layout, more aura.
 */
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LINKS = [
  { label: 'Contact', href: 'mailto:hellogether@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gethrlink/' },
];

export default function Page4Waitlist({ onOpenWaitlist }) {
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        onOpenWaitlist();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOpenWaitlist]);

  return (
    <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Aura: grain */}
      <div className="aura-noise aura-noise-drift absolute inset-0 z-0 opacity-25" />

      {/* Layered glows – bigger, more presence */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmin] h-[80vmin] rounded-full bg-gold/8 blur-[100px] pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vmin] h-[55vmin] rounded-full bg-gold/12 blur-[70px] pointer-events-none aura-glow-breathe"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-8 w-full max-w-[95vw]">
        <motion.p
          className="text-white/40 font-mono text-[clamp(0.7rem,2.2vw,0.95rem)] uppercase tracking-[0.5em] mb-10 sm:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          no spam. one drop.
        </motion.p>

        {/* Primary: bigger Waitlist orb – scale with viewport */}
        <motion.button
          type="button"
          onClick={onOpenWaitlist}
          className="relative w-[min(72vw,320px)] h-[min(72vw,320px)] sm:w-[min(65vw,380px)] sm:h-[min(65vw,380px)] rounded-full bg-gold text-black flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black border border-white/10 shadow-[0_0_80px_-15px_rgba(244,208,63,0.4)]"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          aria-label="Join waitlist"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
            animate={reducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <span className="relative text-[clamp(1rem,3.5vw,1.5rem)] font-black uppercase tracking-[0.25em]">Waitlist</span>
        </motion.button>

        <motion.p
          className="mt-8 sm:mt-10 text-white/30 font-mono text-[clamp(0.65rem,2vw,0.9rem)] uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Enter or click
        </motion.p>

        {/* Contact + LinkedIn – bigger */}
        <motion.div
          className="mt-14 sm:mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {LINKS.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 px-7 py-4 sm:px-8 sm:py-5 rounded-2xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] hover:border-gold/40 text-white/70 hover:text-gold font-mono text-[clamp(0.8rem,2.2vw,1rem)] uppercase tracking-[0.3em] transition-all duration-300"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
