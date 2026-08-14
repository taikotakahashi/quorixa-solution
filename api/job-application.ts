import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendJobApplicationMail } from "./_lib/sendJobApplicationMail.js";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "6mb",
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({
      error: "method_not_allowed",
      message: "Use POST to submit a job application.",
    });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const result = await sendJobApplicationMail(body ?? {}, process.env);
    res.status(result.status).json(result.payload);
  } catch (err) {
    res.status(500).json({
      error: "server_error",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
