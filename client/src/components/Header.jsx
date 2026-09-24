import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { images } from "./assets";
import { useNavigate } from "react-router-dom";


const NAV_LINKS = ["About", "Our Work", "Services", "Packages", "Review" , "Contact"];

export default function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const ctaRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(logoRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.7,
      })
        .from(
          navRef.current ? navRef.current.querySelectorAll("li") : [],
          {
            opacity: 0,
            y: -14,
            stagger: 0.08,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            scale: 0.85,
            duration: 0.5,
          },
          "-=0.3"
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-2 flex items-center justify-between gap-6 pt-4 pb-2 px-[clamp(1.5rem,6vw,7rem)]"
    >
      <a href="/" ref={logoRef}>
        <img src="Logo.png" alt="Royal Wedding & Events" width={120} className="" />
      </a>

      <nav className="max-[960px]:hidden" aria-label="Primary" ref={navRef}>
        <ul className="flex gap-[clamp(1.25rem,3vw,3.5rem)] list-none m-0 p-0">
          {NAV_LINKS.map((label) => (
            <li key={label}>
              <a
                href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="Montserrat text-rw-gold font-sans font-medium text-[0.95rem] tracking-[0.04em] no-underline"
              >
                {label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        onClick={()=>{navigate('/plan')}}
        ref={ctaRef}
        className="Montserrat inline-flex items-center cursor-pointer justify-center px-5.5 py-2.5 font-sans text-base tracking-[0.02em] no-underline transition-colors duration-200 ease-in-out bg-rw-green text-white hover:bg-rw-green-dark whitespace-nowrap"
      >
        Plan Your Events
      </a>
    </header>
  );
}
