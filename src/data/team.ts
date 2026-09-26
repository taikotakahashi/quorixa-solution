import memberDh from "../assets/members/dh.webp";
import memberSjj from "../assets/members/sj.webp";
import memberJb from "../assets/members/jb.webp";
import memberDy from "../assets/members/dy.webp";
import memberCg from "../assets/members/cg.webp";
import memberHg from "../assets/members/hg.webp";
import memberHc from "../assets/members/hc.webp";
import memberSc from "../assets/members/sc.webp";
import memberUc from "../assets/members/uc.webp";
import memberJr from "../assets/members/jr.webp";
import memberCj from "../assets/members/cj.webp";
import memberCh from "../assets/members/ch.webp";
import memberGs from "../assets/members/gs.webp";
import memberTg from "../assets/members/tg.webp";
import groupOffice from "../assets/members/group/team-office.webp";
import groupBuilding from "../assets/members/group/team-building.webp";
import groupHandshake from "../assets/members/group/team-handshake.webp";
import groupCrew from "../assets/members/group/team-crew.webp";

export const memberPhotos = [
  memberCg,
  memberCj,
  memberHg,
  memberSjj,
  memberDh,
  memberJb,
  memberHc,
  memberDy,
  memberGs,
  memberJr,
  memberSc,
  memberUc,
  memberCh,
  memberTg,
];

export type GroupPhoto = {
  id: string;
  src: string;
  alt: string;
  orientation: "landscape" | "portrait" | "square";
};

/** Workplace / culture group shots — use beside portraits, not as name+role cards */
export const groupPhotos: GroupPhoto[] = [
  {
    id: "office",
    src: groupOffice,
    alt: "QUORIXA team posed together in the office under the company signage",
    orientation: "landscape",
  },
  {
    id: "building",
    src: groupBuilding,
    alt: "QUORIXA colleagues gathered on the steps outside the office building",
    orientation: "square",
  },
  {
    id: "handshake",
    src: groupHandshake,
    alt: "Two QUORIXA teammates shaking hands in a conference room",
    orientation: "portrait",
  },
  {
    id: "crew",
    src: groupCrew,
    alt: "QUORIXA team members collaborating together",
    orientation: "square",
  },
];

export const groupPhotoById = Object.fromEntries(
  groupPhotos.map((p) => [p.id, p]),
) as Record<GroupPhoto["id"], GroupPhoto>;

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
  /** ISO timestamp — used for “new jobs” notifications */
  postedAt?: string;
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
    postedAt: "2026-09-24T14:00:00.000Z",
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
    postedAt: "2026-09-25T08:00:00.000Z",
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

/**
 * Canonical people registry.
 * Rule: each person has exactly one name + one portrait. Roles may differ by surface
 * (team card vs leadership title), but photo and home base stay consistent.
 */
type Person = {
  id: string;
  name: string;
  photo: string;
  /** Home base shown on leadership / testimonials */
  region: string;
  teamRole?: string;
  leadershipRole?: string;
  quote?: string;
};

