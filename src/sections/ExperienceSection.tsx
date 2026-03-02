import { motion } from 'framer-motion';
import { BentoItem } from '../components/Animations';

export default function ExperienceSection() {
  return (
    <BentoItem id="experience" title="Experience" animationType="slideRight" className="sm:col-span-2 md:col-span-2 lg:col-span-3">
      <div className="space-y-8">
        <div className="relative pl-6 border-l-4 border-neo-blue">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-neo-blue neo-border"
          />
          <h4 className="font-serif font-bold text-base md:text-lg uppercase">Full Stack Intern</h4>
          <p className="font-mono text-[10px] md:text-xs font-bold opacity-60">WebClan.in | May 2025 - July 2025</p>
          <p className="mt-2 text-xs md:text-sm font-serif italic font-bold">Built a full-scale MERN stack application with end-to-end involvement across frontend, backend, and deployment.</p>
        </div>
      </div>
    </BentoItem>
  );
}
