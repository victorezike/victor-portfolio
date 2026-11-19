import nodemailer, { type Transporter, type SendMailOptions } from 'nodemailer';

let transporter: Transporter | null = null;

export function isMailConfigured() {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD);
}

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        // Gmail shows App Passwords as "abcd efgh ijkl mnop"; the spaces aren't part of it.
        pass: process.env.EMAIL_PASSWORD?.replace(/\s+/g, ''),
      },
    });
  }
  return transporter;
}

/**
 * Sends an email and reports whether it went out, instead of throwing.
 * Callers decide whether a failed send should fail the request.
 */
export async function trySendMail(options: SendMailOptions, label: string): Promise<boolean> {
  if (!isMailConfigured()) {
    console.error(`✉️ ${label} skipped: EMAIL_USER / EMAIL_PASSWORD are not set`);
    return false;
  }
  try {
    await getTransporter().sendMail({ from: process.env.EMAIL_USER, ...options });
    console.log(`✅ ${label} sent`);
    return true;
  } catch (error: any) {
    if (error?.code === 'EAUTH') {
      console.error(
        `❌ ${label} failed: Gmail rejected the login. EMAIL_PASSWORD must be a 16-character ` +
          'App Password (https://myaccount.google.com/apppasswords), not your Google password.'
      );
    } else {
      console.error(`❌ ${label} failed:`, error);
    }
    return false;
  }
}

export function adminAddress() {
  return process.env.ALERT_EMAIL || process.env.EMAIL_USER;
}

/** Escape user-supplied text before interpolating it into an HTML email. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
