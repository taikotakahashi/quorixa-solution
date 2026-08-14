import nodemailer from "nodemailer";

export type ContactMessageBody = {
  source?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  phone?: string;
  service?: string;
  message?: string;
  question?: string;
};

const DEFAULT_RECIPIENT = "pelixphilip@gmail.com";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendContactMail(
  body: ContactMessageBody,
  env: Record<string, string | undefined>,
): Promise<{ status: number; payload: Record<string, unknown> }> {
  const gmailUser = env.GMAIL_USER || env.VITE_GMAIL_USER;
  const gmailPass = env.GMAIL_APP_PASSWORD || env.VITE_GMAIL_APP_PASSWORD;
  const recipient =
    env.CONTACT_RECIPIENT ||
    env.VITE_CONTACT_RECIPIENT ||
    env.JOB_APPLICATION_RECIPIENT ||
    env.VITE_JOB_APPLICATION_RECIPIENT ||
    DEFAULT_RECIPIENT;

  if (!gmailUser || !gmailPass) {
    return {
      status: 503,
      payload: {
        error: "missing_email_config",
        message:
          "Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD on the server.",
      },
    };
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const name =
    body.name?.trim() ||
    [firstName, lastName].filter(Boolean).join(" ").trim();
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const service = body.service?.trim() ?? "";
  const message = (body.message ?? body.question ?? "").trim();
  const source = body.source?.trim() || "Website contact form";

  if (!name || !email || !message) {
    return {
      status: 400,
      payload: {
        error: "validation_error",
        message: "Name, email, and message are required.",
      },
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const subject = `Website inquiry: ${source}${service ? ` · ${service}` : ""} — ${name}`;
  const text = [
    "New website message received",
    "",
    `Source: ${source}`,
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : "",
    phone ? `Phone: ${phone}` : "",
    service ? `Looking for: ${service}` : "",
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>New website message</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      <tr><td><strong>Source</strong></td><td>${escapeHtml(source)}</td></tr>
      <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      ${company ? `<tr><td><strong>Company</strong></td><td>${escapeHtml(company)}</td></tr>` : ""}
      ${phone ? `<tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>` : ""}
      ${service ? `<tr><td><strong>Looking for</strong></td><td>${escapeHtml(service)}</td></tr>` : ""}
    </table>
    <hr />
    <p><strong>Message</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  await transporter.sendMail({
    from: `"QUORIXA Website" <${gmailUser}>`,
    to: recipient,
    replyTo: email,
    subject,
    text,
    html,
  });

  return { status: 200, payload: { ok: true } };
}
