import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Boxes,
  Building2,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../components/Button";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { CTASection } from "../components/CTASection";
import { CurvedDivider } from "../components/CurvedDivider";
import { Reveal } from "../components/Reveal";
import { caseStudies } from "../data/caseStudies";
import styles from "./CaseStudyDetail.module.css";

type SolutionArea = {
  id: string;
  navLabel: string;
  title: string;
  description: string;
  deliverables: string[];
  technologies: string;
};

type StudyDetail = {
  heroTitle?: string;
  heroDescription: string;
  industries: string;
  services: string[];
  solutions: string[];
  technologies: string[];
  callout: { title: string; body: string };
  outcomes: string[];
  quote: { text: string; author: string; role: string };
  solutionAreas: SolutionArea[];
  ctaTitle: string;
  ctaDescription: string;
};

const infoMeta: {
  key: "industries" | "services" | "solutions" | "technologies";
  label: string;
  icon: LucideIcon;
}[] = [
  { key: "industries", label: "Industries", icon: Building2 },
  { key: "services", label: "Services", icon: Layers },
  { key: "solutions", label: "Solutions", icon: Boxes },
  { key: "technologies", label: "Technologies", icon: Code2 },
];

const detailsById: Record<string, StudyDetail> = {
  geotap: {
    heroTitle:
      "Bringing a live social map application from vision to App Store launch",
    heroDescription:
      "GeoTap empowers socially active people in local communities and friend groups to coordinate offline plans around nearby places. QUORIXA’s engineering team took this product from an early-stage prototype to an App Store-approved app. The resulting application combines map-first friend visibility, tap-ins at places, nearby discovery, and user-controlled privacy modes.",
    industries: "Social networking, Location-based services",
    services: [
      "Backend development",
      "QA and software testing",
      "DevOps",
      "Security",
      "Accessibility",
    ],
    solutions: [
      "MVP",
      "Mobile application",
      "Geospatial and location",
      "Geofencing",
      "Test automation",
      "Cloud",
      "CI/CD",
    ],
    technologies: [
      "TypeScript",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "PostGIS",
      "AWS",
      "Terraform",
      "Flutter",
      "Redis",
      "GitHub Actions",
    ],
    callout: {
      title: "AI tools that powered our workflow",
      body: "Claude Code and modern LLM copilots accelerated scaffolding, reviews, and documentation while senior engineers retained ownership of architecture and release quality.",
    },
    outcomes: [
      "Less than six months from project start to App Store launch",
      "Production-ready backend, infrastructure, and CI/CD from a founder prototype",
      "WCAG-aligned accessibility hardening ahead of store submission",
      "Ongoing post-launch support with a lean, flexible release cadence",
    ],
    quote: {
      text: "I’ve been impressed with how they’ve planned for contingencies before they happen. They’ve not only uncovered risks but also suggested solutions.",
      author: "Randy Helmcamp",
      role: "Founder, GeoTap",
    },
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Building the application backend and infrastructure",
        description:
          "GeoTap approached QUORIXA with a founder-defined product vision and front-end prototype. Our team expanded this prototype into a production-ready app by developing its backend and infrastructure, connecting core social and geospatial flows.",
        deliverables: [
          "Production backend built from scratch",
          "Core functionality including authentication, profiles, friend system, place discovery, tap-ins, privacy-first location tracking, and notifications",
          "Repository (monorepo) and database setup",
          "Refinement of filter logic, map, tap-in, and city search functionality",
          "API layer development and third-party integrations",
          "Flutter integration connecting social and geospatial flows",
          "Cloud infrastructure on AWS, Terraform, and Cloudflare with cost-efficient self-hosted data layers",
          "CI/CD with automated tests and OpenAPI-driven client regeneration",
          "Analytics and error monitoring",
        ],
        technologies:
          "TypeScript, NestJS, Express, Node.js, Zod, PostgreSQL, PostGIS, Prisma ORM, Docker Compose, AWS (EC2, S3, CloudWatch, SNS, ECR, Lambda), Terraform, Flutter, Redis, BullMQ, GitHub Actions, Firebase Cloud Messaging, Sentry, PostHog, Foursquare API, Mapbox, Turborepo",
      },
      {
        id: "hardening",
        navLabel: "Hardening for launch",
        title: "Hardening the app for a stable launch and supporting it afterwards",
        description:
          "Our team prepared the app for iOS App Store submission covering accessibility, quality assurance, and security. After approval and launch, QUORIXA moved into ongoing maintenance — bug fixes, platform updates, and continued accessibility follow-through.",
        deliverables: [
          "Accessibility improvements aligned with WCAG 2.1 AA",
          "Three-layer automated test suite running in CI",
          "Versioned API collections covering every backend module",
          "Security controls for auth, access, rate limiting, transport, and data hygiene",
          "Real-device testing and a leaner release cadence",
          "App Store submission support through approved production release",
          "Ongoing post-launch support on a flexible, as-needed basis",
        ],
        technologies:
          "Jest, Postman, Swagger/OpenAPI, GitHub Actions, Sentry, Firebase Cloud Messaging, JWT, NestJS guards, Helmet, CORS, Cloudflare, Let’s Encrypt, AWS (EBS, DLM)",
      },
    ],
    ctaTitle: "Ready to bring your product vision to life?",
    ctaDescription:
      "Our expertise covers full-stack mobile and web apps across 10+ industries — from VC startups to Fortune 500 brands. Turn your product vision into a secure, engaging application with QUORIXA.",
  },
  finledger: {
    heroDescription:
      "A fintech operator needed live risk visibility instead of overnight batch reports. QUORIXA rebuilt core data pipelines and dashboards so finance teams could act on streaming transaction signals with confidence.",
    industries: "FinTech, Financial Services, B2B SaaS",
    services: ["Data Studio", "Backend development", "Quality Studio"],
    solutions: [
      "Realtime pipelines",
      "Risk dashboards",
      "Reporting modernization",
      "Data quality",
    ],
    technologies: ["Python", "Kafka", "Snowflake", "dbt", "React", "TypeScript"],
    callout: {
      title: "Why this partnership worked",
      body: "QUORIXA embedded senior data and platform engineers with finance stakeholders, shipping incremental pipeline wins every sprint instead of a big-bang cutover.",
    },
    outcomes: [
      "3× faster reporting cycles for core finance KPIs",
      "40% reduction in manual ops work across risk and reconciliation",
      "24/7 live risk signals replacing overnight batch waits",
    ],
    quote: {
      text: "QUORIXA gave us streaming clarity without sacrificing the controls our auditors expect.",
      author: "VP of Engineering",
      role: "FinTech client",
    },
    solutionAreas: [
      {
        id: "pipelines",
        navLabel: "Data pipelines",
        title: "Streaming ingestion and reliable transforms",
        description:
          "We audited brittle batch jobs, introduced streaming ingestion for transaction events, and rebuilt semantic models so finance KPIs stayed trustworthy under load.",
        deliverables: [
          "Pipeline audit and reliability roadmap",
          "Streaming ingestion for transaction events",
          "Semantic models for finance KPIs",
          "Automated data quality checks",
          "Runbooks for incident response",
        ],
        technologies: "Python, Kafka, Snowflake, dbt, Great Expectations, Airflow",
      },
      {
        id: "dashboards",
        navLabel: "Operator dashboards",
        title: "Role-based risk and ops surfaces",
        description:
          "Operator dashboards surfaced live risk signals with role-based access so risk, ops, and leadership shared one source of truth.",
        deliverables: [
          "Role-based dashboards for risk and ops",
          "Alerting thresholds tied to business SLAs",
          "Performance budgets for interactive reporting",
          "Enablement for client analytics teams",
        ],
        technologies: "React, TypeScript, Snowflake, Looker / BI embeds",
      },
    ],
    ctaTitle: "Need live insight from your data estate?",
    ctaDescription:
      "Partner with QUORIXA to modernize pipelines, governance, and operator tooling around the metrics that move your business.",
  },
  medflow: {
    heroDescription:
      "Clinical operations teams were drowning in manual triage. QUORIXA designed and shipped AI-assisted workflows that reduce admin load while keeping clinicians in control of every high-stakes decision.",
    industries: "Healthcare, Pharma, Clinical operations",
    services: ["AI Studio", "Product engineering", "Design Studio"],
    solutions: ["GenAI copilots", "Triage workflows", "Human-in-the-loop UX"],
    technologies: ["Python", "PyTorch", "OpenAI", "TypeScript", "Azure"],
    callout: {
      title: "Safety-first AI delivery",
      body: "Evaluation harnesses, audit logging, and explicit override paths were treated as product requirements — not afterthoughts — from the first discovery workshop.",
    },
    outcomes: [
      "40% less manual triage volume for intake teams",
      "2× faster patient intake for covered pathways",
      "HIPAA-ready controls across access, logging, and escalation",
    ],
    quote: {
      text: "The copilots feel like teammates — they draft, we decide. QUORIXA never lost sight of clinical accountability.",
      author: "Director of Clinical Ops",
      role: "Healthcare client",
    },
    solutionAreas: [
      {
        id: "discovery",
        navLabel: "Workflow discovery",
        title: "Mapping triage reality before automation",
        description:
          "We shadowed clinical and admin workflows to identify where GenAI could remove friction without removing human judgment.",
        deliverables: [
          "Clinical workflow discovery",
          "Prompt and evaluation harnesses",
          "Safe escalation and override paths",
          "Pilot with measurable KPIs",
        ],
        technologies: "Python, OpenAI, LangChain-style orchestration, TypeScript",
      },
      {
        id: "production",
        navLabel: "Production copilots",
        title: "Governed GenAI in the intake path",
        description:
          "Production copilots shipped with audit logging, access controls, and monitoring for model drift so the system stayed safe after launch.",
        deliverables: [
          "Audit logging and access controls",
          "Production monitoring for model drift",
          "Human-in-the-loop review UX",
          "Ops playbooks for model incidents",
        ],
        technologies: "Azure, PyTorch, OpenAI, TypeScript, observability stack",
      },
    ],
    ctaTitle: "Want AI that clinicians can trust?",
    ctaDescription:
      "QUORIXA builds GenAI products with evaluation, governance, and human oversight baked in from day one.",
  },
  retailpulse: {
    heroDescription:
      "A multi-market retailer needed one coherent commerce experience. QUORIXA delivered a design system and front-end platform that scaled consistent UX across web and mobile channels.",
    industries: "Retail & Ecommerce, Multi-brand commerce",
    services: ["Design Studio", "Front-end development", "Dedicated teams"],
    solutions: [
      "Design system",
      "Unified commerce UX",
      "Multi-market front ends",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Figma", "Storybook"],
    callout: {
      title: "Design and engineering as one team",
      body: "Tokenized foundations and composable storefront components let design and engineering ship market variants without forking the experience.",
    },
    outcomes: [
      "+28% conversion on redesigned critical journeys",
      "60% faster UI delivery for new market launches",
      "One shared design system across web and mobile",
    ],
    quote: {
      text: "We stopped rebuilding the same UI in every market. QUORIXA gave us a platform, not a one-off redesign.",
      author: "Head of Digital",
      role: "Retail client",
    },
    solutionAreas: [
      {
        id: "system",
        navLabel: "Design system",
        title: "Tokenized foundations that travel across markets",
        description:
          "We audited UX across markets and devices, then established a tokenized design system with accessibility baselines and performance budgets.",
        deliverables: [
          "UX audit across markets and devices",
          "Tokenized design system foundation",
          "Accessibility baselines and reviews",
          "Enablement for client engineering teams",
        ],
        technologies: "Figma, Storybook, React, TypeScript, design tokens",
      },
      {
        id: "storefront",
        navLabel: "Storefront platform",
        title: "Composable commerce front ends",
        description:
          "Composable storefront components and performance budgets for PDP and cart helped teams ship consistent experiences faster.",
        deliverables: [
          "Composable storefront components",
          "Performance budgets for PDP and cart",
          "Multi-market theming without forks",
          "Shared QA patterns for critical journeys",
        ],
        technologies: "Next.js, React, TypeScript, Storybook, CI visual checks",
      },
    ],
    ctaTitle: "Ready for one commerce experience everywhere?",
    ctaDescription:
      "QUORIXA helps retailers unify design systems and front-end platforms without slowing market launches.",
  },
  securegate: {
    heroDescription:
      "A mission-critical SaaS release train needed quality gates that kept pace with weekly shipping. QUORIXA built resilient automation that catches regressions before production every sprint.",
    industries: "SaaS, B2B platforms, Enterprise software",
    services: ["Quality Studio", "DevOps", "Backend development"],
    solutions: ["AQA pipelines", "Release gates", "Regression coverage"],
    technologies: [
      "Playwright",
      "Cypress",
      "GitHub Actions",
      "Kubernetes",
    ],
    callout: {
      title: "Quality as a product capability",
      body: "Flaky-test quarantine, environment parity, and stakeholder release dashboards turned QA from a bottleneck into a predictable release signal.",
    },
    outcomes: [
      "90% regression coverage on critical journeys",
      "50% fewer production bugs after gate adoption",
      "Weekly releases with stakeholder-visible confidence",
    ],
    quote: {
      text: "We finally trust the green build. QUORIXA made quality something the whole org can see and act on.",
      author: "Director of Engineering",
      role: "SaaS client",
    },
    solutionAreas: [
      {
        id: "strategy",
        navLabel: "Test strategy",
        title: "Coverage where it protects the business",
        description:
          "We mapped critical journeys and built a CI-integrated strategy that balances smoke speed with deep regression confidence.",
        deliverables: [
          "Test strategy across critical journeys",
          "CI-integrated smoke and regression suites",
          "Flaky-test quarantine process",
          "QA enablement and ownership model",
        ],
        technologies: "Playwright, Cypress, GitHub Actions, test reporting",
      },
      {
        id: "gates",
        navLabel: "Release gates",
        title: "Environment parity and release visibility",
        description:
          "Release dashboards and environment parity improvements made weekly shipping predictable for engineering and stakeholders alike.",
        deliverables: [
          "Environment parity improvements",
          "Release dashboards for stakeholders",
          "Gate policies tied to risk tiers",
          "Runbooks for failed release candidates",
        ],
        technologies: "Kubernetes, GitHub Actions, observability and reporting tools",
      },
    ],
    ctaTitle: "Want releases you can trust every week?",
    ctaDescription:
      "QUORIXA builds automated quality systems that protect production without slowing product velocity.",
  },
  logix: {
    heroDescription:
      "A multi-region logistics operator needed realtime fleet intelligence. QUORIXA delivered telemetry, predictive ETAs, and operator tooling that scale with millions of daily events.",
    industries: "Logistics & Delivery, Fleet operations",
    services: ["Backend development", "Data Studio", "AI Studio"],
    solutions: ["Fleet telemetry", "Predictive ETAs", "Operator tools"],
    technologies: ["Go", "Kafka", "PostgreSQL", "React", "GCP"],
    callout: {
      title: "Built for multi-region load",
      body: "Streaming analytics and SLO frameworks were designed for regional expansion from the first architecture reviews — not bolted on after launch.",
    },
    outcomes: [
      "1M+ telemetry events processed per day",
      "18% gain in ETA accuracy for covered corridors",
      "Three regions live on a shared operator console",
    ],
    quote: {
      text: "Operators finally see the fleet the way dispatchers think. QUORIXA made scale feel operational, not theoretical.",
      author: "COO",
      role: "Logistics client",
    },
    solutionAreas: [
      {
        id: "telemetry",
        navLabel: "Telemetry platform",
        title: "Realtime ingestion and fleet health analytics",
        description:
          "We built telemetry ingestion at scale with streaming analytics so fleet health signals stay fresh across regions.",
        deliverables: [
          "Telemetry ingestion at scale",
          "Streaming analytics for fleet health",
          "Observability and SLO frameworks",
          "Multi-region deployment strategy",
        ],
        technologies: "Go, Kafka, PostgreSQL, GCP, OpenTelemetry",
      },
      {
        id: "etas",
        navLabel: "Predictive ETAs",
        title: "Predictive ETAs and operator tooling",
        description:
          "Predictive ETA models and an operator console UX helped dispatchers act on delays before customers felt them.",
        deliverables: [
          "Predictive ETA models",
          "Operator console UX",
          "Alerting for corridor anomalies",
          "Handoff playbooks for regional teams",
        ],
        technologies: "Python / Go model services, React, Kafka, GCP",
      },
    ],
    ctaTitle: "Need fleet intelligence that keeps up?",
    ctaDescription:
      "QUORIXA designs telemetry platforms and operator tools for logistics teams operating at regional and global scale.",
  },
};

