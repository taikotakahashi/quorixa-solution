export type CaseStudy = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: { label: string; color: string }[];
  href: string;
  industry?: string;
  result?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "geotap",
    title: "From prototype to App Store: shipping a live social map product",
    description:
      "End-to-end product engineering that turned a founder vision into a polished consumer mobile experience.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    tags: [
      { label: "Mobile", color: "#E8F1FF" },
      { label: "Product", color: "#F3E8FF" },
    ],
    href: "/our-work/geotap",
    industry: "Social",
    result: "App Store launch in 5 months",
  },
  {
    id: "finledger",
    title: "Modernizing a fintech platform for real-time transaction insight",
    description:
      "Rebuilt core data pipelines and dashboards so finance teams act on live risk signals.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: [
      { label: "Data Studio", color: "#E6F7EF" },
      { label: "FinTech", color: "#FFF0E6" },
    ],
    href: "/our-work/finledger",
    industry: "FinTech",
    result: "3× faster reporting",
  },
  {
    id: "medflow",
    title: "AI-assisted triage workflows for a healthcare operations suite",
    description:
      "Designed and shipped GenAI copilots that reduce admin load for clinical operations teams.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    tags: [
      { label: "AI Studio", color: "#F3E8FF" },
      { label: "Healthcare", color: "#E6F7EF" },
    ],
    href: "/our-work/medflow",
    industry: "Healthcare",
    result: "40% less manual triage",
  },
  {
    id: "retailpulse",
    title: "Unified commerce experience across web and mobile channels",
    description:
      "A design system and front-end platform that scaled consistent UX across markets.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: [
      { label: "Design Studio", color: "#FFF0E6" },
      { label: "Retail", color: "#E8F1FF" },
    ],
    href: "/our-work/retailpulse",
    industry: "Retail",
    result: "+28% conversion",
  },
  {
    id: "securegate",
    title: "Automated quality gates for a mission-critical SaaS release train",
    description:
      "Built a resilient AQA pipeline that caught regressions before production every sprint.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    tags: [
      { label: "Quality Studio", color: "#FFE8E6" },
      { label: "SaaS", color: "#E8F1FF" },
    ],
    href: "/our-work/securegate",
    industry: "SaaS",
    result: "90% regression coverage",
  },
  {
    id: "logix",
    title: "Fleet analytics platform for global logistics operations",
    description:
      "Real-time telemetry, predictive ETAs, and operator tools for multi-region fleets.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    tags: [
      { label: "Backend", color: "#F3E8FF" },
      { label: "Logistics", color: "#E6F7EF" },
    ],
    href: "/our-work/logix",
    industry: "Logistics",
    result: "1M+ events / day",
  },
];
