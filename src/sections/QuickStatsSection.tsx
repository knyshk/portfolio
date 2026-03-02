import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { BentoItem, DecryptedText, ShinyText } from '../components/Animations';

export default function QuickStatsSection() {
  return (
    <BentoItem animationType="slideRight" delay={0.2} className="sm:col-span-2 md:col-span-2 lg:col-span-2 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neo-blue neo-border">
            <Terminal size={24} className="text-paper-bg" />
          </div>
          <h3 className="font-serif font-bold text-lg md:text-xl uppercase">
            <DecryptedText text="Core Stack" />
          </h3>
        </div>
        <div className="space-y-4">
          {['Python', 'MERN Stack', 'LLMs'].map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between border-b-2 border-paper-ink pb-2 group cursor-default"
            >
              <span className="font-serif font-bold text-base md:text-lg group-hover:text-neo-blue transition-colors">{skill}</span>
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                className="w-2 h-2 bg-neo-blue rounded-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <p className="font-mono text-[10px] md:text-xs uppercase font-bold opacity-60">Latest Bulletin</p>
        <p className="font-serif font-bold text-base md:text-lg italic">
          <ShinyText text="Mastering Reinforcement Learning & AI Automation" />
        </p>
      </div>
    </BentoItem>
  );
}
