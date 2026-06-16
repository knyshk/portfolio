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
import LoadingScreen from './components/LoadingScreen';
import BlogApp from './blog/BlogApp';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState<'loading' | 'portfolio' | 'blog'>(
    window.location.hash.includes('#blog') ? 'blog' : 'loading'
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('#blog')) {
        setView('blog');
      } else if (window.location.hash === '' || window.location.hash === '#') {
        // Only set to portfolio if we're not currently loading
        setView(prev => prev === 'loading' ? 'loading' : 'portfolio');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (view === 'loading') return; // Don't init lenis during loading

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: true,
      syncTouchLerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [view]);

  if (view === 'loading') {
    return <LoadingScreen onComplete={() => setView('portfolio')} />;
  }

  if (view === 'blog') {
    return <BlogApp onNavigateHome={() => { window.location.hash = ''; setView('portfolio'); }} />;
  }

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
