export type InsightSection = "Insights" | "Articles" | "News";

export type Insight = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  section: InsightSection;
  tags: string[];
  date: string;
  readTime: string;
  image: string;
  content: string[];
  featured?: boolean;
};

export const insights: Insight[] = [
  {
    id: "clutch-summer-2026",
    title: "QUORIXA earns Summer 2026 Clutch Global Award recognition",
    excerpt:
      "We're thrilled to announce that QUORIXA has been named a Summer 2026 Clutch Global Award winner for product engineering excellence.",
    category: "News",
    section: "News",
    tags: ["Awards", "Company"],
    date: "Jul 8, 2026",
    readTime: "3 min",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&q=80",
    featured: true,
    content: [
      "Recognition from Clutch reflects how clients experience working with QUORIXA — senior ownership, reliable delivery, and measurable product outcomes.",
      "The award highlights engagements across mobile, AI, and dedicated engineering teams where we partnered as an extension of client product orgs.",
      "We're proud of the teams behind every launch and grateful to the clients who trusted us with their most important initiatives.",
    ],
  },
  {
    id: "shipping-geotap",
    title:
      "Building GeoTap: our client's journey from founder-led prototype to App Store launch",
    excerpt:
      "How a cross-functional QUORIXA squad turned an early concept into a production mobile product in five months.",
    category: "Insights",
    section: "Insights",
    tags: ["Mobile", "Product"],
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
    id: "lean-mvp",
    title: "Turning a 200+ feature wishlist into a lean MVP",
    excerpt:
      "A practical approach to cutting scope without losing the product story — and shipping something users actually adopt.",
    category: "Insights",
    section: "Insights",
    tags: ["Product", "Delivery"],
    date: "Mar 2, 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&q=80",
    content: [
      "Long wishlists feel safe until they stall a launch. The teams that ship treat MVP as a decision framework, not a smaller backlog.",
      "We map every request to a user journey outcome, then keep only the paths that prove the core value proposition.",
      "Clear kill criteria and weekly demos keep stakeholders aligned when favorites get deferred.",
    ],
  },
  {
    id: "genai-in-production",
    title: "Breaking the velocity paradox: an executive strategy for maximizing AI ROI",
    excerpt:
      "Evaluation harnesses, human-in-the-loop controls, and the engineering patterns that separate demos from durable systems.",
    category: "Insights",
    section: "Insights",
    tags: ["AI", "Strategy"],
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
    id: "mobile-banking-guide",
    title:
      "Mobile banking app development: the complete guide to building secure apps in 2026",
    excerpt:
      "Security patterns, compliance considerations, and architecture choices for modern banking experiences.",
    category: "Articles",
    section: "Articles",
    tags: ["Mobile", "FinTech"],
    date: "Feb 18, 2026",
    readTime: "12 min",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&q=80",
    content: [
      "Banking apps succeed when security and UX reinforce each other — frictionless where trusted, deliberate where risk is high.",
      "We outline common architecture layers, threat models, and release practices that keep regulated products shipping safely.",
    ],
  },
  {
    id: "on-demand-delivery",
    title:
      "On-demand delivery app development: complete guide to features, tech stack, cost, and more",
    excerpt:
      "What it takes to build courier marketplaces that scale — from matching algorithms to operator tooling.",
    category: "Articles",
    section: "Articles",
    tags: ["Mobile", "Logistics"],
    date: "Feb 10, 2026",
    readTime: "11 min",
    image:
      "https://images.unsplash.com/photo-1526367790995-02448c7c28c9?w=1000&q=80",
    content: [
      "Delivery platforms are orchestration problems: supply, demand, routing, and payments must stay coherent under load.",
      "This guide covers MVP features, stack choices, and the cost drivers that surprise teams after launch.",
    ],
  },
  {
    id: "ecommerce-app-dev",
    title:
      "E-commerce app development: services, strategies, and technology choices explained",
    excerpt:
      "How product teams choose between custom builds, headless commerce, and hybrid approaches.",
    category: "Articles",
    section: "Articles",
    tags: ["E-commerce", "Front-end"],
    date: "Jan 28, 2026",
    readTime: "9 min",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80",
    content: [
      "Commerce strategy should start with channel goals and team capacity — not a framework preference.",
      "We compare approaches teams actually ship with, and where custom engineering pays off.",
    ],
  },
  {
    id: "qa-automation-strategy",
    title: "Automation that protects releases without slowing teams",
    excerpt:
      "How Quality Studio balances smoke, critical path, and exploratory testing for continuous delivery.",
    category: "Insights",
    section: "Insights",
    tags: ["QA", "Engineering"],
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
    id: "aws-partner",
    title: "QUORIXA achieves AWS Select Tier Services Partner status",
    excerpt:
      "A milestone that deepens our cloud delivery practice and expands how we support client platforms on AWS.",
    category: "News",
    section: "News",
    tags: ["Cloud", "Partnership"],
    date: "Dec 14, 2025",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=80",
    content: [
      "AWS Select Tier recognition reflects validated cloud expertise across migration, modernization, and managed delivery.",
      "Clients benefit from sharper architecture guidance and faster paths from prototype to production on AWS.",
    ],
  },
  {
    id: "industry-awards-2025",
    title: "QUORIXA wins three major industry awards in 2025",
    excerpt:
      "Recognition across design, engineering excellence, and workplace culture from leading industry bodies.",
    category: "News",
    section: "News",
    tags: ["Awards", "Company"],
    date: "Nov 30, 2025",
    readTime: "3 min",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&q=80",
    content: [
      "2025 awards highlight the depth of our studios model — AI, data, design, and quality working as one delivery organization.",
      "We're especially proud that client outcomes and team culture both showed up in the recognition.",
    ],
  },
  {
    id: "design-systems-scale",
    title: "Design systems that engineers actually adopt",
    excerpt:
      "Tokens, contribution models, and governance that keep product UI consistent as squads multiply.",
    category: "Articles",
    section: "Articles",
    tags: ["Design", "Front-end"],
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
    category: "Insights",
    section: "Insights",
    tags: ["Delivery", "Teams"],
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
