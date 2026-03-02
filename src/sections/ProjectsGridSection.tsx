import { ExternalLink } from 'lucide-react';
import { BentoItem, GlareHover, Magnet } from '../components/Animations';
import { Project } from '../data/portfolioData';
import { cn } from '../lib/utils';

interface ProjectsGridSectionProps {
  projects: Project[];
}

export default function ProjectsGridSection({ projects }: ProjectsGridSectionProps) {
  return (
    <>
      {projects.map((project, i) => (
        <BentoItem
          key={project.name}
          delay={i * 0.1}
          animationType={i % 2 === 0 ? 'rotateIn' : 'scaleUp'}
          className={cn(
            'sm:col-span-2 md:col-span-2 lg:col-span-3 flex flex-col justify-between group',
            project.color === 'bg-neo-yellow'
              ? 'bg-neo-yellow/40'
              : project.color === 'bg-neo-blue'
                ? 'bg-neo-blue/40'
                : project.color === 'bg-neo-pink'
                  ? 'bg-neo-pink/40'
                  : 'bg-neo-green/40'
          )}
        >
          <GlareHover className="h-full flex flex-col relative z-10">
            <div>
              <div className="flex justify-end items-start mb-4">
                <Magnet>
                  <a href={project.link} target="_blank" className="neo-border bg-paper-bg p-2 neo-brutal-shadow-hover block">
                    <ExternalLink size={20} />
                  </a>
                </Magnet>
              </div>
              <h3 className="font-serif font-black text-xl md:text-2xl uppercase mb-3 leading-tight group-hover:translate-x-2 transition-transform">
                {project.name}
              </h3>
              <p className="font-serif italic font-bold text-xs md:text-sm mb-6 opacity-90">
                {project.desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((t) => (
                <span key={t} className="bg-paper-ink text-paper-bg neo-border px-2 py-1 text-[10px] font-bold uppercase">
                  {t}
                </span>
              ))}
            </div>
          </GlareHover>
        </BentoItem>
        
      ))}
    </>
  );
}
