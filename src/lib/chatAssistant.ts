import { CHAT_SYSTEM_PROMPT, type ChatMessage } from "./chatKnowledge";

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function includesAny(text: string, needles: string[]) {
  return needles.some((n) => text.includes(n));
}

/** Contextual replies when OpenAI is unavailable — not a single canned fallback. */
export function generateLocalReply(
  userText: string,
  history: ChatMessage[] = [],
): string {
  const t = normalize(userText);
  const priorUser = history
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase())
    .join(" ");

  if (
    includesAny(t, ["bye", "goodbye", "good bye", "see you", "that's all", "thats all"])
  ) {
    return "Got it, I'll be here if you need anything later. If you ever start exploring a software project or need a development partner, feel free to come back and ask!";
  }

  if (
    includesAny(t, ["how old", "your age", "when were you born", "are you human"])
  ) {
    return "I don't have an age in the human sense. I'm a virtual assistant that's continuously updated with QUORIXA's latest company and case study information rather than \"born\" at a specific time. I'm here mainly to help with questions about custom software development and how QUORIXA could support your product or platform. If you have any other questions or need further assistance, feel free to ask!";
  }

  if (
    includesAny(t, [
      "tell me yourself",
      "tell me about yourself",
      "who are you",
      "what are you",
      "introduce yourself",
      "about you",
    ])
  ) {
    return `I'm an AI assistant on QUORIXA's website, focused on helping companies explore custom software development with our team.

QUORIXA builds end-to-end digital products including:
• Web and mobile applications
• UX/UI design and product discovery
• Full-stack development and architecture
• AI and machine learning solutions
• Data engineering and analytics
• DevOps and cloud infrastructure
• QA, automation and performance testing

My role is to:
• Understand your context and goals
• Share what's possible technically and product-wise
• Point you to relevant services, studios, and next steps

What are you looking to build or improve?`;
  }

  if (
    includesAny(t, ["genai", "generative ai", "agentic", "llm", "machine learning", " ml "]) ||
    t === "ai" ||
    t.includes("ai studio") ||
    (t.includes("ai") && includesAny(t, ["help", "build", "use", "adopt", "solution"]))
  ) {
    return `QUORIXA's AI Studio helps teams move from experiments to production GenAI and agentic systems — often at about 2× the speed of starting from scratch in-house.

Typical support includes:
• AI architecture consulting and MVP / PoC development
• Model evaluation (GPT, Llama, DeepSeek, and more)
• Agentic prototyping and workflow automation
• Engineering augmentation with modern AI tooling for higher delivery ROI

Tell me whether you're exploring a PoC, productionizing a model, or embedding AI into an existing product — I can suggest a sensible path.`;
  }

  if (
    includesAny(t, [
      "service",
      "what do you do",
      "what can you",
      "capabilities",
      "offer",
      "studio",
    ])
  ) {
    return `QUORIXA covers product engineering with specialized studios and delivery models:

• AI Studio — GenAI, ML, and agentic development
• Data Studio — analytics, pipelines, and visualization
• Design Studio — Lean UX/UI and product discovery
• Quality Studio — agentic QA, automation, and release health
• Mobile, web UI, backend, cloud/DevOps, and dedicated teams

Engagement can be team augmentation, a dedicated squad, or end-to-end solutions delivery.

Which of these is closest to what you need right now?`;
  }

  if (includesAny(t, ["price", "pricing", "cost", "rate", "budget", "how much"])) {
    return `Pricing depends on scope, seniority mix, and engagement model (augmentation vs dedicated team vs full solution delivery). QUORIXA typically works with product companies that want senior remote talent and measurable delivery outcomes rather than a one-size rate card.

If you share a rough timeline, stack, and whether you need a few specialists or a full squad, I can help frame what a good engagement looks like — and you can book a free consultation on the Contact page for numbers tailored to your case.`;
  }

  if (
    includesAny(t, [
      "contact",
      "talk to",
      "speak to",
      "call",
      "book",
      "consultation",
      "meeting",
      "sales",
      "human",
    ])
  ) {
    return `Absolutely — the fastest next step is the Contact page (/contact), where you can book a free consultation with QUORIXA specialists.

If you want, tell me a bit about your product, timeline, and stack here first, and I can help you clarify what to ask for on that call.`;
  }

  if (
    includesAny(t, [
      "dedicated team",
      "staff augment",
      "augmentation",
      "hire",
      "engineer",
      "developer",
      "remote team",
    ])
  ) {
    return `QUORIXA builds dedicated remote teams and also embeds senior engineers into your process.

You can typically expect:
• Top-tier remote experts across product engineering disciplines
• AI-augmented delivery for higher productivity
• Work driven from your backlog and rituals
• Specialists who integrate with your team and tools

Share your stack and whether you need a few people or a full cross-functional squad, and I can outline a sensible starting shape.`;
  }

  if (includesAny(t, ["case study", "portfolio", "clients", "work", "example", "project"])) {
    return `QUORIXA partners with product companies on AI-enabled platforms, mobile/web products, data systems, and modernization programs. On this site you'll find case studies under Our Work, plus outcome-focused stories on the homepage.

If you tell me your industry (for example FinTech, healthcare, retail, or logistics) or the problem you're solving, I can point you toward the most relevant type of engagement and what similar delivery usually includes.`;
  }

  if (
    includesAny(t, ["hello", "hi ", "hey", "good morning", "good afternoon", "good evening"]) ||
    t === "hi" ||
    t === "hello" ||
    t === "hey"
  ) {
    return "Hi! How can I help you today — exploring GenAI, hiring a dedicated team, or scoping a product build?";
  }

  if (includesAny(t, ["thank", "thanks", "thx", "appreciate"])) {
    return "You're welcome! Ask anything else about QUORIXA's services, studios, or engagement models whenever you're ready.";
  }

  // Follow-up style answer using light context from prior turns
  if (
    includesAny(priorUser, ["ai", "genai"]) &&
    includesAny(t, ["how", "start", "begin", "next", "process"])
  ) {
    return `A practical starting path with QUORIXA usually looks like:

1. Clarify the business outcome and constraints
2. Choose PoC vs production track
3. Align data, architecture, and evaluation criteria
4. Ship a thin vertical slice, then harden for production

If you share your use case in one or two sentences, I can suggest whether a short discovery, a PoC, or a dedicated AI squad is the better first move.`;
  }

  return `Happy to help with that.

I'm set up to answer questions about QUORIXA's custom software development, GenAI/agentic delivery, dedicated teams, design/data/QA studios, and how engagements usually work.

Could you share a bit more — for example what you're building, your timeline, or which capability you're curious about? If you'd rather talk to a person, the Contact page is the best next step.`;
}

export async function requestAssistantReply(
  messages: ChatMessage[],
): Promise<string> {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return "Hi! How can I help you?";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (res.ok) {
      const data = (await res.json()) as { reply?: string };
      if (data.reply?.trim()) return data.reply.trim();
    }
  } catch {
    /* fall through to local assistant */
  }

  return generateLocalReply(lastUser.content, messages);
}

export { CHAT_SYSTEM_PROMPT };
