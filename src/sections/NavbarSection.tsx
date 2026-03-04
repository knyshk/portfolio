import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Magnet } from '../components/Animations';
import { NAV_ITEMS } from '../data/portfolioData';

interface NavbarSectionProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function NavbarSection({ isMenuOpen, setIsMenuOpen }: NavbarSectionProps) {
  return (
    <nav className="sticky top-0 z-50 bg-paper-bg/80 backdrop-blur-md border-b-2 border-paper-ink px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Magnet strength={0.1}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="neo-border neo-brutal-shadow bg-paper-bg px-4 py-1 font-serif font-black text-xl cursor-pointer max-lg:grayscale-0 lg:grayscale lg:hover:grayscale-0 transition-all duration-500"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Knyshk
          </motion.div>
        </Magnet>

        <div className="hidden md:flex gap-8 max-lg:grayscale-0 lg:grayscale lg:hover:grayscale-0 transition-all duration-500">
          {NAV_ITEMS.map((item) => (
            <Magnet key={item} strength={0.2}>
              <a
                href={`#${item.toLowerCase()}`}
                className="font-serif font-bold uppercase hover:text-neo-blue transition-colors relative group text-sm lg:text-base"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-neo-blue transition-all group-hover:w-full" />
              </a>
            </Magnet>
          ))}
        </div>

        <button
          className="md:hidden p-2 neo-border bg-paper-bg neo-brutal-shadow-hover"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-paper-bg border-b-2 border-paper-ink p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-serif font-black text-2xl uppercase hover:text-neo-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
