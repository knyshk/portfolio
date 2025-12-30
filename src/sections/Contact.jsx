import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { useState } from "react";

const SocialIcon = ({ name }) => {
  const cls = "w-9 h-9 stroke-white fill-none";

  if (name === "linkedin") {
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <path
          strokeWidth="1"
          d="M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM10 8h4v2c.6-1.2 2-2.2 4-2.2 3 0 4 2 4 5.2V20h-4v-6.4c0-1.6-.4-2.6-1.8-2.6s-2.2 1.2-2.2 2.6V20h-4z"
        />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <path
          strokeWidth="1"
          d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 6.8 9.4.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.8 1 1.7 1 2.8 0 3.9-2.4 4.8-4.6 5 .3.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0022 12c0-5.5-4.5-10-10-10z"
        />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1" />
        <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
        <circle cx="17" cy="7" r="1.2" fill="white" />
      </svg>
    );
  }

  return null;
};

const Contact = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Check honeypot
    if (formData.get('website')) {
      setStatus("Message sent successfully!");
      form.reset();
      return;
    }

    setStatus("Sending...");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setStatus("Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form error:", error);
      setStatus("Error sending message. Please try again.");
    }
  };
  const text = `Got a question, how or project Idea?
    WE'D love to hear from you and discus further!`;
  const items = [
    "© 2025 Kanishk Jain (knyshk)",
    "© 2025 Kanishk Jain (knyshk)",
    "© 2025 Kanishk Jain (knyshk)",
    "© 2025 Kanishk Jain (knyshk)",
    "© 2025 Kanishk Jain (knyshk)",
  ];
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);
  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-16">
            {/* Left Column - Contact Info */}
            <div className="flex flex-col gap-10">
              <div className="social-link">
                <h2>E-mail</h2>
                <div className="w-full h-px my-2 bg-white/30" />
                <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                  <a href="mailto:kanishk.jain0510@gmail.com">kanishk.jain0510@gmail.com</a>
                </p>
              </div>
              <div className="social-link">
                <h2>Phone</h2>
                <div className="w-full h-px my-2 bg-white/30" />
                <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                  <a href="tel:+917877807017">+91 7877807017</a>
                </p>
              </div>
              <div className="social-link">
                <h2>Social Media</h2>
                <div className="w-full h-px my-2 bg-white/30" />
                <div className="flex flex-wrap gap-4 md:gap-6">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="flex flex-col items-center gap-2 md:gap-3 px-2 md:px-3 text-xs leading-tight tracking-wides uppercase md:text-sm hover:text-white/80 transition-colors duration-200"
                    >
                     <SocialIcon name={social.icon} />
                     <span className="mt-0.5 md:mt-1">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="social-link">
              <h2>Send a Message</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                data-netlify-honeypot="website"
                onSubmit={handleSubmit}
                className="space-y-3 mt-4"
              >
                <input type="hidden" name="form-name" value="contact" />
                
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website"
                  style={{ display: "none" }}
                  tabIndex="-1"
                  aria-hidden="true"
                />

                <div>
                  <label className="text-sm text-white/70 block mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/70 block mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/70 block mb-1.5">Message</label>
                  <textarea
                    name="message"
                    placeholder="Your message here..."
                    required
                    rows="4"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  />
                </div>

                {status && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-xs text-green-400">{status}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm font-medium transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent normal-case" />
    </section>
  );
};

export default Contact;
