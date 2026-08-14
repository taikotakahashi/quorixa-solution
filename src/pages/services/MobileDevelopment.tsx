import {
  Apple,
  Code2,
  Layers,
  RefreshCw,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { MobileVisual } from "../../components/HeroVisuals";
import { CurvedDivider } from "../../components/CurvedDivider";
import { SectionHeader } from "../../components/SectionHeader";
import { ServiceCard } from "../../components/ServiceCard";
import { StatCard } from "../../components/StatCard";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { Testimonial } from "../../components/Testimonial";
import { AwardCards } from "../../components/AwardCards";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { Button } from "../../components/Button";
import { caseStudies } from "../../data/caseStudies";
import shared from "./ServicePage.module.css";
import styles from "./MobileDevelopment.module.css";

const principles: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: Code2,
    title: "Robust code",
    description:
      "Fast, smooth apps need optimal architecture and clean, well-tested code bases that stay stable as features grow.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Layers,
    title: "Future-proof technology",
    description:
      "Mature stacks with strong community support — modular patterns that keep upgrades predictable without dead ends.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Users,
    title: "Focus on users",
    description:
      "Apps built for high App Store and Play ratings — performance, accessibility, and UX that turn downloads into loyalty.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
];

const expertiseStrip = [
  {
    title: "Top app development partner",
    description:
      "Senior mobile specialists who own architecture, delivery, and continuous improvement end to end.",
  },
  {
    title: "Fastest-growing engagements",
    description:
      "Squads that scale with your roadmap — from MVP to multi-million download products.",
  },
  {
    title: "Top-1% mobile experts",
    description:
      "Vetted talent across native and cross-platform stacks from 15+ countries, aligned to your timezone.",
  },
];

const platforms: {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}[] = [
  {
    icon: Apple,
    title: "Native",
    description:
      "Swift and Kotlin experiences tuned for platform guidelines, device capabilities, and store excellence.",
    tags: ["Swift", "SwiftUI", "Kotlin", "Compose", "XCTest"],
  },
  {
    icon: RefreshCw,
    title: "Interoperable",
    description:
      "Shared modules and bridge layers that connect native shells with reusable business logic and APIs.",
    tags: ["KMP", "Turbo Modules", "FFI", "GraphQL", "REST"],
  },
  {
    icon: Smartphone,
    title: "Cross-platform",
    description:
      "Shared codebases that ship iOS and Android together — without sacrificing feel, speed, or release cadence.",
    tags: ["React Native", "Flutter", "TypeScript", "Expo", "Detox"],
  },
];

const trustStats = [
  {
    value: "11M+",
    label: "New downloads",
    description: "Consumer apps we helped launch and scale across stores.",
  },
  {
    value: "2×",
    label: "More users",
    description: "Typical lift after UX and performance revamps on live apps.",
  },
  {
    value: "3 mo",
    label: "Greenfield to launch",
    description: "AI, IoT, and consumer apps shipped from scratch on tight timelines.",
  },
];

const studies = caseStudies
  .filter((s) =>
    ["geotap", "retailpulse", "medflow"].includes(s.id)
  )
  .concat(caseStudies)
  .filter(
    (s, i, arr) => arr.findIndex((x) => x.id === s.id) === i
  )
  .slice(0, 3);

export function MobileDevelopment() {
  return (
    <>
      <Hero
        title={
          <>
            Mobile{" "}
            <span className="highlight-orange">development</span>
          </>
        }
        description="iOS, Android, and cross-platform — QUORIXA builds mobile apps that win awards and earn millions of downloads."
        ctaLabel="Book a free consultation"
        visual={<MobileVisual />}
      />

      <CurvedDivider from="white" to="black" />

      <section className="section section--dark">
        <div className="container">
          <div className={shared.darkSplit}>
            <Reveal>
              <div>
                <span className="label">Why quality wins</span>
                <h2 className={shared.darkTitle}>
                  In mobile, quality is critical to{" "}
                  <span className="highlight-orange">success</span>
                </h2>
                <p className={shared.darkCopy}>
                  When it comes to mobile apps, you can&apos;t compromise on
                  design or quality. QUORIXA ships products that feel
                  intentional — stable releases, crisp UX, and metrics that
                  prove the investment.
                </p>
              </div>
            </Reveal>
            <div className={shared.statsGrid3}>
              <Reveal>
                <StatCard
                  value="62%"
                  label="Of app uninstalls"
                  description="Result from performance issues like freezing or crashes."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="42%"
                  label="Of users quit apps"
                  description="Because of underwhelming UX — polish is non-negotiable."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="53%"
                  label="Of app users"
                  description="Are ready to switch to better, more useful alternatives."
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="light" />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Our principles"
              title="The principles driving our mobile solutions"
              description="Every engagement is anchored in engineering rigor, forward-looking tech choices, and relentless focus on the people who use your app."
            />
          </Reveal>
          <div className={shared.grid3}>
            {principles.map((item) => (
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
              label="Expertise"
              title={
                <>
                  Drive app development with{" "}
                  <span className="highlight-orange">proven expertise</span>
                </>
              }
              description="From greenfield MVPs to complex enterprise suites — mobile specialists who plug into your roadmap and own outcomes."
              dark
              align="center"
            />
          </Reveal>
          <div className={styles.expertiseStrip}>
            {expertiseStrip.map((item) => (
              <Reveal key={item.title}>
                <article className={styles.expertiseCard}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="Since hiring QUORIXA, the company has seen significant improvements in velocity, sprint cadence, and ticket volume. They excel at identifying high-quality talent and scaling to meet increasingly complicated requirements."
              author="Jeff Phillips"
              role="Head of Quality Assurance"
              company="smart agriculture app"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Technology"
              title="Native, interoperable, or cross-platform — we've got you covered"
              description="Choose the path that fits your product goals, team skills, and timeline. We help you decide — then execute with depth."
              align="center"
            />
          </Reveal>
          <div className={shared.techRow}>
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <Reveal key={platform.title}>
                  <div className={shared.techBlock}>
                    <div
                      className={shared.benefitIcon}
                      style={{ background: "#E8F1FF", color: "#1677FF" }}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3>{platform.title}</h3>
                    <p>{platform.description}</p>
                    <div className={shared.tagList}>
                      {platform.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
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
              label="Why QUORIXA"
              title={
                <>
                  Industry leaders trust us.{" "}
                  <span className="highlight-orange">Here&apos;s why</span>
                </>
              }
              description="Measurable outcomes from mobile products that shipped, scaled, and kept winning users."
              dark
              align="center"
            />
          </Reveal>
          <div className={styles.trustStats}>
            {trustStats.map((stat) => (
              <Reveal key={stat.label}>
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  description={stat.description}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              title="Our proof of success"
              description="Recognition that reflects delivery quality — not slideware."
              align="center"
            />
          </Reveal>
          <AwardCards />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Case studies"
              title="Featured success stories"
              description="From mobile MVPs to apps with millions of users — engagements where QUORIXA turned mobile into a growth driver."
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

      <CTASection
        title="Turn your brilliant idea into a top-class mobile app"
        description="Create high-quality mobile applications faster with leading-edge technology — explore strategies with our experts."
        ctaLabel="Book a consultation"
        secondaryLabel="Explore dedicated teams"
        secondaryHref="/dedicated-teams"
      />
    </>
  );
}
