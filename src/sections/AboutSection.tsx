import { BentoItem, SpotlightCard } from '../components/Animations';

export default function AboutSection() {
  return (
    <BentoItem id="about" title="About Me" animationType="slideLeft" delay={0.3} className="sm:col-span-2 md:col-span-4 lg:col-span-3">
      <div className="space-y-4 font-serif text-base md:text-lg leading-relaxed">
        <p className="first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:leading-none">
          I&apos;m a 6th-semester CS student at <span className="font-bold underline decoration-neo-blue decoration-4 underline-offset-4">JK Lakshmipat University</span>, recently completed an exchange at <span className="font-bold underline decoration-neo-pink decoration-4 underline-offset-4">IIT Jammu</span>.
        </p>
        <p>
          My passion lies at the intersection of applied research and problem-solving, particularly in <span className="font-bold">Generative AI</span> and <span className="font-bold">LLMs</span>. I thrive on building systems that bridge complex algorithms with intuitive user experiences.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <SpotlightCard className="p-4 bg-neo-yellow/30">
            <h4 className="font-bold uppercase text-[10px] md:text-xs opacity-60 mb-2">Soft Skills</h4>
            <ul className="text-xs md:text-sm space-y-1 font-bold">
              <li>• Leadership</li>
              <li>• Problem Solving</li>
              <li>• Analytical Thinking</li>
            </ul>
          </SpotlightCard>
          <SpotlightCard className="p-4 bg-neo-pink/30">
            <h4 className="font-bold uppercase text-[10px] md:text-xs opacity-60 mb-2">Hobbies</h4>
            <ul className="text-xs md:text-sm space-y-1 font-bold">
              <li>• Astronomy</li>
              <li>• Photography</li>
              <li>• Basketball</li>
            </ul>
          </SpotlightCard>
        </div>
      </div>
    </BentoItem>
  );
}