function fallbackDetail(industry?: string): StudyDetail {
  return {
    heroDescription:
      "QUORIXA assembled a dedicated team to design, build, and scale a production-grade digital product with measurable business outcomes.",
    industries: industry ?? "Technology",
    services: ["Dedicated teams", "Product engineering"],
    solutions: ["Discovery", "Build", "Scale"],
    technologies: ["TypeScript", "React", "Node.js", "AWS"],
    callout: {
      title: "Senior ownership throughout",
      body: "From discovery through launch, QUORIXA keeps specialists accountable for architecture, quality, and outcomes — not just ticket throughput.",
    },
    outcomes: [
      "3× delivery speed against the client’s prior baseline",
      "95% client retention across multi-year partnerships",
      "Senior team ownership from discovery to production",
    ],
    quote: {
      text: "QUORIXA felt like an extension of our product org — sharp, accountable, and focused on outcomes.",
      author: "Product Lead",
      role: "QUORIXA client",
    },
    solutionAreas: [
      {
        id: "discovery",
        navLabel: "Discovery",
        title: "Discovery and technical assessment",
        description:
          "We aligned on product goals, constraints, and an architecture that could ship iteratively without painting the team into a corner.",
        deliverables: [
          "Discovery and technical assessment",
          "Architecture and delivery plan",
          "Quality and accessibility gates",
        ],
        technologies: "TypeScript, React, Node.js, AWS",
      },
      {
        id: "build",
        navLabel: "Build & scale",
        title: "Iterative product development",
        description:
          "Dedicated specialists shipped in tight cycles with launch readiness, monitoring, and continuous improvement after go-live.",
        deliverables: [
          "Iterative product development",
          "Launch readiness and monitoring",
          "Continuous improvement partnership",
        ],
        technologies: "TypeScript, React, Node.js, AWS, CI/CD",
      },
    ],
    ctaTitle: "Ready for results like these?",
    ctaDescription:
      "Tell us about your product goals — we’ll assemble the right specialists.",
  };
}

