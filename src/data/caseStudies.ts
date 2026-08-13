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
    title: "Idelic: AI-enabled safety intelligence for large-scale fleet operations",
    description:
      "QUORIXA introduced critical data and architecture solutions to a leading fleet safety platform — enabling predictive risk insights at scale.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    tags: [
      { label: "Data Studio", color: "#EDE7F6" },
      { label: "Quality Studio", color: "#E8F5E9" },
      { label: "AI Studio", color: "#FCE4EC" },
      { label: "Backend", color: "#E3F2FD" },
      { label: "Front-end", color: "#E0F7FA" },
    ],
    href: "/our-work/geotap",
    industry: "Logistics & Delivery",
    result: "Predictive safety insights at fleet scale",
  },
  {
    id: "finledger",
    title: "10x faster app modernization, powered by AI",
    description:
      "An agentic AI platform that enables 10x faster modernization of legacy enterprise applications without freezing delivery.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&q=80",
    tags: [
      { label: "AI Studio", color: "#FCE4EC" },
      { label: "Backend", color: "#E3F2FD" },
      { label: "Front-end", color: "#E0F7FA" },
    ],
    href: "/our-work/finledger",
    industry: "Tech & Software",
    result: "10× faster modernization cycles",
  },
  {
    id: "medflow",
    title: "Real-time trading intelligence for exchange markets",
    description:
      "Built high-throughput data pipelines and dashboards so trading firms act on live market signals with confidence.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
    tags: [
      { label: "Data Studio", color: "#EDE7F6" },
      { label: "Backend", color: "#E3F2FD" },
      { label: "FinTech", color: "#FFF3E0" },
    ],
    href: "/our-work/medflow",
    industry: "Financial Services",
    result: "Sub-second market insight",
  },
  {
    id: "retailpulse",
    title: "Unified commerce experience across web and mobile",
    description:
      "A design system and front-end platform that scaled consistent UX across markets and channels.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    tags: [
      { label: "Design Studio", color: "#FFF3E0" },
      { label: "Front-end", color: "#E0F7FA" },
      { label: "Mobile", color: "#E3F2FD" },
    ],
    href: "/our-work/retailpulse",
    industry: "Retail & Ecommerce",
    result: "+28% conversion",
  },
  {
    id: "securegate",
    title: "Automated quality gates for mission-critical SaaS releases",
    description:
      "Built a resilient AQA pipeline that caught regressions before production every sprint.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",
    tags: [
      { label: "Quality Studio", color: "#E8F5E9" },
      { label: "Backend", color: "#E3F2FD" },
      { label: "AI Studio", color: "#FCE4EC" },
    ],
    href: "/our-work/securegate",
    industry: "Tech & Software",
    result: "90% regression coverage",
  },
  {
    id: "logix",
    title: "Fleet analytics platform for global logistics operations",
    description:
      "Real-time telemetry, predictive ETAs, and operator tools for multi-region fleets.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80",
    tags: [
      { label: "Backend", color: "#EDE7F6" },
      { label: "Data Studio", color: "#E8F5E9" },
      { label: "Front-end", color: "#E0F7FA" },
    ],
    href: "/our-work/logix",
    industry: "Logistics & Delivery",
    result: "1M+ events / day",
  },
];
