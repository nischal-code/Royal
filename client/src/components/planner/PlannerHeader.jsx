import React from "react";
import { CircleDot } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PlannerHeader({ view }) {
  const head = [
    "Event Details",
    "Choose Designs",
    "References",
    "Review & Send",
  ];

  const views = ["details", "select", "reference", "review"];

  // Index of the step the user is currently on
  const currentIndex = views.indexOf(view);

  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div
        className="
          max-w-[1180px] mx-auto
          px-3 sm:px-5 lg:px-6
          py-2 sm:py-3 lg:py-4
          flex flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-3 lg:gap-6
        "
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="
            cursor-pointer
            shrink-0
            flex
            justify-center
            lg:justify-start
          "
        >
          <img
            src="/Logo.png"
            alt="Royal Wedding Logo"
            className="
              w-12
              sm:w-25
              md:w-25
              lg:w-25
              h-auto
              object-contain
            "
          />
        </div>

        {/* Steps */}
        <nav
          className="
            w-full
            lg:w-auto
            overflow-x-auto
            scrollbar-none
            [&::-webkit-scrollbar]:hidden
          "
        >
          <ul
            className="
              flex
              items-center
              justify-center
              lg:justify-end
              gap-1.5
              sm:gap-2
              md:gap-3
              min-w-max
            "
          >
            {head.map((H, I) => {
              // Current step AND all previous (completed) steps are active
              const active = I <= currentIndex;

              return (
                <li
                  key={H}
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    sm:gap-2

                    px-2.5
                    sm:px-3
                    md:px-4

                    py-2
                    sm:py-2.5
                    md:py-3

                    text-[10px]
                    sm:text-xs
                    md:text-sm
                    lg:text-base

                    whitespace-nowrap
                    shrink-0
                    rounded-sm

                    Montserrat
                    transition-colors
                    duration-300

                    ${
                      active
                        ? "bg-rw-green text-white"
                        : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  <CircleDot
                    size={14}
                    className="sm:w-4 sm:h-4 shrink-0"
                    strokeWidth={4}
                  />

                  <span className="Montserrat">{H}</span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}