import React from "react";

// Single source of truth for the bottom nav bar on every planner step.
const STEP_CONFIG = {
  details: {
    back: null,
    next: "select",
    nextLabel: "Continue - Select",
  },
  select: {
    back: "details",
    next: "reference",
    nextLabel: "Continue - References",
  },
  reference: {
    back: "select",
    next: "review",
    nextLabel: "Continue - Review",
  },
  review: {
    back: "reference",
    next: null,
    nextLabel: "Submit Info",
  },
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
    view === "select" && selected ? (
      selected.length === 0 ? (
        "Build your event design brief"
      ) : (
        <span className="text-neutral-500">
          {selected.length} designs selected
        </span>
      )
    ) : (
      "Build your event design brief Selected"
    );

  const handleNext = () => {
    if (isReview) {
      onSubmit?.();
    } else if (config.next) {
      setView(config.next);
    }
  };

  return (
    <div
      className="
        sticky
        bottom-3
        sm:bottom-4
        z-30
        mt-4
        sm:mt-6

        mx-2
        sm:mx-4
        md:mx-auto

        w-[calc(100%-1rem)]
        sm:w-[calc(100%-2rem)]
        md:w-full
        max-w-6xl

        flex
        flex-col
        sm:flex-row

        items-stretch
        sm:items-center

        justify-between

        gap-3
        sm:gap-4

        rounded-md

        bg-white/90
        px-3
        sm:px-5
        md:px-8

        py-3
        sm:py-4

        shadow-lg
        backdrop-blur
      "
    >
      {/* Label */}
      <p
        className="
          font-serif

          text-sm
          sm:text-base
          md:text-lg

          text-center
          sm:text-left

          leading-tight

          min-w-0
        "
      >
        {label}
      </p>

      {/* Buttons */}
      <div
        className="
          flex
          w-full
          sm:w-auto

          gap-2
          sm:gap-3

          shrink-0
        "
      >
        {config.back && (
          <button
            type="button"
            disabled={submitting}
            onClick={() => setView(config.back)}
            className="
              Montserrat

              flex-1
              sm:flex-none

              min-w-[90px]

              border
              border-[#235a3f]

              px-4
              sm:px-5
              md:px-6

              py-2
              sm:py-2.5

              text-xs
              sm:text-sm

              text-[#235a3f]

              transition-colors
              duration-300

              hover:bg-[#235a3f]/10
              hover:cursor-pointer
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Back
          </button>
        )}

        <button
          type="button"
          disabled={submitting}
          onClick={handleNext}
          className="
            Montserrat

            flex-1
            sm:flex-none

            min-w-[150px]
            sm:min-w-0

            px-4
            sm:px-5
            md:px-6

            py-2
            sm:py-2.5

            text-xs
            sm:text-sm

            text-white

            bg-[#235a3f]

            transition-colors
            duration-300

            hover:bg-[#1c4832]
            hover:cursor-pointer
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {isReview && submitting ? "Submitting…" : config.nextLabel}
        </button>
      </div>
    </div>
  );
}