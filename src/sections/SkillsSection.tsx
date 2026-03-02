import { BentoItem, Magnet } from '../components/Animations';
import { SKILLS } from '../data/portfolioData';

export default function SkillsSection() {
  return (
    <BentoItem id="skills" title="Technical Arsenal" animationType="scaleUp" delay={0.4} className="sm:col-span-2 md:col-span-4 lg:col-span-3 bg-neo-blue text-paper-bg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h4 className="font-mono text-[10px] md:text-xs uppercase font-bold mb-3 text-neo-yellow">Languages</h4>
          <div className="flex flex-wrap gap-2">
            {SKILLS.languages.map((s) => (
              <Magnet key={s} strength={0.1}>
                <span className="neo-border bg-paper-bg text-paper-ink px-2 py-1 text-[10px] md:text-xs font-bold hover:bg-neo-yellow transition-colors cursor-default">{s}</span>
              </Magnet>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-mono text-[10px] md:text-xs uppercase font-bold mb-3 text-neo-yellow">Frameworks</h4>
          <div className="flex flex-wrap gap-2">
            {SKILLS.frameworks.map((s) => (
              <Magnet key={s} strength={0.1}>
                <span className="neo-border bg-paper-bg text-paper-ink px-2 py-1 text-[10px] md:text-xs font-bold hover:bg-neo-pink transition-colors cursor-default">{s}</span>
              </Magnet>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <h4 className="font-mono text-[10px] md:text-xs uppercase font-bold mb-3 text-neo-yellow">Concepts & Tools</h4>
          <div className="flex flex-wrap gap-2">
            {[...SKILLS.concepts, ...SKILLS.tools.slice(0, 4)].map((s) => (
              <Magnet key={s} strength={0.1}>
                <span className="neo-border bg-paper-bg text-paper-ink px-2 py-1 text-[10px] md:text-xs font-bold hover:bg-neo-green transition-colors cursor-default">{s}</span>
              </Magnet>
            ))}
          </div>
        </div>
      </div>
    </BentoItem>
  );
}
