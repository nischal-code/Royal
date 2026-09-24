import React from "react";
import StepBar from "./StepBar";

const VENUE_OPTIONS = [
  ["Package", "Wedding Package"],
  ["Package", "Reception Package"],
  ["Tier", "Bronze"],
  ["Tier", "Silver"],
  ["Tier", "Gold"],
  ["Tier", "Platinum"],
  ["Tier", "Diamond"],
];

const inputClass =
  "Montserrat h-10.5 w-full border border-[#79b3a3] bg-white px-3 text-[15px] text-black outline-none transition-colors placeholder:text-[#d2d2d2] focus:border-[#00664d] focus:ring-0 sm:text-[16px]";

function FormField({ label, placeholder, type = "text", fullWidth, value, onChange }) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="Montserrat mb-2 block text-[15px] leading-none text-[#00664d] sm:text-[16px] md:text-[17px]">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className={inputClass}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default function DetailsPanel({ view, setView, details, setDetails, pkg, setPkg }) {
  const fields = [
    ["client", "Name", "Eg. Aayush Gurung"],
    ["partner", "Partner / family Name", "Eg. Sneha Thapa"],
    ["date", "Event Date", "Day-Month-Year","date" ],
    ["venue", "Venue / Location", "Eg. Rupakot"],
    ["guests", "No. of Guest (Approx)", "Eg. 200", "number"],
    ["phone", "Contact", "Enter your number...", "tel"],
    ["email", "Email", "Enter your email...", "email", true],
  ];

  const handleChange = (key) => (e) => {
    setDetails((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <section className="w-full relative bg-white pb-15">
      <div className="mx-auto w-full max-w-307.5 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-0">

        {/* Header */}
        <div className="max-w-250">
          <h1 className="font-serif text-[32px] font-semibold leading-[1.1] tracking-[-1px] text-[#005b43] sm:text-[38px] md:text-[48px] lg:text-[56px] lg:tracking-[-1.5px]">
            Tell us about your celebration
          </h1>

          <p className="mt-4 max-w-[900px] font-serif text-[17px] leading-[1.4] text-black sm:mt-5 sm:text-[19px] md:text-[22px] lg:text-[25px] lg:leading-[1.35]">
            A few details so your planner can shape the perfect event around
            you. Everything you enter is saved automatically.
          </p>
        </div>

        {/* Form */}
        <form className="Montserrat mt-9 w-full max-w-191.25 sm:mt-11 md:mt-12 lg:mt-14">
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:gap-x-[22px]">
            {fields.map(([key, label, placeholder, type, fullWidth]) => (
              <FormField
                key={key}
                label={label}
                placeholder={placeholder}
                type={type}
                fullWidth={fullWidth}
                value={details[key] ?? ""}
                onChange={handleChange(key)}
              />
            ))}
          </div>
        </form>

        {/* Venue Decoration */}
        <section className="mt-10 w-full py-2 sm:mt-12 md:mt-14">
          <h2 className="mb-4 font-serif text-[17px] text-[#006b4f] sm:text-[18px]">
            Venue Decoration
          </h2>

          <div className="flex w-full gap-2 overflow-x-auto pb-2 sm:gap-[9px] md:flex-wrap md:overflow-visible md:pb-0">
            {VENUE_OPTIONS.map(([type, name]) => {
              const active = pkg === name;

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setPkg(name)}
                  className={`relative flex h-[100px] w-[165px] shrink-0 flex-col justify-center rounded-md border px-3 text-left transition-all duration-200 sm:w-[150px] md:w-[145px] lg:w-[150px] ${
                    active
                      ? "border-[#005b43] bg-gradient-to-br from-[#002f24] to-[#005a3c] text-white"
                      : "border-[#e5e5e5] text-[#006b4f] hover:border-[#006b4f]"
                  }`}
                >
                  <span
                    className={`Montserrat text-sm leading-none ${
                      active ? "text-[#d6bb8c]" : "text-[#b99b6b]"
                    }`}
                  >
                    {type}
                  </span>

                  <span className="Montserrat mt-1 text-lg font-medium leading-[1.1] sm:text-[16px] md:text-[17px]">
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
        <StepBar view={view} setView={setView} />
    </section>
  );
}