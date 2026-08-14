import type { Plugin } from "vite";
import { loadEnv } from "vite";
import nodemailer from "nodemailer";
import { CHAT_SYSTEM_PROMPT } from "./src/lib/chatKnowledge.js";

type IncomingMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type JobApplicationBody = {
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

async function readBody(req: import("http").IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function sendJson(
  res: import("http").ServerResponse,
  status: number,
  payload: unknown,
) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

/**
 * Dev/preview middleware: POST /api/chat → OpenAI-compatible Chat Completions.
 * Set OPENAI_API_KEY in `.env` (optional OPENAI_BASE_URL / OPENAI_MODEL).
 */
export function chatApiPlugin(): Plugin {
  return {
    name: "quorixa-chat-api",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");
      attachChatMiddleware(server.middlewares, env);
    },
    configurePreviewServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");
      attachChatMiddleware(server.middlewares, env);
    },
  };
}

function attachChatMiddleware(
  middlewares: {
    use: (
      path: string,
      handler: (
        req: import("http").IncomingMessage,
        res: import("http").ServerResponse,
        next: () => void,
      ) => void,
    ) => void;
  },
  env: Record<string, string>,
) {
  attachJobApplicationMiddleware(middlewares, env);

  middlewares.use("/api/chat", (req, res, next) => {
    void (async () => {
      if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
      }
      if (req.method !== "POST") {
        next();
        return;
      }

      const apiKey = env.OPENAI_API_KEY || env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        sendJson(res, 503, {
          error: "missing_api_key",
          message: "OPENAI_API_KEY is not configured",
        });
        return;
      }

      try {
        const raw = await readBody(req);
        const body = JSON.parse(raw) as { messages?: IncomingMessage[] };
        const messages = Array.isArray(body.messages) ? body.messages : [];

        const baseUrl = (env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(
          /\/$/,
          "",
        );
        const model = env.OPENAI_MODEL || "gpt-4o-mini";

        const upstream = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            temperature: 0.6,
            max_tokens: 500,
            messages: [
              { role: "system", content: CHAT_SYSTEM_PROMPT },
              ...messages
                .filter((m) => m.role === "user" || m.role === "assistant")
                .slice(-12)
                .map((m) => ({ role: m.role, content: m.content })),
            ],
          }),
        });

        if (!upstream.ok) {
          const errText = await upstream.text();
          sendJson(res, 502, {
            error: "upstream_error",
            message: errText.slice(0, 400),
          });
          return;
        }

        const data = (await upstream.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (!reply) {
          sendJson(res, 502, { error: "empty_reply" });
          return;
        }

        sendJson(res, 200, { reply });
      } catch (err) {
        sendJson(res, 500, {
          error: "server_error",
          message: err instanceof Error ? err.message : "Unknown error",
        });
      }
    })();
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function attachJobApplicationMiddleware(
  middlewares: {
    use: (
      path: string,
      handler: (
        req: import("http").IncomingMessage,
        res: import("http").ServerResponse,
        next: () => void,
      ) => void,
    ) => void;
  },
  env: Record<string, string>,
) {
  middlewares.use("/api/job-application", (req, res, next) => {
    void (async () => {
      if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
      }
      if (req.method !== "POST") {
        next();
        return;
      }

      const gmailUser = env.GMAIL_USER || env.VITE_GMAIL_USER;
      const gmailPass = env.GMAIL_APP_PASSWORD || env.VITE_GMAIL_APP_PASSWORD;
      const recipient =
        env.JOB_APPLICATION_RECIPIENT ||
        env.VITE_JOB_APPLICATION_RECIPIENT ||
        DEFAULT_RECIPIENT;

      if (!gmailUser || !gmailPass) {
        sendJson(res, 503, {
          error: "missing_email_config",
          message:
            "Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env",
        });
        return;
      }

      try {
        const raw = await readBody(req);
        const body = JSON.parse(raw) as JobApplicationBody;

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
          sendJson(res, 400, {
            error: "validation_error",
            message: "Full name, email, and cover letter are required.",
          });
          return;
        }

        if (!resume?.data || !resume.filename || !resume.mimeType) {
          sendJson(res, 400, {
            error: "validation_error",
            message: "A resume file is required.",
          });
          return;
        }

        if (!ALLOWED_RESUME_TYPES.has(resume.mimeType)) {
          sendJson(res, 400, {
            error: "validation_error",
            message: "Resume must be a PDF or Word document.",
          });
          return;
        }

        const resumeBuffer = Buffer.from(resume.data, "base64");
        if (resumeBuffer.length === 0 || resumeBuffer.length > MAX_RESUME_BYTES) {
          sendJson(res, 400, {
            error: "validation_error",
            message: "Resume file is invalid or exceeds 5 MB.",
          });
          return;
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

        sendJson(res, 200, { ok: true });
      } catch (err) {
        sendJson(res, 500, {
          error: "server_error",
          message: err instanceof Error ? err.message : "Unknown error",
        });
      }
    })();
  });
}
