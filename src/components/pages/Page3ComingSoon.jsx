import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import GridScan from '../GridScan';

const PLATFORMS = ['IOS', 'ANDROID', 'WEB'];
const DIGITS = ['2', '0', '2', '6'];

export default function Page3ComingSoon({ onContinue }) {
  const prefersReduced = useReducedMotion();
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const popHard = {
    hidden: { opacity: 0, y: 34, scale: 0.84, filter: 'blur(18px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 640, damping: 16, mass: 0.55 },
    },
  };

  return (
    <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {}
      <div className="absolute inset-0 z-0 opacity-40">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#221100" 
          gridScale={0.15}
          scanColor="#f4d03f" 
          scanOpacity={0.4}
          enablePost={!prefersReduced}
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          scanDuration={3.0}
          scanDelay={1.5}
        />
      </div>

      {}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.20] z-[1]"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06) 0 2px, transparent 2px), radial-gradient(circle at 80% 55%, rgba(255,255,255,0.05) 0 1px, transparent 1px)',
          backgroundSize: '140px 140px',
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative flex flex-col items-center justify-center text-center px-6 w-full max-w-[96vw]">
        <div className="h-[2vh] sm:h-[3vh] md:h-[4vh]" />

        {}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {}
          {!prefersReduced && (
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[86vw] sm:w-[68vw] h-[10vmin] sm:h-[8vmin] rounded-full blur-[40px]"
              style={{ background: 'rgba(212,175,55,0.22)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0.25, 0.7, 0.35], scale: [0.96, 1.03, 0.98] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {}
          <motion.div
            className="relative inline-block overflow-hidden"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            <motion.p
              className="
                uppercase
                font-black
                tracking-[0.42em]
                sm:tracking-[0.52em]
                text-[clamp(1.3rem,5.2vw,2.9rem)]
                sm:text-[clamp(1.4rem,4.8vw,3.2rem)]
                text-white
                cursor-pointer select-none
              "
              style={{
                fontFamily: 'ui-sans-serif, system-ui, -apple-system',
                textShadow:
                  '0 0 22px rgba(212,175,55,0.35), 0 0 60px rgba(212,175,55,0.22), 0 0 120px rgba(212,175,55,0.12)',
              }}
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={
                prefersReduced
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              LAUNCHING
            </motion.p>
          </motion.div>

          {}
          {!prefersReduced && (
            <motion.div
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-3 sm:-bottom-4 w-[84%] h-[2px] blur-[0.2px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(212,175,55,0.9), rgba(255,245,200,0.95), rgba(212,175,55,0.9), transparent)',
                boxShadow: '0 0 28px rgba(212,175,55,0.55), 0 0 80px rgba(212,175,55,0.20)',
                opacity: 0.85,
              }}
              initial={{ scaleX: 0.15, opacity: 0 }}
              animate={{ scaleX: [0.15, 1.15, 1], opacity: [0, 1, 0.35] }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            />
          )}
        </motion.div>

        {}
        <motion.div
          className="relative mt-7 sm:mt-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
        >
          {!prefersReduced && (
            <motion.div
              className="pointer-events-none absolute left-[-15%] top-1/2 -translate-y-1/2 w-[130%] h-[12px] sm:h-[14px] blur-[12px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(212,175,55,0.60), rgba(255,245,200,0.75), rgba(212,175,55,0.60), transparent)',
                opacity: 0.7,
              }}
              initial={{ x: '-50%', opacity: 0 }}
              animate={{ x: '50%', opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.15, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          <motion.p
            className="font-black uppercase tracking-[-0.05em] leading-none text-[clamp(5.2rem,28vw,14.8rem)] sm:text-[clamp(5.8rem,30vw,15.6rem)] cursor-pointer select-none relative overflow-hidden"
            style={{
              fontFamily: 'ui-sans-serif, system-ui, -apple-system',
              textShadow:
                '0 0 70px rgba(212,175,55,0.78), 0 0 150px rgba(212,175,55,0.42), 0 0 220px rgba(212,175,55,0.18)',
            }}
            variants={popHard}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              animate={
                prefersReduced ? {} : { filter: ['brightness(1)', 'brightness(1.15)', 'brightness(1)'] }
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
            >
              FEB
            </motion.span>

            {}
            {!prefersReduced && (
              <motion.div
                className="absolute inset-x-0 h-[2px] bg-gold/40 blur-[2px] z-10"
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
              />
            )}
          </motion.p>
        </motion.div>

        {}
        <motion.div
          className="flex items-center justify-center gap-[0.06em] sm:gap-1 mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {DIGITS.map((d, i) => (
            <motion.span
              key={i}
              className="font-black tracking-[-0.06em] text-[clamp(4.0rem,20vw,11.2rem)] sm:text-[clamp(4.4rem,22vw,12rem)] leading-none cursor-pointer select-none"
              style={{
                fontFamily: 'ui-sans-serif, system-ui, -apple-system',
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255,255,255,0.93)',
                textShadow: '0 0 28px rgba(212,175,55,0.32), 0 0 70px rgba(212,175,55,0.14)',
                filter: 'drop-shadow(0 0 22px rgba(212,175,55,0.22))',
              }}
              initial={{ opacity: 0, y: 18, scale: 0.90, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{
                type: 'spring',
                stiffness: 520,
                damping: 18,
                mass: 0.6,
                delay: 0.62 + i * 0.06,
              }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.96 }}
            >
              {d}
            </motion.span>
          ))}
        </motion.div>

        {}
        <motion.div
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
          initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.82, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {PLATFORMS.map((label, i) => (
            <motion.span
              key={label}
              className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border-2 border-white/75 text-white/95 text-[clamp(0.68rem,1.9vw,1rem)] font-medium uppercase tracking-[0.24em]"
              style={{
                fontFamily: 'ui-sans-serif, system-ui, -apple-system',
                textShadow: '0 0 20px rgba(212,175,55,0.20)',
                boxShadow: '0 0 28px rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{
                opacity: 1,
                scale: 1,
                ...(introDone && !prefersReduced
                  ? {
                    boxShadow: [
                      '0 0 28px rgba(255,255,255,0.07)',
                      '0 0 36px rgba(212,175,55,0.18)',
                      '0 0 28px rgba(255,255,255,0.07)',
                    ],
                  }
                  : {}),
              }}
              transition={{
                opacity: { delay: 0.90 + i * 0.07, type: 'spring', stiffness: 420, damping: 16, mass: 0.55 },
                scale: { delay: 0.90 + i * 0.07, type: 'spring', stiffness: 420, damping: 16, mass: 0.55 },
                boxShadow: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.6 + i * 0.2 },
              }}
              whileHover={
                introDone && !prefersReduced
                  ? {
                    borderColor: 'rgba(212,175,55,0.98)',
                    color: 'rgba(212,175,55,1)',
                    boxShadow: '0 0 36px rgba(212,175,55,0.34)',
                    y: -3,
                    scale: 1.04,
                  }
                  : {}
              }
              whileTap={introDone ? { scale: 0.98 } : {}}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>

        <div className="h-[9vh] sm:h-[11vh] md:h-[12vh]" />

        {onContinue && (
          <motion.button
            type="button"
            onClick={onContinue}
            className="flex flex-col items-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(212,175,55,0.40)] rounded"
            whileHover={introDone ? { scale: 1.1 } : {}}
            whileTap={introDone ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="uppercase tracking-[0.60em] text-[clamp(0.8rem,2.4vw,1.05rem)] font-medium mb-3"
              style={{ color: 'rgba(212,175,55,0.62)', textShadow: '0 0 20px rgba(212,175,55,0.22)' }}
              animate={prefersReduced ? {} : { y: [0, 6, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Continue
            </motion.span>
            <motion.svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              style={{ color: 'rgba(212,175,55,0.62)', filter: 'drop-shadow(0 0 16px rgba(212,175,55,0.22))' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={prefersReduced ? {} : { y: [0, 4, 0] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.button>
        )}

        <div className="h-[3vh] sm:h-[4vh]" />
      </div>
    </div>
  );
}
