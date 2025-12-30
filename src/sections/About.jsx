import { useRef, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Computer Science student at JK Lakshmipat University. 
  Completed a semester exchange at IIT Jammu. 
   Exploring AI & creating technology that makes a difference.`;
  const aboutText = ``;
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const [expandedSkills, setExpandedSkills] = useState(false);
  const [expandedAchievements, setExpandedAchievements] = useState(false);
  const [expandedServices, setExpandedServices] = useState(false);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });

    gsap.set(textRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(textRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: textRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-3xl sm:rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Engineering Intelligent Solutions with AI & Full-Stack Expertise"}
        title={"About Me"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-start justify-between gap-8 sm:gap-10 md:gap-12 px-4 sm:px-6 md:px-10 pb-12 md:pb-16 lg:flex-row\">
        <img
          ref={imgRef}
          src="images/man.png"
          alt="Kanishk Jain"
          className="w-full lg:w-1/3 rounded-2xl sm:rounded-3xl object-cover"
        />
        
        <div ref={textRef} className="w-full lg:w-2/3 text-white/80 space-y-6 sm:space-y-8">
          {/* Education Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4">Education</h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="border-l-2 sm:border-l-4 border-white pl-3 sm:pl-4">
                <h4 className="text-base sm:text-lg md:text-xl font-medium text-white">JK Lakshmipat University</h4>
                <p className="text-sm sm:text-base md:text-lg text-white/70 mt-1">Bachelor of Technology in Computer Science & Artificial Intelligence</p>
                <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
                  <p className="text-xs sm:text-sm md:text-base text-white/60">August 2023 - Present</p>
                  <p className="text-xs sm:text-sm md:text-base text-white/60 font-semibold">CGPA: 7.459</p>
                </div>
              </div>

              <div className="border-l-2 sm:border-l-4 border-white pl-3 sm:pl-4">
                <h4 className="text-base sm:text-lg md:text-xl font-medium text-white">IIT Jammu</h4>
                <p className="text-sm sm:text-base md:text-lg text-white/70 mt-1">Visiting Student - B.Tech in Computer Science & Engineering</p>
                <p className="text-xs sm:text-sm md:text-base text-white/60 mt-2">January 2025 - May 2025</p>
              </div>
            </div>
          </div>

          {/* Skills and Achievements Section - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Skills Section */}
            <div className="space-y-3 sm:space-y-4 bg-white/8 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Technical Skills</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white/95 mb-1.5 sm:mb-2">Languages</h4>
                  <p className="text-xs sm:text-sm md:text-base text-white/85 font-medium italic leading-relaxed">Python, C/C++, JavaScript, HTML/CSS, SQL, MongoDB, Kotlin</p>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white/95 mb-1.5 sm:mb-2">Frameworks & Libraries</h4>
                  <div className="text-xs sm:text-sm md:text-base text-white/85 font-medium italic space-y-1 leading-relaxed">
                    <p>NodeJS, ReactJS, ExpressJS, Bootstrap, Tailwind CSS</p>
                    <p>NumPy, Pandas, Matplotlib, OpenCV, TensorFlow, Keras</p>
                    <p>NetworkX, LangChain, Streamlit</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white/95 mb-1.5 sm:mb-2">Tools & Platforms</h4>
                  <div className="text-xs sm:text-sm md:text-base text-white/85 font-medium italic space-y-1 leading-relaxed">
                    <p>Git, GitHub, VS Code, Jupyter, Google Colab</p>
                    <p>ChromaDB, OpenSSL, Wireshark, Ubuntu CLI, API Integration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="space-y-3 sm:space-y-4 bg-white/8 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Achievements & Ratings</h3>
              
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-white/85">
              <ul className="list-disc list-inside font-medium space-y-2 italic leading-relaxed">
                <li>100% merit scholarship in 1st year</li>
                <li>Completed Semester Exchange Program at IIT Jammu</li>
                <li>CodeChef: 1239 (1★), Leetcode: Active Problem Solver</li>
                <li>Hackathon participant: HackJKLU 3.0, LNMHacks and SIH'25</li>
              </ul>
              </div>
            </div>
          </div>

          {/* Interests Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4">Beyond Code</h3>
            
            <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed italic">
              When I'm not coding, you'll find me on the basketball court, capturing moments through my camera lens, 
              or gazing at the stars as a passionate astronomy enthusiast. I actively participate in competitive programming, 
              enjoy reading science fiction and biographies, and contribute to organizing technical and cultural events 
              at my university.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
