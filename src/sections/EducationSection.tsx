import { BentoItem } from '../components/Animations';

export default function EducationSection() {
  return (
    <BentoItem title="Education" animationType="slideLeft" className="sm:col-span-2 md:col-span-2 lg:col-span-3">
      <div className="space-y-6">
        <div className="group">
          <h4 className="font-serif font-bold text-base md:text-lg uppercase group-hover:text-neo-blue transition-colors">B.Tech in CS & AI</h4>
          <p className="font-mono text-[10px] md:text-xs font-bold opacity-60">JK Lakshmipat University | 2023 - Present</p>
          <p className="text-xs md:text-sm font-black text-neo-blue mt-1">CGPA: 7.46</p>
        </div>
        <div className="border-t-2 border-paper-ink pt-4 group">
          <h4 className="font-serif font-bold text-base md:text-lg uppercase group-hover:text-neo-pink transition-colors">Visiting Student</h4>
          <p className="font-mono text-[10px] md:text-xs font-bold opacity-60">IIT Jammu | Jan 2025 - May 2025</p>
          <p className="text-xs md:text-sm mt-1 italic font-serif font-bold">Studied DAA, PPL, and Computer Networks.</p>
        </div>
      </div>
    </BentoItem>
  );
}
