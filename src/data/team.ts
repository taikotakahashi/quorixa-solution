import memberDh from "../assets/members/dh.jpg";
import memberSu from "../assets/members/su.png";
import memberJb from "../assets/members/jb.jpg";
import memberDy from "../assets/members/dy.jpg";
import memberCg from "../assets/members/cg.png";
import memberHg from "../assets/members/hg.png";
import memberHc from "../assets/members/hc.jpg";
import memberSc from "../assets/members/sc.png";
import memberUc from "../assets/members/uc.jpg";
import memberJr from "../assets/members/jr.jpg";
import memberCj from "../assets/members/cj.jpg";
import memberSj from "../assets/members/sj.png";
import memberCh from "../assets/members/ch.jpg";
import memberGs from "../assets/members/gs.png";

export const memberPhotos = [
  memberCg,
  memberSc,
  memberHg,
  memberSu,
  memberDh,
  memberJb,
  memberHc,
  memberDy,
  memberGs,
  memberJr,
  memberCj,
  memberUc,
  memberSj,
  memberCh,
];

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
    image: memberPhotos[0],
  },
  {
    name: "Marcus Reid",
    role: "Principal Architect",
    image: memberPhotos[1],
  },
  {
    name: "Sofia Alvarez",
    role: "Head of Design",
    image: memberPhotos[2],
  },
  {
    name: "James Okonkwo",
    role: "AI Practice Lead",
    image: memberPhotos[3],
  },
  {
    name: "Elena Petrova",
    role: "QA Lead",
    image: memberPhotos[4],
  },
  {
    name: "David Kim",
    role: "Delivery Manager",
    image: memberPhotos[5],
  },
  {
    name: "Priya Sharma",
    role: "Data Engineering Lead",
    image: memberPhotos[6],
  },
  {
    name: "Noah Fischer",
    role: "Mobile Lead",
    image: memberPhotos[7],
  },
];

/** Full leadership directory (AE /leadership layout): photo for first 10, text-only after */
export type LeadershipMember = {
  name: string;
  role: string;
  region: string;
  image?: string;
};

export const leadershipTeam: LeadershipMember[] = [
  {
    name: "Amelia Chen",
    role: "CEO",
    region: "USA",
    image: memberPhotos[0],
  },
  {
    name: "Marcus Reid",
    role: "CTO",
    region: "USA",
    image: memberPhotos[1],
  },
  {
    name: "Sofia Alvarez",
    role: "Chief Growth Officer",
    region: "Americas",
    image: memberPhotos[2],
  },
  {
    name: "Elena Petrova",
    role: "CFO",
    region: "Europe",
    image: memberPhotos[3],
  },
  {
    name: "James Okonkwo",
    role: "EVP of Solutions",
    region: "Americas",
    image: memberPhotos[4],
  },
  {
    name: "Priya Sharma",
    role: "VP of Recruiting",
    region: "Americas",
    image: memberPhotos[5],
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    region: "USA",
    image: memberPhotos[6],
  },
  {
    name: "Noah Fischer",
    role: "Head of Partnerships",
    region: "Americas",
    image: memberPhotos[7],
  },
  {
    name: "Lina Kowalski",
    role: "CDO & VP of IT",
    region: "Europe",
    image: memberPhotos[8],
  },
  {
    name: "Maya Brooks",
    role: "VP of Global Delivery",
    region: "Americas",
    image: memberPhotos[9],
  },
  {
    name: "Andrei Volkov",
    role: "VP of Engineering",
    region: "Europe",
    image: memberPhotos[10],
  },
  {
    name: "Thiago Mendes",
    role: "VP of Engineering",
    region: "Americas",
    image: memberPhotos[11],
  },
  {
    name: "Yulia Moroz",
    role: "Head of Engineering Operations",
    region: "Europe",
    image: memberPhotos[12],
  },
  {
    name: "Vanessa Ortiz",
    role: "Director of People",
    region: "Americas",
    image: memberPhotos[13],
  },
  {
    name: "Dania Kravets",
    role: "Director of Product Development",
    region: "Europe",
  },
  {
    name: "Francisco Lima",
    role: "Director of Recruiting",
    region: "Americas",
  },
  {
    name: "Stepan Bondar",
    role: "Director of Engineering",
    region: "Europe",
  },
  {
    name: "Yulia Moise",
    role: "Director of Marketing Operations",
    region: "Europe",
  },
  {
    name: "Kapil Nair",
    role: "Director of Engineering",
    region: "Asia",
  },
  {
    name: "Carlos Diaz",
    role: "Legal Counsel",
    region: "Americas",
  },
];

export const employeeTestimonials = [
  {
    quote:
      "I joined QUORIXA for the engineering culture. The best part is autonomy to solve hard problems with peers across multiple countries.",
    name: "Amelia Chen",
    role: "Engineering Director",
    location: "Singapore",
    image: memberPhotos[0],
  },
  {
    quote:
      "Ownership is real here. You ship, you learn, and you get mentorship without bureaucracy slowing the work.",
    name: "Marcus Reid",
    role: "Principal Architect",
    location: "Austin",
    image: memberPhotos[1],
  },
  {
    quote:
      "Design and engineering collaborate as one team. That partnership is rare — and it shows in the products we deliver.",
    name: "Sofia Alvarez",
    role: "Head of Design",
    location: "Madrid",
    image: memberPhotos[2],
  },
];
