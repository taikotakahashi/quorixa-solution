import asLogo from "../assets/logo-slider/as-logo.webp";
import dhLogo from "../assets/logo-slider/dh-logo.webp";
import grLogo from "../assets/logo-slider/gr-logo.webp";
import naLogo from "../assets/logo-slider/na-logo.webp";
import shLogo from "../assets/logo-slider/sh-logo.webp";
import vmLogo from "../assets/logo-slider/vm-logo.webp";

export type ClientLogo = {
  id: string;
  name: string;
  src: string;
};

export const clients: ClientLogo[] = [
  { id: "shutterstock", name: "Shutterstock", src: shLogo },
  { id: "asana", name: "Asana", src: asLogo },
  { id: "vmware", name: "VMware", src: vmLogo },
  { id: "delivery-hero", name: "Delivery Hero", src: dhLogo },
  { id: "groupon", name: "Groupon", src: grLogo },
  { id: "netapp", name: "NetApp", src: naLogo },
];

export type Award = {
  title: string;
  /** Card background */
  color: string;
  /** Darker logo tint matching original treatment */
  logoColor: string;
  brand: string;
};

export const awards: Award[] = [
  {
    title: "Featured React Native app by Facebook | Meta",
    color: "#3B7DED",
    logoColor: "#163A8A",
    brand: "meta",
  },
  {
    title: "Android Excellence app",
    color: "#F15A4A",
    logoColor: "#8B1E14",
    brand: "google-play",
  },
  {
    title: "#1 in Health and Fitness",
    color: "#1F5FE0",
    logoColor: "#0B2F8A",
    brand: "app-store",
  },
  {
    title: "Deloitte Technology Fast 500",
    color: "#6FBF2C",
    logoColor: "#2F6A0E",
    brand: "deloitte",
  },
  {
    title: "The Best Embedded Business Intelligence Software",
    color: "#FF5A1F",
    logoColor: "#9A2A00",
    brand: "g2",
  },
  {
    title: "Gartner top OEM/Embedded BI",
    color: "#4BA3E3",
    logoColor: "#0F4F86",
    brand: "gartner",
  },
  {
    title: "Gartner's Magic Quadrant for RTTVPs",
    color: "#7A4DFF",
    logoColor: "#3A188F",
    brand: "gartner",
  },
  {
    title: "CRN Magazine Sec 100",
    color: "#E2231A",
    logoColor: "#7A0E09",
    brand: "crn",
  },
];

export type Certification = {
  id: string;
  label: string;
};

export const certifications: Certification[] = [
  { id: "google-cloud", label: "Google Cloud Partner" },
  { id: "teradata", label: "Teradata Partner" },
  { id: "inc5000", label: "Inc. 5000" },
  { id: "clutch", label: "Clutch" },
  { id: "iso", label: "ISO" },
  { id: "aws", label: "AWS Partner" },
  { id: "istqb", label: "ISTQB" },
];

export const industries = [
  "Healthcare",
  "FinTech",
  "Retail & E-commerce",
  "Logistics",
  "Manufacturing",
  "Education",
  "Media & Entertainment",
  "SaaS",
  "Transportation",
  "Insurance",
  "Energy",
  "Telecommunications",
];

export const homeServices = [
  {
    title: "Mobile Development",
    description: "Native and cross-platform apps with production-grade quality.",
    href: "/mobile-development",
    icon: "Smartphone",
    color: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    title: "Dedicated Teams",
    description: "Vetted engineers aligned to your process, goals, and timezone.",
    href: "/dedicated-teams",
    icon: "Users",
    color: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    title: "AI & Machine Learning",
    description: "From strategy to deployed agents with measurable business impact.",
    href: "/ai-ml",
    icon: "Cpu",
    color: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    title: "Data Studio",
    description: "Pipelines, analytics, and visualization that turn data into action.",
    href: "/data-studio",
    icon: "BarChart3",
    color: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    title: "Design Studio",
    description: "Product strategy, UX systems, and interfaces people trust.",
    href: "/design-studio",
    icon: "PenTool",
    color: "#FFE8E6",
    iconColor: "#FF3B30",
  },
  {
    title: "Quality Assurance",
    description: "Manual and automated testing that protects every release.",
    href: "/quality-assurance",
    icon: "ShieldCheck",
    color: "#E8F1FF",
    iconColor: "#1677FF",
  },
];

export const technologies = {
  frontend: ["React", "TypeScript", "Next.js", "Vue", "Angular"],
  backend: ["Node.js", "Python", "Java", "Go", ".NET"],
  mobile: ["Swift", "Kotlin", "React Native", "Flutter"],
  cloud: ["AWS", "Azure", "GCP", "Kubernetes"],
  ai: ["OpenAI", "Anthropic", "PyTorch", "Hugging Face"],
  data: ["Snowflake", "dbt", "Spark", "Kafka"],
};
