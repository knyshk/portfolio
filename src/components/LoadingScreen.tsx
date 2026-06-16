import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import portrait1 from '../assets/portrait1.png';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'portrait' | 'name' | 'exit'>('portrait');
  const [nameText, setNameText] = useState('');
  const fullName = 'KANISHK JAIN';

  useEffect(() => {
    // Phase 1: Show portrait (0 - 800ms)
    const nameTimer = setTimeout(() => {
      setPhase('name');
    }, 800);

    return () => clearTimeout(nameTimer);
  }, []);

  useEffect(() => {
    if (phase === 'name') {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= fullName.length) {
          setNameText(fullName.slice(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
          // Phase 3: Exit after name typed
          setTimeout(() => {
            setPhase('exit');
            setTimeout(onComplete, 800);
          }, 500);
        }
      }, 80);

      return () => clearInterval(typeInterval);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#0a0a0a' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Background ink texture */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Animated ink blots */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(242,201,76,0.15) 0%, transparent 70%)',
                top: '-10%',
                right: '-5%',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(47,128,237,0.12) 0%, transparent 70%)',
                bottom: '-5%',
                left: '-5%',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </motion.div>

          {/* Main content container */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Portrait with ink reveal */}
            <motion.div
              className="relative"
              initial={{ scale: 0.6, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {/* Decorative frame */}
              <motion.div
                className="absolute -inset-3 border-[3px] border-[#f2c94c]"
                initial={{ scaleX: 0, scaleY: 0 }}
                animate={{ scaleX: 1, scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              />

              {/* Shadow frame offset */}
              <motion.div
                className="absolute -inset-3 border-[3px] border-[#0a0a0a] bg-[#0a0a0a]"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: 6, y: 6, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{ zIndex: -1 }}
              />

              {/* Portrait image */}
              <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 overflow-hidden bg-[#fffef2]">
                <motion.img
                  src={portrait1}
                  alt="Kanishk Jain"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
                />

                {/* Halftone overlay that fades */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  style={{
                    backgroundImage: `radial-gradient(circle, #0a0a0a 1px, transparent 1px)`,
                    backgroundSize: '4px 4px',
                    mixBlendMode: 'multiply',
                  }}
                />
              </div>

              {/* Decorative label */}
              <motion.div
                className="absolute -bottom-3 -right-3 px-3 py-1 bg-[#eb5757] text-[#fffef2] font-mono text-[10px] uppercase font-bold tracking-widest"
                style={{ border: '2px solid #0a0a0a' }}
                initial={{ opacity: 0, rotate: 0, scale: 0 }}
                animate={{ opacity: 1, rotate: 12, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8, type: 'spring', stiffness: 200 }}
              >
                EST. 2004
              </motion.div>
            </motion.div>

            {/* Name typewriter */}
            <div className="text-center">
              <motion.div
                className="font-serif font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter text-[#fffef2] uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span>{nameText}</span>
                <motion.span
                  className="inline-block w-[3px] h-[1em] bg-[#f2c94c] ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                />
              </motion.div>

              {/* Subtitle */}
              <motion.div
                className="font-serif italic text-sm sm:text-base md:text-lg text-[#fffef2]/60 mt-3 tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'name' ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Portfolio Archive • Vol. 2026
              </motion.div>
            </div>

            {/* Loading bar */}
            <motion.div
              className="w-48 sm:w-64 h-[3px] bg-[#fffef2]/10 overflow-hidden mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-[#f2c94c]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: [0.215, 0.61, 0.355, 1] }}
              />
            </motion.div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-6 left-6 font-mono text-[10px] text-[#fffef2]/30 uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading...
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-6 font-mono text-[10px] text-[#fffef2]/30 uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Rajasthan, India
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
