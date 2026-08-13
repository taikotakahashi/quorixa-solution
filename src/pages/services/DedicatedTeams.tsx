import {
  ArrowUpRight,
  Brain,
  Clock,
  Code2,
  Compass,
  Gauge,
  Handshake,
  Layout,
  Monitor,
  Palette,
  ShieldCheck,
  Smartphone,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { VideoCallVisual } from "../../components/HeroVisuals";
import { ClientLogoMarquee } from "../../components/ClientLogoMarquee";
import { SectionHeader } from "../../components/SectionHeader";
import { ServiceCard } from "../../components/ServiceCard";
import { StatCard } from "../../components/StatCard";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { ProcessSteps } from "../../components/ProcessSteps";
import styles from "./ServicePage.module.css";

const specialties: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: Code2,
    title: "Full-stack engineering",
    description:
      "Product-minded engineers who own features across APIs, services, and front-end delivery.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Monitor,
    title: "Front-end specialists",
    description:
      "React, TypeScript, and design-system experts who ship accessible, high-performance UIs.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Smartphone,
    title: "Mobile engineering",
    description:
      "Native and cross-platform talent for iOS, Android, React Native, and Flutter roadmaps.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: ShieldCheck,
    title: "QA & automation",
    description:
      "Manual and automated quality engineers who protect every release with clear coverage.",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
  {
    icon: Brain,
    title: "Big data & ML",
    description:
      "Data engineers and ML practitioners who turn pipelines and models into product leverage.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: Palette,
    title: "UI/UX design",
    description:
      "Product designers who shape flows, systems, and interfaces your users trust and enjoy.",
    iconBg: "#F3E8FF",
    iconColor: "#4523D8",
  },
];

const benefits: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: Gauge,
    title: "Accelerate delivery",
    description:
      "Add senior capacity immediately — without the ramp-up cost of traditional hiring.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Target,
    title: "Stay focused on outcomes",
    description:
      "Teams align to your KPIs, ceremonies, and roadmap — not a generic outsourcing playbook.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Layout,
    title: "Scale with flexibility",
    description:
      "Grow or reshape the squad as priorities shift — skills, seniority, and size on demand.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: Clock,
    title: "Work in your timezone",
    description:
      "Nearshore collaboration means real-time standups, pair sessions, and faster decisions.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: Handshake,
    title: "Extend your culture",
    description:
      "Engineers who communicate clearly, document well, and operate as part of your org.",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
  {
    icon: ArrowUpRight,
    title: "Raise the bar",
    description:
      "Bring patterns, tooling, and practices that lift engineering standards across the team.",
    iconBg: "#E8F1FF",
    iconColor: "#4523D8",
  },
];

const advantages: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Users,
    title: "Vetted senior talent",
    description:
      "Every specialist passes technical and soft-skill screening before joining your squad.",
  },
  {
    icon: Compass,
    title: "Strategic partnership",
    description:
      "We advise on architecture and process — not just ticket throughput — so you ship smarter.",
  },
  {
    icon: Gauge,
    title: "Predictable velocity",
    description:
      "Transparent planning, stable capacity, and delivery rituals that keep stakeholders aligned.",
  },
  {
    icon: ShieldCheck,
    title: "Quality by default",
    description:
      "Code review, testing discipline, and security awareness baked into how the team works.",
  },
  {
    icon: Handshake,
    title: "Long-term continuity",
    description:
      "Low attrition and knowledge retention so institutional context stays with your product.",
  },
];

const processSteps = [
  {
    title: "Discovery",
    description:
      "We learn your product, stack, ways of working, and the outcomes that matter most.",
  },
  {
    title: "Team",
    description:
      "QUORIXA assembles a shortlist of specialists matched to skills, seniority, and culture fit.",
  },
  {
    title: "Pitching",
    description:
      "Meet candidates, review portfolios, and validate collaboration style in live sessions.",
  },
  {
    title: "Selection",
    description:
      "You choose the team. We finalize roles, onboarding plan, and success criteria together.",
  },
  {
    title: "Delivery",
    description:
      "The squad embeds with your process and starts shipping — with continuous optimization.",
  },
];

export function DedicatedTeams() {
  return (
    <>
      <Hero
        title={
          <>
            Dedicated engineering
            <br />
            &amp; design{" "}
            <span className="highlight-orange">teams</span>
          </>
        }
        description="Thoroughly vetted nearshore specialists aligned to your goals, process, and timezone. Scale product delivery with teams that feel like your own."
        ctaLabel="Book a free consultation"
        visual={<VideoCallVisual />}
      />

      <ClientLogoMarquee />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Capabilities"
              title="Our nearshore experts specialize in"
              description="Compose a squad around the disciplines your roadmap needs — from full-stack delivery to design, data, and quality."
            />
          </Reveal>
          <div className={styles.grid6}>
            {specialties.map((item) => (
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
          <div className={styles.darkSplit}>
            <Reveal>
              <div>
                <span className="label">Trusted delivery</span>
                <h2 className={styles.darkTitle}>
                  Built for teams that ship like{" "}
                  <span className="highlight-orange">Fortune 500</span>{" "}
                  organizations
                </h2>
                <p className={styles.darkCopy}>
                  QUORIXA dedicated teams bring enterprise-grade discipline with
                  the speed and ownership of a focused product squad —
                  measured by outcomes, not headcount.
                </p>
              </div>
            </Reveal>
            <div className={styles.statsGrid2}>
              <Reveal>
                <StatCard
                  value="3×"
                  label="Faster ramp-up"
                  description="Senior engineers productive in days, not months of hiring cycles."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="95%"
                  label="Client retention"
                  description="Long-term partnerships built on trust, clarity, and delivery."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="850+"
                  label="Specialists"
                  description="Talent across engineering, design, data, AI, and QA."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="25+"
                  label="Countries"
                  description="Distributed experts collaborating as one team."
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Benefits"
              title="With our dedicated teams you can"
              description="Remove bottlenecks, protect focus, and expand capacity without compromising how your organization works."
            />
          </Reveal>
          <div className={styles.benefits}>
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title}>
                  <article className={styles.benefitCard}>
                    <div
                      className={styles.benefitIcon}
                      style={{
                        background: item.iconBg,
                        color: item.iconColor,
                      }}
                    >
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

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Strategic advantages"
              title="Why product leaders choose QUORIXA teams"
              description="More than staff augmentation — a partnership model designed for sustained product momentum."
              dark
            />
          </Reveal>
          <div className={styles.grid3}>
            {advantages.map((item) => {
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

      <section className="section">
        <div className="container">
          <Reveal>
            <ProcessSteps
              title="How we build your dedicated team"
              image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
              imageAlt="QUORIXA engineering team collaborating"
              steps={processSteps}
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Let's assemble your dedicated team"
        description="Share your goals and stack — we'll match specialists who can start contributing quickly."
        ctaLabel="Book a consultation"
        secondaryLabel="Explore mobile development"
        secondaryHref="/mobile-development"
      />
    </>
  );
}
