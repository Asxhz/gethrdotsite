import Preloader from './components/Preloader';
import StickyPager from './components/StickyPager';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import MouseFollower from './components/MouseFollower';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Mouse follower – below modal z-index so it doesn’t cover dialogs */}
      {!loading && <MouseFollower />}

      {/* Hero (Navbar + StickyPager) mounted immediately behind preloader so
          the mask reveal uncovers it with no layout shift. Interaction
          blocked until loading completes. */}
      <div
        className="relative w-full h-screen"
        style={{ pointerEvents: loading ? 'none' : 'auto' }}
        aria-hidden={loading}
      >
        <Navbar />
        <StickyPager onOpenWaitlist={() => setModalType('waitlist')} />
      </div>

      {/* Preloader overlay: fixed, high z-index; mask peels away in last 300ms
          to reveal hero; then onComplete and AnimatePresence unmounts it. */}
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <Modal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType}
      />
    </div>
  );
}

export default App;
