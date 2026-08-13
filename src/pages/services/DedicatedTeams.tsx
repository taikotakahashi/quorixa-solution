import {
  Brain,
  Briefcase,
  Code2,
  Compass,
  Gauge,
  Handshake,
  Layers,
  Monitor,
  Palette,
  Rocket,
  ShieldCheck,
  Smartphone,
  Target,
  Users,
  Zap,
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
import { CurvedDivider } from "../../components/CurvedDivider";
import { Button } from "../../components/Button";
import styles from "./DedicatedTeams.module.css";

const specialties: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Code2,
    title: "Full-stack and backend development",
    description:
      "Node.js · Java · .NET · Python · Go · Scala — product-minded engineers who own services end to end.",
  },
  {
    icon: Monitor,
    title: "Front-end development",
    description:
      "React.js · Angular · Vue.js · JavaScript — interfaces that stay fast, accessible, and maintainable.",
  },
  {
    icon: Smartphone,
    title: "Mobile development",
    description:
      "iOS · Android · React Native · Flutter — native and cross-platform talent for shipping on schedule.",
  },
  {
    icon: ShieldCheck,
    title: "Quality assurance",
    description:
      "TDD · BDD · Manual QA · Test automation — coverage that protects every release.",
  },
  {
    icon: Brain,
    title: "Big data and machine learning",
    description:
      "Data engineering · Performance · Visualization · Data science — pipelines and models that create leverage.",
  },
  {
    icon: Palette,
    title: "UI / UX design",
    description:
      "Design strategy · User research · Interaction · Visual & motion · UX consultancy.",
  },
];

const benefits: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Layers,
    title: "Scale capabilities on demand",
    description:
      "Easily scale development and design capacity to match your project needs.",
  },
  {
    icon: Handshake,
    title: "Retain product knowledge",
    description:
      "Ensure long-term commitment so context stays with your product — not lost to turnover.",
  },
  {
    icon: Rocket,
    title: "Kick off faster",
    description:
      "Start new work and iterate on existing projects without months of hiring lag.",
  },
  {
    icon: Target,
    title: "Find niche experts",
    description:
      "Access technical and industry specialists that are hard to hire locally.",
  },
  {
    icon: Zap,
    title: "Add brainpower efficiently",
    description:
      "Extend your team with senior capacity at a fraction of traditional in-house cost.",
  },
  {
    icon: Compass,
    title: "Free your core team",
    description:
      "Let your in-house leaders focus on strategy while dedicated specialists execute.",
  },
];

const advantages: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Users,
    title: "Top-shelf talent pool",
    description:
      "Engage global professionals whose skills and ownership mentality match your best in-house experts.",
  },
  {
    icon: ShieldCheck,
    title: "Robust security",
    description:
      "Information security practices aligned to ISO/IEC 27001 standards so your project stays protected.",
  },
  {
    icon: Briefcase,
    title: "Industry expertise",
    description:
      "We select candidates for your industry challenges and business needs — not just the tech stack.",
  },
  {
    icon: Gauge,
    title: "Flexibility",
    description:
      "Scale the team up or down, or switch engagement models — you stay in control.",
  },
  {
    icon: Compass,
    title: "Strategic support",
    description:
      "Tech leads and delivery managers advise on architecture decisions and process improvements.",
  },
];

const assembleWays: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Zap,
    title: "Efficiency",
    description:
      "Align on goals, architecture, and milestones so the squad starts delivering immediately.",
  },
  {
    icon: Layers,
    title: "Scale",
    description:
      "Define composition, roles, and seniority — then grow capacity as the roadmap expands.",
  },
  {
    icon: Gauge,
    title: "Flexibility",
    description:
      "Adjust skills and headcount as priorities shift without restarting a full hiring cycle.",
  },
  {
    icon: Target,
    title: "Expertise",
    description:
      "Interview, shortlist, and engage specialists matched to your stack and domain.",
  },
  {
    icon: Handshake,
    title: "Stability",
    description:
      "Once assembled, your team ships through a transparent iterative process with lasting continuity.",
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
        description="Thoroughly vetted, highly efficient, and custom-built for your unique challenge. Boost development velocity with high-impact agile teams aligned with your goals, process, and time zone."
        ctaLabel="Book a free consultation"
        visual={<VideoCallVisual />}
      />

      <ClientLogoMarquee />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Services"
              title="Our nearshore experts specialize in"
              description="Compose a squad around the disciplines your roadmap needs — from full-stack delivery to design, data, and quality."
            />
          </Reveal>
          <div className={styles.specialtyGrid}>
            {specialties.map((item) => (
              <Reveal key={item.title}>
                <ServiceCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  iconBg="#FFF0E6"
                  iconColor="#FF6500"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="light" to="black" />

      <section className="section section--dark">
        <div className="container">
          <div className={styles.trustSplit}>
            <Reveal>
              <div>
                <span className="label">Trusted delivery</span>
                <h2 className={styles.trustTitle}>
                  Tech teams trusted by Fortune 500 firms and{" "}
                  <span className="highlight-orange">VC startups</span>
                </h2>
                <p className={styles.trustCopy}>
                  QUORIXA dedicated teams bring enterprise-grade discipline with
                  the speed and ownership of a focused product squad.
                </p>
              </div>
            </Reveal>
            <div className={styles.statsRow}>
              <Reveal>
                <StatCard
                  value="850+"
                  label="Access experts"
                  description="Specialists across global talent hubs ready to embed with your team."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="3×"
                  label="Faster time-to-hire"
                  description="Up to 3× faster ramp compared to the industry average."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="2×"
                  label="Higher cost-efficiency"
                  description="Up to 2× better cost-efficiency versus typical in-house rates."
                />
              </Reveal>
            </div>
          </div>

          <Reveal>
            <div className={styles.consultBar}>
              <div>
                <h3 className={styles.consultTitle}>
                  Consult our experts to start assembling your dedicated team
                </h3>
                <p className={styles.consultDesc}>
                  Leverage QUORIXA to access top tech talent with greater speed
                  and efficiency.
                </p>
              </div>
              <Button href="/contact" arrow>
                Book a call
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CurvedDivider from="black" to="light" invert />

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
                  <article className={styles.benefit}>
                    <div className={styles.benefitIcon}>
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

      <CurvedDivider from="light" to="black" />

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Strategic advantages"
              title="Your strategic advantages with QUORIXA"
              description="More than staff augmentation — a partnership model designed for sustained product momentum."
              dark
            />
          </Reveal>
          <div className={styles.advantagesGrid}>
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

      <CurvedDivider from="black" to="white" invert />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className={styles.assemble}>
              <div>
                <h2 className={styles.assembleTitle}>
                  Assemble your expert team your way
                </h2>
                <div className={styles.assembleImage}>
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                    alt="QUORIXA engineering team collaborating in the office"
                    loading="lazy"
                  />
                </div>
              </div>
              <ul className={styles.assembleList}>
                {assembleWays.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className={styles.assembleItem}>
                      <div className={styles.assembleIcon}>
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Industry grows with our dedicated teams"
        description="Talk with our experts to see how companies in your industry grow with QUORIXA dedicated teams."
        ctaLabel="Book a consultation"
        secondaryLabel="Explore mobile development"
        secondaryHref="/mobile-development"
      />
    </>
  );
}
