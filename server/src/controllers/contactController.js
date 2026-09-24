import Enquiry from '../models/Enquiry.js';
import { sendMailSafe } from '../config/mailer.js';
import { contactOwnerEmail, contactClientEmail } from '../utils/emailTemplates.js';

export async function createEnquiry(req, res) {
  const { name, email, phone = '', eventDate = '', message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' });
  }

  const enquiry = await Enquiry.create({ name, email, phone, eventDate, message });

  const ownerEmail = process.env.OWNER_EMAIL;
  const [ownerResult, clientResult] = await Promise.all([
    ownerEmail
      ? sendMailSafe({ to: ownerEmail, ...contactOwnerEmail(enquiry) })
      : Promise.resolve({ ok: false }),
    sendMailSafe({ to: enquiry.email, ...contactClientEmail(enquiry) }),
  ]);

  enquiry.ownerEmailStatus = ownerEmail ? (ownerResult.ok ? 'sent' : 'failed') : 'skipped';
  enquiry.clientEmailStatus = clientResult.ok ? 'sent' : 'failed';
  await enquiry.save();

  res.status(201).json({
    ok: true,
    enquiry: { id: enquiry._id, createdAt: enquiry.createdAt },
  });
}

export async function listEnquiries(req, res) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 20);

  const [items, total] = await Promise.all([
    Enquiry.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Enquiry.countDocuments(),
  ]);

  res.json({ ok: true, page, limit, total, items });
}

export async function updateEnquiryStatus(req, res) {
  const { status } = req.body;
  if (!['new', 'contacted', 'closed'].includes(status)) {
    return res.status(400).json({ ok: false, error: 'Invalid status.' });
  }
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!enquiry) return res.status(404).json({ ok: false, error: 'Enquiry not found.' });
  res.json({ ok: true, enquiry });
}
