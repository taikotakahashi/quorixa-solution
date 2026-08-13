import type { Plugin } from "vite";
import { loadEnv } from "vite";
import { CHAT_SYSTEM_PROMPT } from "./src/lib/chatKnowledge";

type IncomingMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

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
