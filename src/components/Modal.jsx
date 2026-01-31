import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Modal({ isOpen, onClose, type }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const saveToWaitlist = async (data) => {
        // Environment variables for Vercel deployment
        const apiUrl = import.meta.env.VITE_API_URL;
        const endpoint = type === 'waitlist'
            ? import.meta.env.VITE_WAITLIST_ENDPOINT
            : import.meta.env.VITE_CONTACT_ENDPOINT;

        // Fallback for development if no API URL is provided
        if (!apiUrl || apiUrl.includes('example.world')) {
            console.warn('⚠️ No API URL detected. Falling back to local orchestration.');
            const entry = {
                ...data,
                timestamp: new Date().toISOString(),
                id: crypto.randomUUID?.() || Math.random().toString(36).substring(2)
            };
            try {
                const existing = JSON.parse(localStorage.getItem('gethr_waitlist') || '[]');
                localStorage.setItem('gethr_waitlist', JSON.stringify([...existing, entry]));
                return true;
            } catch (err) {
                console.error('Local fallback failed:', err);
                return false;
            }
        }

        // Production API Call
        try {
            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.ok;
        } catch (err) {
            console.error('API synchronization failure:', err);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Electronic address required');
            return;
        }

        if (name.trim().length < 2) {
            setError('Full name identity required');
            return;
        }

        setSubmitted(true);

        // Premium artificial delay for UX feeling
        const minDelay = new Promise(resolve => setTimeout(resolve, 2000));
        const syncResult = await saveToWaitlist({ name, email, message, type });
        await minDelay;

        if (syncResult) {
            setTimeout(() => {
                setSubmitted(false);
                onClose();
                setEmail('');
                setName('');
                setMessage('');
                setError('');
            }, 1000);
        } else {
            setError('Network sync failure. Retry.');
            setSubmitted(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Atmospheric Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/98 backdrop-blur-xl z-[100] cursor-pointer"
                    />

                    {/* Premium Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.98, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 30, scale: 0.98, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
                    >
                        <div className="bg-[#030303] border border-white/[0.03] rounded-[3rem] p-10 md:p-20 max-w-2xl w-full relative overflow-hidden pointer-events-auto shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]">

                            {/* Organic Grain Texture Overlay */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                            {/* Architectural Glows */}
                            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gold/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                            <div className="absolute -bottom-20 -left-20 w-[40%] h-[40%] bg-gold/5 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

                            {/* Minimal Close Button */}
                            <motion.button
                                whileHover={{ rotate: 90, scale: 1.1 }}
                                onClick={onClose}
                                className="absolute top-10 right-10 text-white/10 hover:text-white transition-colors p-3"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>

                            <div className="relative">
                                {/* Refined Header */}
                                <div className="space-y-6 mb-16 px-2">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-5xl md:text-7xl font-black text-white tracking-[-0.04em] leading-none"
                                        style={{ fontFamily: 'Playfair Display, serif' }}
                                    >
                                        {type === 'waitlist' ? 'The Future.' : 'Connect.'}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-white/30 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.6em] max-w-sm"
                                    >
                                        {type === 'waitlist' ? 'Defining connectivity for the next decade.' : 'We facilitate exceptional transitions.'}
                                    </motion.p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-12">
                                    {/* Ethereal Input Identity */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="space-y-3 relative group"
                                    >
                                        <label className="text-[9px] text-white/20 uppercase tracking-[0.5em] font-bold block ml-1 group-focus-within:text-gold transition-colors duration-500">Identity</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => { setName(e.target.value); setError(''); }}
                                                placeholder="Enter full name"
                                                className={`w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl px-8 py-6 text-lg text-white placeholder-white/5 focus:outline-none transition-all duration-700 focus:bg-white/[0.04] focus:border-gold/20 focus:ring-1 focus:ring-gold/10 ${error && name.trim().length < 2 ? 'border-red-500/40 bg-red-500/[0.02]' : ''}`}
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Ethereal Input Address */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="space-y-3 relative group"
                                    >
                                        <label className="text-[9px] text-white/20 uppercase tracking-[0.5em] font-bold block ml-1 group-focus-within:text-gold transition-colors duration-500">Digital Address</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                                placeholder="hello@example.world"
                                                className={`w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl px-8 py-6 text-lg text-white placeholder-white/5 focus:outline-none transition-all duration-700 focus:bg-white/[0.04] focus:border-gold/20 focus:ring-1 focus:ring-gold/10 ${error && !validateEmail(email) ? 'border-red-500/40 bg-red-500/[0.02]' : ''}`}
                                            />
                                        </div>
                                    </motion.div>

                                    {type !== 'waitlist' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="space-y-3 relative group"
                                        >
                                            <label className="text-[9px] text-white/20 uppercase tracking-[0.5em] font-bold block ml-1 group-focus-within:text-gold transition-colors duration-500">Intent</label>
                                            <textarea
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Briefly state your vision..."
                                                rows={1}
                                                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl px-8 py-6 text-lg text-white placeholder-white/5 focus:outline-none transition-all duration-700 focus:bg-white/[0.04] focus:border-gold/20 focus:ring-1 focus:ring-gold/10 resize-none"
                                            />
                                        </motion.div>
                                    )}

                                    {/* Smooth Error Transition */}
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0, y: -10 }}
                                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                                exit={{ opacity: 0, height: 0, y: -10 }}
                                                className="flex items-center gap-3 text-red-400 overflow-hidden"
                                            >
                                                <div className="w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
                                                <span className="text-[10px] font-mono tracking-[0.2em]">{error}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Elevated Submission CTA */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="pt-4"
                                    >
                                        <motion.button
                                            whileHover={{ y: submitted ? 0 : -5, boxShadow: submitted ? "none" : "0 20px 40px -10px rgba(212, 175, 55, 0.4)" }}
                                            whileTap={{ y: 0 }}
                                            type="submit"
                                            disabled={submitted}
                                            className={`relative w-full py-8 text-black font-black rounded-3xl transition-all duration-700 text-xs uppercase tracking-[0.5em] flex items-center justify-center overflow-hidden ${submitted ? "bg-white/5 text-white/20" : "bg-gold hover:bg-white"
                                                }`}
                                        >
                                            <AnimatePresence mode="wait">
                                                {submitted ? (
                                                    <motion.div
                                                        key="submitted"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        className="flex items-center gap-6"
                                                    >
                                                        <div className="flex gap-1.5">
                                                            <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 bg-white/20 rounded-full"></motion.span>
                                                            <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/20 rounded-full"></motion.span>
                                                            <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/20 rounded-full"></motion.span>
                                                        </div>
                                                        <span>Syncing Vision</span>
                                                    </motion.div>
                                                ) : (
                                                    <motion.span
                                                        key="confirm"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    >
                                                        Secure Access
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </motion.div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
