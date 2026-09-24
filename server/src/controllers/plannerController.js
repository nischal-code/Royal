import PlannerBrief from '../models/PlannerBrief.js';
import { uploadManyBuffersToCloudinary } from '../config/cloudinary.js';
import { sendMailSafe } from '../config/mailer.js';
import { plannerOwnerEmail, plannerClientEmail } from '../utils/emailTemplates.js';
import { pkgLabel } from '../utils/packages.js';
import { buildBriefPdfBuffer, briefPdfFileName } from '../utils/pdfBrief.js';

function parseJSON(value, fallback) {
  if (value == null) return fallback;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export async function createPlannerBrief(req, res) {
  const details = parseJSON(req.body.details, {});
  const pkg = req.body.pkg || '';
  const selections = parseJSON(req.body.selections, []);
  const referenceNotes = parseJSON(req.body.referenceNotes, []);
  const files = req.files || [];
  if (!details.client && !details.email) {
    return res.status(400).json({ ok: false, error: 'At least a client name or email is required.' });
  }
  
  let uploaded = [];
  if (files.length) {
    uploaded = await uploadManyBuffersToCloudinary(files);
  }

  const references = uploaded.map((u, i) => ({
    url: u.url,
    publicId: u.publicId,
    note: referenceNotes[i] || '',
  }));

  const brief = await PlannerBrief.create({ details, pkg, selections, references });
  if(brief){
    console.log(brief)
    res.status(201).json({
    ok: true,
    brief: {
      id: brief._id,
      createdAt: brief.createdAt,
      referenceCount: references.length,
      selectionCount: selections.length,
    },
  });
  }
  const pkgName = pkgLabel(pkg);
  const ownerEmail = process.env.OWNER_EMAIL;
  
  let pdfAttachment = null;
  try {
    const pdfBuffer = await buildBriefPdfBuffer(brief);
    pdfAttachment = { filename: briefPdfFileName(brief), content: pdfBuffer, contentType: 'application/pdf' };
  } catch (err) {
    console.error('[pdf] failed to build brief PDF:', err.message);
  }

  const [ownerResult, clientResult] = await Promise.all([
    ownerEmail
      ? sendMailSafe({ to: ownerEmail, ...plannerOwnerEmail(brief, pkgName), attachments: pdfAttachment ? [pdfAttachment] : undefined })
      : Promise.resolve({ ok: false }),
    details.email
      ? sendMailSafe({ to: details.email, ...plannerClientEmail(brief, pkgName), attachments: pdfAttachment ? [pdfAttachment] : undefined })
      : Promise.resolve({ ok: false }),
  ]);

  brief.ownerEmailStatus = ownerEmail ? (ownerResult.ok ? 'sent' : 'failed') : 'skipped';
  brief.clientEmailStatus = details.email ? (clientResult.ok ? 'sent' : 'failed') : 'skipped';
  await brief.save();
}

export async function listPlannerBriefs(req, res) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 20);

  const [items, total] = await Promise.all([
    PlannerBrief.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    PlannerBrief.countDocuments(),
  ]);

  res.json({ ok: true, page, limit, total, items });
}

export async function getPlannerBrief(req, res) {
  const brief = await PlannerBrief.findById(req.params.id);
  if (!brief) return res.status(404).json({ ok: false, error: 'Brief not found.' });
  res.json({ ok: true, brief });
}

export async function downloadPlannerBriefPdf(req, res) {
  const brief = await PlannerBrief.findById(req.params.id);
  if (!brief) return res.status(404).json({ ok: false, error: 'Brief not found.' });

  const pdfBuffer = await buildBriefPdfBuffer(brief);
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${briefPdfFileName(brief)}"`,
  });
  res.send(pdfBuffer);
}

export async function updatePlannerBriefStatus(req, res) {
  const { status } = req.body;
  if (!['new', 'reviewing', 'quoted', 'booked', 'closed'].includes(status)) {
    return res.status(400).json({ ok: false, error: 'Invalid status.' });
  }
  const brief = await PlannerBrief.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!brief) return res.status(404).json({ ok: false, error: 'Brief not found.' });
  res.json({ ok: true, brief });
}
