import { motion } from 'framer-motion';

export default function PageIndicator({ total, activeIndex, pageProgress, onSelect }) {
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <nav
      className="fixed right-6 top-1/2 z-50 flex flex-col gap-4 -translate-y-1/2"
      aria-label="Page navigation"
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          className="relative flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
          aria-label={`Go to page ${i + 1}`}
          aria-current={activeIndex === i ? 'true' : undefined}
        >
          {activeIndex === i && (
            <svg className="absolute inset-0 w-10 h-10 -rotate-90" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <motion.circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="rgba(244, 208, 63, 0.8)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 16}
                style={{
                  strokeDashoffset: 2 * Math.PI * 16 * (1 - pageProgress),
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </svg>
          )}
          <motion.span
            className={`relative w-2 h-2 rounded-full ${
              activeIndex === i ? 'bg-gold' : 'bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          />
        </button>
      ))}
    </nav>
  );
}
