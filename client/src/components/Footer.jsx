import React from "react";


const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/royalweddingandeventspvtltd/",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block h-[22px] w-[22px]">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r=".6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100064907957688",
    svg: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="block h-[22px] w-[22px]">
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@royalweddingandevents",
    svg: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="block h-[22px] w-[22px]">
        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/9779856058512",
    svg: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="block h-[22px] w-[22px]">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33s.034-.248-.015-.347c-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
      </svg>
    ),
  },
];

const exploreLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Plan Your Event", href: "#plan" },
];

const linkClass =
  "underline decoration-1 underline-offset-2 transition-colors hover:text-[#d9bd8b] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#d9bd8b]";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#265c44] px-6 pb-[30px] pt-12 font-['Figtree',ui-sans-serif,system-ui,sans-serif] text-[14.5px] leading-[21px] text-white lg:pt-[68px]">
      <div className="mx-auto max-w-[1221px]">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1fr_1.018fr_auto]">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" aria-label="Royal Wedding & Events — home" className="flex items-center gap-[11px] no-underline">
              <img src="/Logo.png" alt=""  width={70}/>
              <span className="flex flex-col text-[#d9bd8b]">
                <span className="text-[20px] font-normal uppercase leading-5 tracking-[0.01em]">
                  Royal Wedding
                </span>
                <span className="mt-0.5 text-[10.5px] uppercase leading-3 tracking-[0.02em] text-[#efe6d2]">
                  &amp; Events
                </span>
              </span>
            </a>

            <p className="mt-1 max-w-[390px]">
              The most experienced wedding management company in Pokhara{"\u00A0"} crafting fairytale
              celebrations for six years.
            </p>

            <div className="mt-7 flex gap-[11px] lg:mt-[90px]">
              {socials.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block leading-none text-white transition-colors hover:text-[#d9bd8b] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#d9bd8b]"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Get in touch */}
          <div>
            <h3 className="mb-5 text-[14px] font-bold uppercase leading-[21px] tracking-[0.02em] text-[#d9bd8b] gap-5">Get in touch</h3>
            <p>New Road, Pokhara, Nepal</p>
            <p className="mt-[21px] flex flex-col gap-5">
              <a href="tel:+9779856058512" className={linkClass}>+977 9856058512</a>{" "}
              <a href="mailto:info@royalwedding.com.np" className={linkClass}>info@royalwedding.com.np</a>
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-5 text-[14px] font-bold uppercase leading-[21px] tracking-[0.02em] text-[#d9bd8b]">Explore</h3>
            <ul className="flex flex-col gap-3">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={linkClass}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t-[1.5px] border-[#d9bd8b]/40 pt-[29px] text-center lg:mt-[59px]">
          <p>© {new Date().getFullYear()} Royal Wedding And Events · New Road, Pokhara, Nepal</p>
        </div>
      </div>
    </footer>
  );
}