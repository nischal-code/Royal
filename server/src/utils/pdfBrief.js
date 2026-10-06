import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import { pkgLabel } from "./packages.js";

// Resolved from this file (server/src/utils -> server/src/Imgs), so it works no matter
// which folder the hosting panel starts the Node app from.
const IMAGE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "Imgs");
const GREEN = '#14523d';
const GREEN_DARK = '#0d3a2a';
const GOLD = '#a9863a';
const GOLD_LIGHT = '#d8c088';
const CREAM = '#faf7f0';
const INK = '#28322c';
const SOFT = '#6e7268';

const PAGE = { size: 'A4', margin: 46 };
const CW = 595.28 - PAGE.margin * 2; // A4 width in pt minus margins

function fmtDate(d) {
  if (!d) return '—';
  try {
    return new Date(d + 'T00:00').toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return d;
  }
}

function catLabel(cat) {
  const labels = {
    signage: 'Welcome Signage',
    entrance: 'Entrance Décor',
    stage: 'Stage & Backdrop',
    mandap: 'Mandap',
    haldimehendi: 'Haldi & Mehendi',
    photobooth: 'Photo Booth',
  };
  return labels[cat] || cat;
}

const dayLabels = { haldi: 'Haldi', mehendi: 'Mehendi', wedding: 'Wedding', reception: 'Reception' };

