export type ContactPayload = {
  source: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message?: string;
  question?: string;
};

export type ContactResult = { ok: true } | { ok: false; message: string };

export async function submitContactMessage(
  payload: ContactPayload,
): Promise<ContactResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const raw = await res.text();
    let data: { message?: string; error?: string } = {};
    try {
      data = raw ? (JSON.parse(raw) as { message?: string; error?: string }) : {};
    } catch {
      return {
        ok: false,
        message:
          "The contact service is not available on this host. Deploy the API and try again.",
      };
    }

    if (!res.ok) {
      return {
        ok: false,
        message:
          data.message ??
          "We couldn't send your message. Please try again in a moment.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message:
        "We couldn't reach the contact service. Check your connection and try again.",
    };
  }
}
