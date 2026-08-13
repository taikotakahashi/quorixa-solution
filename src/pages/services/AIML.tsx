import { useState, type FormEvent } from "react";
import {
  Bot,
  BrainCircuit,
  Database,
  Lightbulb,
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
import { CurvedDivider } from "../../components/CurvedDivider";
import { Button } from "../../components/Button";
import { caseStudies } from "../../data/caseStudies";
import { certifications } from "../../data/content";
import styles from "./AIML.module.css";

const aiServices: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  items: string[];
}[] = [
  {
    icon: Lightbulb,
    title: "AI consultancy",
    description:
      "Translate workflows and business rules into a structured AI transformation strategy.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
    items: [
      "Business process discovery",
      "Digital maturity assessment",
      "ROI roadmap",
    ],
  },
  {
    icon: Database,
    title: "Data science",
    description:
      "Turn unstructured information into actionable, business-ready insights for models and products.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
    items: [
      "Data cleaning and structuring",
      "Legacy system integration",
      "Unstructured data processing",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Machine learning",
    description:
      "Predict outcomes, behaviors, and risks at scale with precise, production-ready models.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
    items: [
      "Predictive analytics",
      "Pattern recognition",
      "Algorithm training",
    ],
  },
  {
    icon: Bot,
    title: "GenAI automation",
    description:
      "Deploy virtual teammates by automating daily workflows with autonomous AI agents.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
    items: [
      "Hyper-personalized assistants",
      "CRM & ERP automation agents",
      "Policy and compliance monitoring",
    ],
  },
];

const stackAreas = [
  {
    title: "Generative AI",
    description:
      "Augment workflows, automate content production, and power assistants with RAG and multimodal models.",
  },
  {
    title: "Predictive AI",
    description:
      "Forecast risk, demand, and behavior across marketing, supply chain, manufacturing, and operations.",
  },
  {
    title: "Data science",
    description:
      "Advisory and hands-on support to design models and turn data into a core AI asset.",
  },
  {
    title: "Data & AI engineering",
    description:
      "Training, hosting, serving, pipelines, and applications that bring AI to customers and operators.",
  },
  {
    title: "MLOps & DevOps",
    description:
      "Shorten the AI lifecycle with automation for experiments, deployment, monitoring, and drift control.",
  },
];

const outcomesLeft = [
  "350M+ monthly users reached by AI-driven personalization platforms",
  "Fraud detection processing billions of daily trading records",
  "90% QA-time reduction via predictive maintenance programs",
];

const outcomesRight = [
  "GenAI e-discovery expanded to new languages and markets",
  "90%+ accuracy on accident-prevention models for fleets",
  "Supply-chain ML that protects high-value product inventory",
];

const processCards = [
  {
    title: "Discovery & feasibility",
    meta: "2–8 hours",
    description:
      "An AI implementation roadmap based on your challenge and goals, with duration and investment estimates.",
  },
  {
    title: "PoC & prototyping",
    meta: "4–8 weeks",
    description:
      "Cross-functional AI architects deliver a thin vertical slice with evaluation harnesses and clear go/no-go criteria.",
  },
  {
    title: "Implementation",
    meta: "2–9 months",
    description:
      "Accelerate deployment with observability, security, and transparent reporting on team performance.",
  },
  {
    title: "Support",
    meta: "On-demand",
    description:
      "Continuous testing and model adjustment so solutions stay aligned as data and markets evolve.",
  },
];

const aiCaseStudies = caseStudies.filter((s) =>
  ["medflow", "finledger", "logix"].includes(s.id)
);

const studies =
  aiCaseStudies.length >= 3 ? aiCaseStudies : caseStudies.slice(0, 3);

export function AIML() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Hero
        title={
          <>
            Innovate with impact through custom{" "}
            <span className="highlight-orange">GenAI &amp; ML</span> solutions
          </>
        }
        description="86% of companies experiment with GenAI, yet only 21% see meaningful impact. Drive measurable growth with custom AI solutions and an agile strategy that ships past the PoC."
        ctaLabel="Book a free consultation"
        visual={<DashboardVisual accent="purple" />}
      />

      <ClientLogoMarquee />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Capabilities"
              title="End-to-end AI services: from strategy to deployed agents"
              description="AI creates value when it is embedded in how your business runs. QUORIXA aligns org, data, and engineering around scalable, IP-safe, ROI-focused delivery."
            />
          </Reveal>
          <div className={styles.grid4}>
            {aiServices.map((service) => (
              <Reveal key={service.title}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  iconBg={service.iconBg}
                  iconColor={service.iconColor}
                  items={service.items}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="light" to="black" />

      <section className="section section--dark">
        <div className="container">
          <div className={styles.darkSplit}>
            <Reveal>
              <div>
                <span className="label">Prototype with confidence</span>
                <h2 className={styles.darkTitle}>
                  High-speed, low-risk{" "}
                  <span className="highlight-orange">AI prototyping</span>
                </h2>
                <p className={styles.darkCopy}>
                  Create AI prototypes and proofs of concept with lower upfront
                  investment — at roughly 2× the speed of typical in-house
                  experiments — with a clear path to production.
                </p>
              </div>
            </Reveal>
            <div className={styles.statsGrid3}>
              <Reveal>
                <StatCard
                  value="2–8 wks"
                  label="AI PoC cycle"
                  description="Validate ideas with high-quality prototypes built at warp speed."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="2×"
                  label="More cost-efficient"
                  description="Remote senior teams that stretch AI budgets further."
                />
              </Reveal>
              <Reveal>
                <StatCard
                  value="Day 1"
                  label="Value delivered"
                  description="Discovery and architecture support from the first engagement week."
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
            <SectionHeader
              label="Stack"
              title="Your GenAI and ML stack is covered"
              description="From generative and predictive AI to data science, engineering, and MLOps — specialists who own the full delivery path."
              align="center"
            />
          </Reveal>
          <div className={styles.stackGrid}>
            {stackAreas.map((area) => (
              <Reveal key={area.title}>
                <article className={styles.stackCard}>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <SectionHeader
              title="Featured client outcomes and impact"
              description="Measurable results across personalization, risk, operations, and enterprise GenAI."
              align="center"
            />
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
          <Reveal>
            <div className={styles.midCta}>
              <div>
                <h2 className={styles.midCtaTitle}>
                  Accelerate your AI transformation
                </h2>
                <p className={styles.midCtaDesc}>
                  Build future-proof AI products faster while maximizing
                  engineering ROI — with senior specialists ready to start.
                </p>
              </div>
              <Button href="/contact" arrow>
                Book a consultation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Case studies"
              title="Featured success stories"
              description="From Fortune 500 supply chains to subscriber churn at massive scale — AI playbooks measured by impact."
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

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Partners"
              title="Certified engineering support for your AI needs"
              description="Cloud-native delivery that meets the standards enterprise buyers expect."
              align="center"
            />
          </Reveal>
          <Reveal>
            <div className={styles.partners}>
              {certifications.map((item) => (
                <div key={item.id} className={styles.partnerBadge}>
                  <img src={item.src} alt={item.label} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="QUORIXA became a critical part of our development makeup — flexible, high-quality AI and engineering capacity that kept pace with an evolving product roadmap."
              author="Elena Voss"
              role="EVP of Technology"
              company="enterprise information platform"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Process"
              title="Strategic framework for AI solutions delivery"
              description="A clear path from feasibility to production support — with transparent timelines at every stage."
              align="center"
            />
          </Reveal>
          <div className={styles.processGrid}>
            {processCards.map((step, index) => (
              <Reveal key={step.title}>
                <article className={styles.processCard}>
                  <div className={styles.processNum}>{index + 1}</div>
                  <span className={styles.processMeta}>{step.meta}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={`container ${styles.contactLayout}`}>
          <Reveal>
            <div>
              <span className="label">Get in touch</span>
              <h2 className={styles.contactTitle}>
                Discuss your AI vision with{" "}
                <span className="highlight-orange">industry experts</span>
              </h2>
              <p className={styles.contactDesc}>
                Share your use case, data posture, and timeline. We&apos;ll
                recommend a focused PoC or a production-ready delivery plan.
              </p>
              <Button href="/our-work" variant="ghost" arrow>
                Explore AI case studies
              </Button>
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.thanks}>
                  <h2>Thank you</h2>
                  <p>
                    We&apos;ve received your message. A QUORIXA AI specialist
                    will follow up shortly.
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <h2 className={styles.formTitle}>Book a free consultation</h2>
                  <label className={styles.field}>
                    <span>Name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Company</span>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company name"
                    />
                  </label>
                  <label className={styles.field}>
                    <span>How can we help?</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell us about your GenAI or ML goals…"
                      required
                    />
                  </label>
                  <Button type="submit" arrow>
                    Book a free consultation
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Ready to turn AI ambition into shipped impact?"
        description="Prefer a quick call first? Our team will assemble the right specialists for your roadmap."
        ctaLabel="Talk to QUORIXA"
        secondaryLabel="View all services"
        secondaryHref="/solutions"
      />
    </>
  );
}
