import { motion, useReducedMotion } from 'framer-motion';
import CurvedLoop from '../CurvedLoop';
import RippleGrid from '../RippleGrid';

const line1 = 'One tap. Any asset.';

export default function Page2Words({ onContinue }) {
  const prefersReduced = useReducedMotion();
  const staggerChild = 0.06;

  const pop = {
    hidden: { opacity: 0, y: 34, scale: 0.82, filter: 'blur(14px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 520, damping: 18, mass: 0.65 },
    },
  };

  return (
    <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center overflow-hidden min-h-screen">
      {}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] z-0"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 0 2px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.05) 0 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          filter: 'blur(0.2px)',
          mixBlendMode: 'overlay',
        }}
      />

      {}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <RippleGrid
          enableRainbow={false}
          gridColor="#f4d03f"
          rippleIntensity={0.05}
          gridSize={12}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
        />
      </div>

      {}
      <div className="absolute top-10 sm:top-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scaleX: 0.2, filter: 'blur(10px)' }}
          animate={
            prefersReduced
              ? { opacity: 0.7, scaleX: 1, filter: 'blur(0px)' }
              : {
                opacity: [0, 1, 0.35],
                scaleX: [0.15, 1.2, 1],
                filter: ['blur(14px)', 'blur(0px)', 'blur(0px)'],
              }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] w-[78vw] sm:w-[58vw] md:w-[46vw]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(212,175,55,0.9), rgba(255,245,200,0.95), rgba(212,175,55,0.9), transparent)',
            boxShadow: '0 0 30px rgba(212,175,55,0.55), 0 0 70px rgba(212,175,55,0.25)',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-[1100px] px-5 sm:px-8"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {}
        <div className="min-h-screen flex flex-col items-center justify-center text-center">

          {}
          <div className="w-full scale-[0.95] sm:scale-110 origin-center">
            <CurvedLoop
              marqueeText="One tap. Any asset. "
              speed={1.4}
              curveAmount={250}
              className="font-serif"
            />
          </div>

          {}
          <div className="w-full -mt-20 sm:-mt-24 scale-[0.9] sm:scale-105 origin-center">
            <CurvedLoop
              marqueeText="Simple ✦ Fast ✦ Nifty ✦ "
              speed={1.2}
              curveAmount={220}
              className="font-serif"
            />
          </div>

          {}
          <div className="w-full -mt-20 sm:-mt-24 scale-[0.8] sm:scale-[0.95] md:scale-100 origin-center">
            <CurvedLoop
              marqueeText="One tap. Any asset. "
              speed={1.3}
              curveAmount={190}
              className="font-serif"
            />
          </div>

          {}
          <div className="w-full -mt-20 sm:-mt-24 scale-[0.7] sm:scale-[0.85] md:scale-[0.9] origin-center">
            <CurvedLoop
              marqueeText="Simple ✦ Fast ✦ Nifty ✦ "
              speed={1.1}
              curveAmount={160}
              className="font-serif"
            />
          </div>

          {}
          <div className="h-[4vh] sm:h-[6vh]" />

          {onContinue && (
            <motion.button
              type="button"
              onClick={onContinue}
              className="flex flex-col items-center cursor-pointer group z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(212,175,55,0.45)] rounded"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                ...(prefersReduced ? {} : { scale: [1, 1.03, 1] }),
              }}
              transition={{
                opacity: { duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] },
                filter: { duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="uppercase tracking-[0.60em] text-[clamp(0.9rem,2.6vw,1.25rem)] font-bold mb-4 block"
                style={{
                  color: 'rgba(212,175,55,0.78)',
                  textShadow: '0 0 22px rgba(212,175,55,0.34)',
                }}
                animate={prefersReduced ? {} : { y: [0, 7, 0], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                Continue
              </motion.span>

              <motion.svg
                className="w-7 h-7 sm:w-8 sm:h-8"
                style={{
                  color: 'rgba(212,175,55,0.78)',
                  filter: 'drop-shadow(0 0 18px rgba(212,175,55,0.32))',
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={prefersReduced ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.08 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </motion.button>
          )}

          <div className="h-[4vh]" />
        </div>
      </motion.div>
    </div>
  );
}
