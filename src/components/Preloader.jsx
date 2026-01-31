import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        // Phase 1: Line expands (0.5s)
        // Phase 2: Logo reveals (1s)
        // Phase 3: Exit (0.5s)
        const timeline = [
            setTimeout(() => setPhase(1), 500),
            setTimeout(() => setPhase(2), 2000),
            setTimeout(() => onComplete(), 2800)
        ];
        return () => timeline.forEach(t => clearTimeout(t));
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Center Line Container */}
            <div className="relative flex items-center justify-center w-full">

                {/* The Logo */}
                <div className="relative overflow-hidden p-4">
                    <motion.h1
                        initial={{ y: 100 }}
                        animate={phase >= 1 ? { y: 0 } : { y: 100 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="text-8xl md:text-[10rem] font-black text-white tracking-tighter"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                        gethr<span className="text-gold">.</span>
                    </motion.h1>
                </div>

                {/* The Gold Line Shutter */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={
                        phase === 0 ? { width: "0%" } :
                            phase === 1 ? { width: "100%" } :
                                { width: "100%", opacity: 0 }
                    }
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute h-[2px] bg-gold z-10"
                />
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-gold/60 font-mono text-sm tracking-[0.5em] uppercase"
            >
                Loading Experience
            </motion.p>
        </motion.div>
    );
}
