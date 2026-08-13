import {
  Brain,
  Cloud,
  Database,
  Monitor,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { AwardCards } from "../components/AwardCards";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { technologies } from "../data/content";
import styles from "./Technologies.module.css";

type TechGroupKey = keyof typeof technologies;

const groupCopy: Record<
  TechGroupKey,
  {
    label: string;
    title: string;
    description: string;
    icon: LucideIcon;
    accent: string;
  }
> = {
  frontend: {
    label: "Frontend",
    title: "Interfaces that feel inevitable",
    description:
      "We build performant web applications and design systems in modern JavaScript frameworks — with accessibility, consistency, and maintainability as non-negotiables.",
    icon: Monitor,
    accent: "#1677FF",
  },
  backend: {
    label: "Backend",
    title: "Services built for durability",
    description:
      "APIs, domain services, and platform foundations engineered for reliability, observability, and clean ownership boundaries as products grow.",
    icon: Server,
    accent: "#5B35F5",
  },
  mobile: {
    label: "Mobile",
    title: "Native quality, shipped with care",
    description:
      "iOS, Android, and cross-platform apps that balance craft with delivery speed — from store-ready launches to long-lived product evolution.",
    icon: Smartphone,
    accent: "#FF6500",
  },
  cloud: {
    label: "Cloud",
    title: "Infrastructure that scales with intent",
    description:
      "Cloud-native architectures, container platforms, and operational patterns that keep environments secure, elastic, and cost-aware.",
    icon: Cloud,
    accent: "#35B968",
  },
  ai: {
    label: "AI",
    title: "Models that earn their place in production",
    description:
      "From foundation-model integrations to custom ML pipelines — we ship AI that is evaluated, governed, and tied to clear business outcomes.",
    icon: Brain,
    accent: "#4523D8",
  },
  data: {
    label: "Data",
    title: "Foundations for confident decisions",
    description:
      "Warehouses, transformation layers, streaming, and analytics tooling that make data trustworthy enough for product and operations teams to act.",
    icon: Database,
    accent: "#FF3B30",
  },
};

const groupOrder: TechGroupKey[] = [
  "frontend",
  "backend",
  "mobile",
  "cloud",
  "ai",
  "data",
];

export function Technologies() {
  return (
    <>
      <section className={`${styles.hero} grid-bg`}>
        <div className="container">
          <Reveal>
            <div className={styles.heroInner}>
              <span className="label">Technologies</span>
              <h1 className={styles.heroTitle}>
                Technology depth across the{" "}
                <span className="highlight-orange">stack</span>
              </h1>
              <p className={styles.heroDesc}>
                QUORIXA teams choose tools for longevity and fit — modern
                product stacks with the judgment to adopt what serves the
                roadmap, not what merely trends.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Capabilities"
              title="Practices spanning the full engineering surface"
              description="Each discipline is staffed by specialists who ship in production — and collaborate as one delivery organization."
            />
          </Reveal>
          <div className={styles.groups}>
            {groupOrder.map((key) => {
              const copy = groupCopy[key];
              const items = technologies[key];
              const Icon = copy.icon;
              return (
                <Reveal key={key}>
                  <article className={styles.group}>
                    <div className={styles.groupHeader}>
                      <div
                        className={styles.groupIcon}
                        style={{ color: copy.accent, background: `${copy.accent}14` }}
                      >
                        <Icon size={22} strokeWidth={1.8} />
                      </div>
                      <div>
                        <span className={styles.groupLabel}>{copy.label}</span>
                        <h3 className={styles.groupTitle}>{copy.title}</h3>
                      </div>
                    </div>
                    <p className={styles.groupDesc}>{copy.description}</p>
                    <div className={styles.tags}>
                      {items.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </article>
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
              label="Recognition"
              title="Partners and awards that reflect delivery quality"
              description="Industry trust earned through products that perform in the real world."
              align="center"
            />
          </Reveal>
          <AwardCards />
        </div>
      </section>

      <CTASection
        title="Need depth in a specific stack?"
        description="Tell us your architecture constraints — we'll staff specialists who already live in that ecosystem."
        ctaLabel="Book a consultation"
        ctaHref="/contact"
        secondaryLabel="View solutions"
        secondaryHref="/solutions"
      />
    </>
  );
}
