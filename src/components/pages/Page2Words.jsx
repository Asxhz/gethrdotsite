import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import VariableProximity from '../VariableProximity';
import StarsBackground from '../StarsBackground';

export default function Page2Words({ onContinue }) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center overflow-hidden">

      <StarsBackground
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
        starColor="rgba(212,175,55,0.7)"
        speed={60}
        factor={0.03}
        pointerEvents={false}
      />

      <div
        ref={containerRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-8 sm:px-12 md:px-20"
        style={{ position: 'relative' }}
      >
        <motion.div
          className="max-w-[900px] text-center leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <VariableProximity
            label="Combine payments. Pay with anything you hold, anywhere in the world."
            className="text-[clamp(2rem,6vw,4.5rem)] text-white/90 leading-[1.1] tracking-[-0.02em]"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={150}
            falloff="linear"
          />
        </motion.div>

        <div className="h-[8vh] sm:h-[10vh]" />

        {onContinue && (
          <motion.button
            type="button"
            onClick={onContinue}
            className="flex flex-col items-center cursor-pointer group z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(212,175,55,0.45)] rounded"
            initial={{ opacity: 0 }}
            animate={prefersReduced ? { opacity: 0.6 } : { opacity: [0.3, 0.7, 0.3], y: [0, 6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          >
            <motion.svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gold/40 group-hover:text-gold/80 transition-colors duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.button>
        )}
      </div>
    </div>
  );
}