/** Downloads an image URL into a Buffer; resolves null on any failure so the PDF still builds. */
async function fetchImageBuffer(url) {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const arrayBuf = await res.arrayBuffer();
    return Buffer.from(arrayBuf);
  } catch {
    return null;
  }
}
async function getSelectedImageBuffer(src) {
  if (!src) return null;

  try {
    const normalized = path.normalize(src);

    // Prevent paths from escaping the Imgs folder
    if (normalized.startsWith("..") || path.isAbsolute(normalized)) {
      return null;
    }

    const imagePath = path.join(IMAGE_ROOT, normalized);
    const buffer = await fs.readFile(imagePath);

    // PDFKit only supports JPEG and PNG, so .webp photos must be converted.
    // `sharp` also shrinks large photos so the PDF (and email) stays small.
    try {
      const { default: sharp } = await import('sharp');
      return await sharp(buffer)
        .rotate()
        .resize({ width: 900, withoutEnlargement: true })
        .jpeg({ quality: 82 })
        .toBuffer();
    } catch {
      // sharp not installed: fine for jpeg/png, but webp can't be drawn
      return /\.webp$/i.test(normalized) ? null : buffer;
    }
  } catch (err) {
    console.error(`[pdf] could not load image "${src}" from ${IMAGE_ROOT}: ${err.message}`);
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Chrome: header / footer / section titles                           */
/* ------------------------------------------------------------------ */

function drawHeader(doc) {
  // gold corner flourishes
  doc.save();
  doc.strokeColor(GOLD_LIGHT).lineWidth(0.8);
  doc.moveTo(PAGE.margin, 30).lineTo(PAGE.margin, 20).lineTo(PAGE.margin + 16, 20).stroke();
  doc.moveTo(PAGE.margin + CW, 30).lineTo(PAGE.margin + CW, 20).lineTo(PAGE.margin + CW - 16, 20).stroke();
  doc.restore();

  doc
    .font('Times-Bold').fontSize(21).fillColor(GREEN)
    .text('Royal Wedding & Events', PAGE.margin, 38, { align: 'center', width: CW, characterSpacing: 0.4 });
  doc
    .font('Helvetica').fontSize(8).fillColor(GOLD)
    .text('E V E N T   D E S I G N   B R I E F   ·   P O K H A R A ,   N E P A L', PAGE.margin, 61, {
      align: 'center',
      width: CW,
    });

  const cx = PAGE.margin + CW / 2;
  doc.strokeColor(GOLD).lineWidth(0.8).moveTo(cx - 60, 78).lineTo(cx + 60, 78).stroke();
  doc.strokeColor(GOLD_LIGHT).lineWidth(0.5).moveTo(cx - 40, 81).lineTo(cx + 40, 81).stroke();
  // small diamond at centre
  doc.save();
  doc.fillColor(GOLD);
  doc.polygon([cx, 75.5], [cx + 3.2, 79.5], [cx, 83.5], [cx - 3.2, 79.5]).fill();
  doc.restore();

  doc.y = 96;
  drawFooter(doc);
}

function drawFooter(doc) {
  const bottom = doc.page.height - 36;
  const savedY = doc.y;
  const savedX = doc.x;
  const savedBottomMargin = doc.page.margins.bottom;
  // Writing this close to the physical bottom edge sits inside PDFKit's
  // bottom margin, which would otherwise trigger an automatic page break.
  doc.page.margins.bottom = 0;

  doc.strokeColor(GOLD_LIGHT).lineWidth(0.5)
    .moveTo(PAGE.margin, bottom - 8).lineTo(PAGE.margin + CW, bottom - 8).stroke();

  doc
    .font('Helvetica').fontSize(7.5).fillColor(SOFT)
    .text('info@royalwedding.com.np   ·   New Road, Pokhara, Nepal', PAGE.margin, bottom, {
      align: 'center',
      width: CW,
      lineBreak: false,
    });
  const pageNum = doc.page.number ?? doc._pageBufferStart ?? '';
  doc
    .font('Helvetica').fontSize(7.5).fillColor(GOLD)
    .text(String(doc._pageNumber || pageNum || ''), PAGE.margin, bottom - 20, {
      align: 'center',
      width: CW,
      lineBreak: false,
    });

  doc.page.margins.bottom = savedBottomMargin;
  // Writing the footer moves PDFKit's internal cursor — restore it so the
  // next section starts right after the header, not after the footer.
  doc.x = savedX;
  doc.y = savedY;
}

function sectionTitle(doc, roman, title) {
  if (doc.y > doc.page.height - 100) {
    doc.addPage();
    drawHeader(doc);
  }
  doc.moveDown(0.7);
  const y = doc.y;

  // gold diamond bullet
  doc.save();
  doc.fillColor(GOLD);
  doc.polygon([PAGE.margin, y + 8], [PAGE.margin + 4, y + 12], [PAGE.margin, y + 16], [PAGE.margin - 4, y + 12]).fill();
  doc.restore();

  doc.font('Times-Bold').fontSize(8).fillColor(GOLD)
    .text(roman.toUpperCase(), PAGE.margin + 14, y, { continued: false });
  doc.font('Times-Bold').fontSize(15).fillColor(GREEN)
    .text(title, PAGE.margin + 30, y - 3);
  doc.y = Math.max(doc.y, y + 18);

  doc.strokeColor(GOLD).lineWidth(0.8)
    .moveTo(PAGE.margin, doc.y).lineTo(PAGE.margin + CW, doc.y).stroke();
  doc.strokeColor(GOLD_LIGHT).lineWidth(0.4)
    .moveTo(PAGE.margin, doc.y + 2).lineTo(PAGE.margin + CW, doc.y + 2).stroke();

  doc.y += 10;
}

function ensureSpace(doc, height) {
  if (doc.y + height > doc.page.height - 50) {
    doc.addPage();
    drawHeader(doc);
  }
}

/* ------------------------------------------------------------------ */
/* Side-by-side image grid                                            */
/* ------------------------------------------------------------------ */

function drawImageGrid(doc, cards, columns = 3) {
  if (!cards.length) return;

  const gap = 14;
  const pad = 8;
  const cellW = (CW - gap * (columns - 1)) / columns;
  const imgH = 92;
  const titleSize = 9;
  const noteSize = 8;

  for (let i = 0; i < cards.length; i += columns) {
    const row = cards.slice(i, i + columns);

    doc.font('Times-Italic').fontSize(noteSize);
    const noteHeights = row.map((c) => doc.heightOfString(c.note || '—', { width: cellW - pad * 2 }));
    const titleH = 12;
    const contentH = imgH + 8 + titleH + 3 + Math.max(...noteHeights);
    const cardH = contentH + pad * 2;

    ensureSpace(doc, cardH + gap);
    const rowY = doc.y;

    row.forEach((card, idx) => {
      const x = PAGE.margin + idx * (cellW + gap);

      // card background + border
      doc.save();
      doc.roundedRect(x, rowY, cellW, cardH, 4).fillAndStroke(CREAM, GOLD_LIGHT);
      doc.restore();

      const innerX = x + pad;
      const innerW = cellW - pad * 2;
      const imgY = rowY + pad;

      if (card.buffer) {
        try {
          doc.image(card.buffer, innerX, imgY, {
            fit: [innerW, imgH],
            align: 'center',
            valign: 'center',
          });
        } catch {
          doc.rect(innerX, imgY, innerW, imgH).strokeColor(SOFT).lineWidth(0.5).stroke();
        }
      } else {
        doc.save();
        doc.rect(innerX, imgY, innerW, imgH).fillAndStroke('#ffffff', SOFT);
        doc.font('Helvetica').fontSize(7.5).fillColor(SOFT)
          .text('No image', innerX, imgY + imgH / 2 - 5, { width: innerW, align: 'center' });
        doc.restore();
      }
      doc.save();
      doc.rect(innerX, imgY, innerW, imgH).strokeColor(GOLD_LIGHT).lineWidth(0.6).stroke();
      doc.restore();

      const textY = imgY + imgH + 8;
      doc.font('Helvetica-Bold').fontSize(titleSize).fillColor(GREEN_DARK)
        .text(card.title, innerX, textY, { width: innerW });
      doc.font(card.note ? 'Times-Roman' : 'Times-Italic').fontSize(noteSize)
        .fillColor(card.note ? INK : SOFT)
        .text(card.note || 'No note', innerX, textY + titleH, { width: innerW });
    });

    doc.y = rowY + cardH + gap;
  }
}

/* ------------------------------------------------------------------ */
/* Main builder                                                       */
/* ------------------------------------------------------------------ */

export async function buildBriefPdfBuffer(brief) {
  const d = brief.details || {};
  const selections = brief.selections || [];
  const references = brief.references || [];
  const pkgName = pkgLabel(brief.pkg);

  const selectedImageEntries = await Promise.all(
    selections.map(async (s) => [s.src, await getSelectedImageBuffer(s.src)])
  );

  const referenceImageEntries = await Promise.all(
    references.map(async (r) => [r.url, await fetchImageBuffer(r.url)])
  );

  const imageMap = new Map([...selectedImageEntries, ...referenceImageEntries]);

  const doc = new PDFDocument(PAGE);
  const chunks = [];
  doc.on('data', (c) => chunks.push(c));
  const done = new Promise((resolve) => doc.on('end', () => resolve(Buffer.concat(chunks))));

  drawHeader(doc);

  // i. Event details
  sectionTitle(doc, 'i', 'Event Details');
  const rows = [
    ['Client', [d.client, d.partner].filter(Boolean).join(' & ') || '—'],
    ['Date', fmtDate(d.date)],
    ['Venue', d.venue || '—'],
    ['Guests', d.guests || '—'],
    ['Package', pkgName],
    ['Phone', d.phone || '—'],
    ['Email', d.email || '—'],
  ];
  rows.forEach(([k, v]) => {
    ensureSpace(doc, 16);
    const y = doc.y;
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(GOLD).text(k.toUpperCase(), PAGE.margin, y);
    doc.font('Times-Roman').fontSize(11).fillColor(INK).text(String(v), PAGE.margin + 90, y, { width: CW - 90 });
    doc.y = Math.max(doc.y, y + 14);
  });

  // ii. Selected designs, grouped by day, images side by side
  sectionTitle(doc, 'ii', `Selected Designs (${selections.length})`);
  if (!selections.length) {
    doc.font('Times-Italic').fontSize(11).fillColor(SOFT).text('No designs selected.', PAGE.margin);
    doc.moveDown(0.5);
  } else {
    const byDay = {};
    selections.forEach((s) => {
      byDay[s.day] = byDay[s.day] || [];
      byDay[s.day].push(s);
    });
    Object.keys(byDay).forEach((day) => {
      ensureSpace(doc, 22);
      doc.font('Times-BoldItalic').fontSize(13).fillColor(GREEN).text(dayLabels[day] || day, PAGE.margin, doc.y);
      doc.moveDown(0.4);

      const cards = byDay[day].map((s) => ({
        buffer: imageMap.get(s.src),
        title: catLabel(s.cat),
        note: s.note,
      }));
      drawImageGrid(doc, cards, 3);
      doc.moveDown(0.2);
    });
  }

  // iii. Reference images (client uploads), side by side
  if (references.length) {
    sectionTitle(doc, 'iii', `Reference Images (${references.length})`);
    const cards = references.map((r) => ({
      buffer: imageMap.get(r.url),
      title: 'Reference',
      note: r.note,
    }));
    drawImageGrid(doc, cards, 3);
  }

  doc.end();
  return done;
}

export function briefPdfFileName(brief) {
  const who = ((brief.details || {}).client || 'Royal-Wedding').trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  return `Event-Brief-${who || 'Royal-Wedding'}.pdf`;
}