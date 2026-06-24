import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevKey = useRef(location.key);

  useEffect(() => {
    if (location.key !== prevKey.current) {
      setIsTransitioning(true);
      prevKey.current = location.key;
      const t = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(t);
    }
  }, [location.key]);

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="glitch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
          >
            {/* Liquid glass wave */}
            <motion.div
              initial={{ x: '-100%', skewX: '-8deg' }}
              animate={{ x: '200%', skewX: '8deg' }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(45,91,255,0.15) 30%, rgba(0,229,255,0.2) 50%, rgba(45,91,255,0.15) 70%, transparent 100%)',
                backdropFilter: 'blur(8px)',
              }}
            />
            {/* Scanline overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 0.4, times: [0, 0.3, 1] }}
              className="absolute inset-0"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.03) 2px, rgba(0,229,255,0.03) 4px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}