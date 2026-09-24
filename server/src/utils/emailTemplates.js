const BRAND_GREEN = '#14523d';
const BRAND_GOLD = '#a9863a';

function wrap(bodyHtml, { title } = {}) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f6efe0;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:22px;letter-spacing:.02em;color:${BRAND_GREEN};">Royal Wedding &amp; Events</div>
        <div style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:${BRAND_GOLD};margin-top:4px;">
          Pokhara, Nepal
        </div>
      </div>
      <div style="background:#fff;border:1px solid #e7e0cf;border-radius:14px;padding:28px 26px;color:#2c2c28;font-size:15.5px;line-height:1.6;">
        ${title ? `<h2 style="margin:0 0 16px;color:${BRAND_GREEN};font-size:20px;">${title}</h2>` : ''}
        ${bodyHtml}
      </div>
      <div style="text-align:center;color:#8a8a80;font-size:12px;margin-top:20px;">
        Royal Wedding &amp; Events · New Road, Pokhara, Nepal
      </div>
    </div>
  </body>
</html>`;
}

function row(label, value) {
  if (!value) return '';
  return `<tr>
    <td style="padding:5px 12px 5px 0;color:#8a8a80;font-size:12px;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:5px 0;color:#2c2c28;">${value}</td>
  </tr>`;
}

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------------------------------------------------------------- Contact --

export function contactOwnerEmail(enquiry) {
  const html = wrap(
    `<p>A new enquiry just came in from the website contact form.</p>
     <table style="width:100%;border-collapse:collapse;">
       ${row('Name', esc(enquiry.name))}
       ${row('Email', `<a href="mailto:${esc(enquiry.email)}">${esc(enquiry.email)}</a>`)}
       ${row('Phone', esc(enquiry.phone))}
       ${row('Event date', esc(enquiry.eventDate))}
     </table>
     <p style="margin-top:16px;color:#8a8a80;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Message</p>
     <p style="white-space:pre-wrap;">${esc(enquiry.message)}</p>`,
    { title: 'New Contact Enquiry' }
  );
  return { subject: `New enquiry — ${enquiry.name}`, html };
}

export function contactClientEmail(enquiry) {
  const html = wrap(
    `<p>Dear ${esc(enquiry.name)},</p>
     <p>Thank you for reaching out to Royal Wedding &amp; Events. We've received your enquiry and a member of
     our team will be in touch shortly to talk through your celebration.</p>
     <p style="margin-top:16px;color:#8a8a80;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Your message</p>
     <p style="white-space:pre-wrap;font-style:italic;">${esc(enquiry.message)}</p>
     <p style="margin-top:20px;">With warm regards,<br/>Royal Wedding &amp; Events</p>`,
    { title: "We've received your enquiry" }
  );
  return { subject: 'Thank you for your enquiry — Royal Wedding & Events', html };
}

// ---------------------------------------------------------------- Planner --

function fmtDate(d) {
  if (!d) return '';
  try {
    return new Date(d + 'T00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return d;
  }
}

function selectionsByDay(selections) {
  const byDay = {};
  for (const s of selections) {
    byDay[s.day] = byDay[s.day] || [];
    byDay[s.day].push(s);
  }
  return byDay;
}

function selectionsHtml(selections) {
  const byDay = selectionsByDay(selections);
  const days = Object.keys(byDay);
  if (!days.length) return '<p style="font-style:italic;color:#8a8a80;">No designs selected.</p>';
  return days
    .map(
      (day) => `
    <p style="margin:16px 0 6px;color:${BRAND_GREEN};font-weight:bold;text-transform:capitalize;">${esc(day)} (${byDay[day].length})</p>
    <table style="width:100%;border-collapse:collapse;">
      ${byDay[day]
        .map(
          (s) => `<tr>
            <td style="padding:4px 10px 4px 0;vertical-align:top;">
              <a href="${esc(s.src)}" target="_blank"><img src="${esc(s.src)}" width="56" style="border-radius:6px;display:block;"/></a>
            </td>
            <td style="padding:4px 0;vertical-align:top;">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#8a8a80;">${esc(s.cat)}</div>
              <div>${s.note ? esc(s.note) : '<span style="color:#9aa298;font-style:italic;">No note</span>'}</div>
            </td>
          </tr>`
        )
        .join('')}
    </table>`
    )
    .join('');
}

function referencesHtml(references) {
  if (!references.length) return '';
  return `<p style="margin:20px 0 6px;color:${BRAND_GREEN};font-weight:bold;">Reference images (${references.length})</p>
    <table style="width:100%;border-collapse:collapse;">
      ${references
        .map(
          (r) => `<tr>
            <td style="padding:4px 10px 4px 0;vertical-align:top;">
              <a href="${esc(r.url)}" target="_blank"><img src="${esc(r.url)}" width="56" style="border-radius:6px;display:block;"/></a>
            </td>
            <td style="padding:4px 0;vertical-align:top;">
              ${r.note ? esc(r.note) : '<span style="color:#9aa298;font-style:italic;">No note</span>'}
            </td>
          </tr>`
        )
        .join('')}
    </table>`;
}

export function plannerOwnerEmail(brief, pkgName) {
  const d = brief.details || {};
  const html = wrap(
    `<p>A new event design brief was submitted through the planner.</p>
     <table style="width:100%;border-collapse:collapse;">
       ${row('Client', esc([d.client, d.partner].filter(Boolean).join(' & ')))}
       ${row('Date', esc(fmtDate(d.date)))}
       ${row('Venue', esc(d.venue))}
       ${row('Guests', esc(d.guests))}
       ${row('Package', esc(pkgName))}
       ${row('Phone', esc(d.phone))}
       ${row('Email', d.email ? `<a href="mailto:${esc(d.email)}">${esc(d.email)}</a>` : '')}
     </table>
     <p style="margin-top:16px;color:#8a8a80;font-size:13px;">A print-ready PDF of this brief is attached.</p>`,
    { title: 'New Event Design Brief' }
  );
  return { subject: `New event brief — ${d.client || 'New enquiry'}`, html };
}

export function plannerClientEmail(brief, pkgName) {
  const d = brief.details || {};
  const html = wrap(
    `<p>Dear ${esc(d.client || 'there')},</p>
     <p>Thank you for building your event design brief with us! We've received it along with
     ${(brief.selections || []).length} selected design${(brief.selections || []).length === 1 ? '' : 's'}${
      (brief.references || []).length ? ` and ${brief.references.length} reference image${brief.references.length === 1 ? '' : 's'}` : ''
    }. Our team will review everything and reach out shortly to talk through the details.</p>
     <table style="width:100%;border-collapse:collapse;margin-top:10px;">
       ${row('Date', esc(fmtDate(d.date)))}
       ${row('Venue', esc(d.venue))}
       ${row('Package', esc(pkgName))}
     </table>
     <p style="margin-top:16px;">A PDF copy of your full event design brief is attached to this email for your records.</p>
     <p style="margin-top:20px;">With warm regards,<br/>Royal Wedding &amp; Events</p>`,
    { title: "We've received your event brief" }
  );
  return { subject: 'Your event design brief — Royal Wedding & Events', html };
}
