import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { submitContactEnquiry } from "../lib/api";

gsap.registerPlugin(ScrollTrigger);

const initialForm = { name: "", email: "", phone: "", eventDate: "", message: "" };

const inputClasses =
  "font-sans text-base py-[0.65rem] px-[0.75rem] border border-[#d8d8d8] rounded-[2px] text-rw-ink bg-white focus:outline-2 focus:outline-offset-1 focus:outline-[#005b3d]";

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const formRef = useRef(null);
  const statusRef = useRef(null);

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

      const fields = formRef.current.querySelectorAll("label, button");
      gsap.from(fields, {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (status.state === "success" || status.state === "error") {
      gsap.fromTo(
        statusRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [status.state]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });

    try {
      await submitContactEnquiry(form);
      setStatus({ state: "success", message: "Thanks! We'll be in touch soon." });
      setForm(initialForm);
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  }

  return (
    <section
      ref={sectionRef}
      className="max-w-[760px] mx-auto pt-20 px-[clamp(1.5rem,6vw,3rem)] pb-24"
      id="contact"
    >
      <div className="text-center max-w-[760px] mx-auto mb-14 flex flex-col gap-4">
        <h2
          ref={headingRef}
          className="font-display font-bold text-rw-green text-[clamp(2.25rem,4vw,3.5rem)] uppercase m-0"
        >
          Plan Your Event
        </h2>
        <p ref={subRef} className="text-[1.15rem] tracking-[0.01em] m-0 text-rw-ink">
          Tell us a little about your celebration and we'll get back to you.
        </p>
      </div>

      <form ref={formRef} className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-5">
          <label className="flex flex-col gap-[0.4rem] text-[0.9rem] font-medium text-rw-green">
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </label>
          <label className="flex flex-col gap-[0.4rem] text-[0.9rem] font-medium text-rw-green">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </label>
        </div>

        <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-5">
          <label className="flex flex-col gap-[0.4rem] text-[0.9rem] font-medium text-rw-green">
            Phone
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputClasses}
            />
          </label>
          <label className="flex flex-col gap-[0.4rem] text-[0.9rem] font-medium text-rw-green">
            Event date
            <input
              type="date"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              className={inputClasses}
            />
          </label>
        </div>

        <label className="flex flex-col gap-[0.4rem] text-[0.9rem] font-medium text-rw-green">
          Message
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </label>

        <button
          type="submit"
          disabled={status.state === "loading"}
          className="inline-flex items-center justify-center px-[22px] py-[14px] font-sans text-base tracking-[0.02em] no-underline transition-colors duration-200 ease-in-out bg-rw-green text-white hover:bg-rw-green-dark self-start border-none cursor-pointer disabled:opacity-70 disabled:cursor-wait"
        >
          {status.state === "loading" ? "Sending…" : "Send Enquiry"}
        </button>

        {status.state === "success" && (
          <p ref={statusRef} className="m-0 text-[0.95rem] text-rw-green">
            {status.message}
          </p>
        )}
        {status.state === "error" && (
          <p ref={statusRef} className="m-0 text-[0.95rem] text-[#b3261e]">
            {status.message}
          </p>
        )}
      </form>
    </section>
  );
}
