import {
  Apple,
  Code2,
  Layers,
  Smartphone,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { MobileVisual } from "../../components/HeroVisuals";
import { ClientLogoMarquee } from "../../components/ClientLogoMarquee";
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
import styles from "./ServicePage.module.css";

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
      "Clean architecture, automated tests, and review discipline so your app stays stable as features grow.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Layers,
    title: "Future-proof technology",
    description:
      "Stack choices and modular patterns that keep upgrades predictable — without locking you into dead ends.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Users,
    title: "Focus on users",
    description:
      "Performance, accessibility, and UX craft that turn downloads into retention and loyal product advocates.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
];

const platforms = [
  {
    icon: Apple,
    title: "iOS",
    description:
      "Native Swift and SwiftUI experiences tuned for Apple platforms, App Store guidelines, and device capabilities.",
    tags: ["Swift", "SwiftUI", "UIKit", "Combine", "XCTest"],
  },
  {
    icon: Zap,
    title: "Cross-platform",
    description:
      "Shared codebases that ship iOS and Android together — without sacrificing feel, speed, or release cadence.",
    tags: ["React Native", "Flutter", "TypeScript", "Expo", "Detox"],
  },
  {
    icon: Smartphone,
    title: "Android",
    description:
      "Kotlin-first apps built for Play quality, material systems, and the breadth of the Android ecosystem.",
    tags: ["Kotlin", "Jetpack Compose", "Coroutines", "Room", "Espresso"],
  },
];

const expertiseItems = [
  "Product discovery & UX for mobile",
  "Native iOS and Android engineering",
  "React Native & Flutter delivery",
  "CI/CD, store releases & analytics",
  "Offline-first & real-time sync",
  "Security, privacy & compliance",
];

const mobileStudies = caseStudies
  .filter((s) => s.tags.some((t) => /mobile|product|retail/i.test(t.label)))
  .slice(0, 3);

const studies =
  mobileStudies.length >= 3 ? mobileStudies : caseStudies.slice(0, 3);

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
        description="Native and cross-platform apps engineered for performance, polish, and long-term product growth — from concept to App Store and Play."
        ctaLabel="Book a free consultation"
        visual={<MobileVisual />}
      />

      <ClientLogoMarquee />

      <section className="section section--dark">
        <div className="container">
          <div className={styles.darkSplit}>
            <Reveal>
              <div>
                <span className="label">Why quality wins</span>
                <h2 className={styles.darkTitle}>
                  In mobile, quality is critical to{" "}
                  <span className="highlight-orange">success</span>
                </h2>
                <p className={styles.darkCopy}>
                  Users abandon slow, buggy, or confusing apps in seconds.
                  QUORIXA builds mobile products that feel intentional — stable
                  releases, crisp UX, and metrics that prove the investment.
                </p>
              </div>
            </Reveal>
            <div className={styles.statsGrid3}>
              <Reveal>
                <StatCard
                  value="82%"
                  label="Retention lift"
                  description="Teams that invest in release quality see stronger 30-day retention."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="42%"
                  label="Faster cycles"
                  description="Shared pipelines and senior ownership shorten sprint-to-store time."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="53%"
                  label="Fewer regressions"
                  description="Automated gates and device coverage catch issues before users do."
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
              label="Our principles"
              title="How we build mobile products that last"
              description="Every engagement is anchored in engineering rigor, forward-looking tech choices, and relentless focus on the people who use your app."
            />
          </Reveal>
          <div className={styles.grid3}>
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
          <div className={styles.darkSplit}>
            <Reveal>
              <div>
                <span className="label">Expertise</span>
                <h2 className={styles.darkTitle}>
                  Drive app development with{" "}
                  <span className="highlight-orange">proven expertise</span>
                </h2>
                <p className={styles.darkCopy}>
                  From greenfield MVPs to complex enterprise suites, our mobile
                  specialists plug into your roadmap and own outcomes —
                  architecture, delivery, and continuous improvement.
                </p>
                <div className={styles.pillRow}>
                  <span>Consumer apps</span>
                  <span>Enterprise mobility</span>
                  <span>Wearables & IoT</span>
                  <span>FinTech & Health</span>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className={styles.expertiseList}>
                <CheckList items={expertiseItems} columns={2} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Technology"
              title="Native or cross-platform — we meet you where you are"
              description="Choose the path that fits your product goals, team skills, and timeline. We help you decide — then execute with depth."
              align="center"
            />
          </Reveal>
          <div className={styles.techRow}>
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <Reveal key={platform.title}>
                  <div className={styles.techBlock}>
                    <div
                      className={styles.benefitIcon}
                      style={{ background: "#E8F1FF", color: "#1677FF" }}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3>{platform.title}</h3>
                    <p>{platform.description}</p>
                    <div className={styles.tagList}>
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

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Our work"
              title="Mobile products that shipped and scaled"
              description="Selected engagements where QUORIXA helped teams launch, modernize, and grow mobile experiences."
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
            <Testimonial
              quote="QUORIXA's mobile team took our product from fragile prototype to a polished release with rock-solid performance. They owned quality end to end — and our App Store ratings show it."
              author="Maya Chen"
              role="VP of Product"
              company="consumer tech company"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Ready to build a mobile product users love?"
        description="Tell us about your app goals — we'll assemble native or cross-platform specialists who can ship."
        ctaLabel="Book a consultation"
        secondaryLabel="Explore dedicated teams"
        secondaryHref="/dedicated-teams"
      />
    </>
  );
}
