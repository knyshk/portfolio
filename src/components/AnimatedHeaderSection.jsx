import React from "react";
import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];
  const maskClass = textColor.includes("white") ? "header-mask-dark" : "header-mask-light";
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);
  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-6 sm:gap-8 md:gap-10 pt-10 sm:pt-14 md:pt-16"
        >
          <p
            className={`text-[10px] sm:text-xs md:text-sm font-light tracking-[0.3rem] sm:tracking-[0.4rem] md:tracking-[0.5rem] uppercase px-4 sm:px-6 md:px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-4 sm:px-6 md:px-10 overflow-hidden">
            <h1
              className={`flex flex-wrap items-baseline gap-4 sm:gap-6 md:block uppercase banner-text-responsive ${textColor} break-words leading-[1.05] banner-single-line ${maskClass}`}
            >
              {titleParts.map((part, index) => (
                <span key={index} className="whitespace-nowrap md:whitespace-normal">
                  {part}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-4 sm:px-6 md:px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2 -top-4 sm:-top-5 md:-top-6" />
        <div className="py-8 sm:py-10 md:py-12 lg:py-16 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
