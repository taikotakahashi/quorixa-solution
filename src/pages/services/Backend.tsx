import { useState } from "react";
import {
  Cloud,
  Code2,
  Layers,
  Network,
  RefreshCw,
  Rocket,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { ServiceHeroImage } from "../../components/ServiceHeroImage";
import backendHero from "../../assets/services/backend-hero.webp";
import { CurvedDivider } from "../../components/CurvedDivider";
import { SectionHeader } from "../../components/SectionHeader";
import { ServiceCard } from "../../components/ServiceCard";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { Testimonial } from "../../components/Testimonial";
import { AwardCards } from "../../components/AwardCards";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { CheckList } from "../../components/CheckList";
import { Button } from "../../components/Button";
import { caseStudies } from "../../data/caseStudies";
import shared from "./ServicePage.module.css";
import styles from "./Backend.module.css";

const techStack = [
  "Node.js",
  "Python",
  "Java",
  "Go",
  ".NET",
  "PostgreSQL",
  "Kafka",
  "Redis",
  "AWS",
  "Kubernetes",
];

const solutions: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: Network,
    title: "Architecture",
    description:
      "Design optimal architectures — or re-architect existing systems to match shifting business priorities.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Code2,
    title: "Web development",
    description:
      "Robust server-side logic and thoroughly tested code delivered on time, within budget, and to industry best practices.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Cloud,
    title: "Modernization",
    description:
      "Cloud and hybrid architectures, microservices, and leading-edge approaches that keep systems scalable and expandable.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: RefreshCw,
    title: "Optimization",
    description:
      "Tackle technical debt, troubleshoot bottlenecks, and raise performance while lowering engineering costs.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
];

const differenceItems = [
  "70% AWS cost savings through cloud systems optimization",
  "10× faster system speed for high-traffic search platforms",
  "1.5 months to fully build APIs serving massive audiences",
  "8× faster loading for Fortune 100 productivity apps",
  "$3M protected through uptime during peak traffic events",
  "100% feature parity after product re-architecture",
];

const expertiseAreas: {
  id: string;
  title: string;
  description: string;
  items: string[];
}[] = [
  {
    id: "api",
    title: "API and integrations",
    description:
      "Build and use RESTful and event-driven APIs to expand digital products through third-party components and services.",
    items: ["REST & GraphQL", "Auth & rate limits", "Webhook systems", "SDK design"],
  },
  {
    id: "apps",
    title: "Application development",
    description:
      "Reliable backend systems that deliver smooth performance at any scale across web, mobile, desktop, and beyond.",
    items: ["Domain services", "Transactional cores", "Background jobs", "Observability"],
  },
  {
    id: "data",
    title: "Database development",
    description:
      "Right-sized database architecture for your growth and product type — with ongoing platform support.",
    items: ["PostgreSQL", "Redis", "Streaming", "Search indexes"],
  },
  {
    id: "micro",
    title: "Microservices",
    description:
      "Decouple monoliths into independent services — or start greenfield with clear boundaries and resilient messaging.",
    items: ["Service boundaries", "Event buses", "Saga patterns", "Deploy independence"],
  },
  {
    id: "cloud",
    title: "Cloud solutions",
    description:
      "Cloud-native apps, hybrid and multicloud systems, and cost controls that prevent vendor lock-in.",
    items: ["IaC", "Autoscaling", "Cost governance", "Security baselines"],
  },
  {
    id: "devops",
    title: "DevOps and DevSecOps",
    description:
      "Improve cadence, release health, and control — making engineering more secure, transparent, and efficient.",
    items: ["CI/CD", "Secrets hygiene", "SLOs", "On-call readiness"],
  },
];

const outcomes = [
  {
    icon: Rocket,
    value: "Day-one readiness",
    description:
      "Architects with deep commercial experience guiding kickoff, discovery, and key technology decisions.",
  },
  {
    icon: Shield,
    value: "Industry depth",
    description:
      "Leading companies across 15+ industries rely on QUORIXA backend skills for flagship products.",
  },
  {
    icon: Zap,
    value: "Lightning delivery",
    description:
      "Clients report dramatically faster solution delivery when engaging our senior backend specialists.",
  },
];

