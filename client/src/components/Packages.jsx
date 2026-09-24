import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from "gsap/all";
import { ArrowRight } from "lucide-react";
import { packages } from "../assets/assets";
gsap.registerPlugin(ScrollTrigger)

const TIERS = [
  {
    name: "Diamond",
    copy: "The pinnacle : our most comprehensive, no detail spared experience.",
    featured: true,
    badge: "Most popular",
    link: packages.Diamond
  },
  {
    name: "Platinum",
    copy: "Grand-scale design with bespoke detailing throughout.",
    link: packages.Platinum
  },
  {
    name: "Gold",
    copy: "A lavish set-up with premium florals and lighting.",
    link: packages.Gold
  },
  {
    name: "Silver",
    copy: "Elevated décor and coordination for mid-size events.",
    link: packages.Silver
  },
  {
    name: "Bronze",
    copy: "A refined essentials package for intimate celebrations.",
    link: packages.Bronze
  },
];

const PACKAGE_CATALOGS = [
  {
    name: "Wedding Package",
    copy: "The pinnacle : our most comprehensive, no detail spared experience.",
    featured: true,
    link: "sth"
  },
  {
    name: "Reception Package",
    copy: "An elegant evening reception, styled end to end.",
    link: "sth"
  },
];

function TierCard({ tier }) {
  const scrollRef = useRef();
  const featured = tier.featured;

  useGSAP(()=>{

  },[])

  return (
    <div
      className={`relative shadow-[0_0_12.5px_rgba(0,0,0,0.05)] p-6 flex flex-col justify-between gap-6 min-h-[190px] rounded-md transition-colors duration-500 ${
        featured
          ? "bg-gradient-to-br from-[#002f24] to-[#005a3c] hover:from-[#005a3c] hover:to-[#002f24] text-white"
          : "group bg-white text-rw-green hover:bg-[#C9AF82]"
      }`}
    >
      {tier.badge && (
        <span className="absolute -top-[14px] right-0 bg-rw-gold text-rw-green-dark text-[0.85rem] font-semibold py-1 px-3 rounded-t-lg">
          {tier.badge}
        </span>
      )}
      <div>
        <h4
          className={`Montserrat font-display text-[1.75rem] m-0 mb-2 ${
            featured
              ? "text-rw-gold"
              : "text-rw-green group-hover:text-white"
          }`}
        >
          {tier.name}
        </h4>

        <p
          className={`Montserrat m-0 text-[0.95rem] leading-[1.4] max-w-70 ${
            featured
              ? "text-white"
              : "text-rw-ink group-hover:text-white"
          }`}
        >
          {tier.copy}
        </p>
      </div>
      <a
        href={tier.link}
        className={`Montserrat absolute right-4 bottom-4 inline-flex items-center gap-[10px] pb-[6px] border-b normal-case text-[0.95rem] font-sans font-medium no-underline tracking-[0.02em] ${
          featured
            ? "text-white border-white"
            : "text-rw-green border-rw-green group-hover:text-white group-hover:border-white"
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Catelogs
        <ArrowRight
          className={featured ? "text-white" : "text-rw-green group-hover:text-white"}
        />
      </a>
    </div>
  );
}

export default function Packages() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const tierHeadingRef = useRef(null);
  const tierGridRef = useRef(null);
  const pkgHeadingRef = useRef(null);
  const pkgGridRef = useRef(null);
  return (
    <section
      ref={sectionRef}
      className="max-w-332 mx-auto pt-20 px-[clamp(1.5rem,6vw,3rem)] pb-6 flex flex-col gap-4"
      id="packages"
    >
      <div className="text-center max-w-190 mx-auto mb-6 flex flex-col gap-4">
        <h2
          ref={headingRef}
          className="font-display font-bold text-rw-green text-[clamp(2.25rem,4vw,3.5rem)] uppercase m-0"
        >
          Packages &amp; Catalogs
        </h2>
        <p ref={subRef} className="text-[1.15rem] tracking-[0.01em] m-0 text-rw-ink">
          From signature wedding productions to curated tiers, find the experience that fits your
          celebration.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <h3 ref={tierHeadingRef} className="font-display font-bold text-rw-green text-[1.75rem] m-0">
          Tier Catalogs
        </h3>
        <div ref={tierGridRef} className="grid grid-cols-3 max-[960px]:grid-cols-1 gap-4">
          {TIERS.map((tier) => (
            <TierCard tier={tier} key={tier.name} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h3 ref={pkgHeadingRef} className="font-display font-bold text-rw-green text-[1.75rem] m-0">
          Package Catalogs
        </h3>
        <div ref={pkgGridRef} className="grid grid-cols-2 max-[960px]:grid-cols-1 gap-4">
          {PACKAGE_CATALOGS.map((pkg) => (
            <TierCard tier={pkg} key={pkg.name} />
          ))}
        </div>
      </div>
    </section>
  );
}