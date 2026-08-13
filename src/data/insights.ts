export type Insight = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
};

export const insights: Insight[] = [
  {
    id: "shipping-geotap",
    title: "Building GeoTap: from founder prototype to App Store launch",
    excerpt:
      "How a cross-functional QUORIXA squad turned an early concept into a production mobile product in five months.",
    category: "Product",
    date: "Mar 12, 2026",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1000&q=80",
    content: [
      "Shipping a consumer mobile product under tight timelines requires more than velocity — it needs disciplined discovery, ruthless prioritization, and a team that owns outcomes.",
      "For GeoTap, we paired product design, mobile engineering, and QA into one squad. The first two weeks focused on validating the live-map experience and cutting non-essential scope.",
      "We established a release cadence with weekly builds, automated regression suites, and a clear definition of done. That cadence kept stakeholders aligned and quality predictable.",
      "The result was a polished App Store launch and a foundation ready for growth experiments — without rewriting the core architecture three months later.",
    ],
  },
  {
    id: "genai-in-production",
    title: "What it takes to put GenAI copilots into production safely",
    excerpt:
      "Evaluation harnesses, human-in-the-loop controls, and the engineering patterns that separate demos from durable systems.",
    category: "AI",
    date: "Feb 28, 2026",
    readTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&q=80",
    content: [
      "Most GenAI pilots fail not because models are weak, but because evaluation, observability, and ownership are afterthoughts.",
      "We treat copilots like any other production system: clear success metrics, regression datasets, cost budgets, and fallback paths when confidence is low.",
      "Prompt and tool changes go through the same review discipline as application code. That keeps iteration fast without surprising operators.",
      "When those foundations are in place, teams can ship useful assistants that improve week over week — not fragile demos that stall after launch.",
    ],
  },
  {
    id: "data-platform-roi",
    title: "Measuring ROI on a modern data platform rewrite",
    excerpt:
      "A practical framework for tying pipeline investment to decision latency, reliability, and business outcomes.",
    category: "Data",
    date: "Feb 4, 2026",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80",
    content: [
      "Data platform work is easy to overfund and hard to defend unless outcomes are explicit.",
      "We map investments to three levers: time-to-insight, pipeline reliability, and the percentage of decisions powered by trusted metrics.",
      "Instrumentation comes first — without baseline latency and failure rates, a rewrite is just a hope.",
      "Teams that frame platform work this way earn executive support and ship increments that compound.",
    ],
  },
  {
    id: "qa-automation-strategy",
    title: "Automation that protects releases without slowing teams",
    excerpt:
      "How Quality Studio balances smoke, critical path, and exploratory testing for continuous delivery.",
    category: "Engineering",
    date: "Jan 18, 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1000&q=80",
    content: [
      "Automated coverage only helps when it maps to real risk. Blanket UI tests that flake nightly create noise, not safety.",
      "We start with a risk matrix: money paths, auth, data integrity, and accessibility. Those get the fastest, most stable suites.",
      "Exploratory testing stays intentional — scheduled around high-change areas rather than bolted on at the end.",
      "The outcome is a release train teams trust: fewer surprises, clearer ownership, and faster recovery when something slips.",
    ],
  },
  {
    id: "design-systems-scale",
    title: "Design systems that engineers actually adopt",
    excerpt:
      "Tokens, contribution models, and governance that keep product UI consistent as squads multiply.",
    category: "Design",
    date: "Dec 9, 2025",
    readTime: "9 min",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1000&q=80",
    content: [
      "A design system fails quietly when contribution is unclear or components lag product needs.",
      "Successful systems treat the library as a product: roadmap, support channels, and measurable adoption.",
      "Engineers need package stability and clear APIs. Designers need flexibility without forking the foundation.",
      "When both sides get those guarantees, consistency scales without becoming a bottleneck.",
    ],
  },
  {
    id: "dedicated-team-playbook",
    title: "A playbook for standing up a dedicated engineering team",
    excerpt:
      "Discovery, selection, and the operating cadence that makes nearshore squads feel like an in-house product org.",
    category: "Delivery",
    date: "Nov 21, 2025",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80",
    content: [
      "Dedicated teams succeed when expectations are explicit: ownership boundaries, communication norms, and success metrics.",
      "We run a structured discovery before staffing — understanding architecture, release process, and decision makers.",
      "The first 30 days emphasize trust: pairing, documentation, and early wins that prove delivery quality.",
      "From there, the squad operates as an extension of the client's product organization, not a black-box vendor.",
    ],
  },
];
