import Hero from './components/Hero'
import Preloader from './components/Preloader'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-black min-h-screen relative">
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Hero simulates loading by waiting for the curtain to lift, but we mount it early for stability */}
      <Hero />
    </div>
  )
}

export default App

