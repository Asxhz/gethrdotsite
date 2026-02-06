import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PageIndicator from './PageIndicator';
import Page1Hero from './pages/Page1Hero';
import Page2Words from './pages/Page2Words';
import Page3ComingSoon from './pages/Page3ComingSoon';
import Page4Waitlist from './pages/Page4Waitlist';

const TOTAL_PAGES = 4;

const SNAP_SENSITIVITY = 28; 
const PROGRESS_STEP = 0.2; 
const PROGRESS_THRESHOLD_NEXT = 0.82; 
const PROGRESS_THRESHOLD_PREV = 0.12; 
const ANIMATION_MIN_DURATION_MS = 350; 

export default function StickyPager({ onOpenWaitlist }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageProgress, setPageProgress] = useState(0);
  const pageEnteredAt = useRef(Date.now());
  const rafRef = useRef(null);
  const containerRef = useRef(null);
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const goToPage = useCallback((index) => {
    const clamped = Math.max(0, Math.min(TOTAL_PAGES - 1, index));
    if (clamped === activeIndex) return;
    setActiveIndex(clamped);
    setPageProgress(0); 
    pageEnteredAt.current = Date.now();
  }, [activeIndex]);

  const stateRef = useRef({ activeIndex, pageProgress });
  stateRef.current = { activeIndex, pageProgress };

  const advanceProgress = useCallback((delta) => {
    const { activeIndex: i } = stateRef.current;
    setPageProgress((p) => {
      const next = p + delta;
      const goNext = next >= PROGRESS_THRESHOLD_NEXT && i < TOTAL_PAGES - 1;
      const goPrev = next <= PROGRESS_THRESHOLD_PREV && i > 0;
      if (goNext) {
        pageEnteredAt.current = Date.now();
        setActiveIndex(i + 1);
        return 0;
      }
      if (goPrev) {
        pageEnteredAt.current = Date.now();
        setActiveIndex(i - 1);
        return 1;
      }
      return Math.max(0, Math.min(1, next));
    });
  }, []);

  const touchStartY = useRef(0);
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);
  const handleTouchEnd = useCallback((e) => {
    const y = e.changedTouches[0].clientY;
    const dy = touchStartY.current - y;
    if (Math.abs(dy) < 50) return;
    const now = Date.now();
    if (!reducedMotion.current && now - pageEnteredAt.current < ANIMATION_MIN_DURATION_MS) return;
    advanceProgress(dy > 0 ? PROGRESS_STEP : -PROGRESS_STEP);
  }, [advanceProgress]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => { reducedMotion.current = mq.matches; };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const advanceRef = useRef(advanceProgress);
  advanceRef.current = advanceProgress;
  useEffect(() => {
    const handler = (e) => {
      const delta = e.deltaY;
      if (Math.abs(delta) < SNAP_SENSITIVITY) return;
      if (!reducedMotion.current && Date.now() - pageEnteredAt.current < ANIMATION_MIN_DURATION_MS) return;
      e.preventDefault();
      e.stopPropagation();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        advanceRef.current(delta > 0 ? PROGRESS_STEP : -PROGRESS_STEP);
        rafRef.current = null;
      });
    };
    document.addEventListener('wheel', handler, { passive: false });
    return () => document.removeEventListener('wheel', handler);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (reducedMotion.current) return;
      const target = e.target?.tagName;
      if (target === 'INPUT' || target === 'TEXTAREA') return;
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        advanceProgress(PROGRESS_STEP);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        advanceProgress(-PROGRESS_STEP);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [advanceProgress]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none', overflow: 'hidden' }}
    >
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: activeIndex === index ? 1 : 0,
            pointerEvents: activeIndex === index ? 'auto' : 'none',
            zIndex: activeIndex === index ? 10 : 0,
          }}
          transition={{
            duration: reducedMotion.current ? 0 : 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {index === 0 && <Page1Hero pageProgress={pageProgress} onScrollDown={() => goToPage(1)} />}
          {index === 1 && <Page2Words pageProgress={pageProgress} onContinue={() => goToPage(2)} />}
          {index === 2 && <Page3ComingSoon pageProgress={pageProgress} onContinue={() => goToPage(3)} />}
          {index === 3 && <Page4Waitlist onOpenWaitlist={onOpenWaitlist} />}
        </motion.div>
      ))}

      <PageIndicator
        total={TOTAL_PAGES}
        activeIndex={activeIndex}
        pageProgress={pageProgress}
        onSelect={goToPage}
      />
    </div>
  );
}
