import { motion } from 'framer-motion';
import portrait1 from '../assets/portrait1.png';

export default function MastheadSection() {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-4">
        <div className="font-mono text-[10px] md:text-xs font-black uppercase tracking-widest">
          Portfolio Archive • Vol. 2026
        </div>
        <div className="font-serif italic font-bold text-sm md:text-base">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div className="font-mono text-[10px] md:text-xs font-black uppercase tracking-widest">
          Rajasthan, India
        </div>
      </div>

      <div className="newspaper-divider !my-0" />

      <div className="py-8 flex flex-col md:flex-row items-center md:items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left w-full">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="font-serif font-black text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] leading-[0.8] uppercase tracking-tighter mb-4"
          >
            Kanishk<br />
            <span className="outline-text">Jain</span>
          </motion.h1>
        </div>

        <div className="relative group flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="transition-all duration-500 max-lg:grayscale-0 lg:grayscale lg:hover:grayscale-0 hover:scale-105"
          >
            <img
              src={portrait1}
              alt="Kanishk Jain"
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover"
            />
          </motion.div>
          <div className="absolute -bottom-2 md:-bottom-4 -left-2 md:-left-4 bg-paper-ink text-paper-bg px-2 md:px-3 py-1 neo-border border-paper-bg font-mono text-[10px] md:text-xs uppercase font-black -rotate-6">
            EST. 2004
          </div>
        </div>
      </div>

      <div className="w-full flex items-center gap-4 mb-4">
        <div className="flex-1 h-[2px] bg-paper-ink" />
        <p className="font-serif italic font-bold text-lg md:text-2xl uppercase tracking-[0.2em] text-center">Computer Science & AI Enthusiast</p>
        <div className="flex-1 h-[2px] bg-paper-ink" />
      </div>

      <div className="newspaper-divider !my-0" />
    </div>
  );
}
