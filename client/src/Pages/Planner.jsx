import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PlannerHeader from "../components/planner/PlannerHeader";
import DetailsPanel from "../components/planner/DetailsPanel";
import RefrencePanel from "../components/planner/RefrencePanel";
import Footer from "../components/Footer";
import SelectPanel from "../components/planner/SelectPanel";
import ReviewPanel from "../components/planner/ReviewPanel";

export default function Planner() {
  const LS_KEY = "Details";

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || {};
    } catch {
      return {};
    }
  }

  const BLANK_DETAILS = {
    client: "",
    partner: "",
    date: "",
    venue: "",
    guests: "",
    phone: "",
    email: "",
  };

  const saved = loadState();

  const [view, setView] = useState("details");

  const [details, setDetails] = useState(
    saved.details &&
      typeof saved.details === "object" &&
      !Array.isArray(saved.details)
      ? { ...BLANK_DETAILS, ...saved.details }
      : BLANK_DETAILS
  );

  const [pkg, setPkg] = useState(
    typeof saved.pkg === "string" ? saved.pkg : ""
  );

  const [selections, setSelections] = useState(
    Array.isArray(saved.selections) ? saved.selections : []
  );

  const [references, setReferences] = useState(
    Array.isArray(saved.references) ? saved.references : []
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        LS_KEY,
        JSON.stringify({
          details,
          pkg,
          selections,
          references,
        })
      );
    } catch {
      // quota exceeded — ignore
    }
  }, [details, pkg, selections, references]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="bg-ivory min-h-screen">
      <PlannerHeader view={view} />

      <main className="relative max-w-295 mx-auto px-4 sm:px-6 pt-9">

        <AnimatePresence mode="wait">
          {view === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <DetailsPanel
                view={view}
                setView={setView}
                details={details}
                setDetails={setDetails}
                pkg={pkg}
                setPkg={setPkg}
              />
            </motion.div>
          )}

          {view === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <SelectPanel
                view={view}
                setView={setView}
                selections={selections}
                setSelections={setSelections}
              />
            </motion.div>
          )}

          {view === "reference" && (
            <motion.div
              key="reference"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <RefrencePanel
                view={view}
                setView={setView}
                references={references}
                setReferences={setReferences}
              />
            </motion.div>
          )}

          {view === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ReviewPanel
                view={view}
                setView={setView}
                details={details}
                pkg={pkg}
                selections={selections}
                references={references}
                onReset={() => {
                  setDetails(BLANK_DETAILS);
                  setPkg("");
                  setSelections([]);
                  setReferences([]);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
    </div>
  );
}