import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "./assets";
import { ArrowRight } from "lucide-react";
import { lower, upper } from "../assets/assets";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const galleryRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([headingRef.current, subRef.current], {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      const rows = galleryRef.current.querySelectorAll(":scope > div");
      rows.forEach((row) => {
        const imgs = row.querySelectorAll("img");
        gsap.from(imgs, {
          opacity: 0,
          scale: 0.85,
          y: 30,
          stagger: 0.06,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
          },
        });
      });

      gsap.from(linkRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: linkRef.current,
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-332 mx-auto pt-5 pb-20 px-[clamp(1.5rem,6vw,3rem)] flex flex-col items-center"
      id="our-work"
    >
      <div className="text-center max-w-190 mx-auto mb-6 flex flex-col gap-4">
        <h2
          ref={headingRef}
          className="font-display font-bold text-rw-green text-[clamp(2.25rem,4vw,3.5rem)] uppercase m-0"
        >
          Our Previous Work
        </h2>
        <p ref={subRef} className="text-[1.15rem] tracking-[0.01em] m-0 text-rw-ink">
          A glimpse into the mandaps, stages and entrances we have brought to life across Pokhara.
        </p>
      </div>

      <div
        ref={galleryRef}
        className="w-full flex flex-col gap-3 grayscale-100 hover:grayscale-0 transition-all duration-500"
      >
        <div className="flex flex-wrap gap-1.5 w-full items-center">
          {upper.map((src, i) => (
            <div key={i} className="flex-[1_1_160px]">
              <img
                src={src}
                alt=""
                className="w-full h-65 object-cover grayscale-[0.15]"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 w-full items-center">
          {lower.map((src, i) => (
            <div key={i} className="flex-[1_1_160px]">
              <img
                src={src}
                alt=""
                className="w-full h-65 object-cover grayscale-[0.15]"
              />
            </div>
          ))}
        </div>
      </div>

      <a
        ref={linkRef}
        href="#packages"
        className="inline-flex items-center mt-14 pb-1.5 border-b Montserrat border-rw-green text-rw-green font-sans font-medium no-underline uppercase tracking-[0.02em]"
      >
        Browse the full design catalogue
        <ArrowRight />
      </a>
    </section>
  );
}