const people: Person[] = [
  {
    id: "amelia-chen",
    name: "Amelia Chen",
    photo: memberPhotos[0],
    region: "Singapore",
    teamRole: "Engineering Director",
    leadershipRole: "CEO",
    quote:
      "I joined QUORIXA for the engineering culture. The best part is autonomy to solve hard problems with peers across multiple countries.",
  },
  {
    id: "marcus-reid",
    name: "Marcus Reid",
    photo: memberPhotos[1],
    region: "Austin",
    teamRole: "Principal Architect",
    leadershipRole: "CTO",
    quote:
      "Ownership is real here. You ship, you learn, and you get mentorship without bureaucracy slowing the work.",
  },
  {
    id: "sofia-alvarez",
    name: "Sofia Alvarez",
    photo: memberPhotos[2],
    region: "Madrid",
    teamRole: "Head of Design",
    leadershipRole: "Chief Growth Officer",
    quote:
      "Design and engineering collaborate as one team. That partnership is rare — and it shows in the products we deliver.",
  },
  {
    id: "james-okonkwo",
    name: "James Okonkwo",
    photo: memberPhotos[3],
    region: "Lagos",
    teamRole: "AI Practice Lead",
    leadershipRole: "EVP of Solutions",
    quote:
      "Working on AI programs here means real evaluation discipline — not demos. Clients trust the results because we measure them.",
  },
  {
    id: "elena-petrova",
    name: "Elena Petrova",
    photo: memberPhotos[4],
    region: "Warsaw",
    teamRole: "QA Lead",
    quote:
      "We treat quality as a product feature, not a gate. That mindset lets us move fast without surprising clients in production.",
  },
  {
    id: "david-kim",
    name: "David Kim",
    photo: memberPhotos[5],
    region: "Seoul",
    teamRole: "Delivery Manager",
    quote:
      "Having been with QUORIXA for over 10 years, I continue to discover endless opportunities for growth and development. Over this time, QUORIXA has become more than just a workplace — it's a place where I can find help, support others, and become better from day to day!",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    photo: memberPhotos[6],
    region: "Bangalore",
    teamRole: "Data Engineering Lead",
  },
  {
    id: "noah-fischer",
    name: "Noah Fischer",
    photo: memberPhotos[7],
    region: "Berlin",
    teamRole: "Mobile Lead",
  },
  // Leadership-only (unique people — never reuse team names with different faces)
  {
    id: "lina-kowalski",
    name: "Lina Kowalski",
    photo: memberPhotos[8],
    region: "Europe",
    leadershipRole: "CDO & VP of IT",
  },
  {
    id: "maya-brooks",
    name: "Maya Brooks",
    photo: memberPhotos[9],
    region: "Americas",
    leadershipRole: "VP of Global Delivery",
  },
  {
    id: "andrei-volkov",
    name: "Andrei Volkov",
    photo: memberPhotos[10],
    region: "Europe",
    leadershipRole: "VP of Engineering",
  },
  {
    id: "thiago-mendes",
    name: "Thiago Mendes",
    photo: memberPhotos[11],
    region: "Americas",
    leadershipRole: "VP of Engineering",
  },
  {
    id: "yulia-moroz",
    name: "Yulia Moroz",
    photo: memberPhotos[12],
    region: "Europe",
    leadershipRole: "Head of Engineering Operations",
  },
  {
    id: "vanessa-ortiz",
    name: "Vanessa Ortiz",
    photo: memberPhotos[13],
    region: "Americas",
    leadershipRole: "Director of People",
  },
];

export type LeadershipMember = {
  name: string;
  role: string;
  region: string;
  image?: string;
};

const leadershipTextOnly: Omit<LeadershipMember, "image">[] = [
  { name: "Helena Sorensen", role: "CFO", region: "Europe" },
  { name: "Olivia Grant", role: "VP of Recruiting", region: "Americas" },
  { name: "Daniel Ortiz", role: "Head of Partnerships", region: "Americas" },
  { name: "Dania Kravets", role: "Director of Product Development", region: "Europe" },
  { name: "Francisco Lima", role: "Director of Recruiting", region: "Americas" },
  { name: "Stepan Bondar", role: "Director of Engineering", region: "Europe" },
  { name: "Yulia Moise", role: "Director of Marketing Operations", region: "Europe" },
  { name: "Kapil Nair", role: "Director of Engineering", region: "Asia" },
  { name: "Carlos Diaz", role: "Legal Counsel", region: "Americas" },
];

export const teamMembers = people
  .filter((p) => p.teamRole)
  .map((p) => ({
    name: p.name,
    role: p.teamRole!,
    image: p.photo,
  }));

/** Full leadership directory: photo for people with portraits, text-only after */
export const leadershipTeam: LeadershipMember[] = [
  ...people
    .filter((p) => p.leadershipRole)
    .map((p) => ({
      name: p.name,
      role: p.leadershipRole!,
      region: p.region,
      image: p.photo,
    })),
  ...leadershipTextOnly,
];

export type EmployeeTestimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  image: string;
};

/** Feedback cards — only people with quotes; photo/role always match their team identity */
export const employeeTestimonials: EmployeeTestimonial[] = people
  .filter((p) => p.quote && p.teamRole)
  .map((p) => ({
    quote: p.quote!,
    name: p.name,
    role: p.teamRole!,
    location: p.region,
    image: p.photo,
  }));
