import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  ClipboardCheck,
  Cloud,
  Database,
  Gauge,
  Layers,
  Monitor,
  Palette,
  Shield,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../components/Hero";
import { MobileVisual } from "../components/HeroVisuals";
import { ClientLogoMarquee } from "../components/ClientLogoMarquee";
import { SectionHeader } from "../components/SectionHeader";
import { ServiceCard } from "../components/ServiceCard";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { CurvedDivider } from "../components/CurvedDivider";
import { industries } from "../data/content";
import styles from "./Solutions.module.css";

type EngagementTab = "start" | "expand" | "build";

const tabs: { id: EngagementTab; label: string }[] = [
  { id: "start", label: "Start — team augmentation" },
  { id: "expand", label: "Expand — dedicated teams" },
  { id: "build", label: "Build — solutions teams" },
];

const engagementContent: Record<
  EngagementTab,
  { lead: string; columns: { title: string; items: string[] }[] }
> = {
  start: {
    lead: "Integrate highly skilled remote experts into your team",
    columns: [
      {
        title: "Talent",
        items: [
          "Expert selection via a dedicated candidate pipeline",
          "Talent development handled as an extension of your own",
        ],
      },
      {
        title: "Delivery support",
        items: [
          "On-demand alignment with QUORIXA tech leads",
          "Part-time oversight by delivery managers",
          "Experts follow your processes and reporting protocols",
        ],
      },
      {
        title: "Key strengths",
        items: [
          "Optimal for adding capabilities to an existing team",
          "Full control over remote experts' engagement",
        ],
      },
    ],
  },
  expand: {
    lead: "Custom-build a functional team driving the delivery of features",
    columns: [
      {
        title: "Talent",
        items: [
          "Team assembly via a dedicated candidate pipeline",
          "Team buildout support from tech leads",
          "Talent development as an extension of your org",
        ],
      },
      {
        title: "Delivery support",
        items: [
          "Continuous alignment with tech leads",
          "Part-time oversight by delivery managers",
          "Granular reporting on progress and financials",
        ],
      },
      {
        title: "Key strengths",
        items: [
          "Optimal for discrete scope projects or specific epics",
          "Shared control over team composition and engagement",
        ],
      },
    ],
  },
  build: {
    lead: "Get end-to-end coverage — from design to development, maintenance, and beyond",
    columns: [
      {
        title: "Talent",
        items: [
          "Ability to scale teams up and down on demand",
          "Motivation and continuous upskilling handled by QUORIXA",
        ],
      },
      {
        title: "Delivery support",
        items: [
          "Direct oversight by engineering managers",
          "Enterprise support from project and portfolio managers",
          "Ad-hoc discovery and strategic planning",
        ],
      },
      {
        title: "Key strengths",
        items: [
          "Optimal for tackling full business challenges",
          "Highly scalable cross-functional capabilities",
          "Studio support from Design, Data, Quality, and Security",
        ],
      },
    ],
  },
};

const advantages: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Zap,
    title: "Up to 3× faster",
    description: "Closure of tech positions compared to the industry average.",
  },
  {
    icon: Gauge,
    title: "Up to 2× higher",
    description: "Cost-efficiency compared to fully in-house rates.",
  },
  {
    icon: Cloud,
    title: "7 time zones",
    description: "Real-time coordination for American and EU companies.",
  },
  {
    icon: Users,
    title: "850+ experts",
    description: "Global specialists ensuring diversity of culture and craft.",
  },
  {
    icon: Layers,
    title: "Scalability by design",
    description:
      "The right capabilities at every growth stage — we handle the details.",
  },
  {
    icon: Shield,
    title: "Custom approach",
    description:
      "No cookie-cutter tech — solutions adapt to your business, not the reverse.",
  },
];

const expertise: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: Smartphone,
    title: "Mobile development",
    description:
      "Cross-platform and true native apps with production-grade quality and store excellence.",
    href: "/mobile-development",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Database,
    title: "Backend development",
    description:
      "Performant, scalable, secure foundations with Node.js, Java, .NET, Python, and Go.",
    href: "/backend-development",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Monitor,
    title: "Web UI development",
    description:
      "Interfaces that feel intentional — performant, accessible, and system-ready.",
    href: "/frontend-development",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: Brain,
    title: "AI / ML",
    description:
      "Fast-track GenAI, predictive analytics, computer vision, and speech solutions.",
    href: "/ai-ml",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: Layers,
    title: "Data engineering",
    description:
      "Pipelines, visualization, and AI/ML analytics that turn data into action.",
    href: "/data-studio",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
  {
    icon: ShieldCheck,
    title: "Information security",
    description:
      "SSDLC practices, audits, penetration testing, and strategic security guidance.",
    href: "/quality-assurance",
    iconBg: "#E8F1FF",
    iconColor: "#4523D8",
  },
  {
    icon: Palette,
    title: "UX / UI design",
    description:
      "Smooth, intuitive experiences driven by user data and market research.",
    href: "/design-studio",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: ClipboardCheck,
    title: "Software QA & AQA",
    description:
      "Release health, automation coverage, and faster time-to-market with tailored QA.",
    href: "/quality-assurance",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: Users,
    title: "Project management",
    description:
      "Discovery, oversight, transparent reporting, and planning based on clear KPIs.",
    href: "/dedicated-teams",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
];

