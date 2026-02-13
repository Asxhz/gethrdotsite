import { useEffect } from 'react';
import { motion } from 'framer-motion';
import TiltedCard from '../TiltedCard';

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

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-8 w-full max-w-[95vw]">
        <motion.p
          className="text-white/25 font-mono text-[clamp(0.55rem,1.8vw,0.75rem)] uppercase tracking-[0.6em] mb-10 sm:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          no spam. one drop.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(16px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        >
          <TiltedCard
            containerHeight="min(72vw, 340px)"
            containerWidth="min(72vw, 340px)"
            cardHeight="100%"
            cardWidth="100%"
            scaleOnHover={1.08}
            rotateAmplitude={12}
            onClick={onOpenWaitlist}
          >
            <div
              className="w-full h-full rounded-full bg-gold flex items-center justify-center border border-white/10 relative overflow-hidden"
              style={{
                boxShadow: '0 0 80px -15px rgba(244,208,63,0.4), 0 0 160px -40px rgba(244,208,63,0.15)',
              }}
            >
              {!reducedMotion && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 to-transparent pointer-events-none"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              )}

              {!reducedMotion && [0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-gold/20 pointer-events-none"
                  animate={{
                    scale: [1, 1.3 + i * 0.15],
                    opacity: [0.3, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: 'easeOut',
                  }}
                />
              ))}

              <span
                className="relative text-[clamp(1rem,3.5vw,1.5rem)] font-black uppercase tracking-[0.25em] text-black z-10"
                aria-label="Join waitlist"
              >
                Waitlist
              </span>
            </div>
          </TiltedCard>
        </motion.div>

        <motion.p
          className="mt-6 sm:mt-8 text-white/20 font-mono text-[clamp(0.55rem,1.6vw,0.75rem)] uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Enter or click
        </motion.p>

        <motion.div
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-5 sm:gap-8"
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
              className="flex items-center gap-3 px-6 py-3 sm:px-7 sm:py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-gold/30 text-white/50 hover:text-gold font-mono text-[clamp(0.7rem,1.8vw,0.85rem)] uppercase tracking-[0.3em] transition-all duration-300"
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
