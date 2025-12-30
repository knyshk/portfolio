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
    <section className="bg-white py-12">
      <AnimatedHeaderSection
        subTitle={"Journey Through Experience & Leadership"}
        title={"Experience"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      
      <div className="relative px-10 pb-4">
        {/* Timeline Bar */}
        <div
          ref={timelineRef}
          className="absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-black via-black/60 to-black/20 -translate-x-1/2 hidden lg:block"
        />

        {/* Experience Items */}
        <div className="space-y-6 lg:space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`relative flex flex-col lg:flex-row ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-4 lg:gap-10 items-center`}
            >
              {/* Timeline Dot */}
              <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-black rounded-full border-4 border-white z-10" />

              {/* Content */}
              <div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:text-right lg:pr-10" : "lg:pl-10"}`}>
                <div className="bg-black/5 border border-black/10 rounded-lg p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2 justify-between">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      exp.type === "internship" 
                        ? "bg-black/15 text-black" 
                        : exp.type === "leadership"
                        ? "bg-black/10 text-black/90"
                        : "bg-black/5 text-black/80"
                    }`}>
                      {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                    </span>
                    <p className="text-xs text-black/60">{exp.duration}</p>
                  </div>
                  
                  <h3 className="text-base md:text-lg font-bold text-black">
                    {exp.title}
                  </h3>
                  
                  <h4 className="text-xs md:text-sm font-semibold text-black/70 italic">
                    {exp.organization}
                  </h4>
                  
                  <p className="text-xs text-black/60 leading-tight">
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden lg:block lg:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSummary;
