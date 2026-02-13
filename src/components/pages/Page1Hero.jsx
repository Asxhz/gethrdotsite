import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Dither from '../Dither';

const TAGLINE = 'Waitlist.';
const ease = [0.50, 1, 0.3, 1];

export default function Page1Hero({ onOpenWaitlist }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const newParticles = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 14 + 6,
      delay: Math.random() * 6,
    }));
    setParticles(newParticles);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 bg-black text-white selection:bg-gold/30">
      <div className="absolute inset-0 z-0 opacity-55">
        <Dither
          waveColor={[0.28, 0.2, 0.06]}
          colorNum={5}
          pixelSize={3}
          waveSpeed={0.012}
          waveAmplitude={0.7}
          waveFrequency={2.8}
        />
      </div>

      <div className="aura-gold-bloom aura-glow-breathe" />
      <div className="aura-noise aura-noise-drift absolute inset-0 z-[1]" />
      <div className="aura-lens-flare z-[1]" />

      {!reducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-[1] opacity-50"
          style={{
            background: `radial-gradient(ellipse 50% 50% at ${50 + (mousePosition.x / window.innerWidth - 0.5) * 20}% ${50 + (mousePosition.y / window.innerHeight - 0.5) * 20}%, rgba(244,208,63,0.1) 0%, transparent 70%)`,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 60 }}
        />
      )}

      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full floating-particle"
            animate={
              reducedMotion
                ? {}
                : {
                  x: (mousePosition.x - window.innerWidth / 2) * (particle.size * 0.03),
                  y: (mousePosition.y - window.innerHeight / 2) * (particle.size * 0.03),
                }
            }
            transition={{ type: 'spring', damping: 15, stiffness: 35 }}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              background: `radial-gradient(circle, rgba(244,208,63,${0.18 + particle.size * 0.04}), transparent)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center py-32">
        <div className="relative z-10 p-10 cursor-default flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(24px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            whileHover={
              reducedMotion ? {} : {
                textShadow: ['0 0 0px white', '0 0 120px white', '0 0 0px white'],
                opacity: [1, 0.85, 1],
                scale: 1.03,
              }
            }
            transition={{ duration: 1, ease }}
            onClick={onOpenWaitlist}
            className="text-[28vw] sm:text-[26vw] md:text-[24vw] leading-none font-black text-gold text-glow-strong font-serif tracking-tighter mix-blend-screen cursor-pointer whitespace-nowrap"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            gethr.
          </motion.h1>

          <div className="mt-8 overflow-hidden">
            {TAGLINE.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em] text-white/25 uppercase tracking-[0.2em] text-[clamp(0.6rem,1.5vw,0.8rem)] font-medium"
                initial={{ y: '120%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
