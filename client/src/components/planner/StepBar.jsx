import React from "react";

const STEP_CONFIG = {
  details: { back: null, next: "select", nextLabel: "Continue - Select" },
  select: { back: "details", next: "reference", nextLabel: "Continue - References" },
  reference: { back: "select", next: "review", nextLabel: "Continue - Review" },
  review: { back: "reference", next: null, nextLabel: "Submit Info" },
};

export default function StepBar({
  view,
  setView,
  selected,
  onSubmit,
  submitting,
}) {
  const config = STEP_CONFIG[view];

  if (!config) return null;

  const isReview = view === "review";

  const label =
    view === "select"
      ? selected?.length
        ? `${selected.length} designs selected`
        : "Build your event design brief"
      : "Build your event design brief";

  const handleNext = () => {
    if (isReview) {
      onSubmit?.();
    } else if (config.next) {
      setView(config.next);
    }
  };

  return (
    <div className="sticky bottom-3 sm:bottom-4 z-30 mx-2 sm:mx-4 md:mx-auto mt-4 sm:mt-6 flex w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:w-full max-w-6xl flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 rounded-md bg-white/90 px-3 sm:px-5 md:px-8 py-3 sm:py-4 shadow-lg backdrop-blur">
      
      <p className="min-w-0 text-center sm:text-left font-serif text-sm sm:text-base md:text-lg leading-tight">
        {label}
      </p>

      <div className="flex w-full sm:w-auto shrink-0 gap-2 sm:gap-3">
        {config.back && (
          <button
            type="button"
            disabled={submitting}
            onClick={() => setView(config.back)}
            className="Montserrat flex-1 sm:flex-none min-w-[90px] border border-[#235a3f] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm text-[#235a3f] transition-colors duration-300 hover:bg-[#235a3f]/10 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>
        )}

        <button
          type="button"
          disabled={submitting}
          onClick={handleNext}
          className="Montserrat flex-1 sm:flex-none min-w-[150px] sm:min-w-0 bg-[#235a3f] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm text-white transition-colors duration-300 hover:bg-[#1c4832] hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isReview && submitting ? "Submitting…" : config.nextLabel}
        </button>
      </div>
    </div>
  );
}