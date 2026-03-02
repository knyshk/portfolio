import { motion } from 'framer-motion';
import { Award, ChevronRight } from 'lucide-react';
import { BentoItem, DecryptedText } from '../components/Animations';

export default function CertificationsSection() {
  return (
    <BentoItem animationType="scaleUp" className="sm:col-span-2 md:col-span-2 lg:col-span-2 bg-neo-orange text-paper-ink">
      <h3 className="font-serif font-bold text-lg md:text-xl uppercase mb-4 flex items-center gap-2">
        <Award size={24} /> <DecryptedText text="Certifications" />
      </h3>
      <ul className="space-y-3 text-xs md:text-sm font-black">
        {['Python Programming (U. Michigan)', 'Crash Course on Python (Google)', 'AI Vicharana Shala (IIT Ropar)'].map((cert, i) => (
          <motion.li
            key={cert}
            initial={{ x: -10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-2"
          >
            <ChevronRight size={16} className="mt-1 shrink-0" />
            {cert}
          </motion.li>
        ))}
      </ul>
    </BentoItem>
  );
}
