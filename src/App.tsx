import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ParallaxProvider } from 'react-scroll-parallax';
import Lenis from 'lenis';
import { ClickSpark, FloatingShapes } from './components/Animations';
import { PROJECTS } from './data/portfolioData';
import AboutSection from './sections/AboutSection';
import AchievementsSection from './sections/AchievementsSection';
import CertificationsSection from './sections/CertificationsSection';
import CompetitiveSection from './sections/CompetitiveSection';
import ContactSection from './sections/ContactSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import FooterSection from './sections/FooterSection';
import HeroSection from './sections/HeroSection';
import MastheadSection from './sections/MastheadSection';
import NavbarSection from './sections/NavbarSection';
import ProjectsGridSection from './sections/ProjectsGridSection';
import ProjectsHeaderSection from './sections/ProjectsHeaderSection';
import QuickStatsSection from './sections/QuickStatsSection';
import SkillsSection from './sections/SkillsSection';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ParallaxProvider>
      <NavbarSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <FloatingShapes />

      <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl mx-auto selection:bg-neo-yellow selection:text-paper-ink">
        <ClickSpark />
        <MastheadSection />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          <HeroSection />
          <QuickStatsSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsHeaderSection />
          <ProjectsGridSection projects={PROJECTS} />
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-6">
            <div className="newspaper-divider !my-0" />
          </div>
          <ExperienceSection />
          <EducationSection />
          <CertificationsSection />
          <CompetitiveSection />
          <AchievementsSection />
          <ContactSection />
        </div>

        <FooterSection />
      </div>
    </ParallaxProvider>
  );
}
