export type NavItem = {
  title: string;
  description?: string;
  href: string;
  icon: string;
  color?: string;
};

export const servicesLeft: NavItem[] = [
  {
    title: "Software Development",
    description: "Full-cycle product engineering",
    href: "/dedicated-teams",
    icon: "Code2",
    color: "#5B35F5",
  },
  {
    title: "AI Studio",
    description: "GenAI, ML & intelligent agents",
    href: "/ai-ml",
    icon: "Cpu",
    color: "#1677FF",
  },
  {
    title: "Data Studio",
    description: "Engineering, analytics & ML",
    href: "/data-studio",
    icon: "Database",
    color: "#35B968",
  },
  {
    title: "Design Studio",
    description: "Product design & UX systems",
    href: "/design-studio",
    icon: "PenTool",
    color: "#FF6500",
  },
  {
    title: "Quality Studio",
    description: "QA strategy & automation",
    href: "/quality-assurance",
    icon: "BadgeCheck",
    color: "#FF3B30",
  },
];

export const servicesRight: NavItem[] = [
  {
    title: "Mobile",
    description: "Native & cross-platform apps",
    href: "/mobile-development",
    icon: "Smartphone",
    color: "#1677FF",
  },
  {
    title: "Backend",
    description: "APIs, services & platforms",
    href: "/backend-development",
    icon: "Server",
    color: "#5B35F5",
  },
  {
    title: "Front-end",
    description: "Web UI & design systems",
    href: "/frontend-development",
    icon: "Monitor",
    color: "#35B968",
  },
  {
    title: "Solutions",
    description: "Outcome-driven delivery",
    href: "/solutions",
    icon: "Lightbulb",
    color: "#FF6500",
  },
  {
    title: "Accessibility",
    description: "Inclusive digital experiences",
    href: "/accessibility",
    icon: "Accessibility",
    color: "#4523D8",
  },
];

export const aboutNav: NavItem[] = [
  {
    title: "About us",
    description: "Our story, mission, and values",
    href: "/about",
    icon: "Building2",
  },
  {
    title: "Insights",
    description: "Engineering perspectives & news",
    href: "/insights",
    icon: "BookOpen",
  },
  {
    title: "Leadership",
    description: "Meet the people behind QUORIXA",
    href: "/about#leadership",
    icon: "Users",
  },
  {
    title: "Awards & recognition",
    description: "Industry trust and partnerships",
    href: "/about#recognition",
    icon: "Award",
  },
];

export const careersNav: NavItem[] = [
  {
    title: "Careers at QUORIXA",
    description: "Culture, growth, and opportunity",
    href: "/careers",
    icon: "Briefcase",
  },
  {
    title: "Open positions",
    description: "Explore roles across disciplines",
    href: "/careers#positions",
    icon: "Search",
  },
  {
    title: "Why join us",
    description: "What makes engineering here special",
    href: "/careers#culture",
    icon: "Heart",
  },
  {
    title: "Refer a friend",
    description: "Know a great engineer? Introduce them",
    href: "/contact",
    icon: "Users",
  },
  {
    title: "FAQ",
    description: "Answers to common questions",
    href: "/careers#faq",
    icon: "HelpCircle",
  },
];

export const mainNav = [
  { label: "Services", href: "#", hasDropdown: "services" as const },
  { label: "Our work", href: "/our-work", hasDropdown: null },
  { label: "About", href: "#", hasDropdown: "about" as const },
  { label: "Careers", href: "#", hasDropdown: "careers" as const },
];
