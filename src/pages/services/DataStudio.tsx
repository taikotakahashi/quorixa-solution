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
    icon: Database,
    title: "Data engineering",
    description:
      "Reliable pipelines, warehouses, and lakehouses that keep analytics and ML fed with clean data.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: Gauge,
    title: "Performance optimization",
    description:
      "Tune queries, storage, and orchestration so teams get answers in seconds — not overnight jobs.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: BarChart3,
    title: "Data visualization",
    description:
      "Dashboards and self-serve analytics that turn complex datasets into decisions people trust.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: LineChart,
    title: "Data science and ML",
    description:
      "Forecasting, scoring, and predictive models embedded where operators and products need them.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
];

const outcomes = [
  "Trusted single source of truth across product and operations",
  "Faster reporting cycles with automated, auditable pipelines",
  "Self-serve dashboards that reduce analyst bottlenecks",
  "ML features shipping into production with monitoring in place",
  "Lower cloud spend through right-sized storage and compute",
  "Clear ownership between data engineering, analytics, and product",
];

const advantages: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Zap,
    title: "Speed to insight",
    description:
      "Senior data teams that ship pipelines and dashboards in weeks, not quarters.",
  },
  {
    icon: Shield,
    title: "Governance built in",
    description:
      "Access controls, lineage, and quality checks designed for regulated environments.",
  },
  {
    icon: Sparkles,
    title: "Actionable by design",
    description:
      "We optimize for decisions — embedding insights into workflows, not just reports.",
  },
];

const dataCaseStudies = caseStudies.filter((s) =>
  ["finledger", "logix", "medflow"].includes(s.id)
);

export function DataStudio() {
  return (
    <>
      <Hero
        title={
          <>
            Turn data into action.{" "}
            <span className="highlight-orange">We'll handle the tech</span>
          </>
        }
        description="QUORIXA Data Studio builds the pipelines, platforms, and visualizations that help your teams decide faster — and act with confidence."
        ctaLabel="Book a free consultation"
        visual={<DashboardVisual accent="orange" />}
      />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Solutions"
              title="Data capabilities that compound"
              description="Engineering, performance, visualization, and applied science — delivered as one coherent data practice."
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
          <div className={styles.split}>
            <Reveal>
              <SectionHeader
                label="Outcomes"
                title="What success looks like with QUORIXA Data Studio"
                description="We measure delivery by the decisions your teams can make — and how quickly they can make them."
              />
            </Reveal>
            <Reveal>
              <CheckList items={outcomes} columns={1} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <div className={styles.midCta}>
              <div>
                <h2 className={styles.midCtaTitle}>
                  Stuck with brittle pipelines or dashboards nobody trusts?
                </h2>
                <p className={styles.midCtaDesc}>
                  We'll assess your data stack, prioritize quick wins, and map
                  a path to a durable analytics foundation.
                </p>
              </div>
              <Button href="/contact" arrow>
                Talk to a data lead
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Our work"
              title="Data projects that changed how teams operate"
              description="From real-time risk signals to fleet telemetry — platforms built for clarity under pressure."
              align="center"
            />
          </Reveal>
          <div className={styles.caseGrid}>
            {dataCaseStudies.map((study) => (
              <Reveal key={study.id}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
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
                  Competitive advantages with{" "}
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
          <div className={styles.statsGrid3} style={{ marginTop: 28 }}>
            <StatCard value="3×" label="Faster reporting" />
            <StatCard value="99.9%" label="Pipeline uptime targets" />
            <StatCard value="30%" label="Cloud cost reductions" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="QUORIXA rebuilt our analytics backbone so finance and ops finally shared the same numbers. Reporting that took days now runs in minutes."
              author="Maya Chen"
              role="VP of Data"
              company="fintech platform"
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <ProcessSteps
              title="A DMAIC rhythm for data delivery"
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              imageAlt="Analytics dashboard collaboration"
              steps={[
                {
                  title: "Define",
                  description:
                    "Clarify decisions, stakeholders, and the data products that must exist for those decisions.",
                },
                {
                  title: "Measure",
                  description:
                    "Baseline quality, latency, and cost. Instrument sources and establish SLAs.",
                },
                {
                  title: "Analyze",
                  description:
                    "Find bottlenecks in pipelines, models, and consumption patterns that block trust.",
                },
                {
                  title: "Improve",
                  description:
                    "Ship durable pipelines, models, and dashboards with clear ownership and docs.",
                },
                {
                  title: "Control",
                  description:
                    "Monitor freshness, anomalies, and spend — with runbooks that keep the platform healthy.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Let's make your data work harder"
        description="Share your stack and goals — we'll outline a practical plan for pipelines, insights, and ML."
        ctaLabel="Book a consultation"
      />
    </>
  );
}
