import {
  Boxes,
  Brush,
  Clapperboard,
  Compass,
  MousePointerClick,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { DesignCollageVisual } from "../../components/HeroVisuals";
import { SectionHeader } from "../../components/SectionHeader";
import { ServiceCard } from "../../components/ServiceCard";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { Testimonial } from "../../components/Testimonial";
import { AwardCards } from "../../components/AwardCards";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { ProcessSteps } from "../../components/ProcessSteps";
import { caseStudies } from "../../data/caseStudies";
import styles from "./ServicePage.module.css";

const designServices: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: Compass,
    title: "Product strategy",
    description:
      "Clarify problems, prioritize journeys, and align roadmap bets with measurable product outcomes.",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
  {
    icon: MousePointerClick,
    title: "Interaction design",
    description:
      "Flows, prototypes, and UI systems that feel effortless — and hold up under real usage.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Boxes,
    title: "Low-code",
    description:
      "Ship internal tools and MVPs fast with thoughtful UX on top of modern low-code platforms.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Brush,
    title: "Branding",
    description:
      "Visual identity, voice, and design systems that make your product unmistakable.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: Clapperboard,
    title: "Illustration & motion",
    description:
      "Motion language and illustration that add clarity, delight, and brand presence.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
];

const metrics = [
  { value: "40%", label: "Fewer design handoff defects" },
  { value: "2×", label: "Faster prototype cycles" },
  { value: "+28%", label: "Conversion lifts shipped" },
  { value: "100+", label: "Products designed end-to-end" },
];

const designCaseStudies = caseStudies.filter((s) =>
  ["retailpulse", "geotap", "medflow"].includes(s.id)
);

export function DesignStudio() {
  return (
    <>
      <Hero
        title={
          <>
            Design digital products that{" "}
            <span className="highlight-orange">stand out</span>
          </>
        }
        description="QUORIXA Design Studio pairs product strategy with craft — interfaces, systems, and motion that make complex products feel simple."
        ctaLabel="Book a free consultation"
        visual={<DesignCollageVisual />}
      />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Capabilities"
              title="Design services across the product lifecycle"
              description="From strategy workshops to production-ready systems — designers who partner closely with engineering."
            />
          </Reveal>
          <div className={styles.grid5}>
            {designServices.map((service) => (
              <Reveal key={service.title}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  iconBg={service.iconBg}
                  iconColor={service.iconColor}
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
              label="Impact"
              title="Design metrics that matter to product leaders"
              description="We track craft against outcomes — speed, clarity, and conversion — not vanity aesthetics."
              dark
              align="center"
            />
          </Reveal>
          <div className={styles.metricsRow}>
            {metrics.map((m) => (
              <Reveal key={m.label}>
                <div className={styles.metric}>
                  <div className={styles.metricValue}>{m.value}</div>
                  <div className={styles.metricLabel}>{m.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="The Design Studio team elevated our product language overnight. Prototypes were sharp, the system scaled, and engineering finally had specs they could trust."
              author="Elena Ruiz"
              role="Head of Product"
              company="retail platform"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              title="Recognition for products people love"
              description="Awards and rankings that reflect shipped quality — not slideware."
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
              title="Design that ships and scales"
              description="Selected engagements where UX systems and brand craft drove measurable product results."
              align="center"
            />
          </Reveal>
          <div className={styles.caseGrid}>
            {designCaseStudies.map((study) => (
              <Reveal key={study.id}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <ProcessSteps
              title="Our design process"
              image="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80"
              imageAlt="Product design workshop"
              steps={[
                {
                  title: "Discover",
                  description:
                    "Research users, constraints, and competitive context. Align on the problem worth solving.",
                },
                {
                  title: "Define",
                  description:
                    "Frame journeys, success metrics, and information architecture before pixels take over.",
                },
                {
                  title: "Design",
                  description:
                    "Iterate prototypes, visual systems, and motion — validated with stakeholders and users.",
                },
                {
                  title: "Deliver",
                  description:
                    "Hand off production-ready specs, tokens, and components that engineering can ship.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Let's design something people remember"
        description="Share your product goals — we'll assemble strategists, UX, and visual designers who ship."
        ctaLabel="Book a consultation"
      />
    </>
  );
}
