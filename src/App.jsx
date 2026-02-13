import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import MouseFollower from './components/MouseFollower';
import Page1Hero from './components/pages/Page1Hero';

function App() {
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {!loading && <MouseFollower />}

      <div
        className="relative w-full h-screen"
        style={{ pointerEvents: loading ? 'none' : 'auto' }}
        aria-hidden={loading}
      >
        <Navbar />
        <Page1Hero onOpenWaitlist={() => setModalType('waitlist')} />
      </div>

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
