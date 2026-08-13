import cs1 from "../assets/case-image/cs-img-1.webp";
import cs2 from "../assets/case-image/cs-img-2.webp";
import cs3 from "../assets/case-image/cs-img-3.webp";
import cs4 from "../assets/case-image/cs-img-4.webp";
import cs5 from "../assets/case-image/cs-img-5.webp";
import cs6 from "../assets/case-image/cs-img-6.webp";

export type CaseStudyTag = {
  label: string;
  color: string;
  textColor: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: CaseStudyTag[];
  href: string;
  industry?: string;
  result?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "medflow",
    title: "AI-driven RegTech monitoring Nasdaq and the NYSE trading",
    description:
      "A Washington, D.C.-based RegTech overseeing brokerage firms and exchange markets...",
    image: cs1,
    tags: [
      { label: "Data Studio", color: "#e6e7f9", textColor: "#444ce7" },
      { label: "Quality Studio", color: "#bce1c9", textColor: "#1b6c36" },
    ],
    href: "/our-work/medflow",
    industry: "Financial Services",
    result: "Live market oversight",
  },
  {
    id: "geotap",
    title:
      "Idelic: AI-enabled safety intelligence for large-scale fleet operations",
    description:
      "QUORIXA introduced critical data and architecture solutions to a leading fleet safety platform...",
    image: cs2,
    tags: [
      { label: "Data Studio", color: "#e6e7f9", textColor: "#444ce7" },
      { label: "Quality Studio", color: "#bce1c9", textColor: "#1b6c36" },
      { label: "AI Studio", color: "#f5e6ff", textColor: "#9a01fd" },
      { label: "Backend", color: "#d1f1ee", textColor: "#2e6b63" },
      { label: "Front-end", color: "#d1f1ee", textColor: "#2e6b63" },
    ],
    href: "/our-work/geotap",
    industry: "Logistics & Delivery",
    result: "Predictive safety insights at fleet scale",
  },
  {
    id: "finledger",
    title: "10x faster app modernization, powered by AI",
    description:
      "An agentic AI platform that enables 10x faster modernization of legacy enterprise applications...",
    image: cs3,
    tags: [
      { label: "AI Studio", color: "#f5e6ff", textColor: "#9a01fd" },
      { label: "Backend", color: "#d1f1ee", textColor: "#2e6b63" },
      { label: "Front-end", color: "#d1f1ee", textColor: "#2e6b63" },
    ],
    href: "/our-work/finledger",
    industry: "Tech & Software",
    result: "10× faster modernization cycles",
  },
  {
    id: "retailpulse",
    title:
      "AI-powered customer communications platform leveraged by Uber and Motorola",
    description:
      "An enterprise communications platform powered by agentic AI engages QUORIXA...",
    image: cs4,
    tags: [
      { label: "Design Studio", color: "#ffe6e6", textColor: "#bc1016" },
      { label: "Quality Studio", color: "#bce1c9", textColor: "#1b6c36" },
      { label: "Backend", color: "#d1f1ee", textColor: "#2e6b63" },
      { label: "Front-end", color: "#d1f1ee", textColor: "#2e6b63" },
    ],
    href: "/our-work/retailpulse",
    industry: "Tech & Software",
    result: "Enterprise agentic communications",
  },
  {
    id: "securegate",
    title:
      "The Baltimore Banner: AWS-based data and AI solutions driving subscription growth",
    description:
      "The Baltimore Banner is a Pulitzer Prize-winning news platform with...",
    image: cs5,
    tags: [
      { label: "Data Studio", color: "#e6e7f9", textColor: "#444ce7" },
      { label: "AI Studio", color: "#f5e6ff", textColor: "#9a01fd" },
    ],
    href: "/our-work/securegate",
    industry: "Media",
    result: "Subscription growth via data & AI",
  },
  {
    id: "logix",
    title: "AI-native supply chain platform rewiring American manufacturing",
    description:
      "QUORIXA drives the development of an AI-native platform serving 50,000+...",
    image: cs6,
    tags: [
      { label: "Backend", color: "#d1f1ee", textColor: "#2e6b63" },
      { label: "Front-end", color: "#d1f1ee", textColor: "#2e6b63" },
      { label: "Data Studio", color: "#e6e7f9", textColor: "#444ce7" },
      { label: "AI Studio", color: "#f5e6ff", textColor: "#9a01fd" },
    ],
    href: "/our-work/logix",
    industry: "Manufacturing",
    result: "AI-native supply chain at scale",
  },
];
