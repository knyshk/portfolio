import { motion } from 'framer-motion';
import { Download, Github, Linkedin } from 'lucide-react';
import cvPdf from '../assets/Kanishk_Jain___CV.pdf';
import { BentoItem, BlurText, DecryptedText, Magnet, SplitText } from '../components/Animations';

export default function HeroSection() {
  return (
    <BentoItem className="sm:col-span-2 md:col-span-4 lg:col-span-4 flex flex-col justify-center min-h-[350px] md:min-h-[450px] relative overflow-hidden">
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block neo-border bg-paper-ink text-paper-bg px-3 py-1 mb-4 font-mono text-xs md:text-sm font-bold"
        >
          👋 <DecryptedText text="BREAKING NEWS" />
        </motion.div>
        <h2 className="font-serif font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-none mb-6 uppercase tracking-tighter">
          <SplitText text="AI & Web Architect" />
        </h2>
        <p className="font-serif italic text-lg md:text-xl lg:text-2xl font-medium max-w-2xl mb-8 leading-tight">
          <BlurText text="A Computer Science visionary specializing in the frontier of AI, Machine Learning, and Web Architecture." />
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Magnet strength={0.1}>
            <a
              href={cvPdf}
              download
              className="neo-border neo-brutal-shadow neo-brutal-shadow-hover neo-brutal-shadow-active bg-paper-ink text-paper-bg hover:bg-neo-yellow hover:text-paper-ink px-6 md:px-8 py-3 font-serif font-bold uppercase tracking-wider flex items-center gap-2 text-sm md:text-base transition-colors"
            >
              Download CV <Download size={20} />
            </a>
          </Magnet>
          <div className="flex items-center gap-3">
            <Magnet strength={0.1}>
              <a href="https://github.com/knyshk" target="_blank" className="neo-border neo-brutal-shadow neo-brutal-shadow-hover neo-brutal-shadow-active bg-neo-blue text-paper-bg p-2 md:p-3 flex items-center gap-2 font-serif font-bold text-sm md:text-base">
                <Github size={20} /> <span className="hidden sm:inline">GitHub</span>
              </a>
            </Magnet>
            <Magnet strength={0.1}>
              <a href="https://www.linkedin.com/in/kanishk-jain-a630b5286/" target="_blank" className="neo-border neo-brutal-shadow neo-brutal-shadow-hover neo-brutal-shadow-active bg-neo-pink text-paper-bg p-2 md:p-3 flex items-center gap-2 font-serif font-bold text-sm md:text-base">
                <Linkedin size={20} /> <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </Magnet>
          </div>
        </div>
      </div>
    </BentoItem>
  );
}
