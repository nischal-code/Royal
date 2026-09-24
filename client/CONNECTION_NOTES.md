# Frontend ↔ Backend connection — what changed

## Backend (server/)
- **Added the missing `/api/contact` route.** Your `Contact.jsx` was already
  calling it, and `utils/emailTemplates.js` already had `contactOwnerEmail`/
  `contactClientEmail` written for it — but there was no model, controller,
  or route. Added:
  - `src/models/Enquiry.js`
  - `src/controllers/contactController.js`
  - `src/routes/contactRoutes.js`
  - wired into `app.js` behind the same rate limiter as `/api/planner`.

## Frontend (client/)
- **New `src/lib/api.js`** — single API client covering every backend
  endpoint (health, contact, and all planner routes incl. PDF download).
- **New `client/.env`** — `VITE_API_URL=http://localhost:5001/api`, matching
  the port in your `server/.env` (`PORT=5001`). The old hardcoded fallback
  in `Contact.jsx` pointed at `:5000`, which would silently fail.
- **`Contact.jsx`** now calls `submitContactEnquiry()` from the shared client
  instead of its own inline `fetch`.
- **The Planner submit flow was never wired up** — `ReviewBar.jsx`'s
  "Submit Info" button just did `console.log("Hello")`, and it wasn't even
  receiving `setView` as a prop. Fixed:
  - `ReviewBar.jsx` now takes `setView` / `onSubmit` / `submitting` props
    and disables itself mid-submit.
  - `ReviewPanel.jsx` builds the real submit handler, calls
    `submitPlannerBrief()`, shows a success screen with a "Start a new
    brief" reset, and surfaces backend error messages via the existing
    toast.
  - `Planner.jsx` passes an `onReset` callback down so "Start a new brief"
    actually clears state, not just `localStorage`.

## Known gaps worth knowing about (not fixed — product decisions, not wiring)

1. **Reference file types.** The References step accepts images, PDF, and
   MP4, but the backend's multer filter (`middleware/upload.js`) only
   accepts images. `submitPlannerBrief()` in `api.js` filters to images
   client-side before uploading and tells the user via toast if files were
   skipped. If you want PDF/video references to actually reach Cloudinary,
   widen `fileFilter` in `upload.js` (Cloudinary supports both as
   `resource_type: 'auto'`).
2. **No day picker.** `PlannerBrief.selections` expects a `day` field
   (`haldi`/`mehendi`/`wedding`/`reception`) used to group designs in the
   PDF/email, but `SelectPanel.jsx` has no UI to pick a day per design.
   `api.js` defaults every selection's day to `"general"` so submissions
   don't fail validation — add a day selector later for proper grouping.
3. **`src/img2/imgs.js` and `src/assets/assets.js`** are referenced by
   `SelectPanel.jsx` / `Hero.jsx` but weren't in the zip (you mentioned
   pulling assets out on purpose) — drop your images back into those paths.
4. **Rotate your credentials.** `server/.env` shipped in the zip with a live
   MongoDB Atlas password, Cloudinary API secret, and a Gmail app password.
   Since this passed through an AI chat, it's worth rotating all three.

## Running it locally
```bash
# backend
cd server && npm install && npm run dev   # http://localhost:5001

# frontend
cd client && npm install && npm run dev   # http://localhost:5174 (per CLIENT_ORIGIN in server/.env)
```
