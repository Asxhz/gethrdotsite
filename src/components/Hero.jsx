import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Modal from './Modal';

const Section = ({ children, className = "" }) => (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden py-32 ${className}`}>
        {children}
    </div>
);

export default function Hero() {
    const [modalType, setModalType] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [particles, setParticles] = useState([]);
    useEffect(() => {
        const newParticles = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 10 + 10,
        }));
        setParticles(newParticles);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const handleScrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="bg-black text-white selection:bg-gold/30">
            <div className="fixed inset-0 pointer-events-none z-0">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-gold/10 floating-particle"
                        animate={{
                            x: (mousePosition.x - window.innerWidth / 2) * (particle.size * 0.02),
                            y: (mousePosition.y - window.innerHeight / 2) * (particle.size * 0.02),
                        }}
                        transition={{ type: "spring", damping: 20, stiffness: 50 }}
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDuration: `${particle.duration}s`,
                        }}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent opacity-50"></div>
            </div>

            <Section>
                <div className="relative z-10 p-10 cursor-default flex flex-col items-center">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        whileHover={{
                            textShadow: ["0 0 0px white", "0 0 80px white", "0 0 0px white"],
                            opacity: [1, 0.8, 1],
                            scale: 1.05
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-[25vw] leading-none font-black text-gold text-glow-strong font-serif tracking-tighter mix-blend-screen cursor-pointer"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                        gethr.
                    </motion.h1>

                    <motion.div
                        className="mt-20 flex flex-col items-center cursor-pointer group z-10"
                        onClick={handleScrollToContent}
                        whileHover={{ scale: 1.1 }}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-gold/60 uppercase tracking-[0.5em] text-sm font-bold mb-2 group-hover:text-gold transition-colors">Begin</span>
                        <svg className="w-6 h-6 text-gold/60 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </div>
            </Section>

            <Section>
                <div className="relative z-10 flex flex-col items-center w-full px-6 text-center max-w-full mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold text-white tracking-[0.5em] uppercase mb-24 opacity-80 backdrop-blur-sm"
                    >
                        Launching
                    </motion.h2>

                    <div className="relative group cursor-default flex flex-col items-center justify-center py-20">
                        <motion.h2
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            whileHover={{ scale: 1.1 }}
                            className="text-[20vw] font-black text-gold text-glow-strong leading-[0.8] tracking-tighter"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                            FEB
                        </motion.h2>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                            whileHover={{ scale: 1.1 }}
                            className="text-[20vw] font-black text-transparent leading-[0.8] -mt-8"
                            style={{
                                fontFamily: 'Outfit, sans-serif',
                                WebkitTextStroke: '3px rgba(255,255,255,0.9)'
                            }}
                        >
                            2026
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="mt-32 flex flex-wrap justify-center gap-8"
                    >
                        {['iOS', 'Android', 'Web'].map((platform, i) => (
                            <motion.button
                                key={platform}
                                onClick={() => setModalType('waitlist')}
                                whileHover={{ scale: 1.1, backgroundColor: "#F4D03F", color: "#000" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 border-2 border-white/20 bg-white/5 rounded-full text-white font-bold text-xl md:text-2xl uppercase tracking-[0.2em] backdrop-blur-md cursor-pointer transition-colors duration-300"
                            >
                                {platform}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </Section>

            <Section className="!justify-center pb-20 pt-40">
                <div className="w-full max-w-7xl px-6 z-10 flex flex-col items-center">

                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-gold/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

                    <div className="relative w-full min-h-[70vh] flex items-center justify-center">
                        {[
                            {
                                title: "Waitlist",
                                action: () => setModalType('waitlist'),
                                icon: (
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                ),
                                x: 0, y: -50,
                                primary: true
                            },
                            {
                                title: "Email",
                                link: "mailto:hello@gethr.link",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                ),
                                x: -300, y: 150
                            },
                            {
                                title: "LinkedIn",
                                link: "https://www.linkedin.com/company/gethrlink/",
                                icon: (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                ),
                                x: 300, y: 150
                            }
                        ].map((item, i) => {
                            const Component = item.link ? motion.a : motion.button;
                            return (
                                <motion.div
                                    key={item.title}
                                    drag
                                    dragConstraints={{ left: -600, right: 600, top: -400, bottom: 400 }}
                                    dragElastic={0.2}
                                    whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                                    initial={{ x: item.x, y: item.y, opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        opacity: { delay: i * 0.1, duration: 0.8 },
                                        scale: { delay: i * 0.1, type: "spring", stiffness: 200, damping: 15 }
                                    }}
                                    className="absolute flex flex-col items-center gap-6 group cursor-grab active:cursor-grabbing"
                                >
                                    <Component
                                        href={item.link}
                                        target={item.link?.startsWith('http') ? "_blank" : undefined}
                                        rel={item.link?.startsWith('http') ? "noopener noreferrer" : undefined}
                                        onClick={item.action}
                                        className={`relative flex items-center justify-center rounded-full transition-all shadow-2xl overflow-hidden ${item.primary
                                                ? "w-48 h-48 md:w-64 md:h-64 bg-gold text-black border-4 border-white/20 ring-[20px] ring-gold/10 group-hover:ring-gold/20"
                                                : "w-24 h-24 md:w-32 md:h-32 bg-white/[0.02] border border-white/10 backdrop-blur-3xl group-hover:bg-white/[0.05] group-hover:border-gold/30"
                                            }`}
                                    >
                                        {item.primary && (
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                                className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"
                                            />
                                        )}
                                        <div className={`relative transition-all duration-500 scale-125 ${item.primary ? "text-black" : "text-white/40 group-hover:text-gold"
                                            }`}>
                                            {item.icon}
                                        </div>
                                    </Component>
                                    <span className={`font-mono uppercase tracking-[0.4em] font-black transition-colors ${item.primary ? "text-sm text-gold mt-2" : "text-[9px] text-white/20 group-hover:text-white/60"
                                        }`}>
                                        {item.title}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-40 pt-16 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-white/20 font-bold tracking-[0.3em] uppercase text-sm">gethr.</div>

                        <div className="flex gap-12 text-white/30 text-xs font-mono uppercase tracking-widest">
                            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
                            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
                        </div>

                        <div className="text-white/20 font-mono text-[10px] tracking-widest uppercase">
                            &copy; 2026 Gethr. Build with passion.
                        </div>
                    </div>
                </div>
            </Section>

            <Modal isOpen={modalType !== null} onClose={() => setModalType(null)} type={modalType} />
        </div>
    );
}
