import {
  BarChart3,
  Database,
  Gauge,
  LineChart,
  Shield,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { DashboardVisual } from "../../components/HeroVisuals";
import { ClientLogoMarquee } from "../../components/ClientLogoMarquee";
import { SectionHeader } from "../../components/SectionHeader";
import { ServiceCard } from "../../components/ServiceCard";
import { StatCard } from "../../components/StatCard";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { Testimonial } from "../../components/Testimonial";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { CheckList } from "../../components/CheckList";
import { ProcessSteps } from "../../components/ProcessSteps";
import { Button } from "../../components/Button";
import { CurvedDivider } from "../../components/CurvedDivider";
import { caseStudies } from "../../data/caseStudies";
import styles from "./DataStudio.module.css";

const solutions: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: Database,
    title: "Data engineering",
    description:
      "Unify data for analysis and reporting with ETL pipelines, governance, quality checks, and monitoring.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: Gauge,
    title: "Performance optimization",
    description:
      "Maximize efficiency and prevent degradation while achieving crystal-clear, trustworthy data.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: BarChart3,
    title: "Data visualization",
    description:
      "Gain actionable insight from complex data with reporting tailored to your team, processes, and goals.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: LineChart,
    title: "Data science and ML",
    description:
      "Identify patterns, risks, and opportunities with domain-specific science and leading-edge ML.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
];

const outcomesLeft = [
  "10× faster ETL processing for high-traffic platforms",
  "80% of client data moved to trusted silver-level quality",
  "60% of redundant logs removed from 140M+ event pipelines",
];

const outcomesRight = [
  "12× faster data consumption for Fortune-scale vendors",
  "1.5 months to ship metrics APIs for 14,000-person workforces",
  "50% performance boost on pipelines scaling to 250M+ users",
];

const advantages: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Zap,
    title: "Top-1% talent",
    description:
      "Senior data engineers and scientists across the Americas, Europe, and Asia.",
  },
  {
    icon: Shield,
    title: "Proven expertise",
    description:
      "99% of clients say they feel confident recommending QUORIXA to industry peers.",
  },
  {
    icon: Sparkles,
    title: "Strategic support",
    description:
      "We've helped clients grow from PoCs to data products featured by analysts.",
  },
  {
    icon: Gauge,
    title: "High efficiency",
    description:
      "In-house quality and industry expertise at a fraction of fully in-house cost.",
  },
  {
    icon: Database,
    title: "Flexibility at scale",
    description:
      "The right capabilities at every growth stage — we handle the staffing details.",
  },
  {
    icon: LineChart,
    title: "Tailored approach",
    description:
      "No cookie-cutter tech — solutions adapt to your business, not the other way around.",
  },
];

const dataCaseStudies = caseStudies.filter((s) =>
  ["finledger", "logix", "medflow"].includes(s.id)
);

const studies =
  dataCaseStudies.length >= 3 ? dataCaseStudies : caseStudies.slice(0, 3);

export function DataStudio() {
  return (
    <>
      <Hero
        title={
          <>
            Turn data into action.{" "}
            <span className="highlight-orange">We&apos;ll handle the tech</span>
          </>
        }
        description="Tailored data engineering and business analytics — backed by scalable, secure, and future-proof software from QUORIXA Data Studio."
        ctaLabel="Book a free consultation"
        visual={<DashboardVisual accent="orange" />}
      />

      <ClientLogoMarquee />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Solutions and deliverables"
              title="Solutions for your data-driven growth"
              description="Engineering, performance, visualization, and applied science — delivered as one coherent data practice."
            />
          </Reveal>
          <div className={`${styles.grid4} ${styles.solutionsBlock}`}>
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
          <Reveal>
            <div className={styles.outcomesIntro}>
              <SectionHeader
                title="Client outcomes that make us proud"
                description="Speed, quality, and scale — measured in the systems operators rely on every day."
              />
            </div>
          </Reveal>
          <div className={styles.outcomes}>
            <Reveal>
              <CheckList items={outcomesLeft} columns={1} />
            </Reveal>
            <Reveal>
              <CheckList items={outcomesRight} columns={1} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className={styles.photoCta}>
            <Reveal>
              <div className={styles.photoCtaCopy}>
                <span className="label">Let&apos;s talk</span>
                <h2>
                  Want to{" "}
                  <span className="highlight-orange">10×</span> your data
                  solutions?
                </h2>
                <p>
                  We&apos;ll assess your stack, prioritize quick wins, and map a
                  path to a durable analytics foundation your teams can trust.
                </p>
                <Button href="/contact" arrow>
                  See what we can do for you
                </Button>
              </div>
            </Reveal>
            <Reveal>
              <div className={styles.photoWrap}>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80"
                  alt="Data analytics collaboration"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Case studies"
              title="Success stories written with data"
              description="From leading-edge data systems to ML analytics trusted by enterprise brands."
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
        </div>
      </section>

      <CurvedDivider from="light" to="black" />

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Why QUORIXA"
              title={
                <>
                  Your competitive advantages with{" "}
                  <span className="highlight-orange">Data Studio</span>
                </>
              }
              description="Enterprise rigor with product-team urgency — so data becomes a growth lever, not a backlog."
              dark
              align="center"
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
          <div className={styles.statsRow}>
            <StatCard value="3×" label="Faster reporting cycles" />
            <StatCard value="99.9%" label="Pipeline uptime targets" />
            <StatCard value="30%" label="Cloud cost reductions" />
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="white" invert />

      <section className="section">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="QUORIXA stands out for the quality of their talent. They have a phenomenal process for ensuring they onboard the best of the best — and it shows in the data products they ship."
              author="Maya Chen"
              role="VP of Data"
              company="IoT & software platform"
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <ProcessSteps
              title="The right process for elevating your data"
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
              imageAlt="Analytics dashboard collaboration"
              steps={[
                {
                  title: "Define",
                  description:
                    "Identify business goals and challenges to determine optimal team composition.",
                },
                {
                  title: "Measure",
                  description:
                    "Collect relevant data points for a clear understanding of the current situation.",
                },
                {
                  title: "Analyze",
                  description:
                    "Detect patterns and develop potential solutions to coordinate further actions.",
                },
                {
                  title: "Improve",
                  description:
                    "Refine strategies and processes for quick, efficient solution development.",
                },
                {
                  title: "Control",
                  description:
                    "Monitor and fine-tune delivered solutions to ensure long-term performance.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Let's explore what we can do for you"
        description="Share your stack and goals — we'll outline a practical plan for pipelines, insights, and ML."
        ctaLabel="Book a consultation"
        secondaryLabel="View case studies"
        secondaryHref="/our-work"
      />
    </>
  );
}
