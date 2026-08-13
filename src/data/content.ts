import googleCloud from "../assets/logo-slider/g-cl.webp";
import teradata from "../assets/logo-slider/tet-p.webp";
import inc5000 from "../assets/logo-slider/inc.webp";
import clutch from "../assets/logo-slider/clutch.webp";
import iso from "../assets/logo-slider/iso.webp";
import aws from "../assets/logo-slider/aws.webp";
import istqb from "../assets/logo-slider/istqb.webp";
import asLogo from "../assets/logo-slider/as-logo.webp";
import dhLogo from "../assets/logo-slider/dh-logo.webp";
import grLogo from "../assets/logo-slider/gr-logo.webp";
import naLogo from "../assets/logo-slider/na-logo.webp";
import shLogo from "../assets/logo-slider/sh-logo.webp";
import vmLogo from "../assets/logo-slider/vm-logo.webp";
import awardMeta from "../assets/logo-slider/a.webp";
import awardPlay from "../assets/logo-slider/a-1.webp";
import awardStore from "../assets/logo-slider/a-2.webp";
import awardDeloitte from "../assets/logo-slider/a-3.webp";
import awardG2 from "../assets/logo-slider/a-4.webp";
import awardGartner1 from "../assets/logo-slider/a-5.webp";
import awardGartner2 from "../assets/logo-slider/a-6.webp";
import awardCrn from "../assets/logo-slider/a-7.webp";
import awardIbd from "../assets/logo-slider/a-8.webp";
import awardFastCompany from "../assets/logo-slider/a-9.webp";
import awardWebby from "../assets/logo-slider/a-10.webp";
import awardSoftwareReviews from "../assets/logo-slider/a-11.webp";

export type ClientLogo = {
  id: string;
  name: string;
  src: string;
};

export const clients: ClientLogo[] = [
  { id: "shutterstock", name: "Shutterstock", src: shLogo },
  { id: "asana", name: "Asana", src: asLogo },
  { id: "vmware", name: "VMware", src: vmLogo },
  { id: "groupon", name: "Groupon", src: grLogo },
  { id: "delivery-hero", name: "Delivery Hero", src: dhLogo },
  { id: "netapp", name: "NetApp", src: naLogo },
];

export type Award = {
  title: string;
  color: string;
  logoSrc: string;
};

export const awards: Award[] = [
  {
    title: "Featured React Native app by Facebook | Meta",
    color: "#5B79E6",
    logoSrc: awardMeta,
  },
  {
    title: "Android Excellence app",
    color: "#EF624C",
    logoSrc: awardPlay,
  },
  {
    title: "#1 in Health and Fitness",
    color: "#3C4ED8",
    logoSrc: awardStore,
  },
  {
    title: "Deloitte Technology Fast 500",
    color: "#6FD243",
    logoSrc: awardDeloitte,
  },
  {
    title: "The Best Embedded Business Intelligence Software",
    color: "#FF6B22",
    logoSrc: awardG2,
  },
  {
    title: "Gartner top OEM/Embedded BI",
    color: "#5FA6E8",
    logoSrc: awardGartner1,
  },
  {
    title: "Gartner's Magic Quadrant for RTTVPs",
    color: "#8E28F3",
    logoSrc: awardGartner2,
  },
  {
    title: "CRN Magazine Security 100",
    color: "#E2231A",
    logoSrc: awardCrn,
  },
  {
    title: "10 years Winner",
    color: "#4B3FD6",
    logoSrc: awardIbd,
  },
  {
    title: "The Biggest Innovator",
    color: "#F06A1A",
    logoSrc: awardFastCompany,
  },
  {
    title: "Webby Awards nominee | Apps and Software",
    color: "#35B968",
    logoSrc: awardWebby,
  },
  {
    title: "The Biggest Innovator",
    color: "#E8A317",
    logoSrc: awardSoftwareReviews,
  },
];

export type Certification = {
  id: string;
  label: string;
  src: string;
};

export const certifications: Certification[] = [
  { id: "google-cloud", label: "Google Cloud Partner", src: googleCloud },
  { id: "teradata", label: "Teradata Partner", src: teradata },
  { id: "inc5000", label: "Inc. 5000", src: inc5000 },
  { id: "clutch", label: "Clutch", src: clutch },
  { id: "iso", label: "ISO", src: iso },
  { id: "aws", label: "AWS Partner", src: aws },
  { id: "istqb", label: "ISTQB", src: istqb },
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
