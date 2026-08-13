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
import { ClientLogoMarquee } from "../../components/ClientLogoMarquee";
import { SectionHeader } from "../../components/SectionHeader";
import { ServiceCard } from "../../components/ServiceCard";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { Testimonial } from "../../components/Testimonial";
import { AwardCards } from "../../components/AwardCards";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { CheckList } from "../../components/CheckList";
import { ProcessSteps } from "../../components/ProcessSteps";
import { Button } from "../../components/Button";
import { CurvedDivider } from "../../components/CurvedDivider";
import { caseStudies } from "../../data/caseStudies";
import styles from "./DesignStudio.module.css";

const designServices: {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: Compass,
    title: "Product strategy & research",
    description:
      "Align design with business goals, identify quick wins, and secure long-term growth with market and user research.",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
  {
    icon: MousePointerClick,
    title: "Interaction design",
    description:
      "Wow stakeholders with prototypes, accelerate iterations with wireframes, and guide engineering with ship-ready screens.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Boxes,
    title: "Low-code solutions",
    description:
      "Create PoCs, demos, and MVPs at warp speed — saving cost and freeing engineering for differentiated work.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Brush,
    title: "Branding",
    description:
      "Unify artifacts into a consistent system that amplifies your brand voice across digital channels.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: Clapperboard,
    title: "Illustration & motion",
    description:
      "Engaging visual and motion assets — from illustrations and animations to presentations and videos.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
];

const outcomesLeft = [
  "124% conversion growth after a client redesign",
  "200+ e-commerce sites impacted for a Fortune 500 brand",
  "20% higher revenue from first-time visitors via UX lifts",
];

const outcomesRight = [
  "2× customer-base growth supported through consultancy",
  "45% usability-score boost on a critical internal tool",
  "3.0 → 4.7 store ranking growth after an app redesign",
];

const metrics = [
  { value: "10+", label: "Years of UX/UI depth on dedicated product squads" },
  { value: "3×", label: "Higher ROI vs typical US agency models" },
  { value: "5★", label: "Average rating on B2B review platforms" },
  { value: "50%", label: "Development cost saved by cutting rework" },
];

const experts = [
  {
    name: "Sofia Alvarez",
    role: "Head of Design",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Amelia Chen",
    role: "Product Design Lead",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Marcus Reid",
    role: "Design Systems Lead",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
  },
];

const designCaseStudies = caseStudies.filter((s) =>
  ["retailpulse", "geotap", "medflow"].includes(s.id)
);

const studies =
  designCaseStudies.length >= 3 ? designCaseStudies : caseStudies.slice(0, 3);

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
        description="Captivate users, solve business challenges, and accelerate growth with highly effective, data-driven UI/UX design from QUORIXA Design Studio."
        ctaLabel="Book a free consultation"
        visual={<DesignCollageVisual />}
      />

      <ClientLogoMarquee />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Design services"
              title="Your design needs are covered"
              description="Solve UX/UI challenges end-to-end — from strategy to solutions that impact experiences in meaningful, measurable ways."
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
          <Reveal>
            <SectionHeader
              title="We design for impact and measurable growth"
              description="Outcomes our clients report after shipping with Design Studio."
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

      <CurvedDivider from="light" to="black" />

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Strategic advantage"
              title={
                <>
                  Turn design into a{" "}
                  <span className="highlight-orange">strategic advantage</span>
                </>
              }
              description="Senior craft, measurable ROI, and delivery discipline that reduces engineering rework."
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

      <CurvedDivider from="black" to="white" invert />

      <section className="section">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="For years QUORIXA has been a critical part of our team makeup — flexible, high-quality design and product capacity that keeps pace with an evolving roadmap."
              author="Elena Ruiz"
              role="Head of Product"
              company="enterprise information platform"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Awards and recognition"
              title="UX/UI expertise that gets you noticed"
              description="Headline-worthy products — top-listed by App Store features, Gartner, G2, Deloitte, and more."
              align="center"
            />
          </Reveal>
          <AwardCards />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className={styles.expertCta}>
              <div>
                <h2 className={styles.expertTitle}>
                  Talk to a Design Studio expert
                </h2>
                <p className={styles.expertDesc}>
                  Share your UX/UI challenges, explore collaboration strategies,
                  and meet the people who will own the craft.
                </p>
                <Button href="/contact" arrow>
                  Explore design solutions
                </Button>
              </div>
              <div className={styles.portraits}>
                {experts.map((person) => (
                  <article key={person.name} className={styles.portrait}>
                    <img
                      src={person.image}
                      alt={person.name}
                      loading="lazy"
                    />
                    <strong>{person.name}</strong>
                    <span>{person.role}</span>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Success stories"
              title="See our work in action"
              description="Agile, data-driven, and result-oriented — enabling companies to ship the best versions of their products."
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
            <ProcessSteps
              title="Our process for elevating your product"
              image="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80"
              imageAlt="Product design workshop"
              steps={[
                {
                  title: "Discovery",
                  description:
                    "Stakeholder and user interviews, system audit, market and competitive research to understand goals and challenges.",
                },
                {
                  title: "Design",
                  description:
                    "Ideate the solution, develop information architecture, and implement wireframes, flows, prototypes, and visual design.",
                },
                {
                  title: "Validation",
                  description:
                    "Usability testing, interviews, A/B tests, analytics, and surveys shape every UI/UX solution with data.",
                },
                {
                  title: "Delivery",
                  description:
                    "Design-system kits, source files, documentation, engineering consults, and post-launch support.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Have a design project in mind? Let's talk"
        description="Your UX/UI transformation is one conversation away — explore personalized strategies for elevating your product."
        ctaLabel="Book a consultation"
        secondaryLabel="View our work"
        secondaryHref="/our-work"
      />
    </>
  );
}
