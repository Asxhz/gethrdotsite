import { motion } from 'framer-motion';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo/Brand */}
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="gethr" className="w-10 h-10" />
                    <span className="text-2xl font-bold text-gold">gethr</span>
                </div>

                {/* Contact button */}
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:hellogether@gmail.com"
                    className="px-6 py-3 border border-gold/50 text-gold rounded-full hover:bg-gold/10 transition-all font-medium"
                >
                    Contact
                </motion.a>
            </div>
        </motion.nav>
    );
}
