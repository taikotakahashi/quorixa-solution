import nodemailer from "nodemailer";

export type JobApplicationBody = {
  jobId?: string;
  jobTitle?: string;
  jobDepartment?: string;
  jobLocation?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  portfolio?: string;
  coverLetter?: string;
  resume?: {
    filename?: string;
    mimeType?: string;
    data?: string;
  };
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const DEFAULT_RECIPIENT = "pelixphilip@gmail.com";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendJobApplicationMail(
  body: JobApplicationBody,
  env: Record<string, string | undefined>,
): Promise<{ status: number; payload: Record<string, unknown> }> {
  const gmailUser = env.GMAIL_USER || env.VITE_GMAIL_USER;
  const gmailPass = env.GMAIL_APP_PASSWORD || env.VITE_GMAIL_APP_PASSWORD;
  const recipient =
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

  const fullName = body.fullName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const coverLetter = body.coverLetter?.trim() ?? "";
  const jobTitle = body.jobTitle?.trim() ?? "Unknown role";
  const jobId = body.jobId?.trim() ?? "";
  const jobDepartment = body.jobDepartment?.trim() ?? "";
  const jobLocation = body.jobLocation?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const linkedin = body.linkedin?.trim() ?? "";
  const portfolio = body.portfolio?.trim() ?? "";
  const resume = body.resume;

  if (!fullName || !email || !coverLetter) {
    return {
      status: 400,
      payload: {
        error: "validation_error",
        message: "Full name, email, and cover letter are required.",
      },
    };
  }

  if (!resume?.data || !resume.filename || !resume.mimeType) {
    return {
      status: 400,
      payload: {
        error: "validation_error",
        message: "A resume file is required.",
      },
    };
  }

  if (!ALLOWED_RESUME_TYPES.has(resume.mimeType)) {
    return {
      status: 400,
      payload: {
        error: "validation_error",
        message: "Resume must be a PDF or Word document.",
      },
    };
  }

  const resumeBuffer = Buffer.from(resume.data, "base64");
  if (resumeBuffer.length === 0 || resumeBuffer.length > MAX_RESUME_BYTES) {
    return {
      status: 400,
      payload: {
        error: "validation_error",
        message: "Resume file is invalid or exceeds 5 MB.",
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

  const subject = `Job application: ${jobTitle} — ${fullName}`;
  const text = [
    "New job application received",
    "",
    `Position: ${jobTitle}`,
    jobId ? `Job ID: ${jobId}` : "",
    jobDepartment ? `Department: ${jobDepartment}` : "",
    jobLocation ? `Location: ${jobLocation}` : "",
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    linkedin ? `LinkedIn: ${linkedin}` : "",
    portfolio ? `Portfolio: ${portfolio}` : "",
    "",
    "Cover letter:",
    coverLetter,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>New job application</h2>
    <p><strong>Position:</strong> ${escapeHtml(jobTitle)}</p>
    ${jobId ? `<p><strong>Job ID:</strong> ${escapeHtml(jobId)}</p>` : ""}
    ${jobDepartment ? `<p><strong>Department:</strong> ${escapeHtml(jobDepartment)}</p>` : ""}
    ${jobLocation ? `<p><strong>Location:</strong> ${escapeHtml(jobLocation)}</p>` : ""}
    <hr />
    <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    ${linkedin ? `<p><strong>LinkedIn:</strong> ${escapeHtml(linkedin)}</p>` : ""}
    ${portfolio ? `<p><strong>Portfolio:</strong> ${escapeHtml(portfolio)}</p>` : ""}
    <hr />
    <p><strong>Cover letter</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(coverLetter)}</p>
  `;

  await transporter.sendMail({
    from: `"QUORIXA Careers" <${gmailUser}>`,
    to: recipient,
    replyTo: email,
    subject,
    text,
    html,
    attachments: [
      {
        filename: resume.filename,
        content: resumeBuffer,
        contentType: resume.mimeType,
      },
    ],
  });

  return { status: 200, payload: { ok: true } };
}
