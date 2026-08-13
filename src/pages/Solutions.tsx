import { Link } from "react-router-dom";
import {
  Cpu,
  Database,
  Layers,
  RefreshCw,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../components/Button";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { ServiceCard } from "../components/ServiceCard";
import { StatCard } from "../components/StatCard";
import { caseStudies } from "../data/caseStudies";
import styles from "./Solutions.module.css";

type Solution = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  iconBg: string;
  iconColor: string;
};

const solutions: Solution[] = [
  {
    icon: Layers,
    title: "Product engineering",
    description:
      "End-to-end product teams that design, build, and evolve software from discovery through scale.",
    href: "/mobile-development",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: RefreshCw,
    title: "Platform modernization",
    description:
      "Refactor legacy systems into modular, cloud-ready platforms without pausing the business.",
    href: "/dedicated-teams",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Users,
    title: "Dedicated teams",
    description:
      "Senior engineers embedded in your process, timezone, and roadmap — ready to contribute from week one.",
    href: "/dedicated-teams",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: Cpu,
    title: "AI transformation",
    description:
      "Strategy-to-production GenAI and ML programs that create measurable operational advantage.",
    href: "/ai-ml",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: Database,
    title: "Data platforms",
    description:
      "Reliable pipelines, analytics foundations, and decision systems that turn data into action.",
    href: "/data-studio",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
  {
    icon: ShieldCheck,
    title: "Quality at scale",
    description:
      "Manual and automated quality programs that protect releases as velocity increases.",
    href: "/quality-assurance",
    iconBg: "#E8F1FF",
    iconColor: "#4523D8",
  },
];

export function Solutions() {
  return (
    <>
      <section className={`${styles.hero} grid-bg`}>
        <div className="container">
          <Reveal>
            <div className={styles.heroInner}>
              <span className="label">Solutions</span>
              <h1 className={styles.heroTitle}>
                Solutions engineered for{" "}
                <span className="highlight-orange">outcomes</span>
              </h1>
              <p className={styles.heroDesc}>
                QUORIXA designs delivery models around the result you need —
                faster roadmaps, modern platforms, and production-grade AI —
                not generic body shopping.
              </p>
              <div className={styles.heroActions}>
                <Button href="/contact" arrow>
                  Book a consultation
                </Button>
                <Button href="/our-work" variant="ghost" arrow>
                  See our work
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Offerings"
              title="Six ways we partner with product organizations"
              description="Choose a focused engagement or combine studios under one accountable delivery team."
            />
          </Reveal>
          <div className={styles.grid}>
            {solutions.map((item) => (
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

      <section className="section section--dark">
        <div className="container">
          <div className={styles.proofLayout}>
            <Reveal>
              <div>
                <span className="label">Proof</span>
                <h2 className={styles.proofTitle}>
                  Delivery metrics that reflect{" "}
                  <span className="highlight-orange">real partnerships</span>
                </h2>
                <p>
                  Outcome-driven teams, senior ownership, and studio depth —
                  measured by speed, quality, and lasting client relationships.
                </p>
              </div>
            </Reveal>
            <div className={styles.proofGrid}>
              <StatCard
                value="3×"
                label="Faster delivery"
                description="Accelerate roadmaps with senior, ready-to-contribute teams."
              />
              <StatCard
                value="850+"
                label="Engineers"
                description="Specialists across product, data, AI, and quality."
              />
              <StatCard
                value="95%"
                label="Client retention"
                description="Long-term engagements built on predictable delivery."
              />
              <StatCard
                value="12+"
                label="Years shipping"
                description="Production software across regulated and high-growth markets."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Case studies"
              title="Outcomes across industries"
              description="Selected engagements where QUORIXA solutions moved the needle."
              align="center"
            />
          </Reveal>
          <div className={styles.caseGrid}>
            {caseStudies.slice(0, 3).map((study) => (
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
        title="Ready to engineer the right solution?"
        description="Tell us your product goals — we'll recommend the engagement model and specialists that fit."
        ctaLabel="Talk to QUORIXA"
        ctaHref="/contact"
        secondaryLabel="Explore services"
        secondaryHref="/dedicated-teams"
      />
    </>
  );
}
