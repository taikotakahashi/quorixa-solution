import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/Button";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { CheckList } from "../components/CheckList";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { caseStudies } from "../data/caseStudies";
import styles from "./CaseStudyDetail.module.css";

type StudyDetail = {
  industry: string;
  services: string[];
  technologies: string[];
  solutions: string[];
  outcomes: { value: string; label: string }[];
  overview: string;
  checklist: string[];
};

const detailsById: Record<string, StudyDetail> = {
  geotap: {
    industry: "Social / Consumer",
    services: ["Mobile Development", "Product Engineering", "Design Studio"],
    technologies: ["Swift", "Kotlin", "React Native", "Node.js", "AWS"],
    solutions: ["MVP to App Store", "Live location UX", "Growth-ready architecture"],
    outcomes: [
      { value: "5 mo", label: "App Store launch" },
      { value: "4.8★", label: "Launch rating" },
      { value: "99.9%", label: "Uptime target" },
    ],
    overview:
      "QUORIXA partnered with the founding team to turn a prototype into a polished consumer mobile product — covering product discovery, native craft, backend readiness, and store launch.",
    checklist: [
      "Discovery workshops and MVP scope lock",
      "Cross-platform architecture with native polish",
      "Realtime map and social interaction flows",
      "CI/CD, crash analytics, and release playbooks",
      "App Store and Play submission support",
      "Post-launch performance hardening",
    ],
  },
  finledger: {
    industry: "FinTech",
    services: ["Data Studio", "Backend", "Quality Studio"],
    technologies: ["Python", "Kafka", "Snowflake", "dbt", "React"],
    solutions: ["Realtime pipelines", "Risk dashboards", "Reporting modernization"],
    outcomes: [
      { value: "3×", label: "Faster reporting" },
      { value: "40%", label: "Less manual ops" },
      { value: "24/7", label: "Live risk signals" },
    ],
    overview:
      "We rebuilt core data pipelines and operator dashboards so finance teams could act on live risk signals instead of waiting on overnight batches.",
    checklist: [
      "Pipeline audit and reliability roadmap",
      "Streaming ingestion for transaction events",
      "Semantic models for finance KPIs",
      "Role-based dashboards for risk and ops",
      "Automated data quality checks",
      "Runbooks for incident response",
    ],
  },
  medflow: {
    industry: "Healthcare",
    services: ["AI Studio", "Product Engineering", "Design Studio"],
    technologies: ["Python", "PyTorch", "OpenAI", "TypeScript", "Azure"],
    solutions: ["GenAI copilots", "Triage workflows", "Human-in-the-loop UX"],
    outcomes: [
      { value: "40%", label: "Less manual triage" },
      { value: "2×", label: "Faster intake" },
      { value: "HIPAA", label: "Ready controls" },
    ],
    overview:
      "Designed and shipped AI-assisted triage workflows that reduce admin load while keeping clinicians in control of every high-stakes decision.",
    checklist: [
      "Clinical workflow discovery",
      "Prompt and evaluation harnesses",
      "Safe escalation and override paths",
      "Audit logging and access controls",
      "Pilot with measurable KPIs",
      "Production monitoring for model drift",
    ],
  },
  retailpulse: {
    industry: "Retail & E-commerce",
    services: ["Design Studio", "Front-end", "Dedicated Teams"],
    technologies: ["React", "TypeScript", "Next.js", "Figma", "Storybook"],
    solutions: ["Design system", "Unified commerce UX", "Multi-market front ends"],
    outcomes: [
      { value: "+28%", label: "Conversion" },
      { value: "60%", label: "Faster UI delivery" },
      { value: "1", label: "Shared design system" },
    ],
    overview:
      "A design system and front-end platform that scaled consistent UX across web and mobile channels in multiple markets.",
    checklist: [
      "UX audit across markets and devices",
      "Tokenized design system foundation",
      "Composable storefront components",
      "Accessibility baselines and reviews",
      "Performance budgets for PDP and cart",
      "Enablement for client engineering teams",
    ],
  },
  securegate: {
    industry: "SaaS",
    services: ["Quality Studio", "DevOps", "Backend"],
    technologies: ["Playwright", "Cypress", "GitHub Actions", "Kubernetes"],
    solutions: ["AQA pipelines", "Release gates", "Regression coverage"],
    outcomes: [
      { value: "90%", label: "Regression coverage" },
      { value: "50%", label: "Fewer production bugs" },
      { value: "Weekly", label: "Confident releases" },
    ],
    overview:
      "Built resilient automated quality gates that catch regressions before production — protecting a mission-critical SaaS release train every sprint.",
    checklist: [
      "Test strategy across critical journeys",
      "CI-integrated smoke and regression suites",
      "Flaky-test quarantine process",
      "Environment parity improvements",
      "Release dashboards for stakeholders",
      "QA enablement and ownership model",
    ],
  },
  logix: {
    industry: "Logistics",
    services: ["Backend", "Data Studio", "AI Studio"],
    technologies: ["Go", "Kafka", "PostgreSQL", "React", "GCP"],
    solutions: ["Fleet telemetry", "Predictive ETAs", "Operator tools"],
    outcomes: [
      { value: "1M+", label: "Events / day" },
      { value: "18%", label: "ETA accuracy gain" },
      { value: "3", label: "Regions live" },
    ],
    overview:
      "Delivered a fleet analytics platform with realtime telemetry, predictive ETAs, and operator tooling for multi-region logistics operations.",
    checklist: [
      "Telemetry ingestion at scale",
      "Streaming analytics for fleet health",
      "Predictive ETA models",
      "Operator console UX",
      "Multi-region deployment strategy",
      "Observability and SLO frameworks",
    ],
  },
};

