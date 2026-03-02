import { motion } from 'framer-motion';
import { BentoItem } from '../components/Animations';

export default function AchievementsSection() {
  return (
    <BentoItem animationType="scaleUp" className="sm:col-span-2 md:col-span-2 lg:col-span-2 bg-neo-pink text-paper-bg">
      <h3 className="font-serif font-bold text-lg md:text-xl uppercase mb-4">Achievements</h3>
      <div className="space-y-3 text-xs md:text-sm font-black">
        {['100% Merit Scholarship (1st Year)', '75% Merit Scholarship (2nd Year)', "Event Coordinator - SABRANG'23"].map((ach, i) => (
          <motion.div
            key={ach}
            whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
            className="bg-paper-bg text-paper-ink p-2 neo-border cursor-default"
          >
            {ach}
          </motion.div>
        ))}
      </div>
    </BentoItem>
  );
}