const studies = caseStudies
  .filter((s) => ["logix", "finledger", "securegate"].includes(s.id))
  .concat(caseStudies)
  .filter((s, i, arr) => arr.findIndex((x) => x.id === s.id) === i)
  .slice(0, 3);

export function Backend() {
  const [activeTab, setActiveTab] = useState(expertiseAreas[0].id);
  const active = expertiseAreas.find((a) => a.id === activeTab) ?? expertiseAreas[0];

  return (
    <>
      <Hero
        title={
          <>
            Backend{" "}
            <span className="highlight-orange">development services</span>
          </>
        }
        description="Performant solutions, reliable architectures, impeccable code — a strong technology foundation for your digital products."
        ctaLabel="Book a free consultation"
        visual={
          <ServiceHeroImage
            src={backendHero}
            alt="Backend engineering code editor on a tablet"
          />
        }
      />

      <section className="section section--light">
        <div className="container">
          <div className={styles.servicesBlock}>
            <Reveal>
              <SectionHeader
                label="Key services"
                title="End-to-end backend and full-stack engineering solutions"
                description="From greenfield platforms to modernization programs — specialists who own architecture, delivery, and operational excellence."
              />
            </Reveal>

            <Reveal>
              <div className={styles.techIcons}>
                {techStack.map((tech) => (
                  <span key={tech}>
                    <Layers size={14} strokeWidth={2} />
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className={shared.grid4}>
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

            <div className={shared.split}>
              <Reveal>
                <SectionHeader
                  title="Here's how our work makes a difference"
                  description="Outcomes clients measure — cost, speed, reliability, and feature parity after real production pressure."
                />
              </Reveal>
              <Reveal>
                <div className={styles.outcomesList}>
                  <CheckList items={differenceItems} columns={1} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Expertise"
              title="Featured areas of expertise"
              description="Explore the backend domains we deliver with depth — from APIs and data to cloud and DevSecOps."
              align="center"
            />
          </Reveal>
          <Reveal>
            <div className={styles.tabRow} role="tablist" aria-label="Backend expertise areas">
              {expertiseAreas.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === area.id}
                  className={`${styles.tab} ${activeTab === area.id ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab(area.id)}
                >
                  {area.title}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.tabPanel} role="tabpanel">
              <div>
                <h3>{active.title}</h3>
                <p>{active.description}</p>
              </div>
              <CheckList items={active.items} columns={2} />
            </div>
          </Reveal>
        </div>
      </section>

      <CurvedDivider from="white" to="black" />

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
          <div className={styles.outcomesGrid}>
            {outcomes.map((item) => (
              <Reveal key={item.value}>
                <article className={styles.outcomeCard}>
                  <div className={styles.outcomeValue}>{item.value}</div>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className={styles.ctaBar}>
              <div>
                <h3>
                  Performance is critical to{" "}
                  <span className="highlight-orange">product success</span>
                </h3>
                <p>
                  A one-second delay correlates with a 7% drop in conversions.
                  Boost growth KPIs with custom backend solutions built for
                  load and clarity.
                </p>
              </div>
              <Button href="/contact" arrow>
                Talk to a backend lead
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="QUORIXA delivers quality work — much of which comes from expert resources that fit our internal tech stack. They've effectively become part of the internal team while providing strong ROI. Responsive, timely, and seamless communication."
              author="Priya Nair"
              role="COO"
              company="e-commerce and retail platform"
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Success stories"
              title="Backend and full-stack development"
              description="From ML-driven analytics to omnichannel platforms — clients trust QUORIXA with flagship products."
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

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              title="Award-winning engineering expertise"
              description="Stand out by building headline-making products — just like our clients do."
              align="center"
            />
          </Reveal>
          <AwardCards />
        </div>
      </section>

      <CTASection
        title="Engage top-1% backend and full-stack development experts"
        description="Add remote backend developers, engage a dedicated team, or get solutions delivered end-to-end."
        ctaLabel="Book a consultation"
        secondaryLabel="Explore dedicated teams"
        secondaryHref="/dedicated-teams"
      />
    </>
  );
}
