import { Code2 } from 'lucide-react';
import { BentoItem, DecryptedText, SpotlightCard } from '../components/Animations';

export default function CompetitiveSection() {
  return (
    <BentoItem animationType="rotateIn" className="sm:col-span-2 md:col-span-2 lg:col-span-2">
      <h3 className="font-serif font-bold text-lg md:text-xl uppercase mb-4 flex items-center gap-2">
        <Code2 size={24} /> <DecryptedText text="Competitive" />
      </h3>
      <div className="space-y-4">
        <SpotlightCard className="p-3 bg-neo-yellow/40">
          <p className="font-mono text-[10px] md:text-xs font-bold uppercase">CodeChef</p>
          <p className="font-serif font-black text-xl md:text-2xl">1239 <span className="text-xs font-bold">(1★)</span></p>
        </SpotlightCard>
        <SpotlightCard className="p-3 bg-neo-green/40">
          <p className="font-mono text-[10px] md:text-xs font-bold uppercase">LeetCode</p>
          <p className="font-serif font-black text-xl md:text-2xl italic">TBD</p>
        </SpotlightCard>
      </div>
    </BentoItem>
  );
}
