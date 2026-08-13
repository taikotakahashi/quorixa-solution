import {
  ClipboardCheck,
  FlaskConical,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { QAVisual } from "../../components/HeroVisuals";
import { SectionHeader } from "../../components/SectionHeader";
import { ServiceCard } from "../../components/ServiceCard";
import { StatCard } from "../../components/StatCard";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { Testimonial } from "../../components/Testimonial";
import { AwardCards } from "../../components/AwardCards";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { CheckList } from "../../components/CheckList";
import { caseStudies } from "../../data/caseStudies";
import styles from "./ServicePage.module.css";

const qaServices: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  items: string[];
}[] = [
  {
    icon: ClipboardCheck,
    title: "Manual & exploratory QA",
    description:
      "Structured test design and exploratory sessions that catch issues automation alone misses.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
    items: ["Test planning", "Regression suites", "Usability checks"],
  },
  {
    icon: FlaskConical,
    title: "Test automation",
    description:
      "Resilient UI, API, and pipeline automation wired into CI so every release is gated.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
    items: ["E2E frameworks", "API contracts", "CI quality gates"],
  },
  {
    icon: ShieldCheck,
    title: "Quality engineering",
    description:
      "Shift-left practices, performance budgets, and security testing embedded in delivery.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
    items: ["Perf & load", "Security scans", "Release readiness"],
  },
];

const outcomes = [
  "Fewer production defects and faster rollback confidence",
  "Automation coverage that keeps pace with your release train",
  "Clear quality signals for product and engineering leaders",
  "Documented risk profiles for every major release",
  "Shorter feedback loops between QA, design, and development",
  "Reusable frameworks your team can own long-term",
];

const expertise = [
  "Integration",
  "Functional",
  "E2E",
  "Acceptance",
  "Performance",
  "Smoke",
  "API",
  "Security",
  "BDD",
  "TDD",
];

const qaCaseStudies = caseStudies.filter((s) =>
  ["securegate", "geotap", "finledger"].includes(s.id)
);

export function QualityAssurance() {
  return (
    <>
      <Hero
        title={
          <>
            Software quality assurance and{" "}
            <span className="highlight-orange">testing automation</span>
          </>
        }
        description="QUORIXA Quality Studio protects every release — with manual depth, automation at scale, and measurable quality gates your teams can trust."
        ctaLabel="Book a free consultation"
        visual={<QAVisual />}
      />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Services"
              title="Key QA services"
              description="Coverage across exploratory testing, automation, and quality engineering — tailored to your stack and release cadence."
            />
          </Reveal>
          <div className={styles.grid3}>
            {qaServices.map((service) => (
              <Reveal key={service.title}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  iconBg={service.iconBg}
                  iconColor={service.iconColor}
                  items={service.items}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.split}>
            <Reveal>
              <SectionHeader
                label="Outcomes"
                title="Quality that shows up in production metrics"
                description="We don't just file bugs — we harden delivery so teams ship faster with less risk."
              />
            </Reveal>
            <Reveal>
              <CheckList items={outcomes} columns={1} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Expertise"
              title="Testing disciplines we cover end-to-end"
              description="From smoke checks to security and behavior-driven suites — the right mix for your risk profile."
              align="center"
            />
          </Reveal>
          <Reveal>
            <div className={styles.pills}>
              {expertise.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className={styles.darkSplit}>
            <Reveal>
              <div>
                <span className="label">Measurable outcomes</span>
                <h2 className={styles.darkTitle}>
                  Quality numbers your{" "}
                  <span className="highlight-orange">release train</span> can
                  feel
                </h2>
                <p className={styles.darkCopy}>
                  Transparent dashboards, coverage trends, and defect escape
                  rates — so stakeholders see quality improving sprint over
                  sprint.
                </p>
              </div>
            </Reveal>
            <div className={styles.statsGrid2}>
              <StatCard
                value="90%"
                label="Regression coverage"
                description="Automated suites protecting critical user journeys."
              />
              <StatCard
                value="60%"
                label="Fewer escaped defects"
                description="Typical reduction after embedding quality gates."
              />
              <StatCard
                value="2×"
                label="Faster release confidence"
                description="CI signals that unblock merges without fire drills."
              />
              <StatCard
                value="24h"
                label="Critical bug SLA"
                description="Triage and response rhythms for production issues."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="QUORIXA's QA team built automation we could actually maintain. Regressions stopped slipping through, and our release cadence finally felt calm."
              author="Marcus Webb"
              role="Director of Engineering"
              company="SaaS platform"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Our work"
              title="Quality engagements that protected the release"
              description="From mission-critical SaaS trains to consumer launches — QA that kept shipping on track."
              align="center"
            />
          </Reveal>
          <div className={styles.caseGrid}>
            {qaCaseStudies.map((study) => (
              <Reveal key={study.id}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <div className={styles.recognitionIntro}>
              <SectionHeader
                label="Recognition"
                title="Trusted quality partners for ambitious products"
                description="Industry recognition for delivery excellence — reflecting the bar we hold for every release."
                dark
                align="center"
              />
            </div>
          </Reveal>
          <AwardCards />
        </div>
      </section>

      <CTASection
        title="Ready to harden your release quality?"
        description="Tell us about your stack and cadence — we'll propose a QA and automation plan that fits."
        ctaLabel="Book a consultation"
      />
    </>
  );
}
