import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ContactSummary = () => {
  const timelineRef = useRef(null);
  const itemsRef = useRef([]);

  const experiences = [
    {
      id: 1,
      title: "MERN Stack Intern",
      organization: "WebClan.in",
      duration: "May - July 2025",
      description: "Full-stack web development using MongoDB, Express.js, React, and Node.js.",
      type: "internship"
    },
    {
      id: 2,
      title: "Event Coordinator",
      organization: "SABRANG'23",
      duration: "Sept - Oct 2023",
      description: "Coordinated General Knowledge Quiz Event.",
      type: "leadership"
    },
    {
      id: 3,
      title: "Event Coordinator",
      organization: "Nakshatra Club",
      duration: "Sept 2023 - Apr 2024",
      description: "Organized stargazing and astronomy sessions.",
      type: "leadership"
    },
    {
      id: 4,
      title: "Volunteer",
      organization: "PRODYOGEEK'23",
      duration: "Sept 2023",
      description: "Sponsorship & Promotion Team.",
      type: "volunteer"
    }
  ];

  const text = `Hands-on experience in development, 
    leadership, and technical collaboration 
    across multiple domains.`;

  useGSAP(() => {
    // Animate timeline bar
    gsap.fromTo(
      timelineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      }
    );

    // Animate experience items
    itemsRef.current.forEach((el, index) => {
      if (!el) return;
      gsap.from(el, {
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <section id="experience" className="bg-white py-8 sm:py-12">
      <AnimatedHeaderSection
        subTitle={"Journey Through Experience & Leadership"}
        title={"Experience"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      
      <div className="relative px-4 sm:px-6 md:px-10 pb-4">
        {/* Timeline Bar - Mobile: left-aligned, Desktop: centered */}
        <div
          ref={timelineRef}
          className="absolute left-8 sm:left-10 md:left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-black via-black/60 to-black/20 md:-translate-x-1/2"
        />

        {/* Experience Items */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-4 md:gap-10 items-start md:items-center`}
            >
              {/* Timeline Dot - Always visible */}
              <div className="absolute left-[27px] sm:left-[33px] md:left-1/2 top-6 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-3 h-3 md:w-3.5 md:h-3.5 bg-black rounded-full border-[3px] md:border-4 border-white z-10" />

              {/* Content */}
              <div className={`w-full md:w-1/2 pl-12 sm:pl-16 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                <div className="bg-black/5 border border-black/10 rounded-lg p-4 sm:p-5 md:p-6 space-y-2 md:space-y-2.5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                    <span className={`px-2.5 py-1 text-xs sm:text-sm rounded-full w-fit ${
                      exp.type === "internship" 
                        ? "bg-black/15 text-black" 
                        : exp.type === "leadership"
                        ? "bg-black/10 text-black/90"
                        : "bg-black/5 text-black/80"
                    }`}>
                      {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                    </span>
                    <p className="text-xs sm:text-sm text-black/60 font-medium">{exp.duration}</p>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black leading-tight">
                    {exp.title}
                  </h3>
                  
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-black/70 italic">
                    {exp.organization}
                  </h4>
                  
                  <p className="text-sm sm:text-base text-black/70 leading-relaxed pt-1">
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSummary;
