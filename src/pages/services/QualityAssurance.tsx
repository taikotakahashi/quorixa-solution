import {
  ClipboardCheck,
  FlaskConical,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { ServiceHeroImage } from "../../components/ServiceHeroImage";
import qaHero from "../../assets/services/qa-hero.webp";
import { CurvedDivider } from "../../components/CurvedDivider";
import { SectionHeader } from "../../components/SectionHeader";
import { ServiceCard } from "../../components/ServiceCard";
import { StatCard } from "../../components/StatCard";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { Testimonial } from "../../components/Testimonial";
import { AwardCards } from "../../components/AwardCards";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { CheckList } from "../../components/CheckList";
import { Button } from "../../components/Button";
import { caseStudies } from "../../data/caseStudies";
import shared from "./ServicePage.module.css";
import styles from "./QualityAssurance.module.css";

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
    title: "Quality assurance strategy",
    description:
      "Tailor QA/AQA to business goals with strategic consultancy, execution support, and thorough reporting.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
    items: ["QA roadmap", "Risk profiling", "Release readiness"],
  },
  {
    icon: FlaskConical,
    title: "Testing automation",
    description:
      "From mobile and UI testing to custom frameworks, CI/CD, and data/AI testing — AQA needs fully covered.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
    items: ["E2E frameworks", "API contracts", "CI quality gates"],
  },
  {
    icon: ShieldCheck,
    title: "Manual testing",
    description:
      "Exploratory, ad-hoc, and acceptance coverage for complex interactions — at a fraction of in-house cost.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
    items: ["Exploratory sessions", "Usability checks", "UAT support"],
  },
];

const outcomes = [
  "25% faster release cadence for high-traffic platforms",
  "90% increase in test coverage for Fortune-grade e-commerce",
  "700% faster regression time for AI/ML SaaS products",
  "95% automation coverage across 1,400+ critical workflows",
  "3× faster manual regression cycles via QA consultancy",
  "90% higher traceability matrix density for data SaaS",
];

const expertise = [
  "Integration testing",
  "Functional testing",
  "End-to-end testing",
  "Acceptance testing",
  "Performance testing",
  "Smoke testing",
  "AI/ML-driven automation",
  "Regression testing",
  "API testing",
  "UI testing",
  "Mobile testing",
  "Security testing",
  "CI/CD",
  "TDD",
  "BDD",
];

const recognition = [
  {
    title: "Gartner-listed products",
    description:
      "Products top-listed by Gartner leverage QA strategies and testing techniques delivered by our engineers.",
  },
  {
    title: "Webby-acclaimed marketplaces",
    description:
      "QUORIXA introduced test-driven development to online platforms acclaimed by the Webby Awards.",
  },
  {
    title: "Meta showcase apps",
    description:
      "Mobile apps listed on the React Native showcase engage our experts to build and test on devices and emulators.",
  },
];

const studies = caseStudies
  .filter((s) => ["securegate", "geotap", "finledger"].includes(s.id))
  .concat(caseStudies)
  .filter((s, i, arr) => arr.findIndex((x) => x.id === s.id) === i)
  .slice(0, 3);

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
        description="Speed up time-to-market, cut development costs, eliminate risks, and ship top-shelf digital products with tailored QA/AQA support."
        ctaLabel="Book a free consultation"
        visual={
          <ServiceHeroImage
            src={qaHero}
            alt="Quality Studio data exploration and testing dashboard"
          />
        }
      />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Quality services"
              title="Key QA/AQA services"
              description="Coverage across strategy, automation, and manual depth — tailored to your stack and release cadence."
            />
          </Reveal>
          <div className={shared.grid3}>
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
          <div className={styles.outcomesBlock}>
            <Reveal>
              <SectionHeader
                title="Featured outcomes seen by our clients"
                description="Quality that shows up in release metrics — not just bug counts."
              />
            </Reveal>
            <Reveal>
              <div className={styles.greenChecks}>
                <CheckList items={outcomes} columns={1} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Expertise"
              title="Core areas of expertise"
              description="From smoke checks to security and behavior-driven suites — the right mix for your risk profile."
              align="center"
            />
          </Reveal>
          <Reveal>
            <div className={styles.pillCloud}>
              {expertise.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CurvedDivider from="white" to="black" />

      <section className="section section--dark">
        <div className="container">
          <div className={styles.metricsCta}>
            <Reveal>
              <div>
                <span className="label">Measurable outcomes</span>
                <h2 className={shared.darkTitle}>
                  Exceptional quality drives{" "}
                  <span className="highlight-orange">measurable outcomes</span>
                </h2>
                <p className={shared.darkCopy}>
                  Transparent dashboards, coverage trends, and defect escape
                  rates — so stakeholders see quality improving sprint over
                  sprint.
                </p>
                <div className={styles.metricsCtaActions}>
                  <Button href="/contact" arrow>
                    Get strategic QA/AQA support
                  </Button>
                </div>
              </div>
            </Reveal>
            <div className={shared.statsGrid2}>
              <Reveal>
                <StatCard
                  value="30%"
                  label="Faster time-to-market"
                  description="Driven by automation solutions embedded in CI."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="3×"
                  label="Less manual testing cost"
                  description="Through strategic consultancy and reusable frameworks."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="90%"
                  label="Test coverage"
                  description="Reached in record time at a fraction of in-house cost."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="24h"
                  label="Critical bug SLA"
                  description="Triage and response rhythms for production issues."
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="Working with QUORIXA never felt like working with a remote company. They are genuinely invested in projects and never fail to meet expectations — or raise questions when they see issues."
              author="Marcus Webb"
              role="Director of Software Development"
              company="legal software management company"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Case studies"
              title="Featured success stories"
              description="From mission-critical SaaS trains to consumer launches — QA that kept shipping on track."
              align="center"
            />
          </Reveal>
          <div className={shared.caseGrid}>
            {studies.map((study) => (
              <Reveal key={study.id}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
          <div className={shared.centerCta}>
            <Button href="/our-work" variant="ghost" arrow>
              View all case studies
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Recognition"
              title="QA solutions that get you noticed"
              description="Award-winning brands rely on QUORIXA QA for consistently high quality, stability, and usability."
              dark
              align="center"
            />
          </Reveal>
          <div className={styles.recognitionCards}>
            {recognition.map((item) => (
              <Reveal key={item.title}>
                <article className={styles.recognitionCard}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <AwardCards />
        </div>
      </section>

      <CTASection
        title="Ready to harden your release quality?"
        description="Prevent costly defects and ship high-quality software faster — we'll provide the right expertise and tailored technology."
        ctaLabel="Book a consultation"
        secondaryLabel="Explore dedicated teams"
        secondaryHref="/dedicated-teams"
      />
    </>
  );
}
