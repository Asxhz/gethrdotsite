import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function validateEmail(v) { return String(v).toLowerCase().match(EMAIL_REGEX); }

const ease = [0.16, 1, 0.3, 1];

export default function Modal({ isOpen, onClose, type }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 500);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const saveToWaitlist = async (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT || '/api/waitlist';
    const baseUrl = apiUrl && !String(apiUrl).includes('example')
      ? apiUrl : (typeof window !== 'undefined' ? window.location.origin : '');

    const saveLocal = () => {
      try {
        const entry = { ...data, timestamp: new Date().toISOString(), id: crypto.randomUUID?.() || Math.random().toString(36).slice(2) };
        const existing = JSON.parse(localStorage.getItem('gethr_waitlist') || '[]');
        localStorage.setItem('gethr_waitlist', JSON.stringify([...existing, entry]));
        return true;
      } catch { return false; }
    };

    if (!baseUrl) return saveLocal();
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      if (res.ok) return true;
      throw new Error();
    } catch { return data.email ? saveLocal() : false; }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) { setError('Please enter a valid email address.'); return; }

    setSubmitted(true);
    const minDelay = new Promise((r) => setTimeout(r, 1400));
    const ok = await saveToWaitlist({ email: email.trim().toLowerCase() });
    await minDelay;

    if (ok) {
      setSubmitted(false);
      setSuccess(true);
      setError('');
      setTimeout(() => { setSuccess(false); onClose(); setEmail(''); }, 2800);
    } else {
      setError('Something went wrong. Try again.');
      setSubmitted(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(212,175,55,0.06) 0%, rgba(0,0,0,0.96) 60%, #000 100%)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
          }}
        >
          <motion.button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 flex items-center justify-center rounded-full border border-white/[0.08] text-white/30 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 z-20 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          <div className="w-full max-w-[580px] px-6 sm:px-8" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-8"
                    style={{
                      background: 'radial-gradient(circle, rgba(212,175,55,0.15), rgba(212,175,55,0.03))',
                      border: '1.5px solid rgba(212,175,55,0.25)',
                      boxShadow: '0 0 60px -10px rgba(212,175,55,0.2)',
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 14, delay: 0.1 }}
                  >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      />
                    </svg>
                  </motion.div>
                  <motion.h2
                    className="text-4xl sm:text-5xl font-black text-white tracking-tight"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ease }}
                  >
                    You're in.
                  </motion.h2>
                  <motion.p
                    className="mt-4 text-white/40 text-base sm:text-lg"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, ease }}
                  >
                    We'll reach out when it's time.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.h2
                    className="text-white font-serif tracking-tighter leading-none font-black mb-16 sm:mb-20"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 'clamp(4rem, 14vw, 8rem)',
                    }}
                    initial={{ opacity: 0, scale: 0.85, filter: 'blur(16px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease }}
                  >
                    signup.
                  </motion.h2>

                  <motion.form
                    onSubmit={handleSubmit}
                    className="w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ease }}
                  >
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      placeholder="you@email.com"
                      autoComplete="email"
                      className="w-full rounded-2xl px-6 py-5 sm:py-6 text-base sm:text-lg text-white placeholder-white/20 focus:outline-none transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: `1.5px solid ${error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        boxShadow: error ? '0 0 0 4px rgba(239,68,68,0.06)' : 'none',
                      }}
                      onFocus={(e) => {
                        if (!error) {
                          e.target.style.borderColor = 'rgba(212,175,55,0.35)';
                          e.target.style.boxShadow = '0 0 0 4px rgba(212,175,55,0.06), 0 0 40px -8px rgba(212,175,55,0.1)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!error) {
                          e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />

                    <motion.button
                      type="submit"
                      disabled={submitted}
                      className="w-full mt-4 py-5 sm:py-6 rounded-2xl font-black text-base sm:text-lg uppercase tracking-[0.18em] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #F4D03F 0%, #D4AF37 100%)',
                        color: '#000',
                        boxShadow: '0 4px 24px -4px rgba(212,175,55,0.4)',
                      }}
                      whileHover={{ scale: 1.02, boxShadow: '0 6px 36px -4px rgba(212,175,55,0.6)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {submitted ? (
                        <span className="inline-flex items-center justify-center gap-2">
                          <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-2 h-2 rounded-full bg-black/50" />
                          <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} className="w-2 h-2 rounded-full bg-black/50" />
                          <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} className="w-2 h-2 rounded-full bg-black/50" />
                        </span>
                      ) : 'Join'}
                    </motion.button>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="mt-3 text-red-400/80 text-sm text-left pl-2"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.form>

                  <motion.p
                    className="mt-6 text-white/15 text-xs sm:text-sm tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    No spam. One email when we launch.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
