# Royal Wedding & Events — Backend

Express + MongoDB API for the two frontend forms:

- **Contact page** enquiry form → `POST /api/contact`
- **Event Planner** brief (with reference photo uploads) → `POST /api/planner`

Each submission is saved to MongoDB, reference images go to **Cloudinary**,
and **two emails** are sent automatically: one to the site owner with the
full details, and one to the person who submitted the form confirming
it was received. For the planner, a branded **PDF of the full event brief**
is generated on the server and attached to both emails.

## 1. Install

```bash
cd server
npm install
```

## 2. Configure

```bash
cp .env.example .env
```

Then fill in `.env`:

| Variable | Where to get it |
|---|---|
| `MONGODB_URI` | A local MongoDB (`mongodb://127.0.0.1:27017/royal-wedding`) or a free [Atlas](https://www.mongodb.com/atlas) cluster connection string |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | [cloudinary.com](https://cloudinary.com) → Dashboard → Account Details (free tier is plenty) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Your email provider's SMTP credentials. For Gmail: enable 2FA, then create an **App Password** at myaccount.google.com/apppasswords — use that as `SMTP_PASS`, not your login password |
| `OWNER_EMAIL` | Where new enquiries/briefs should land (can be the same as `SMTP_USER`) |
| `CLIENT_ORIGIN` | Your frontend's URL(s), comma-separated — e.g. `http://localhost:5173,https://royalwedding.com.np` |

## 3. Run

```bash
npm run dev     # nodemon, auto-restarts on changes
# or
npm start
```

Server starts on `http://localhost:5000` by default. Check it's alive:

```bash
curl http://localhost:5000/api/health
```

## API

### `POST /api/contact`
JSON body: `{ name, email, phone?, eventDate?, message }`
→ saves an `Enquiry`, emails owner + submitter.

### `GET /api/contact` `?page=&limit=`
List enquiries, newest first (for an admin view).

### `PATCH /api/contact/:id/status`
Body: `{ status: 'new' | 'contacted' | 'closed' }`

### `POST /api/planner`
`multipart/form-data`:
- `details` — JSON string `{ client, partner, date, venue, guests, phone, email }`
- `pkg` — package id string (e.g. `"gold"`)
- `selections` — JSON string, array of `{ day, imgId, cat, src, note }`
- `referenceNotes` — JSON string, array of note strings, same order as `references` files
- `references` — 0+ image files (field name `references`, repeated)

→ uploads images to Cloudinary, saves a `PlannerBrief`, builds a PDF of the
brief, and emails it to both the owner and the submitter (when an email was
given).

### `GET /api/planner` `?page=&limit=`
List briefs, newest first.

### `GET /api/planner/:id`
Fetch one full brief.

### `GET /api/planner/:id/pdf`
Streams the same branded PDF brief back down as a file download — handy for
an admin view, or to re-send a copy manually.

### `PATCH /api/planner/:id/status`
Body: `{ status: 'new' | 'reviewing' | 'quoted' | 'booked' | 'closed' }`

## Notes

- Emails are sent with `Promise.allSettled`-style safety — if one address is
  bad (e.g. a mistyped client email) the other email and the saved record
  are unaffected. Each document tracks `ownerEmailStatus` /
  `clientEmailStatus` so you can see in the DB whether either failed.
- Rate limiting (20 requests / 15 min / IP) is applied to both form routes
  to deter spam/abuse.
- Reference images are capped at 8MB each, 15 files per submission, and are
  auto-resized on upload (`limit` to 2000×2000, `quality: auto:good`) to
  keep Cloudinary storage/bandwidth in check.
- The planner PDF is built with [`pdfkit`](https://pdfkit.org/) in
  `src/utils/pdfBrief.js` — no headless browser needed. It re-downloads each
  selection/reference image by URL when building the PDF; if an image fails
  to load (slow network, deleted Cloudinary asset) it's shown as an empty
  frame instead of failing the whole PDF or email.
