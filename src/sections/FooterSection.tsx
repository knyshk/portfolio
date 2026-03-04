import { Magnet } from '../components/Animations';

export default function FooterSection() {
  return (
    <footer className="mt-12 md:mt-20 py-8 border-t-4 border-paper-ink flex flex-col md:flex-row justify-between items-center gap-4 max-lg:grayscale-0 lg:grayscale lg:hover:grayscale-0 transition-all duration-500">
      <div className="flex flex-col gap-1">
        <p className="font-mono text-[10px] md:text-sm font-black uppercase text-center md:text-left">© 2026 Kanishk Jain. All rights reserved.</p>
        <p className="font-serif italic text-[10px] md:text-xs opacity-60 text-center md:text-left">Printed on recycled digital pixels.</p>
      </div>
      <div className="flex gap-6 md:gap-8">
        <Magnet strength={0.3}>
          <a href="https://github.com/knyshk" className="font-serif font-bold uppercase hover:text-neo-orange transition-colors text-xs md:text-sm underline decoration-2 underline-offset-4">GitHub</a>
        </Magnet>
        <Magnet strength={0.3}>
          <a href="https://www.linkedin.com/in/kanishk-jain-a630b5286/" className="font-serif font-bold uppercase hover:text-neo-orange transition-colors text-xs md:text-sm underline decoration-2 underline-offset-4">LinkedIn</a>
        </Magnet>
      </div>
    </footer>
  );
}
