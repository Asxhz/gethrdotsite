/**
 * Page 2: get gether → get together. Bigger + shocking pop + aura.
 */
import { motion, useReducedMotion } from 'framer-motion';

const line1 = 'get gether';
const line2 = 'get together';

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

  const popHard = {
    hidden: { opacity: 0, y: 42, scale: 0.76, rotate: -1.2, filter: 'blur(16px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 650, damping: 16, mass: 0.55 },
    },
  };

  const shimmer = prefersReduced
    ? {}
    : {
        backgroundPosition: ['0% 50%', '100% 50%'],
      };

  return (
    <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center overflow-hidden min-h-screen">
      {/* Ambient grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 0 2px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.05) 0 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          filter: 'blur(0.2px)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Aura bloom layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden>
        <motion.div
          className="w-[96vw] h-[48vmin] rounded-full blur-[95px]"
          style={{ background: 'rgba(212,175,55,0.16)' }}
          animate={prefersReduced ? {} : { scale: [1, 1.08, 1], opacity: [0.80, 1, 0.80] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[74vw] h-[30vmin] rounded-full blur-[80px]"
          style={{ background: 'rgba(255,255,255,0.06)' }}
          animate={prefersReduced ? {} : { y: [0, -12, 0], opacity: [0.50, 0.75, 0.50] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* TOP shocking element */}
      <div className="absolute top-10 sm:top-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scaleX: 0.2, filter: 'blur(10px)' }}
          animate={
            prefersReduced
              ? { opacity: 0.7, scaleX: 1, filter: 'blur(0px)' }
              : { opacity: [0, 1, 0.35], scaleX: [0.15, 1.2, 1], filter: ['blur(14px)', 'blur(0px)', 'blur(0px)'] }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] w-[72vw] sm:w-[56vw]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(212,175,55,0.9), rgba(255,245,200,0.95), rgba(212,175,55,0.9), transparent)',
            boxShadow: '0 0 30px rgba(212,175,55,0.55), 0 0 70px rgba(212,175,55,0.25)',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-5 w-full max-w-[96vw]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-[6vh] sm:h-[7vh] md:h-[8vh]" />

        {/* LINE 1 */}
        <motion.p
          className="text-[11.6vw] sm:text-[9.6vw] md:text-[8.8vw] font-black tracking-[-0.05em] leading-[0.90] inline-flex flex-wrap justify-center items-baseline"
          style={{
            fontFamily: 'Playfair Display, serif',
            gap: '0.30em',
            textShadow: '0 0 26px rgba(244,208,63,0.22), 0 0 60px rgba(244,208,63,0.10)',
          }}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: staggerChild, delayChildren: 0.10 } } }}
        >
          {line1.split(' ').map((word, i) => (
            <motion.span
              key={i}
              variants={pop}
              className="inline-block cursor-pointer select-none"
              whileHover={{ scale: 1.06, y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Subtext that actually adds aura */}
        <motion.p
          className="mt-6 sm:mt-7 text-white/55 text-[clamp(0.9rem,2.8vw,1.25rem)] tracking-[0.28em] uppercase"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
        </motion.p>

        {/* LINE 2 */}
        <motion.p
          className="mt-12 sm:mt-14 md:mt-16 text-[13.6vw] sm:text-[11.6vw] md:text-[10.4vw] font-black tracking-[-0.06em] leading-[0.88] inline-flex flex-wrap justify-center items-baseline"
          style={{ fontFamily: 'Playfair Display, serif', gap: '0.38em' }}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: staggerChild, delayChildren: 0.34 } } }}
        >
          {line2.split(' ').map((word, i) => (
            <motion.span
              key={i}
              variants={popHard}
              className="inline-block relative cursor-pointer select-none"
              whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              {/* shimmer text + glow pulse */}
              <motion.span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, rgba(212,175,55,0.92), rgba(255,245,200,1), rgba(212,175,55,0.92))',
                  backgroundSize: '240% 100%',
                  textShadow:
                    '0 0 36px rgba(212,175,55,0.45), 0 0 120px rgba(212,175,55,0.18)',
                }}
                animate={shimmer}
                transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {word}
              </motion.span>

              {/* chromatic edge */}
              {!prefersReduced && (
                <>
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-[1px] text-[rgba(255,255,255,0.10)] blur-[0.2px]"
                  >
                    {word}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-x-[1px] translate-y-[1px] text-[rgba(212,175,55,0.22)] blur-[0.4px]"
                  >
                    {word}
                  </span>
                </>
              )}
            </motion.span>
          ))}
        </motion.p>

        {/* spacing before continue */}
        <div className="h-[10vh] sm:h-[12vh] md:h-[14vh] lg:h-[16vh]" />

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
              className="uppercase tracking-[0.60em] text-[clamp(0.9rem,2.8vw,1.25rem)] font-bold mb-4 block"
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
              style={{ color: 'rgba(212,175,55,0.78)', filter: 'drop-shadow(0 0 18px rgba(212,175,55,0.32))' }}
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

        <div className="h-[3vh] sm:h-[4vh]" />
      </motion.div>
    </div>
  );
}
