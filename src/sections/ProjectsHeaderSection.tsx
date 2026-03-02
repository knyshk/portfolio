import { Parallax } from 'react-scroll-parallax';
import { Reveal } from '../components/Animations';

export default function ProjectsHeaderSection() {
  return (
    <div id="projects" className="sm:col-span-2 md:col-span-4 lg:col-span-6 pt-12 md:pt-16 pb-8">
      <div className="newspaper-divider" />
      <Parallax speed={-5}>
        <Reveal width="100%" className="flex justify-center py-8">
          <h2 className="font-serif font-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter text-center leading-[0.8]">
            Featured <br />
            <span className="text-neo-orange outline-text">Projects</span>
          </h2>
        </Reveal>
      </Parallax>
      <div className="newspaper-divider" />
    </div>
  );
}
