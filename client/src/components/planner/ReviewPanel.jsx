import { useRef, useState } from "react";
import { Download, MessageCircle, Mail, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import StepBar from "./StepBar";
import { submitPlannerBrief, downloadPlannerBriefPdf, API_URL } from "../../lib/api";

// Planner contact details. Set these in client/.env:
//   VITE_WHATSAPP_NUMBER=97798XXXXXXXX   (country code + number, digits only)
//   VITE_PLANNER_EMAIL=hello@yourdomain.com
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "";
const PLANNER_EMAIL = import.meta.env.VITE_PLANNER_EMAIL || "";

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function Thumb({ src, className = "" }) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className={`flex-none rounded-lg object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`relative flex-none rounded-lg bg-gradient-to-br from-amber-400 to-emerald-800 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_45%)]" />
    </div>
  );
}

export default function ReviewPanel({ setView, details = {}, pkg = "", selections = [], references = [], onReset }) {
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [briefId, setBriefId] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const toastTimer = useRef(null);

  function fireToast(message) {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }

  async function handleSubmit() {
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await submitPlannerBrief({ details, pkg, selections, references });

      // The PDF / share links need the id of the saved brief. Adjust this line
      // if your /planner POST returns the id under a different key.
      setBriefId(
        result.id ?? result.brief?._id ?? result.brief?.id ?? result.data?._id ?? result.data?.id ?? null
      );

      try {
        localStorage.removeItem("Details");
      } catch {
        /* ignore */
      }
      setSubmitted(true);
      fireToast(
        result.skippedCount
          ? `Brief sent! ${result.skippedCount} non-image file(s) weren't attached.`
          : "Brief sent — check your email!"
      );
    } catch (err) {
      fireToast(err.message || "Couldn't submit your brief. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ------------------------------------------------------ Share actions --

  function buildMessage() {
    const lines = [
      "Hi! I just submitted my event brief.",
      "",
      `Name: ${details.client || "-"}`,
      `Date: ${details.date || "-"}`,
      `Venue: ${details.venue || "-"}`,
      `Guests: ${details.guests || "-"}`,
      `Package: ${pkg || "-"}`,
    ];
    if (briefId) {
      lines.push("", `Brief PDF: ${API_URL}/planner/${briefId}/pdf`);
    }
    return lines.join("\n");
  }

  async function handleDownload() {
    if (!briefId || downloading) return;
    setDownloading(true);
    try {
      await downloadPlannerBriefPdf(briefId);
    } catch (err) {
      fireToast(err.message || "Couldn't download the PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  function handleWhatsApp() {
    const base = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "https://wa.me/";
    const url = `${base}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleEmail() {
    const subject = `Event brief${details.client ? ` – ${details.client}` : ""}`;
    window.location.href = `mailto:${PLANNER_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildMessage())}`;
  }

  // -------------------------------------------------------------- Data --

  const detailRows = [
    ["Name", details.client],
    ["Partner / family", details.partner],
    ["Venue", details.venue],
    ["Contact", details.phone],
    ["Guest count", details.guests],
    ["Date", details.date],
    ["Package", pkg],
    ["Email", details.email],
  ];

  const designGroups = selections.reduce((groups, item) => {
    const key = item.celebration || "Other";
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <main className="relative mx-auto max-w-3xl px-4 pb-40 pt-8 sm:px-6 sm:pt-12">
        <div className="mb-7">
          <h1 className="font-serif text-3xl tracking-tight text-emerald-900 sm:text-4xl">
            Review your event brief
          </h1>
          <p className="mt-2 max-w-xl text-sm text-stone-500">
            This is exactly what your planner will receive. Download it as a PDF,
            then send it over on WhatsApp or email and we'll be in touch.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          {/* 1. Event details */}
          <section className="border-b border-stone-200 px-5 py-6 sm:px-8">
            <div className="mb-4 flex items-baseline gap-2">
              <span className="font-serif text-emerald-900">1</span>
              <h3 className="font-serif text-lg text-emerald-900">Event details</h3>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
              {detailRows.map(([label, value]) => (
                <div key={label}>
                  <dt className="mb-1 text-xs text-stone-400 Montserrat">{label}</dt>
                  <dd className="break-words text-sm font-medium text-stone-800 Montserrat">
                    {value || <span className="text-stone-300">—</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* 2. Selected designs */}
          <section className="border-b border-stone-200 px-5 py-6 sm:px-8">
            <div className="mb-4 flex items-baseline gap-2">
              <span className="font-serif text-emerald-900">2</span>
              <h3 className="font-serif text-lg text-emerald-900">Selected designs</h3>
            </div>
            {selections.length === 0 ? (
              <p className="text-sm text-stone-400">No designs selected yet.</p>
            ) : (
              <div className="space-y-5">
                {Object.entries(designGroups).map(([title, items]) => (
                  <div key={title}>
                    <p className="mb-2 font-semibold text-emerald-800 text-xl">
                      {title}
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 p-2"
                        >
                          <Thumb src={item.src} className="h-[52px] w-[52px]" />
                          <div>
                            <p className="text-sm  text-emerald-900 Montserrat">
                              {item.category}
                            </p>
                            <p className="text-xs text-stone-400 Montserrat">Code · {item.code}</p>
                            <p className="text-xs text-stone-400 Montserrat">Note · {item.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 3. Reference */}
          <section className="px-5 py-6 sm:px-8">
            <div className="mb-4 flex items-baseline gap-2">
              <span className="font-serif text-emerald-900">3</span>
              <h3 className="font-serif text-lg text-emerald-900">Reference</h3>
            </div>

            {references.length === 0 ? (
              <p className="text-sm text-stone-400">No reference files uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {references.map((ref) => (
                  <div
                    key={ref.id}
                    className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50"
                  >
                    <div className="flex items-center gap-3 p-2.5">
                      {ref.type?.startsWith("image/") ? (
                        <Thumb src={ref.dataUrl} className="h-10 w-10" />
                      ) : (
                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-emerald-900/10 text-emerald-800">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate Montserrat text-sm font-semibold text-stone-500">{ref.name}</p>
                        <p className="Montserrat text-xs text-stone-400">{formatSize(ref.size)}</p>
                      </div>
                    </div>
                    {ref.note && (
                      <p className="Montserrat mx-2.5 mb-2.5 rounded-lg border border-stone-200 bg-white px-2.5 py-2 text-sm italic text-stone-500">
                        "{ref.note}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {submitted ? (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-emerald-200 bg-[#eae7e7] px-6 py-10 text-center">
            <CheckCircle2 className="h-10 w-10 text-emerald-700" />
            <h3 className="font-serif text-xl text-emerald-900 Montserrat">Brief sent!</h3>
            <p className="max-w-sm text-sm text-emerald-700 Montserrat">
              We've emailed you a copy and our team will be in touch shortly to talk through the details.
            </p>

            {/* Action buttons */}
            <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                disabled={!briefId || downloading}
                className="inline-flex Montserrat hover:cursor-pointer items-center gap-2 bg-[#DFC18D] px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-amber-50 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                {downloading ? "Preparing…" : "Download PDF"}
              </button>
              <button
                type="button"
                onClick={handleEmail}
                className="inline-flex Montserrat hover:cursor-pointer items-center gap-2 border border-emerald-900 bg-stone-50 px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-900 transition hover:bg-emerald-900 hover:text-amber-50"
              >
                <Mail className="h-4 w-4" />
                Send via Email
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex Montserrat hover:cursor-pointer items-center gap-2 bg-emerald-900 text-white px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-950 shadow-md transition hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                Send via WhatsApp
              </button>

            </div>
          </div>
        ) : (
          <StepBar view="review" setView={setView} onSubmit={handleSubmit} submitting={submitting} />
        )}
      </main>

      {/* Toast */}
      <div
        className={`fixed bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-emerald-950 px-4 py-2.5 text-sm text-amber-100 shadow-lg transition-all duration-200 ${
          toast ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
        }`}
      >
        {toast}
      </div>
    </div>
  );
}