function fallbackDetail(industry?: string): StudyDetail {
  return {
    industry: industry ?? "Technology",
    services: ["Dedicated Teams", "Product Engineering"],
    technologies: ["TypeScript", "React", "Node.js", "AWS"],
    solutions: ["Discovery", "Build", "Scale"],
    outcomes: [
      { value: "3×", label: "Delivery speed" },
      { value: "95%", label: "Client retention" },
      { value: "Senior", label: "Team ownership" },
    ],
    overview:
      "QUORIXA assembled a dedicated team to design, build, and scale a production-grade digital product with measurable business outcomes.",
    checklist: [
      "Discovery and technical assessment",
      "Architecture and delivery plan",
      "Iterative product development",
      "Quality and accessibility gates",
      "Launch readiness and monitoring",
      "Continuous improvement partnership",
    ],
  };
}

export function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const study = caseStudies.find((item) => item.id === id);

  if (!study) {
    return (
      <section className={`${styles.notFound} grid-bg`}>
        <div className="container">
          <h1>Case study not found</h1>
          <p>
            We couldn't find that engagement. Browse the full portfolio instead.
          </p>
          <Button href="/our-work" arrow>
            Back to our work
          </Button>
        </div>
      </section>
    );
  }

  const detail = detailsById[study.id] ?? fallbackDetail(study.industry);
  const related = caseStudies
    .filter((item) => item.id !== study.id)
    .slice(0, 3);

  return (
    <>
      <section className={`${styles.hero} grid-bg`}>
        <div className="container">
          <Link to="/our-work" className={styles.back}>
            <ArrowLeft size={16} strokeWidth={2.2} />
            Our work
          </Link>
          <Reveal>
            <div className={styles.heroGrid}>
              <div>
                <div className={styles.tags}>
                  {study.tags.map((tag) => (
                    <span
                      key={tag.label}
                      style={{ background: tag.color }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                <h1 className={styles.title}>{study.title}</h1>
                <p className={styles.desc}>{study.description}</p>
                {study.result && (
                  <p className={styles.result}>{study.result}</p>
                )}
              </div>
              <div className={styles.heroImage}>
                <img src={study.image} alt="" loading="eager" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--sm">
        <div className="container">
          <div className={styles.metaGrid}>
            <div>
              <h3>Industry</h3>
              <p>{detail.industry}</p>
            </div>
            <div>
              <h3>Services</h3>
              <ul>
                {detail.services.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Technologies</h3>
              <ul>
                {detail.technologies.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Solutions</h3>
              <ul>
                {detail.solutions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Outcomes"
              title="Results that mattered"
              description="Measurable impact delivered with senior ownership throughout the engagement."
              dark
            />
          </Reveal>
          <div className={styles.outcomes}>
            {detail.outcomes.map((outcome) => (
              <div key={outcome.label} className={styles.outcome}>
                <strong>{outcome.value}</strong>
                <span>{outcome.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.solutionLayout}>
            <Reveal>
              <div>
                <SectionHeader
                  label="Solution"
                  title="How we approached it"
                  description={detail.overview}
                />
              </div>
            </Reveal>
            <Reveal>
              <CheckList items={detail.checklist} columns={1} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              title="Related case studies"
              description="More engagements across industries and capabilities."
            />
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
        title="Ready for results like these?"
        description="Tell us about your product goals — we'll assemble the right specialists."
        ctaLabel="Book a consultation"
        ctaHref="/contact"
        secondaryLabel="View all work"
        secondaryHref="/our-work"
      />
    </>
  );
}
