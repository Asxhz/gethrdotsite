import { useState, useEffect, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TextLoop({
  children,
  className = '',
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
  trigger = true,
  mode = 'popLayout',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    if (!trigger) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, interval * 1000);
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, trigger]);

  const motionVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <div className={`relative inline-block whitespace-nowrap ${className}`}>
      <AnimatePresence mode={mode} initial={false}>
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants || motionVariants}
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
