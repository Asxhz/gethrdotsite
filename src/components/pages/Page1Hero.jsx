import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Dither from '../Dither';

export default function Page1Hero({ pageProgress, onScrollDown }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 bg-black text-white selection:bg-gold/30">
      <div className="absolute inset-0 z-0 opacity-40">
        <Dither
          waveColor={[0.2, 0.2, 0.2]}
          colorNum={4}
          pixelSize={4}
          waveSpeed={0.02}
          waveAmplitude={0.5}
          waveFrequency={2}
        />
      </div>

      <div className="aura-gold-bloom aura-glow-breathe" />

      <div className="aura-noise aura-noise-drift absolute inset-0 z-[1]" />

      <div className="aura-lens-flare z-[1]" />

      {!reducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-[1] opacity-30"
          style={{
            background: `radial-gradient(ellipse 80% 80% at ${50 + (mousePosition.x / window.innerWidth - 0.5) * 10}% ${50 + (mousePosition.y / window.innerHeight - 0.5) * 10}%, rgba(244,208,63,0.06) 0%, transparent 60%)`,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        />
      )}

      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gold/10 floating-particle"
            animate={
              reducedMotion
                ? {}
                : {
                  x: (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * (particle.size * 0.02),
                  y: (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * (particle.size * 0.02),
                }
            }
            transition={{ type: 'spring', damping: 20, stiffness: 50 }}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent opacity-50" />
      </div>

      { }
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center py-32">
        <div className="relative z-10 p-10 cursor-default flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            whileHover={
              reducedMotion
                ? {}
                : {
                  textShadow: ['0 0 0px white', '0 0 80px white', '0 0 0px white'],
                  opacity: [1, 0.8, 1],
                  scale: 1.05,
                }
            }
            transition={{ duration: 0.3 }}
            className="text-[28vw] sm:text-[26vw] md:text-[24vw] leading-none font-black text-gold text-glow-strong font-serif tracking-tighter mix-blend-screen cursor-pointer whitespace-nowrap"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            gethr.
          </motion.h1>

          <motion.div
            className="mt-24 sm:mt-28 flex flex-col items-center cursor-pointer group z-10"
            onClick={onScrollDown}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.98 }}
            animate={reducedMotion ? {} : { y: [0, 8, 0], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-gold/60 uppercase tracking-[0.5em] text-[clamp(0.8rem,2.5vw,1rem)] font-bold mb-3 group-hover:text-gold transition-colors">
              Begin
            </span>
            <motion.svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-gold/60 group-hover:text-gold transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={reducedMotion ? {} : { y: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
