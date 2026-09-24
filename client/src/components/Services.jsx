import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imgs } from "../assets/assets";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Event Planning & management",
    copy: "End to end coordination so every moment unfolds without a hitch.",
    image: imgs.service0,
  },
  {
    title: "Venue Decoration",
    copy: "Mandaps, stage, entrances and signage styled to your story.",
    image: imgs.service1,
  },
  {
    title: "Corporate & Private events",
    copy: "Launches, galas and intimate gatherings, beautifully run.",
    image: imgs.service2,
  },
  {
    title: "Photography & Videography",
    copy: "Cinematic films and timeless frames of your day.",
    image: imgs.service3,
  },
  {
    title: "Artist Management",
    copy: "Musicians, performers and hosts, curated for you.",
    image: imgs.service4,
  },
  {
    title: "Sound & Lights",
    copy: "Immersive audio and lighting that set the mood.",
    image: imgs.service5,
  },
  {
    title: "Makeup & Mehendi Artists",
    copy: "Bridal looks and intricate henna by trusted artists.",
    image: imgs.service7,
  },
  {
    title: "Catering Services",
    copy: "Menus crafted to delight every guest.",
    image: imgs.service6,
  },
];

function ServiceCard({ service }) {
  const cardRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <article
      ref={cardRef}
      className="group bg-rw-surface shadow-[0_0_12.5px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden"
    >
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-contain object-bottom origin-bottom grayscale scale-75 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-100"
        />
      </div>

      <div className="flex-1 p-6 text-center text-rw-green transition-colors duration-500 group-hover:text-white group-hover:bg-rw-green">
        <h3 className="Montserrat font-display text-[1.4rem] m-0 mb-3">
          {service.title}
        </h3>

        <p className="Montserrat m-0 text-[0.95rem] leading-[1.45]">
          {service.copy}
        </p>
      </div>
    </article>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);

  useGSAP(
    () => {
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
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="max-w-300 mx-auto pt-5 pb-20 px-[clamp(1.5rem,6vw,3rem)]"
      id="services"
    >
      <div className="text-center max-w-190 mx-auto mb-10 flex flex-col gap-4">
        <h2
          ref={headingRef}
          className="font-display font-bold text-rw-green text-[clamp(2.25rem,4vw,3.5rem)] uppercase m-0"
        >
          Our Service
        </h2>
        <p
          ref={subRef}
          className="text-[1.15rem] tracking-[0.01em] m-0 text-rw-ink"
        >
          You dream it. We plan it. Together, we make it unforgettable.
        </p>
      </div>

      <div className="grid grid-cols-3 max-[800px]:grid-cols-2 max-[560px]:grid-cols-1 gap-x-6 gap-y-8">
        {SERVICES.map((service) => (
          <ServiceCard
            service={service}
            key={service.title}
          />
        ))}
      </div>
    </section>
  );
}