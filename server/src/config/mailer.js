import nodemailer from 'nodemailer';

let transporter = null;

export function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn(
      '[mail] SMTP_HOST / SMTP_USER / SMTP_PASS are not fully set — emails will fail to send until .env is configured.'
    );
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === 'true', // true for port 465, false for 587/25 (STARTTLS)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

/**
 * Send an email, tolerating failure — logs the error but never throws,
 * so one bad address (e.g. a typo in the client's email) never blocks
 * the other email or the API response.
 */
export async function sendMailSafe({ to, subject, html, text, attachments }) {
  const from = `"${process.env.FROM_NAME || 'Royal Wedding & Events'}" <${process.env.FROM_EMAIL}>`;
  try {
    const info = await getTransporter().sendMail({ from, to, subject, html, text, attachments });
    console.log(`[mail] sent -> ${to} (${info.messageId})`);
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[mail] failed -> ${to}:`, err.message);
    return { ok: false, error: err.message };
  }
}
