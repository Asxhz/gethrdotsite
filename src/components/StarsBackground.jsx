import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function generateStars(count, starColor) {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(', ');
}

function StarLayer({ count = 1000, size = 1, transition, starColor = '#fff', className = '' }) {
  const [boxShadow, setBoxShadow] = useState('');

  useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={`absolute top-0 left-0 w-full ${className}`}
      style={{ height: '2000px' }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: 'transparent',
          boxShadow,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: '2000px',
          width: `${size}px`,
          height: `${size}px`,
          background: 'transparent',
          boxShadow,
        }}
      />
    </motion.div>
  );
}

export default function StarsBackground({
  children,
  className = '',
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = '#fff',
  pointerEvents = true,
  style,
  ...props
}) {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = useCallback(
    (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      offsetX.set(-(e.clientX - centerX) * factor);
      offsetY.set(-(e.clientY - centerY) * factor);
    },
    [offsetX, offsetY, factor],
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      style={style}
      {...props}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={pointerEvents ? '' : 'pointer-events-none'}
      >
        <StarLayer
          count={1000}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
          starColor={starColor}
        />
        <StarLayer
          count={400}
          size={2}
          transition={{ repeat: Infinity, duration: speed * 2, ease: 'linear' }}
          starColor={starColor}
        />
        <StarLayer
          count={200}
          size={3}
          transition={{ repeat: Infinity, duration: speed * 3, ease: 'linear' }}
          starColor={starColor}
        />
      </motion.div>
      {children}
    </div>
  );
}