const supportColumns = [
  {
    title: "Business development",
    description:
      "Support across product development, innovation, sales, marketing, and customer experience.",
  },
  {
    title: "Business data analysis",
    description:
      "Data-driven growth through BI, AI/ML, and big-data expertise that informs decisions.",
  },
  {
    title: "Business strategy",
    description:
      "Scale faster and grow more sustainably with flexible, resilient operating models.",
  },
  {
    title: "Business consulting",
    description:
      "Identify opportunities, minimize risks, and accelerate digital transformation.",
  },
];

const principles: { title: string; keywords: string[] }[] = [
  {
    title: "Measure and learn",
    keywords: [
      "Gather data",
      "Analyze metrics",
      "Measure performance",
      "Monitor usage",
    ],
  },
  {
    title: "Develop agile",
    keywords: [
      "Scrum & Kanban",
      "Sprints",
      "Iterate and improve",
      "SAFe & DAD",
    ],
  },
  {
    title: "Deliver quality",
    keywords: [
      "DevOps",
      "Automated testing",
      "Performance testing",
      "Production monitoring",
    ],
  },
  {
    title: "Think lean",
    keywords: [
      "Lean startup",
      "MVPs",
      "Build-measure-learn",
      "Eliminate waste",
    ],
  },
];

export function Solutions() {
  const [activeTab, setActiveTab] = useState<EngagementTab>("start");
  const panel = engagementContent[activeTab];

  return (
    <>
      <Hero
        title={
          <>
            Full-spectrum{" "}
            <span className="highlight-orange">digital solutions</span>
          </>
        }
        description="Push your business forward with efficient, comprehensive expertise in engineering, UX, data, and information security — under the QUORIXA brand."
        ctaLabel="Book a free consultation"
        visual={<MobileVisual />}
      />

      <ClientLogoMarquee />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Engagement models"
              title="The right solution for your scale and scope"
              description="Start with specialists, expand into a dedicated squad, or build an end-to-end solutions team — switch models as your needs evolve."
            />
          </Reveal>
          <Reveal>
            <div className={styles.tabs} role="tablist" aria-label="Engagement models">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <p className={styles.modelLead}>{panel.lead}</p>
          </Reveal>
          <div className={styles.tabPanels}>
            {panel.columns.map((col) => (
              <Reveal key={col.title}>
                <article className={styles.tabCard}>
                  <h3>{col.title}</h3>
                  <ul>
                    {col.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="light" to="black" />

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Why QUORIXA"
              title={
                <>
                  Your competitive advantages with{" "}
                  <span className="highlight-orange">QUORIXA</span>
                </>
              }
              description="We build 5-star-rated software solutions that set benchmarks and earn recognition from leading industry voices."
              dark
              align="center"
            />
          </Reveal>
          <div className={styles.grid3}>
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title}>
                  <article className={styles.advantageCard}>
                    <div className={styles.advantageIcon}>
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="white" invert />

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Services and solutions"
              title="Technical expertise and capabilities"
              description="Nine practice areas you can combine under one accountable delivery partner."
            />
          </Reveal>
          <div className={styles.expertiseGrid}>
            {expertise.map((item) => (
              <Reveal key={item.title}>
                <Link to={item.href} className={styles.cardLink}>
                  <ServiceCard
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    iconBg={item.iconBg}
                    iconColor={item.iconColor}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Industries"
              title="Featured industries and domains"
              description="From FinTech and healthcare to media, logistics, and AgriTech — expertise measured by impact."
              align="center"
            />
          </Reveal>
          <Reveal>
            <div className={styles.cloud}>
              {industries.map((name) => (
                <span key={name} className={styles.cloudTag}>
                  {name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Growth"
              title="Strategic support for your business growth"
              description="Beyond engineering — advisory that connects product, data, and strategy."
              dark
              align="center"
            />
          </Reveal>
          <div className={styles.supportGrid}>
            {supportColumns.map((col) => (
              <Reveal key={col.title}>
                <article className={styles.supportCard}>
                  <h3>{col.title}</h3>
                  <p>{col.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="How we work"
              title="The principles that guide us"
              description="Keyword clouds for the operating system behind every engagement."
              align="center"
            />
          </Reveal>
          <div className={styles.principles}>
            {principles.map((item) => (
              <Reveal key={item.title}>
                <article className={styles.principle}>
                  <h3>{item.title}</h3>
                  <div className={styles.keywords}>
                    {item.keywords.map((word) => (
                      <span key={word}>{word}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to take your product to the next level?"
        description="Talk with our experts, explore our portfolio, and see what game-changing solutions we can create for you."
        ctaLabel="Talk to QUORIXA"
        ctaHref="/contact"
        secondaryLabel="Explore our work"
        secondaryHref="/our-work"
      />
    </>
  );
}
