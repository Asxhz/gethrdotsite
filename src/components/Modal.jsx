import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(value) {
  return String(value).toLowerCase().match(EMAIL_REGEX);
}

const LOG = (payload) => {
  fetch('http://127.0.0.1:7242/ingest/45ad4122-fce4-4c22-a333-61a6fdca9d89', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, timestamp: Date.now(), sessionId: 'debug-session' }) }).catch(() => {});
};

export default function Modal({ isOpen, onClose, type }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isWaitlist = type === 'waitlist';
  // #region agent log
  useEffect(() => {
    if (isOpen) LOG({ location: 'Modal.jsx:open', message: 'Modal open', data: { type, isWaitlist, success }, hypothesisId: 'H1' });
  }, [isOpen, type, isWaitlist, success]);
  useEffect(() => {
    if (isOpen && !success) LOG({ location: 'Modal.jsx:formShown', message: 'Form (with Submit) shown', data: { isWaitlist }, hypothesisId: 'H2' });
  }, [isOpen, success, isWaitlist]);
  // #endregion

  const saveToWaitlist = async (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const endpoint = isWaitlist
      ? (import.meta.env.VITE_WAITLIST_ENDPOINT || '/api/waitlist')
      : import.meta.env.VITE_CONTACT_ENDPOINT;

    const baseUrl = apiUrl && !String(apiUrl).includes('example')
      ? apiUrl
      : (typeof window !== 'undefined' ? window.location.origin : '');

    // #region agent log
    LOG({ location: 'Modal.jsx:saveToWaitlist', message: 'saveToWaitlist entry', data: { baseUrl, endpoint, hasEmail: !!data?.email }, hypothesisId: 'H3' });
    // #endregion

    const saveToStorage = () => {
      try {
        const entry = { ...data, timestamp: new Date().toISOString(), id: crypto.randomUUID?.() || Math.random().toString(36).slice(2) };
        const existing = JSON.parse(localStorage.getItem('gethr_waitlist') || '[]');
        localStorage.setItem('gethr_waitlist', JSON.stringify([...existing, entry]));
        return true;
      } catch (err) {
        console.error('Local storage failed:', err);
        return false;
      }
    };

    if (!baseUrl) {
      const ok = saveToStorage();
      // #region agent log
      LOG({ location: 'Modal.jsx:saveToWaitlist', message: 'saveToWaitlist no baseUrl', data: { ok }, hypothesisId: 'H3' });
      // #endregion
      return ok;
    }

    try {
      const url = `${baseUrl}${endpoint}`;
      const body = isWaitlist ? { email: data.email } : data;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        // #region agent log
        LOG({ location: 'Modal.jsx:saveToWaitlist', message: 'saveToWaitlist fetch ok', data: { status: res.status }, hypothesisId: 'H3' });
        // #endregion
        return true;
      }
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error || 'Request failed');
    } catch (err) {
      // #region agent log
      LOG({ location: 'Modal.jsx:saveToWaitlist', message: 'saveToWaitlist catch', data: { errMsg: err?.message, fallback: isWaitlist && !!data?.email }, hypothesisId: 'H3' });
      // #endregion
      console.warn('API failed, using localStorage:', err?.message);
      if (isWaitlist && data.email) return saveToStorage();
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // #region agent log
    LOG({ location: 'Modal.jsx:handleSubmit', message: 'handleSubmit entry', data: { emailLen: email?.length, isWaitlist }, hypothesisId: 'H3' });
    // #endregion

    if (!validateEmail(email)) {
      setError('Valid email required');
      return;
    }

    if (!isWaitlist && name.trim().length < 2) {
      setError('Full name required');
      return;
    }

    setSubmitted(true);

    const minDelay = new Promise((r) => setTimeout(r, 1500));
    const payload = isWaitlist ? { email: email.trim().toLowerCase() } : { name, email, message, type };
    const ok = await saveToWaitlist(payload);
    await minDelay;

    // #region agent log
    LOG({ location: 'Modal.jsx:handleSubmit', message: 'handleSubmit after save', data: { ok }, hypothesisId: 'H3' });
    // #endregion

    if (ok) {
      setSubmitted(false);
      setSuccess(true);
      setError('');
      // #region agent log
      LOG({ location: 'Modal.jsx:handleSubmit', message: 'success set true', data: {}, hypothesisId: 'H5' });
      // #endregion
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setEmail('');
        setName('');
        setMessage('');
      }, 2200);
    } else {
      setError('Something went wrong. Please try again.');
      setSubmitted(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-[2rem] overflow-hidden pointer-events-auto bg-[#080808] border border-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_80px_-20px_rgba(244,208,63,0.12)] flex flex-col max-h-[90vh]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
            >
              <div className="aura-noise absolute inset-0 opacity-[0.06] pointer-events-none rounded-[2rem]" />
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold/15 blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gold/10 blur-[60px] pointer-events-none" />

              <div className="relative overflow-y-auto flex-1 min-h-0 shrink">
                <div className="p-8 md:p-10 pb-2">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full text-white/35 hover:text-white hover:bg-white/10 transition-colors z-20"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>

                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 flex flex-col items-center justify-center text-center"
                      >
                        <motion.div
                          className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <p className="text-2xl font-black text-white" style={{ fontFamily: 'Playfair Display, serif' }}>You're on the list.</p>
                        <p className="mt-2 text-white/50 text-sm">We'll be in touch.</p>
                      </motion.div>
                    ) : (
                      <motion.div key="form">
                        <div className="mb-8 pr-10">
                          <motion.h2
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                          >
                            {isWaitlist ? 'Join the list.' : 'Connect.'}
                          </motion.h2>
                          <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12 }}
                            className="mt-2 text-white/40 font-mono text-[10px] uppercase tracking-[0.35em]"
                          >
                            {isWaitlist ? 'No spam. One drop.' : "We'd love to hear from you."}
                          </motion.p>
                        </div>

                        <form id="waitlist-form" onSubmit={handleSubmit} className="space-y-5">
                          {!isWaitlist && (
                            <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }} className="space-y-1.5">
                              <label className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-medium">Name</label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => { setName(e.target.value); setError(''); }}
                                placeholder="Your name"
                                className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/20 transition-all duration-300 text-base ${error && name.trim().length < 2 ? 'border-red-500/50' : 'border-white/[0.08]'}`}
                              />
                            </motion.div>
                          )}

                          <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: isWaitlist ? 0.18 : 0.22 }} className="space-y-1.5">
                            <label className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-medium">Email</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => { setEmail(e.target.value); setError(''); }}
                              placeholder="you@example.com"
                              autoComplete="email"
                              className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/20 transition-all duration-300 text-base ${error && !validateEmail(email) ? 'border-red-500/50' : 'border-white/[0.08]'}`}
                            />
                          </motion.div>

                          {!isWaitlist && (
                            <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.26 }} className="space-y-1.5">
                              <label className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-medium">Message</label>
                              <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Your message..."
                                rows={3}
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/20 transition-all duration-300 resize-none text-base"
                              />
                            </motion.div>
                          )}

                          <AnimatePresence>
                            {error && (
                              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400/90 text-sm font-mono">
                                {error}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sticky footer: Submit always visible (not inside scroll) */}
              {!success && (
                <div className="flex-shrink-0 p-6 pt-3 pb-6 md:p-8 md:pt-4 md:pb-8 border-t border-white/[0.08] bg-[#080808]">
                  <button
                    type="submit"
                    form="waitlist-form"
                    disabled={submitted}
                    className="w-full py-5 rounded-xl font-black text-lg uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-90 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] bg-[#F4D03F] text-black border-0 cursor-pointer hover:bg-[#f5d54a] active:scale-[0.98]"
                    style={{ boxShadow: '0 0 36px -4px rgba(244,208,63,0.45)' }}
                  >
                    {submitted ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <span className="inline-flex gap-1.5">
                          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-2 h-2 rounded-full bg-black/50" />
                          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 rounded-full bg-black/50" />
                          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full bg-black/50" />
                        </span>
                        Syncing…
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
