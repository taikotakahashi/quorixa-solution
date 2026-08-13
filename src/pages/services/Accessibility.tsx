import {
  ClipboardCheck,
  Compass,
  Eye,
  HeartHandshake,
  PencilRuler,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { QAVisual } from "../../components/HeroVisuals";
import { ClientLogoMarquee } from "../../components/ClientLogoMarquee";
import { SectionHeader } from "../../components/SectionHeader";
import { ServiceCard } from "../../components/ServiceCard";
import { StatCard } from "../../components/StatCard";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { Testimonial } from "../../components/Testimonial";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { CheckList } from "../../components/CheckList";
import { ProcessSteps } from "../../components/ProcessSteps";
import { Button } from "../../components/Button";
import { caseStudies } from "../../data/caseStudies";
import styles from "./ServicePage.module.css";

const services: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: ClipboardCheck,
    title: "Accessibility audit",
    description:
      "WCAG-aligned evaluations across code, design, and content — with prioritized findings your teams can act on immediately.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Compass,
    title: "Consulting",
    description:
      "Strategy for policies, training, and governance so accessibility becomes a lasting capability — not a one-off checklist.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: PencilRuler,
    title: "Accessibility-first development",
    description:
      "Engineers who embed semantics, focus management, and ARIA correctly while shipping features at product pace.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: Eye,
    title: "Inclusive design",
    description:
      "Research-informed patterns for contrast, motion, language, and interaction that welcome more people into your product.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: HeartHandshake,
    title: "Testing",
    description:
      "Automated scans plus assistive-technology validation — screen readers, keyboard-only flows, and real-user scenarios.",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
];

const deliverables = [
  "Prioritized WCAG findings with remediation guidance",
  "Component-level accessibility patterns for your design system",
  "Keyboard and screen-reader test scripts for critical journeys",
  "Content and media guidelines for inclusive publishing",
  "Training workshops for design, engineering, and content teams",
  "Roadmaps that balance compliance risk with product velocity",
];

const a11yStudies = caseStudies.filter((s) =>
  ["retailpulse", "securegate", "medflow"].includes(s.id)
);

const studies =
  a11yStudies.length >= 3 ? a11yStudies : caseStudies.slice(0, 3);

export function Accessibility() {
  return (
    <>
      <Hero
        title={
          <>
            Digital{" "}
            <span className="highlight-orange">accessibility solutions</span>
          </>
        }
        description="QUORIXA helps teams design, build, and verify inclusive experiences — so every customer can use your product with confidence."
        ctaLabel="Book a free consultation"
        visual={<QAVisual />}
      />

      <ClientLogoMarquee />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Services"
              title="Accessibility expertise across the product lifecycle"
              description="Audits, coaching, inclusive design, and engineering support — delivered as one coherent practice."
            />
          </Reveal>
          <div className={styles.grid5}>
            {services.map((item) => (
              <Reveal key={item.title}>
                <ServiceCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  iconBg={item.iconBg}
                  iconColor={item.iconColor}
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
                label="Deliverables"
                title="What you leave with after an engagement"
                description="Concrete artifacts and capabilities your teams keep using long after the project ends."
              />
            </Reveal>
            <Reveal>
              <CheckList items={deliverables} columns={1} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className={styles.darkSplit}>
            <Reveal>
              <div>
                <span className="label">Impact</span>
                <h2 className={styles.darkTitle}>
                  Inclusive products that{" "}
                  <span className="highlight-orange">reach further</span>
                </h2>
                <p className={styles.darkCopy}>
                  Accessibility is a growth and risk decision — widening your
                  audience while reducing legal exposure and support burden.
                </p>
              </div>
            </Reveal>
            <div className={styles.statsGrid3}>
              <Reveal>
                <StatCard
                  value="F500"
                  label="Enterprise partners"
                  description="Teams trusted by Fortune 500 product organizations."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="20M+"
                  label="Users impacted"
                  description="Experiences improved across consumer and enterprise products."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="3×"
                  label="ROI on remediation"
                  description="Fewer escalations, broader reach, and stronger brand trust."
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="QUORIXA made accessibility practical for our squads. Findings were clear, fixes landed in the design system, and we stopped treating compliance as a last-minute scramble."
              author="Sofia Alvarez"
              role="Director of Digital Experience"
              company="healthcare platform"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <ProcessSteps
              title="How we embed accessibility that lasts"
              image="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
              imageAlt="Inclusive product collaboration"
              steps={[
                {
                  title: "Discovery",
                  description:
                    "Map products, risk, and user journeys. Establish the WCAG target and success criteria for your context.",
                },
                {
                  title: "Team",
                  description:
                    "Align designers, engineers, and content owners with shared standards, tooling, and ownership models.",
                },
                {
                  title: "Implementation",
                  description:
                    "Remediate critical paths, harden components, and bake checks into design and CI workflows.",
                },
                {
                  title: "Support",
                  description:
                    "Ongoing audits, coaching, and release gates so accessibility quality compounds release over release.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Our work"
              title="Inclusive experiences shipped with care"
              description="Selected engagements where QUORIXA strengthened accessibility alongside product delivery."
              align="center"
            />
          </Reveal>
          <div className={styles.caseGrid}>
            {studies.map((study) => (
              <Reveal key={study.id}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
          <div className={styles.centerCta}>
            <Button href="/our-work" variant="ghost" arrow>
              View all case studies
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to make your product truly usable by everyone?"
        description="Tell us about your platforms and goals — we'll outline an accessibility plan that fits your roadmap."
        ctaLabel="Book a consultation"
        secondaryLabel="Explore quality studio"
        secondaryHref="/quality-assurance"
      />
    </>
  );
}
