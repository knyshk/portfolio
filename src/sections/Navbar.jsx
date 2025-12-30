import React, { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const SocialIcon = ({ name }) => {
  const cls = "w-4 h-4 stroke-white fill-none";

  if (name === "linkedin") {
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <path
          strokeWidth="1.5"
          d="M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM10 8h4v2c.6-1.2 2-2.2 4-2.2 3 0 4 2 4 5.2V20h-4v-6.4c0-1.6-.4-2.6-1.8-2.6s-2.2 1.2-2.2 2.6V20h-4z"
        />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <path
          strokeWidth="1.5"
          d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 6.8 9.4.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.8 1 1.7 1 2.8 0 3.9-2.4 4.8-4.6 5 .3.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0022 12c0-5.5-4.5-10-10-10z"
        />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
        <circle cx="17" cy="7" r="1.2" fill="white" />
      </svg>
    );
  }

  return null;
};

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap.timeline({ paused: true }).to(navRef.current, {xPercent: 0, duration: 1, ease: "power3.out",})
      .to(linksRef.current,
        {autoAlpha: 1, x: 0, stagger: 0.1, duration: 0.5, ease: "power2.out",},"<")
      .to(contactRef.current,
        {autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out",},"<+0.2");

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);

      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
      >
        <div className="flex flex-col text-3xl gap-y-2 md:text-6xl lg:text-6xl">
          {["home", "about", "services", "works", "experience", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  className="transition-all duration-300 cursor-pointer hover:text-white"
                  to={`${section}`}
                  smooth
                  offset={0}
                  duration={2000}
                >
                  {section}
                </Link>
              </div>
            )
          )}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <a href="mailto:kanishk.jain0510@gmail.com" className="font-light">
            <p className="tracking-wider text-white/50">E-mail</p>
            <p className="text-xl tracking-widest lowercase text-pretty hover:underline text-white">
              kanishk.jain0510@gmail.com
            </p>
          </a>
          <a href="tel:+917877807017" className="font-light">
            <p className="tracking-wider text-white/50">Phone Number</p>
            <p className="text-xl tracking-widest lowercase text-pretty hover:underline text-white">
              +91 7877807017
            </p>
          </a>
          <div className="flex flex-col md:flex-row gap-x-4 gap-y-2">
            <p className="tracking-wider text-white/50">Socials</p>
            {socials.map((social, index) => (<a key={index} href={social.href} target="_blank" className="flex items-center gap-2 text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300">
          <SocialIcon name={social.icon} />{social.name}</a>))}
          </div>


        </div>
      </nav>
      <div className="fixed z-50 flex flex-col items-center gap-4 top-4 right-10">
      <div
        className="flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }>
        <span ref={topLineRef} className="block w-8 h-0.5 bg-white rounded-full origin-center"></span>
        <span ref={bottomLineRef} className="block w-8 h-0.5 bg-white rounded-full origin-center"></span>
      </div>
      <button className="flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white cursor-pointer rounded-full bg-black transition-all duration-300" onClick={() => {
        const link = document.createElement('a');
        link.href = '/docs/Kanishk_Jain_CV.pdf';
        link.download = 'Kanishk_Jain_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }} style={
        showBurger
        ? { clipPath: "inset(0% 0% round 9999px)" }
        : { clipPath: "inset(0% 50% round 9999px)" }}>
          Download CV
        </button>


      </div>
    </>
  );
};

export default Navbar;
