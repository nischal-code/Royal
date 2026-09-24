import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LinePic() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wrapperRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
          defaults: {
            ease: "power3.out",
          },
        })
        .from(line1Ref.current, {
          opacity: 0,
          y: 25,
          duration: 0.7,
        })
        .from(
          line2Ref.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="
        mx-auto w-full max-w-[1200px]
        px-4 pb-14
        sm:px-6 sm:pb-16
        md:px-8
        lg:px-10 lg:pb-20
      "
    >
      {/* Image Section */}
      <div
        ref={wrapperRef}
        className="
          relative
          flex
          min-h-[420px]
          items-center
          justify-center
          overflow-hidden
          sm:min-h-[500px]
          md:min-h-[580px]
          lg:min-h-screen
        "
      >
        {/* Background Image */}
        <img
          src="/line.png"
          alt=""
          className="
            absolute inset-0
            h-full w-full
            object-cover object-center
            transition-transform duration-700
            hover:scale-110
            sm:hover:scale-110
            lg:hover:scale-115
          "
        />

        {/* Text */}
        <div
          className="
            relative z-10
            mx-4
            bg-white
            px-3 py-2
            text-center
            font-display
            font-bold
            uppercase
            text-rw-green
            text-[clamp(1.4rem,5vw,2.5rem)]
            leading-[1.05]
            sm:px-5 sm:py-3
            md:px-6 md:py-4
          "
        >
          <div ref={line1Ref}>
            Every beautiful celebration
          </div>

          <div ref={line2Ref}>
            Starts with a conversation.
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        className="
          mx-auto
          mt-8
          max-w-[900px]
          px-2
          text-center
          text-base
          leading-relaxed
          text-rw-green
          sm:mt-10
          sm:px-4
          sm:text-lg
          md:text-xl
          lg:mt-12
          lg:text-2xl
        "
      >
        Share your dreams and vision, and let us gently shape them
        into a wedding filled with elegance and unforgettable moments.
      </div>
    </section>
  );
}