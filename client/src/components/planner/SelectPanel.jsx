import { useEffect, useMemo, useState } from "react";
import { imgs as images } from "../../Imgs/img.js";
import StepBar from "./StepBar";

// Top-level: which celebration (Haldi, Mehendi, Wedding, Reception)
const CELEBRATIONS = Object.keys(images);

// Short code used to build the label shown on hover, e.g. "H-EN1", "W-MN3"
const CELEBRATION_PREFIX = {
  Haldi: "H",
  Mehendi: "M",
  Wedding: "W",
  Reception: "R",
};

const CATEGORY_PREFIX = {
  Entrance: "EN",
  Mandap: "MN",
  Photobooth: "PB",
  Signage: "SG",
  Stage: "ST",
};

// Eyebrow label shown at the top of the special-request modal
const CATEGORY_LABEL = {
  Entrance: "Welcome Entrance",
  Mandap: "Wedding Mandap",
  Photobooth: "Fun Photobooth",
  Signage: "Welcome Signage",
  Stage: "Stage",
};

// Text shown on the small filter pills (keys must match the keys in img.js)
const FILTER_LABEL = {
  Entrance: "Entrance Decor",
  Mandap: "Mandap",
  Photobooth: "Photobooth",
  Signage: "Welcome signage",
  Stage: "Stage & Backdrop",
};

function DesignCard({ src, hoverSrc, category, code, isSelected, onToggle }) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onToggle}
      className={`group relative block aspect-6/7 w-full cursor-pointer overflow-hidden bg-neutral-100 text-left transition-all duration-300
      ${isSelected ? "ring-4 ring-[#dcb46e] rounded-2xl " : ""
        }`}
    >
      {/* Layer 1: resting image, fades out on hover */}
      <img
        src={src}
        alt={`${category} design ${code}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
      />

      {/* Layer 2: hover image, fades in (zooms slightly if no separate hoverSrc) */}
      <img
        src={hoverSrc ?? src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-500 ease-in-out group-hover:opacity-100 ${hoverSrc ? "" : "origin-bottom scale-100 group-hover:scale-125"
          }`}
      />

      {/* Layer 3: dark gradient, heavier at the bottom */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/85 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />

      {/* Code label */}
      <span className="pointer-events-none absolute bottom-4 left-5 translate-y-1 text-sm uppercase tracking-[0.15em] text-white/90 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
        Code : {code}
      </span>

      {/* Selected badge */}
      {isSelected && (
        <span className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#dcb46e] text-sm text-white">
          ✓
        </span>
      )}
    </button>
  );
}

function BookmarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function RequestModal({ item, note, onNoteChange, onSave, onCancel }) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative flex w-full items-center max-w-3xl overflow-hidden flex-col md:flex-row rounded-2xl bg-white shadow-2xl">
        <div className="block w-2/5 shrink-0 ">
          <img
            src={item.src}
            alt={`${item.category} design ${item.code}`}
            className="rounded-xl h-full w-full object-cover md:pl-2 md:py-2"
          />
        </div>

        {/* Right: request form */}
        <div className="relative flex w-full flex-col p-8 sm:w-3/5">

          <p className="text-sm font-medium uppercase tracking-wide text-[#dcb46e]">
            {item.celebration} · {CATEGORY_LABEL[item.category] ?? item.category}
          </p>

          <label className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 Montserrat">
            Add special request
          </label>
          <textarea
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="e.g. Make the flowers red instead of white · add fairy lights, use our family colours · larger entrance arch..."
            rows={5}
            className="Montserrat mt-3 w-full resize-none rounded-lg border border-[#235a3f]/30 p-4 text-sm text-neutral-800 outline-none transition-colors focus:border-[#235a3f]"
          />

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onSave}
              className="flex items-center gap-2 rounded-md bg-[#235a3f] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#1b4731] Montserrat"
            >
              <BookmarkIcon />
              Add
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-[#235a3f] px-5 py-2.5 text-sm text-[#235a3f] transition-colors hover:bg-[#235a3f]/5 Montserrat"
            >
              Cancel
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="hover:cursor-pointer absolute right-5 top-5 text-neutral-400 transition-colors hover:text-neutral-600 bg-white rounded-full flex justify-center items-center"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default function SelectPanel({ view, setView, selections, setSelections }) {
  const selected = Array.isArray(selections) ? selections : [];

  // Step 1: which celebration (Haldi / Mehendi / Wedding / Reception)
  const [activeCelebration, setActiveCelebration] = useState(CELEBRATIONS[0]);
  // Step 2: which sub-category within that celebration (null = show all)
  const [activeCategory, setActiveCategory] = useState(null);
  // Whether the sub-category filter row is open
  const [showFilters, setShowFilters] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");

  // Sub-categories available for the currently selected celebration
  const subCategories = useMemo(
    () => Object.keys(images[activeCelebration] ?? {}),
    [activeCelebration]
  );

  // Reset the sub-category filter whenever the celebration changes,
  // since each celebration doesn't necessarily share the same sub-categories
  // (e.g. only Wedding has "Mandap").
  useEffect(() => {
    setActiveCategory(null);
  }, [activeCelebration]);

  const visibleImages = useMemo(() => {
    const categoriesToShow = activeCategory ? [activeCategory] : subCategories;
    return categoriesToShow.flatMap((category) =>
      (images[activeCelebration]?.[category] ?? []).map((src, index) => ({
        id: `${activeCelebration}-${category}-${index}`,
        celebration: activeCelebration,
        category,
        src,
        code: `${CELEBRATION_PREFIX[activeCelebration] ?? activeCelebration.slice(0, 1).toUpperCase()}-${CATEGORY_PREFIX[category] ?? category.slice(0, 2).toUpperCase()
          }${index + 1}`,
      }))
    );
  }, [activeCelebration, activeCategory, subCategories]);

  const selectCelebration = (celebration) => setActiveCelebration(celebration);

  const toggleCategory = (category) =>
    setActiveCategory((prev) => (prev === category ? null : category));

  // Deselecting removes immediately; selecting opens the request modal first
  const handleToggle = (item) => {
    const alreadySelected = selected.some((s) => s.id === item.id);
    if (alreadySelected) {
      setSelections((prev) => (prev ?? []).filter((s) => s.id !== item.id));
      return;
    }
    setPendingItem(item);
    setNoteDraft("");
  };

  const confirmSelection = () => {
    if (!pendingItem) return;
    setSelections((prev) => [
      ...(prev ?? []),
      { ...pendingItem, note: noteDraft },
    ]);
    setPendingItem(null);
    setNoteDraft("");
  };

  const cancelSelection = () => {
    setPendingItem(null);
    setNoteDraft("");
  };

  const pillBase = "border px-3 py-1 text-[11px] transition-colors hover:cursor-pointer Montserrat";
  const pillActive = "border-[#235a3f] bg-[#235a3f] text-white";
  const pillIdle =
    "border-neutral-300 text-neutral-500 hover:border-[#235a3f] hover:text-[#235a3f]";

  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-40 pt-6">
      <header className="mb-8">
        <h1 className="font-serif text-5xl font-bold text-[#235a3f] md:text-5xl">
          Choose designs for each day
        </h1>
        <p className="mt-4 max-w-208 font-serif text-xl text-neutral-900">
          Tap any photo to add it to a day and request changes: “make the
          florals red instead of white”, and so on. Select the same design for
          more than one day if you love it.
        </p>
      </header>

      {/* Step 1: Celebration tabs + Filters toggle */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          {CELEBRATIONS.map((celebration) => {
            const isActive = activeCelebration === celebration;
            return (
              <button
                key={celebration}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectCelebration(celebration)}
                className={`flex shrink-0 items-center gap-2 border border-[#235a3f] px-4 py-2 text-sm transition-colors hover:cursor-pointer Montserrat ${isActive
            ? "bg-[#235a3f] text-white"
            : "bg-white text-[#235a3f] hover:bg-[#235a3f]/5"
            }`}
              >
                {celebration}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-expanded={showFilters}
          onClick={() => setShowFilters((prev) => !prev)}
          className={`flex shrink-0 items-center gap-2 border border-[#235a3f] px-4 py-2 text-sm transition-colors hover:cursor-pointer Montserrat ${showFilters
            ? "bg-[#235a3f] text-white"
            : "bg-white text-[#235a3f] hover:bg-[#235a3f]/5"
            }`}
        >
          Filters
          <FilterIcon />
        </button>
      </div>

      {/* Step 2: Sub-category pills, only visible when Filters is open */}
      {showFilters && (
        <div className="-mt-3 mb-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            aria-pressed={activeCategory === null}
            onClick={() => setActiveCategory(null)}
            className={`${pillBase} ${activeCategory === null ? pillActive : pillIdle}`}
          >
            All
          </button>

          {subCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => toggleCategory(category)}
                className={`${pillBase} ${isActive ? pillActive : pillIdle}`}
              >
                {FILTER_LABEL[category] ?? category}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleImages.map((item) => (
          <DesignCard
            key={item.id}
            src={item.src}
            category={item.category}
            code={item.code}
            isSelected={selected.some((s) => s.id === item.id)}
            onToggle={() => handleToggle(item)}
          />
        ))}
      </div>

      <RequestModal
        item={pendingItem}
        note={noteDraft}
        onNoteChange={setNoteDraft}
        onSave={confirmSelection}
        onCancel={cancelSelection}
      />

      <StepBar selected={selected} view={view} setView={setView} />
    </section>
  );
}