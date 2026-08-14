import {
  Building2,
  Factory,
  Film,
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  Radio,
  ShoppingBag,
  Truck,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../components/Button";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { ServiceCard } from "../components/ServiceCard";
import { caseStudies } from "../data/caseStudies";
import { industries } from "../data/content";
import styles from "./Industries.module.css";

const industryMeta: Record<
  string,
  { icon: LucideIcon; description: string; iconBg: string; iconColor: string }
> = {
  Healthcare: {
    icon: HeartPulse,
    description:
      "Clinical operations, patient experience, and compliance-aware platforms built for care teams.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  FinTech: {
    icon: Wallet,
    description:
      "Secure transaction systems, risk insight, and customer products that earn regulated trust.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  "Retail & E-commerce": {
    icon: ShoppingBag,
    description:
      "Commerce experiences and back-office platforms that convert across channels and markets.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  Logistics: {
    icon: Truck,
    description:
      "Fleet visibility, orchestration, and operator tools for complex, multi-region supply chains.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  Manufacturing: {
    icon: Factory,
    description:
      "Connected operations software that links plant floors, partners, and planning systems.",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
  Education: {
    icon: GraduationCap,
    description:
      "Learning platforms and admin systems designed for engagement, accessibility, and scale.",
    iconBg: "#E8F1FF",
    iconColor: "#4523D8",
  },
  "Media & Entertainment": {
    icon: Film,
    description:
      "Content products, streaming tooling, and audience platforms built for high engagement.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  SaaS: {
    icon: Building2,
    description:
      "Multi-tenant product engineering with the quality bars enterprise buyers expect.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  Transportation: {
    icon: Plane,
    description:
      "Mobility and ops platforms that keep passengers, fleets, and schedules in sync.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  Insurance: {
    icon: Landmark,
    description:
      "Claims, underwriting, and policy experiences modernized without disrupting compliance.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  Energy: {
    icon: Zap,
    description:
      "Grid, asset, and customer systems for operators navigating reliability and transition.",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
  Telecommunications: {
    icon: Radio,
    description:
      "Network, billing, and digital service platforms engineered for massive concurrency.",
    iconBg: "#F3E8FF",
    iconColor: "#4523D8",
  },
};

const selectedStudies = caseStudies.filter((study) =>
  ["dialpad", "regtech", "starz", "supply-chain"].includes(study.id),
);

export function Industries() {
  return (
    <>
      <section className={`${styles.hero} grid-bg`}>
        <div className="container">
          <Reveal>
            <div className={styles.heroInner}>
              <span className="label">Industries</span>
              <h1 className={styles.heroTitle}>
                Industry expertise that{" "}
                <span className="highlight-orange">compounds</span>
              </h1>
              <p className={styles.heroDesc}>
                Domain-aware teams that understand regulated environments,
                high-growth products, and complex operations — so delivery
                starts informed, not from zero.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Sectors"
              title="Where we bring depth"
              description="QUORIXA partners across industries where software quality, compliance, and speed must coexist."
            />
          </Reveal>
          <div className={styles.grid}>
            {industries.map((name) => {
              const meta = industryMeta[name] ?? {
                icon: Building2,
                description:
                  "Domain-aware engineering that aligns to the realities of your market.",
                iconBg: "#F3E8FF",
                iconColor: "#5B35F5",
              };
              return (
                <Reveal key={name}>
                  <ServiceCard
                    icon={meta.icon}
                    title={name}
                    description={meta.description}
                    iconBg={meta.iconBg}
                    iconColor={meta.iconColor}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Selected work"
              title="Case studies from the field"
              description="Proof points across healthcare, fintech, retail, and logistics."
              align="center"
            />
          </Reveal>
          <div className={styles.caseGrid}>
            {selectedStudies.map((study) => (
              <Reveal key={study.id}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
          <div className={styles.centerCta}>
            <Button href="/our-work" variant="ghost" arrow>
              Browse all case studies
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Need a team that already speaks your domain?"
        description="Share your industry context — we'll assemble specialists who understand the constraints and opportunities."
        ctaLabel="Book a consultation"
        ctaHref="/contact"
        secondaryLabel="Explore solutions"
        secondaryHref="/solutions"
      />
    </>
  );
}
