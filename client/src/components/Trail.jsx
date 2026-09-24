import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Trail() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".box", {
        opacity: 0,
        y: 100,
        duration: 1,

        scrollTrigger: {
          trigger: ".box",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <div ref={sectionRef}>
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">Scroll Down ↓</h1>
      </div>

      <div className="h-screen flex items-center justify-center">
        <div className="box w-64 h-64 bg-black text-white flex items-center justify-center">
          Hello GSAP
        </div>
      </div>
    </div>
  );
}