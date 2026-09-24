import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "./assets";
import { about } from "../assets/assets";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leadRef = useRef(null);
  const bodyRef = useRef(null);
  const quoteRef = useRef(null);
  const mainImgRef = useRef(null);
  const topRightImgRef = useRef(null);
  const bottomRightImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        defaults: { ease: "power3.out" },
      });

      scrollTl
        .from(headingRef.current, { opacity: 0, y: 30, duration: 0.7 })
        .from(leadRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(bodyRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(quoteRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");

      gsap.from(mainImgRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from([topRightImgRef.current, bottomRightImgRef.current], {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white" id="about" ref={sectionRef}>

      <div className="max-w-332 mx-auto grid grid-cols-[0.8fr_1.2fr] max-[960px]:grid-cols-1 gap-12 items-start pt-20 px-[clamp(1.5rem,6vw,3rem)] pb-12">
        <div>
          <h2
            ref={headingRef}
            className="font-display font-bold text-rw-green text-[clamp(2.5rem,5vw,4rem)] m-0 mb-6"
          >
            About Us
          </h2>
          <p ref={bodyRef} className="text-rw-ink leading-normal text-[1.3rem] m-0 mb-10 Montserrat">
            Every celebration is a story waiting to be told.
            At Royal Wedding and Events, we believe that every celebration big  or small  deserves to be cherished forever. We specialise in weddings, private parties and corporate events, turning your dreams into magical experiences with love, creativity and flawless attention to detail. From intimate gatherings to grand celebrations, our passionate team works closely with you to bring your story to life. We take the stress out of planning, so you can fully immerse yourself in the joy, laughter and love of the day.
          </p>
          <p
            ref={quoteRef}
            className="font-display font-bold text-rw-green text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.3] m-0"
          >
            Every celebration is a story waiting to be told.
          </p>
        </div>

        <div className="relative">
          <div className="flex aspect-auto">
            <div>
              <img
                ref={mainImgRef}
                src={about.A1}
                alt=""
                className="xl:w-100 lg:w-90 md:w-80 w-50 row-span-2 object-cover rounded-sm mt-5"
              /></div>
            <div className="absolute -right-10 top-10">
              <img
                ref={topRightImgRef}
                src={about.A2}
                alt=""
                className="xl:w-100 lg:w-90 md:w-80 w-50 object-cover rounded-sm"
              />
              <img
                ref={bottomRightImgRef}
                src={about.A3}
                alt=""
                className="xl:w-100 lg:w-90 md:w-80 w-50 object-cover rounded-sm"
              /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
