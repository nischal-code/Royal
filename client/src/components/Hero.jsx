import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Header from "./Header";
import { assets } from "../assets/assets.js";

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const paraRef = useRef(null);
  const btnsRef = useRef(null);
  const bottomTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        videoRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
      )
        .from(overlayRef.current, { opacity: 0, duration: 1 }, "-=1.2")
        .from(
          titleLine1Ref.current,
          { opacity: 0, y: 40, duration: 0.9 },
          "-=0.8"
        )
        .from(
          titleLine2Ref.current,
          { opacity: 0, y: 30, duration: 0.8 },
          "-=0.6"
        )
        .from(
          paraRef.current,
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.5"
        )
        .from(
          btnsRef.current ? btnsRef.current.children : [],
          { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 },
          "-=0.4"
        )
        .from(
          bottomTextRef.current,
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] overflow-hidden flex flex-col justify-start bg-[linear-gradient(180deg,#6b6355_0%,#a8a495_55%,#cfcabf_100%)]"
      id="top"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-[50%_65%]"
      >
        <source src={assets.wed} type="video/mp4" />
      </video>
      {/* Dark overlay above video */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom_right,rgba(33,33,33,0.8)_0%,rgba(77,46,0,0.5)_100%)]"
      />
      <Header />
      <div className="relative z-2 flex-1 flex flex-col items-center justify-center text-center gap-8 pt-50 px-6 pb-24">
        <h1 className="m-0 flex flex-col gap-1 font-display leading-none">
          <span
            ref={titleLine1Ref}
            className="text-rw-gold Bodoni font-bold text-[clamp(3rem,9vw,7.5rem)]"
          >
            Royal Wedding
          </span>
          <span
            ref={titleLine2Ref}
            className="text-white Bodoni font-medium text-[clamp(1.75rem,4vw,3.25rem)]"
          >
            &amp; Events
          </span>
        </h1>

        <p
          ref={paraRef}
          className="max-w-160 text-white font-display italic text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.55] m-0"
        >
          Creating a fairytale wedding for you, where every flower, light and
          detail tells your story.
        </p>

        <div ref={btnsRef} className="flex flex-wrap justify-center gap-6">
          <a
            href="/plan"
            className="inline-flex items-center justify-center px-5.5 py-[14px] font-sans text-base tracking-[0.02em] no-underline transition-colors duration-200 ease-in-out bg-rw-green text-white hover:bg-rw-green-dark"
          >
            Build Your Dream Event
          </a>

          <a
            href="#our-work"
            className="inline-flex items-center justify-center px-5.5 py-[14px] font-sans text-base tracking-[0.02em] no-underline transition-colors duration-200 ease-in-out bg-transparent text-white border border-white hover:bg-white/[0.12]"
          >
            Explore Design
          </a>
        </div>
      </div>

      <p
        ref={bottomTextRef}
        className="relative z-2 text-center text-white font-display font-bold text-[clamp(1.75rem,5vw,3rem)] leading-[1.2] px-6 pt-0 pb-16 mb-3 m-0"
      >
        Your story. <br />
        Your Celebration. Your joy.
      </p>
      <div className="absolute bottom-0 left-1/2 h-32 w-[130%] -translate-x-1/2 rounded-[50%_50%_0_0] bg-gradient-to-b from-transparent via-white/100 to-white">
        
      </div>
    </section>
  );
}
