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
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { ProcessSteps } from "../../components/ProcessSteps";
import { caseStudies } from "../../data/caseStudies";
import styles from "./ServicePage.module.css";

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
    title: "AI strategy",
    description:
      "Identify high-ROI GenAI and ML opportunities aligned to your business outcomes.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
    items: ["Use-case discovery", "Roadmapping", "Risk & governance"],
  },
  {
    icon: Database,
    title: "Data engineering",
    description:
      "Build reliable data foundations so models train and serve on trustworthy signals.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
    items: ["Pipelines & lakes", "Feature stores", "MLOps readiness"],
  },
  {
    icon: BrainCircuit,
    title: "Model development",
    description:
      "Custom models and fine-tuned LLMs that solve domain-specific problems in production.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
    items: ["Training & eval", "Fine-tuning", "Deployment"],
  },
  {
    icon: Bot,
    title: "AI agents",
    description:
      "Autonomous and assisted agents that automate workflows across your product stack.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
    items: ["Tool use & RAG", "Orchestration", "Human-in-the-loop"],
  },
];

const techStack = [
  "AWS",
  "Azure",
  "GCP",
  "OpenAI",
  "Anthropic",
  "Hugging Face",
  "PyTorch",
];

const aiCaseStudies = caseStudies.filter((s) =>
  ["medflow", "finledger", "logix"].includes(s.id)
);

export function AIML() {
  return (
    <>
      <Hero
        title={
          <>
            Innovate with impact through custom{" "}
            <span className="highlight-orange">GenAI & ML</span> solutions
          </>
        }
        description="From strategy to production agents — QUORIXA designs, builds, and scales AI systems that deliver measurable business value with controlled risk."
        ctaLabel="Book a free consultation"
        visual={<DashboardVisual accent="purple" />}
      />

      <ClientLogoMarquee />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Capabilities"
              title="End-to-end AI services"
              description="A full delivery path — strategy, data, models, and agents — so your AI initiatives move from idea to production without handoff gaps."
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
                  Validate GenAI and ML ideas in weeks — with clear success
                  criteria, evaluation harnesses, and a path to production when
                  the PoC proves out.
                </p>
              </div>
            </Reveal>
            <div className={styles.statsGrid3}>
              <StatCard
                value="2–4 wks"
                label="PoC cycle"
                description="Focused spikes that prove feasibility before full investment."
              />
              <StatCard
                value="40%"
                label="Faster insights"
                description="Reusable eval kits and agent scaffolds cut experimentation time."
              />
              <StatCard
                value="0→1"
                label="Production path"
                description="Clear go/no-go criteria and a handover-ready architecture."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Stack"
              title="Built on the platforms teams already trust"
              description="Cloud, model providers, and frameworks chosen for reliability, cost control, and enterprise readiness."
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
              title="AI engagements that moved the needle"
              description="Selected projects where GenAI and ML changed how teams operate and customers experience the product."
              align="center"
            />
          </Reveal>
          <div className={styles.caseGrid}>
            {aiCaseStudies.map((study) => (
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
            <ProcessSteps
              title="How we deliver AI that sticks"
              image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
              imageAlt="AI engineering collaboration"
              steps={[
                {
                  title: "Discovery",
                  description:
                    "Map opportunities, data readiness, and constraints. Align on success metrics and risk boundaries.",
                },
                {
                  title: "PoC",
                  description:
                    "Build a thin vertical slice with evaluation harnesses. Prove value before scaling investment.",
                },
                {
                  title: "Implementation",
                  description:
                    "Hardening, observability, security, and integration into your product and ops workflows.",
                },
                {
                  title: "Support",
                  description:
                    "Continuous improvement, model monitoring, and iteration as usage and data evolve.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Ready to turn AI ambition into shipped impact?"
        description="Tell us about your use case — we'll recommend a focused PoC or a production-ready delivery plan."
        ctaLabel="Book a consultation"
      />
    </>
  );
}
