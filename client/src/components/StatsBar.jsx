import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "100+", title: "Events Produced", subtitle: "Since 2016 in Pokhara" },
  { value: "100%", title: "Own equipment and team", subtitle: "Zero middle man" },
  { value: "24hr", title: "Fast sign Printing", subtitle: "Board & Props" },
  { value: "99%", title: "Client satisfaction", subtitle: "Excellent review" },
];

export default function StatsBar() {
  const sectionRef = useRef(null);
  const valueRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      valueRefs.current.forEach((el, i) => {
        if (!el) return;

        const raw = STATS[i].value;
        // split "100+", "99%", "24hr" into numeric part + suffix
        const match = raw.match(/^(\d+)(.*)$/);
        if (!match) return; // no digits found, leave as static text

        const target = parseInt(match[1], 10);
        const suffix = match[2];

        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(counter.val) + suffix;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-4 max-[960px]:grid-cols-2 max-[560px]:grid-cols-1 gap-6 max-w-[1328px] mx-auto pt-12 px-[clamp(1.5rem,6vw,3rem)] pb-20"
    >
      {STATS.map((stat, i) => (
        <div
          className="bg-rw-surface border-2 border-white rounded-lg shadow-[0_4px_25px_rgba(0,0,0,0.1)] py-7 px-4 text-center flex flex-col gap-2 hover:bg-rw-green hover:text-white transition-all duration-500 hover:cursor-pointer"
          key={stat.title}
        >
          <p
            ref={(el) => (valueRefs.current[i] = el)}
            className="font-display font-bold text-[2.75rem] m-0 Montserrat"
          >
            0{stat.value.replace(/^\d+/, "")}
          </p>
          <p className="font-semibold m-0 Montserrat">{stat.title}</p>
          <p className="text-[0.9rem] m-0 Montserrat">{stat.subtitle}</p>
        </div>
      ))}
    </section>
  );
}