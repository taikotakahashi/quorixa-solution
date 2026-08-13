import {
  Accessibility,
  Boxes,
  Gauge,
  LayoutTemplate,
  Monitor,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { DesignCollageVisual } from "../../components/HeroVisuals";
import { ClientLogoMarquee } from "../../components/ClientLogoMarquee";
import { SectionHeader } from "../../components/SectionHeader";
import { ServiceCard } from "../../components/ServiceCard";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { Testimonial } from "../../components/Testimonial";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { Button } from "../../components/Button";
import { caseStudies } from "../../data/caseStudies";
import styles from "./ServicePage.module.css";

const pillars: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Zap,
    title: "Fast",
    description:
      "Performance budgets, thoughtful rendering, and release pipelines that keep interfaces snappy under real traffic.",
  },
  {
    icon: Sparkles,
    title: "Focused",
    description:
      "Interfaces shaped around critical journeys — less chrome, clearer hierarchy, and copy that earns every screen.",
  },
  {
    icon: Monitor,
    title: "Full-stack aware",
    description:
      "Front-end engineers who understand APIs, auth, and data contracts — so UI never becomes the bottleneck.",
  },
];

const capabilities: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: LayoutTemplate,
    title: "Design systems",
    description:
      "Tokenized components, documentation, and contribution models that keep product UI consistent as teams grow.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Gauge,
    title: "Performance",
    description:
      "Core Web Vitals, bundle discipline, and rendering strategies that protect conversion on every device.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Accessibility,
    title: "Accessibility-ready UI",
    description:
      "Semantic structure, keyboard flows, and contrast standards built into components — not bolted on later.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: Boxes,
    title: "SPA & MPA architectures",
    description:
      "The right delivery model for your product — client apps, server-rendered sites, or hybrid approaches that fit SEO and UX.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: Monitor,
    title: "Component libraries",
    description:
      "Reusable UI kits wired to your brand and engineering standards — ready for feature teams to ship against.",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
];

const metrics = [
  { value: "40%", label: "Faster interactive load" },
  { value: "2×", label: "Quicker feature cycles" },
  { value: "+28%", label: "Conversion lifts shipped" },
  { value: "99%", label: "Design-system adoption" },
];

const techStack = ["React", "TypeScript", "Next.js", "Vue", "Angular"];

const frontendStudies = caseStudies.filter((s) =>
  ["retailpulse", "geotap", "medflow"].includes(s.id)
);

const studies =
  frontendStudies.length >= 3 ? frontendStudies : caseStudies.slice(0, 3);

export function Frontend() {
  return (
    <>
      <Hero
        title={
          <>
            Front-end development and{" "}
            <span className="highlight-orange">web UI solutions</span>
          </>
        }
        description="QUORIXA crafts interfaces that feel intentional — performant, accessible, and grounded in systems your engineering teams can scale."
        ctaLabel="Book a free consultation"
        visual={<DesignCollageVisual />}
      />

      <ClientLogoMarquee />

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Philosophy"
              title={
                <>
                  No UI is{" "}
                  <span className="highlight-orange">skin-deep</span>
                </>
              }
              description="Great front-end work balances craft with architecture — so products look sharp and stay maintainable."
              dark
              align="center"
            />
          </Reveal>
          <div className={styles.grid3}>
            {pillars.map((item) => {
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
            <SectionHeader
              label="Capabilities"
              title="Front-end services that elevate the product surface"
              description="From design-system foundations to high-traffic web apps — specialists who ship UI with engineering rigor."
            />
          </Reveal>
          <div className={styles.grid5}>
            {capabilities.map((item) => (
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

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Impact"
              title="Metrics product leaders care about"
              description="We measure front-end success in speed, conversion, and how confidently teams ship the next release."
              dark
              align="center"
            />
          </Reveal>
          <div className={styles.metricsRow}>
            {metrics.map((m) => (
              <Reveal key={m.label}>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>{m.value}</div>
                  <div className={styles.metricLabel}>{m.label}</div>
                </div>
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
              title="Modern front-end technologies we master"
              description="Framework depth with TypeScript discipline — matched to your roadmap, not a fashion cycle."
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

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Our work"
              title="Interfaces that shipped and scaled"
              description="Selected engagements where QUORIXA elevated web UX, systems, and front-end architecture."
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

      <section className="section">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="QUORIXA's front-end team turned a fragmented UI into a coherent system. Performance improved, design handoffs got cleaner, and feature velocity finally matched our ambitions."
              author="Daniel Okoro"
              role="Head of Product Engineering"
              company="retail commerce platform"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Ready to elevate your product's front end?"
        description="Share your UI goals — we'll assemble engineers who blend craft, systems thinking, and delivery speed."
        ctaLabel="Book a consultation"
        secondaryLabel="Explore design studio"
        secondaryHref="/design-studio"
      />
    </>
  );
}
