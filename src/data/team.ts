export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Remote" | "Hybrid" | "On-site";
  level: string;
  technologies: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const jobs: Job[] = [
  {
    id: "sre-1",
    title: "DevOps / Site Reliability Engineer",
    department: "Engineering",
    location: "Remote — Europe",
    type: "Remote",
    level: "Senior",
    technologies: ["Kubernetes", "AWS", "Terraform", "Python"],
    summary:
      "Own reliability for client platforms — from infrastructure as code to observability, incident response, and continuous delivery.",
    responsibilities: [
      "Design and operate Kubernetes-based environments across AWS",
      "Improve CI/CD pipelines, release safety, and rollback strategies",
      "Define SLOs, alerts, and runbooks with product engineering teams",
      "Lead incident response and post-incident improvement cycles",
    ],
    requirements: [
      "5+ years in SRE, DevOps, or platform engineering",
      "Strong Terraform, Kubernetes, and cloud networking experience",
      "Comfort collaborating with product squads in agile delivery",
      "Clear written communication in English",
    ],
  },
  {
    id: "fe-1",
    title: "Senior Front-end Engineer",
    department: "Engineering",
    location: "Hybrid — Lisbon",
    type: "Hybrid",
    level: "Senior",
    technologies: ["React", "TypeScript", "Design Systems"],
    summary:
      "Build high-quality product interfaces and design-system foundations for enterprise and growth-stage clients.",
    responsibilities: [
      "Ship React/TypeScript features with strong accessibility and performance",
      "Contribute to shared component libraries and UI architecture",
      "Partner with designers on interaction quality and edge cases",
      "Mentor engineers and raise front-end craft across the squad",
    ],
    requirements: [
      "5+ years building complex web applications",
      "Deep React and TypeScript experience",
      "Experience with design systems or component libraries",
      "Strong product sense and attention to detail",
    ],
  },
  {
    id: "ml-1",
    title: "Machine Learning Engineer",
    department: "AI / ML",
    location: "Remote — Americas",
    type: "Remote",
    level: "Mid–Senior",
    technologies: ["Python", "PyTorch", "LLM Ops"],
    summary:
      "Design, evaluate, and productionize ML and GenAI systems that create measurable business outcomes.",
    responsibilities: [
      "Build model and agent pipelines from prototype to production",
      "Create evaluation harnesses, monitoring, and cost controls",
      "Collaborate with product and data teams on use-case framing",
      "Document trade-offs and operating guidance for client teams",
    ],
    requirements: [
      "Hands-on experience shipping ML systems beyond notebooks",
      "Strong Python and modern ML/LLM tooling",
      "Familiarity with cloud deployment and experiment tracking",
      "Ability to communicate uncertainty and risk clearly",
    ],
  },
  {
    id: "qa-1",
    title: "Automation QA Engineer",
    department: "QA",
    location: "Remote — LATAM",
    type: "Remote",
    level: "Mid",
    technologies: ["Playwright", "Cypress", "CI/CD"],
    summary:
      "Build resilient automation that protects critical user journeys without slowing delivery.",
    responsibilities: [
      "Own end-to-end and API automation for priority product flows",
      "Reduce flaky tests and improve signal in CI pipelines",
      "Partner with engineers on testability and quality gates",
      "Contribute to Quality Studio playbooks and tooling",
    ],
    requirements: [
      "3+ years in automation QA for web or mobile products",
      "Experience with Playwright or Cypress at scale",
      "Comfort reading application code and debugging failures",
      "Pragmatic mindset about risk vs coverage",
    ],
  },
  {
    id: "ux-1",
    title: "Product Designer",
    department: "Design",
    location: "Hybrid — Warsaw",
    type: "Hybrid",
    level: "Senior",
    technologies: ["Figma", "Design Systems", "Research"],
    summary:
      "Shape end-to-end product experiences — from research and flows to polished UI that engineers can ship confidently.",
    responsibilities: [
      "Lead discovery, prototyping, and interaction design for product squads",
      "Evolve design systems with engineering partners",
      "Run lightweight research and synthesize actionable insights",
      "Present work clearly to stakeholders and client teams",
    ],
    requirements: [
      "Portfolio demonstrating complex product design work",
      "Strong Figma craft and systems thinking",
      "Experience collaborating closely with engineers",
      "Ability to balance business goals with user needs",
    ],
  },
  {
    id: "be-1",
    title: "Backend Platform Engineer",
    department: "Engineering",
    location: "Remote — Global",
    type: "Remote",
    level: "Senior",
    technologies: ["Go", "PostgreSQL", "gRPC", "Kafka"],
    summary:
      "Build durable services and platform foundations that power high-scale product workloads.",
    responsibilities: [
      "Design APIs and event-driven services with clear ownership boundaries",
      "Improve data integrity, performance, and operational readiness",
      "Collaborate on architecture reviews and technical roadmaps",
      "Support production reliability alongside client teams",
    ],
    requirements: [
      "5+ years backend or platform engineering experience",
      "Strong Go or equivalent systems language experience",
      "Hands-on with relational databases and messaging systems",
      "Bias toward simple, operable designs",
    ],
  },
];

export const teamMembers = [
  {
    name: "Amelia Chen",
    role: "Engineering Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&q=80",
  },
  {
    name: "Marcus Reid",
    role: "Principal Architect",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&q=80",
  },
  {
    name: "Sofia Alvarez",
    role: "Head of Design",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&q=80",
  },
  {
    name: "James Okonkwo",
    role: "AI Practice Lead",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80",
  },
  {
    name: "Elena Petrova",
    role: "QA Lead",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=300&fit=crop&q=80",
  },
  {
    name: "David Kim",
    role: "Delivery Manager",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&q=80",
  },
  {
    name: "Priya Sharma",
    role: "Data Engineering Lead",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=300&fit=crop&q=80",
  },
  {
    name: "Noah Fischer",
    role: "Mobile Lead",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&q=80",
  },
];

export const employeeTestimonials = [
  {
    quote:
      "I joined QUORIXA for the engineering culture. The best part is autonomy to solve hard problems with peers across multiple countries.",
    name: "Amelia Chen",
    role: "Engineering Director",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80",
  },
  {
    quote:
      "Ownership is real here. You ship, you learn, and you get mentorship without bureaucracy slowing the work.",
    name: "Marcus Reid",
    role: "Principal Architect",
    location: "Austin",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80",
  },
  {
    quote:
      "Design and engineering collaborate as one team. That partnership is rare — and it shows in the products we deliver.",
    name: "Sofia Alvarez",
    role: "Head of Design",
    location: "Madrid",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80",
  },
];
