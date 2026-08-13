import {
  ClipboardCheck,
  Compass,
  Eye,
  GraduationCap,
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
import { Testimonial } from "../../components/Testimonial";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { CheckList } from "../../components/CheckList";
import { ProcessSteps } from "../../components/ProcessSteps";
import { CurvedDivider } from "../../components/CurvedDivider";
import styles from "./Accessibility.module.css";

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
      "From agile assessments to deep WCAG audits — findings prioritized so teams can act immediately.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Compass,
    title: "Accessibility consulting",
    description:
      "Build accessibility into product strategy — policies, governance, and industry-specific opportunity mapping.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: PencilRuler,
    title: "Accessibility development",
    description:
      "Engineers who optimize existing tech or build custom inclusive features from scratch at product pace.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: Eye,
    title: "Accessibility-focused design",
    description:
      "Guidance on motion, multimedia, controls, type, color, and layout so design choices welcome more people.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: HeartHandshake,
    title: "Accessibility testing",
    description:
      "Automated scans plus assistive-technology validation — screen readers, keyboard-only flows, and real scenarios.",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
  {
    icon: GraduationCap,
    title: "Training & enablement",
    description:
      "Workshops and playbooks for design, engineering, and content so accessibility capability lasts beyond the project.",
    iconBg: "#E8F1FF",
    iconColor: "#4523D8",
  },
];

const deliverables = [
  "Site accessibility audit uncovering WCAG violations with remediation guidance",
  "Resolution of critical violations to meet internal SLAs and standards",
  "Accessibility fixes applied to the base design system",
  "Chrome extension enabling accessibility testing for squads",
  "Screen-reader-announcement components and modernized deprecated patterns",
  "Unit and journey tests ensuring compliance with EU and global regulations",
];

const impactAreas = [
  {
    title: "Navigation",
    description:
      "Keyboard-only flows with clear, visible focus indicators across critical journeys.",
  },
  {
    title: "Semantic HTML",
    description:
      "Structure and meaning optimized so assistive tech can parse content reliably.",
  },
  {
    title: "Multimedia",
    description:
      "Captions, transcripts, and descriptions validated across media experiences.",
  },
  {
    title: "Assistive tech testing",
    description:
      "Screen readers and voice commands used to identify and fix real barriers.",
  },
  {
    title: "Forms & labels",
    description:
      "Proper grouping and labels for every form control users encounter.",
  },
  {
    title: "Contrast & zoom",
    description:
      "Color redesigns and full functionality maintained at 200% zoom.",
  },
];

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
        description="Comply with ADA, EAA, and WCAG — build more inclusive products and engage an audience representing roughly 15% of the world's population."
        ctaLabel="Book a free consultation"
        visual={<QAVisual />}
      />

      <ClientLogoMarquee />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Solutions and deliverables"
              title="Accessibility solutions and services"
              description="Audits, consulting, inclusive design, engineering, and testing — delivered as one coherent practice."
            />
          </Reveal>
          <div className={styles.grid6}>
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
          <div className={styles.caseDetail}>
            <Reveal>
              <div>
                <span className="label">Featured case study</span>
                <h2>
                  Accessibility for a platform with{" "}
                  <span className="highlight-orange">200M+</span> users
                </h2>
                <p className={styles.caseDetailLead}>
                  Accessibility has been central to our work with one of the
                  world&apos;s highest-traffic employment platforms. Impact
                  spans components, extensions, design, testing, and compliance
                  audits — from keyboard navigation to semantic HTML, forms,
                  contrast, and more.
                </p>
                <SectionHeader
                  title="Key deliverables"
                  description="Concrete artifacts teams keep using long after the engagement."
                />
                <CheckList items={deliverables} columns={1} />
              </div>
            </Reveal>
            <Reveal>
              <div>
                <SectionHeader
                  label="Impact"
                  title="What changed for people using the product"
                />
                <div className={styles.impactGrid}>
                  {impactAreas.map((item) => (
                    <article key={item.title} className={styles.impactItem}>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CurvedDivider from="white" to="black" />

      <section className="section section--dark">
        <div className="container">
          <div className={styles.darkSplit}>
            <Reveal>
              <div>
                <span className="label">Why QUORIXA</span>
                <h2 className={styles.darkTitle}>
                  Embrace accessibility-centric design, development, and{" "}
                  <span className="highlight-orange">QA strategies</span>
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
                  description="Accessibility solutions delivered for Fortune 500 brands."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="30M+"
                  label="Users impacted"
                  description="Potential reach of inclusive experiences we help ship."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="3×"
                  label="Higher ROI"
                  description="Up to triple the return versus typical in-house-only approaches."
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="white" invert />

      <section className="section">
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

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <ProcessSteps
              title="Your seamless path to digital accessibility"
              image="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
              imageAlt="Inclusive product collaboration"
              steps={[
                {
                  title: "Discovery",
                  description:
                    "Evaluate accessibility posture, business goals, and industry challenges to determine the right strategy.",
                },
                {
                  title: "Team",
                  description:
                    "Engage certified software and UX experts — matching specialization, seniority, and collaboration model.",
                },
                {
                  title: "Implementation",
                  description:
                    "Testing, design, and custom accessibility features with full transparency into deliverables.",
                },
                {
                  title: "Support",
                  description:
                    "Monitoring, optimizations, and modernizations woven into your broader product strategy.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Let's create solutions that work for everyone"
        description="Trusted by Fortune 500 enterprises and fast-growing startups — tell us about your platforms and we'll outline a plan that fits your roadmap."
        ctaLabel="Book a consultation"
        secondaryLabel="Explore quality studio"
        secondaryHref="/quality-assurance"
      />
    </>
  );
}
