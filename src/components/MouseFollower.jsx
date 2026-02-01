/**
 * Mouse follower – refined pointer; offset from cursor, premium gold accent.
 * Hidden on touch and when prefers-reduced-motion.
 */
import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING = { stiffness: 150, damping: 22 };
const OFFSET_X = 12;
const OFFSET_Y = 12;

export default function MouseFollower() {
  const x = useSpring(-200, SPRING);
  const y = useSpring(-200, SPRING);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (typeof window === 'undefined' || reducedMotion) return;
    const onMove = (e) => {
      x.set(e.clientX + OFFSET_X);
      y.set(e.clientY + OFFSET_Y);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onTouch = () => setIsTouch(true);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('touchstart', onTouch, { once: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchstart', onTouch);
    };
  }, [visible, reducedMotion, x, y]);

  if (isTouch || reducedMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[60]"
      initial={false}
    >
      {/* Single refined ring – warm gold, soft glow */}
      <motion.div
        className="absolute left-0 top-0 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          x,
          y,
          opacity: visible ? 1 : 0,
          boxShadow: '0 0 0 1px rgba(244, 208, 63, 0.35), 0 0 12px rgba(244, 208, 63, 0.15)',
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(244, 208, 63, 0.25))',
        }}
        transition={{ opacity: { duration: 0.25 } }}
      />
    </motion.div>
  );
}