function listValue(
  detail: StudyDetail,
  key: "industries" | "services" | "solutions" | "technologies",
): string {
  const value = detail[key];
  return Array.isArray(value) ? value.join(", ") : value;
}

export function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const study = caseStudies.find((item) => item.id === id);
  const [activeSection, setActiveSection] = useState("");

  const detail = study
    ? (detailsById[study.id] ?? fallbackDetail(study.industry))
    : null;

  useEffect(() => {
    if (!detail?.solutionAreas.length) return;
    setActiveSection(detail.solutionAreas[0].id);
  }, [detail]);

  useEffect(() => {
    if (!detail?.solutionAreas.length) return;

    const nodes = detail.solutionAreas
      .map((area) => document.getElementById(area.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [detail, study?.id]);

  if (!study || !detail) {
    return (
      <section className={`${styles.notFound} grid-bg`}>
        <div className="container">
          <h1>Case study not found</h1>
          <p>
            We couldn&apos;t find that engagement. Browse the full portfolio
            instead.
          </p>
          <Button href="/our-work" arrow>
            Back to our work
          </Button>
        </div>
      </section>
    );
  }

  const related = caseStudies
    .filter((item) => item.id !== study.id)
    .slice(0, 3);

  const heroTitle = detail.heroTitle ?? study.title;

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <h1 className={styles.title}>{heroTitle}</h1>
                <p className={styles.desc}>{detail.heroDescription}</p>
              </div>
              <div className={styles.heroImage}>
                <img src={study.image} alt="" loading="eager" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className="container">
          <Reveal>
            <div className={styles.infoGrid}>
              {infoMeta.map(({ key, label, icon: Icon }) => (
                <div key={key} className={styles.infoCell}>
                  <div className={styles.infoIcon} aria-hidden>
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3>{label}</h3>
                    <p>{listValue(detail, key)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.calloutSection}>
        <div className="container">
          <Reveal>
            <div className={styles.callout}>
              <div className={styles.calloutIcon} aria-hidden>
                <Sparkles size={22} strokeWidth={2.2} />
              </div>
              <div>
                <h3>{detail.callout.title}</h3>
                <p>{detail.callout.body}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CurvedDivider from="white" to="black" />
      <section className={`${styles.outcomesSection} section--dark`}>
        <div className="container">
          <Reveal>
            <h2 className={styles.outcomesTitle}>
              <span className={styles.outcomesAccent}>Outcomes</span>{" "}
              <span>and highlights</span>
            </h2>
          </Reveal>
          <div className={styles.outcomesLayout}>
            <Reveal>
              <ul className={styles.outcomeList}>
                {detail.outcomes.map((item) => (
                  <li key={item}>
                    <CheckCircle2
                      size={20}
                      strokeWidth={2.2}
                      className={styles.outcomeCheck}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <blockquote className={styles.quote}>
                <p>“{detail.quote.text}”</p>
                <footer>
                  <strong>{detail.quote.author}</strong>
                  <span>{detail.quote.role}</span>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>
      <CurvedDivider from="black" to="white" invert />

      <section className={styles.solutionsSection}>
        <div className="container">
          <Reveal>
            <h2 className={styles.solutionsHeading}>Solutions overview</h2>
          </Reveal>
          <div className={styles.solutionsLayout}>
            <nav className={styles.sideNav} aria-label="Solution areas">
              {detail.solutionAreas.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  className={`${styles.sideNavItem} ${
                    activeSection === area.id ? styles.sideNavActive : ""
                  }`}
                  onClick={() => scrollToSection(area.id)}
                >
                  {area.navLabel}
                </button>
              ))}
            </nav>
            <div className={styles.solutionsContent}>
              {detail.solutionAreas.map((area) => (
                <Reveal key={area.id}>
                  <article id={area.id} className={styles.solutionBlock}>
                    <h3>{area.title}</h3>
                    <p className={styles.solutionLead}>{area.description}</p>
                    <h4 className={styles.deliverablesLabel}>Key deliverables</h4>
                    <ul className={styles.deliverables}>
                      {area.deliverables.map((item) => (
                        <li key={item}>
                          <CheckCircle2
                            size={18}
                            strokeWidth={2.2}
                            className={styles.deliverableCheck}
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className={styles.techLabel}>Technologies</h4>
                    <p className={styles.techCopy}>{area.technologies}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`section section--light ${styles.relatedSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.relatedHeader}>
              <h2>See more success stories</h2>
              <Link to="/our-work" className={styles.relatedLink}>
                View all work
              </Link>
            </div>
          </Reveal>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Reveal key={item.id}>
                <CaseStudyCard study={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={detail.ctaTitle}
        description={detail.ctaDescription}
        ctaLabel="Book a free consultation"
        ctaHref="/contact"
        secondaryLabel="View all work"
        secondaryHref="/our-work"
      />
    </>
  );
}
