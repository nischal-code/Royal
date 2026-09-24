// Central place every backend call goes through. One base URL, one place
// to change it (VITE_API_URL in .env), and consistent error handling —
// the server always replies with { ok: true, ... } or { ok: false, error }.

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, options);

  // The PDF download endpoint returns a raw binary body, not JSON.
  const isPdf = res.headers.get("content-type")?.includes("application/pdf");
  if (isPdf) {
    if (!res.ok) throw new Error("Failed to download the PDF.");
    return res.blob();
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data;
}

// ---------------------------------------------------------------- Health --

export function checkHealth() {
  return request("/health");
}

// --------------------------------------------------------------- Contact --

export function submitContactEnquiry(form) {
  return request("/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
}

export function listContactEnquiries({ page = 1, limit = 20 } = {}) {
  return request(`/contact?page=${page}&limit=${limit}`);
}

export function updateEnquiryStatus(id, status) {
  return request(`/contact/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}
const dataUrlToFile = async (item) => {
  const res = await fetch(item.dataUrl);
  const blob = await res.blob();
  return new File([blob], item.name, { type: item.type });
};

export async function submitPlannerBrief({ details, pkg, selections, references }) {
  const imageRefs = (references || []).filter((r) => r.type?.startsWith("image/"));
  const skippedCount = (references || []).length - imageRefs.length;

  const formData = new FormData();
  formData.append("details", JSON.stringify(details || {}));
  formData.append("pkg", pkg || "");
  formData.append(
    "selections",
    JSON.stringify(
      (selections || []).map((s) => ({
        day: s.celebration || "general", // no per-day picker in the UI yet — grouped under "general"
        imgId: s.id,
        cat: s.category,
        src: s.src?.split("/Imgs/")[1] || "",
        note: s.note || "",
      }))
    )
  );
  formData.append("referenceNotes", JSON.stringify(imageRefs.map((r) => r.note || "")));

  const files = await Promise.all(imageRefs.map(dataUrlToFile));
  files.forEach((file) => formData.append("references", file));

  const data = await request("/planner", { method: "POST", body: formData });
  return { ...data, skippedCount };
}

export function listPlannerBriefs({ page = 1, limit = 20 } = {}) {
  return request(`/planner?page=${page}&limit=${limit}`);
}

export function getPlannerBrief(id) {
  return request(`/planner/${id}`);
}

export async function downloadPlannerBriefPdf(id) {
  const blob = await request(`/planner/${id}/pdf`);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Event-Brief-${id}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function updatePlannerBriefStatus(id, status) {
  return request(`/planner/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}
