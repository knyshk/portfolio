import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const ServiceSummary = () => {
  useGSAP(() => {
    gsap.to("#title-service-1", {
      xPercent: 20,
      scrollTrigger: {
        target: "#title-service-1",
        scrub: true,
      },
    });
    gsap.to("#title-service-2", {
      xPercent: -30,
      scrollTrigger: {
        target: "#title-service-2",
        scrub: true,
      },
    });
    gsap.to("#title-service-3", {
      xPercent: 100,
      scrollTrigger: {
        target: "#title-service-3",
        scrub: true,
      },
    });
    gsap.to("#title-service-4", {
      xPercent: -100,
      scrollTrigger: {
        target: "#title-service-4",
        scrub: true,
      },
    });
  });
  return (
    <section className="mt-12 sm:mt-16 md:mt-20 overflow-hidden font-light leading-tight sm:leading-snug text-center mb-24 sm:mb-32 md:mb-42 contact-text-responsive px-2 sm:px-4">
      <div id="title-service-1">
        <p className="px-2">Full-Stack Development</p>
      </div>
      <div
        id="title-service-2"
        className="flex items-center justify-center gap-2 sm:gap-3 translate-x-8 sm:translate-x-12 md:translate-x-16"
      >
        <p className="font-normal">AI/ML Solutions</p>
        <div className="w-6 h-0.5 sm:w-8 sm:h-1 md:w-20 lg:w-32 bg-gold flex-shrink-0" />
        <p>LLMs & RAG</p>
      </div>
      <div
        id="title-service-3"
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 -translate-x-24 sm:-translate-x-32 md:-translate-x-48"
      >
        <p>Data Engineering</p>
        <div className="w-6 h-0.5 sm:w-8 sm:h-1 md:w-20 lg:w-32 bg-gold flex-shrink-0" />
        <p className="italic">System Design</p>
        <div className="w-6 h-0.5 sm:w-8 sm:h-1 md:w-20 lg:w-32 bg-gold flex-shrink-0" />
        <p>Performance Analysis</p>
      </div>
      <div id="title-service-4" className="translate-x-24 sm:translate-x-32 md:translate-x-48">
        <p className="px-2">Scalable Architectures</p>
      </div>
    </section>
  );
};

export default ServiceSummary;
