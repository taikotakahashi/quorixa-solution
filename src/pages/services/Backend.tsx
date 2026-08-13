import {
  Cloud,
  Database,
  Layers,
  Network,
  Rocket,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { DashboardVisual } from "../../components/HeroVisuals";
import { ClientLogoMarquee } from "../../components/ClientLogoMarquee";
import { SectionHeader } from "../../components/SectionHeader";
import { ServiceCard } from "../../components/ServiceCard";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { Testimonial } from "../../components/Testimonial";
import { AwardCards } from "../../components/AwardCards";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { Button } from "../../components/Button";
import { caseStudies } from "../../data/caseStudies";
import styles from "./ServicePage.module.css";

const solutions: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: Network,
    title: "API platforms",
    description:
      "Versioned, well-documented APIs that product teams can trust — with auth, rate limits, and observability built in from the start.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Layers,
    title: "Microservices",
    description:
      "Domain-aligned services with clear boundaries, resilient messaging, and deployment patterns that scale independently.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Cloud,
    title: "Cloud-native systems",
    description:
      "Containerized workloads, infrastructure as code, and autoscaling architectures tuned for cost, reliability, and release speed.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: Database,
    title: "Data services",
    description:
      "Streaming pipelines, search, and storage layers that keep transactional systems and analytics in sync without fragile glue code.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
];

const techStack = [
  "Node.js",
  "Python",
  "Java",
  "Go",
  ".NET",
  "PostgreSQL",
  "Kafka",
  "Redis",
];

const valueProps: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Rocket,
    title: "Ship production-ready from sprint one",
    description:
      "Senior engineers who design for load, failure modes, and operability — not just the happy path demo.",
  },
  {
    icon: Shield,
    title: "Security and compliance by default",
    description:
      "Auth models, secrets hygiene, audit trails, and threat-aware design woven into architecture reviews.",
  },
  {
    icon: Zap,
    title: "Performance you can measure",
    description:
      "SLOs, latency budgets, and capacity planning so growth never surprises your on-call rotation.",
  },
];

const backendStudies = caseStudies.filter((s) =>
  ["logix", "finledger", "securegate"].includes(s.id)
);

const studies =
  backendStudies.length >= 3 ? backendStudies : caseStudies.slice(0, 3);

export function Backend() {
  return (
    <>
      <Hero
        title={
          <>
            Backend{" "}
            <span className="highlight-orange">development services</span>
          </>
        }
        description="QUORIXA designs and builds the platforms behind your product — APIs, services, and data foundations engineered for scale, clarity, and long-term ownership."
        ctaLabel="Book a free consultation"
        visual={<DashboardVisual />}
      />

      <ClientLogoMarquee />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Capabilities"
              title="End-to-end backend solutions"
              description="From greenfield platforms to modernization programs — backend specialists who own architecture, delivery, and operational excellence."
            />
          </Reveal>
          <div className={styles.grid4}>
            {solutions.map((item) => (
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
          <Reveal>
            <SectionHeader
              label="Stack"
              title="Technologies we deliver with depth"
              description="Pragmatic stack choices matched to your domain, team skills, and reliability targets."
              align="center"
            />
          </Reveal>
          <Reveal>
            <div className={styles.techTags}>
              {techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Why QUORIXA"
              title={
                <>
                  Get stellar outcomes from{" "}
                  <span className="highlight-orange">day one</span>
                </>
              }
              description="Backend work that compounds — clean contracts, observable systems, and teams who stay accountable after launch."
              dark
              align="center"
            />
          </Reveal>
          <div className={styles.grid3}>
            {valueProps.map((item) => {
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

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="QUORIXA rebuilt our service layer without freezing the roadmap. APIs stayed stable, latency dropped, and our product teams finally stopped waiting on brittle backends."
              author="Priya Nair"
              role="VP of Engineering"
              company="logistics SaaS company"
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Our work"
              title="Backend platforms that carry real load"
              description="Selected engagements where QUORIXA hardened APIs, data paths, and cloud infrastructure for high-stakes products."
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

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              title="Recognition that reflects delivery quality"
              align="center"
            />
          </Reveal>
          <AwardCards />
        </div>
      </section>

      <CTASection
        title="Ready to strengthen your backend foundation?"
        description="Tell us about your platform goals — we'll assemble senior engineers who design for scale and ship with discipline."
        ctaLabel="Book a consultation"
        secondaryLabel="Explore dedicated teams"
        secondaryHref="/dedicated-teams"
      />
    </>
  );
}
