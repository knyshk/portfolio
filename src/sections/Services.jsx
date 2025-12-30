import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Services = () => {
  const text = `Building intelligent, scalable solutions
    with AI, data, and full-stack expertise
    to solve real-world problems.`;
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px
  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);
  return (
    <section id="services" className="min-h-screen bg-black rounded-t-3xl sm:rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Services"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      {servicesData.map((service, index) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el)}
          key={index}
          className="sticky px-4 sm:px-6 md:px-10 pt-4 sm:pt-5 md:pt-6 pb-8 sm:pb-10 md:pb-12 text-white bg-black border-t-2 border-white/30"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-between gap-3 sm:gap-4 font-light">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{service.title}</h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide sm:tracking-wider md:tracking-widest text-white/60 text-pretty">
                {service.description}
              </p>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex items-start">
                      <span className="mr-6 sm:mr-8 md:mr-12 text-sm sm:text-base md:text-lg text-white/30 flex-shrink-0 mt-1">
                        0{itemIndex + 1}
                      </span>
                      <span className="flex-1">{item.title}</span>
                    </h3>
                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-2 sm:my-2.5 md:my-3 bg-white/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
