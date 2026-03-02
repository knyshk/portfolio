import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../lib/utils';

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  delay?: number;
  id?: string;
}

export const BentoItem: React.FC<BentoItemProps & { animationType?: 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'rotateIn' }> = ({ 
  children, 
  className, 
  title, 
  delay = 0, 
  id, 
  animationType = 'slideUp' 
}) => {
  const variants = {
    slideUp: { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } },
    slideLeft: { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 } },
    slideRight: { initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 } },
    scaleUp: { initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 1, scale: 1 } },
    rotateIn: { initial: { opacity: 0, rotate: -5, scale: 0.9 }, whileInView: { opacity: 1, rotate: 0, scale: 1 } },
  };

  const selectedVariant = variants[animationType] || variants.slideUp;

  return (
    <motion.div
      id={id}
      initial={selectedVariant.initial}
      whileInView={selectedVariant.whileInView}
      viewport={{ once: true, margin: "100px" }}
      transition={{ 
        duration: 0.5, 
        delay, 
        ease: [0.215, 0.61, 0.355, 1.0]
      }}
      className={cn(
        "neo-border neo-brutal-shadow bg-paper-bg p-6 relative overflow-hidden group grayscale hover:grayscale-0 transition-all duration-500",
        className
      )}
    >
      <div className="absolute inset-0 vintage-halftone pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity" />
      {title && (
        <h3 className="font-serif font-bold text-xl mb-4 uppercase tracking-tight border-b-2 border-paper-ink pb-2 inline-block relative z-10">
          {title}
        </h3>
      )}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export const ShinyText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent z-20"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </span>
  );
};

export const SplitText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export const BlurText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <motion.span
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {text}
    </motion.span>
  );
};

export const ElectricBorder = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("relative p-[2px] overflow-hidden rounded-sm", className)}>
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-neo-yellow via-neo-blue to-neo-pink"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative bg-white h-full w-full z-10">
        {children}
      </div>
    </div>
  );
};

export const GlareHover = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden group", className)}
    >
      {children}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 40%)`,
        }}
      />
    </div>
  );
};

export const ClickSpark = () => {
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setSparks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          className="absolute w-4 h-4 border-2 border-black rounded-full"
          style={{ left: spark.x - 8, top: spark.y - 8 }}
        />
      ))}
    </div>
  );
};

export const Magnet: React.FC<{ children: React.ReactNode; className?: string; strength?: number }> = ({ 
  children, 
  className, 
  strength = 0.5 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
};

export const SpotlightCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative neo-border neo-brutal-shadow bg-white overflow-hidden grayscale hover:grayscale-0 transition-all duration-500", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.05), transparent 80%)`,
        }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export const DecryptedText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let interval: any = null;

    if (isHovered) {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("font-mono", className)}
    >
      {displayText}
    </span>
  );
};

export const Reveal = ({ children, className, width = "fit-content" }: { children: React.ReactNode; className?: string; width?: "fit-content" | "100%" }) => {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ width }}>
      <motion.div
        initial={{ y: 75, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ left: 0 }}
        whileInView={{ left: "100%" }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.4, ease: "easeIn" }}
        className="absolute top-1 bottom-1 left-0 right-0 bg-neo-blue z-20"
      />
    </div>
  );
};

export const Floating = ({ children, className, duration = 3 }: { children: React.ReactNode; className?: string; duration?: number }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden grayscale opacity-40">
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] left-[2%] w-72 h-72 bg-neo-blue/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          rotate: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[55%] right-[5%] w-[30rem] h-[30rem] bg-neo-pink/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 30, 0],
          scale: [1, 1.15, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[5%] left-[15%] w-96 h-96 bg-neo-yellow/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[30%] left-[40%] w-64 h-64 bg-neo-green/10 rounded-full blur-3xl"
      />
    </div>
  );
};
