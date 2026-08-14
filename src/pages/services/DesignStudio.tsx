import { Check, Star } from "lucide-react";
import { Hero } from "../../components/Hero";
import { DesignCollageVisual } from "../../components/HeroVisuals";
import { AwardCards } from "../../components/AwardCards";
import { CaseStudyCarousel } from "../../components/CaseStudyCarousel";
import { Reveal } from "../../components/Reveal";
import { Button } from "../../components/Button";
import { CurvedDivider } from "../../components/CurvedDivider";
import {
  IconBranding,
  IconDesignBadge,
  IconInteraction,
  IconLowCode,
  IconMotion,
  IconStrategy,
} from "../../components/DesignStudioIcons";
import { caseStudies } from "../../data/caseStudies";
import styles from "./DesignStudio.module.css";

const designServices = [
  {
    Icon: IconStrategy,
    title: "Product strategy & research",
    description:
      "Align design with business goals, identify quick wins, and secure long-term growth with market and user research.",
  },
  {
    Icon: IconInteraction,
    title: "Interaction design",
    description:
      "Wow stakeholders with prototypes, accelerate iterations with wireframes, and guide engineering with ship-ready screens.",
  },
  {
    Icon: IconLowCode,
    title: "Low-code solutions",
    description:
      "Create PoCs, demos, and MVPs at warp speed — saving cost and freeing engineering for differentiated work.",
  },
  {
    Icon: IconBranding,
    title: "Branding",
    description:
      "Unify artifacts into a consistent system that amplifies your brand voice across digital channels.",
  },
  {
    Icon: IconMotion,
    title: "Illustration & motion",
    description:
      "Engaging visual and motion assets — from illustrations and animations to presentations and videos.",
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

const advantageStatements: { text: string; pos: string }[] = [
  {
    text: "UX/UI design professionals with 10+ years of dedicated product experience",
    pos: "posTL",
  },
  {
    text: "5-star average rating on leading B2B review platforms",
    pos: "posBL",
  },
  {
    text: "3× higher ROI compared to typical US agency engagement models",
    pos: "posTR",
  },
  {
    text: "Up to 50% cost-saving on development by reducing rework",
    pos: "posBR",
  },
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

const processSteps = [
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
];

const designCaseStudies = caseStudies.filter((s) =>
  ["retailpulse", "geotap", "medflow"].includes(s.id)
);
const studies =
  designCaseStudies.length >= 3 ? designCaseStudies : caseStudies.slice(0, 3);

export function DesignStudio() {
  return (
    <div className={styles.page}>
      <Hero
        title="Design digital products that stand out"
        description="Captivate users, solve business challenges, and accelerate growth with highly effective, data-driven UI/UX design from QUORIXA Design Studio."
        ctaLabel="Schedule a Session"
        visual={<DesignCollageVisual />}
      />

      <section className={styles.sServices}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden />
              Design services
            </p>
            <h2 className={styles.sectionTitle}>
              Your design needs are covered
            </h2>
            <p className={styles.sectionDesc}>
              Solve UX/UI challenges end-to-end — from strategy to solutions
              that impact experiences in meaningful, measurable ways.
            </p>
          </Reveal>
          <div className={styles.serviceGrid}>
            {designServices.map(({ Icon, title, description }) => (
              <Reveal key={title} className={styles.gridCell}>
                <article className={styles.serviceCard}>
                  <Icon />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <h3 className={styles.outcomesTitle}>
              We design for impact and measurable growth
            </h3>
          </Reveal>
          <div className={styles.outcomes}>
            <ul>
              {outcomesLeft.map((item) => (
                <li key={item}>
                  <Check size={16} strokeWidth={2.4} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ul>
              {outcomesRight.map((item) => (
                <li key={item}>
                  <Check size={16} strokeWidth={2.4} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CurvedDivider from="light" to="black" />

      <section className={styles.sAdvantage}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <div className={styles.advantageHead}>
              <IconDesignBadge />
              <h2>
                Turn design into a
                <br />
                <span className={styles.highlight}>strategic advantage</span>
              </h2>
            </div>
          </Reveal>
          <div className={styles.advantageStage}>
            {advantageStatements.map(({ text, pos }) => (
              <Reveal key={text}>
                <article className={`${styles.advantageCard} ${styles[pos]}`}>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="light" />

      <section className={styles.sTestimonial}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <figure className={styles.testimonialInner}>
              <div className={styles.stars} aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="#F5C518" color="#F5C518" />
                ))}
              </div>
              <blockquote className={styles.quote}>
                &ldquo;For years QUORIXA has been a critical part of our team
                makeup — flexible, high-quality design and product capacity that
                keeps pace with an evolving roadmap.&rdquo;
              </blockquote>
              <figcaption>
                <div className={styles.caption}>Elena Ruiz</div>
                <div className={styles.role}>
                  Head of Product, enterprise information platform
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className={styles.sAwards}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <div className={styles.centeredIntro}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden />
                Awards and recognition
              </p>
              <h2>UX/UI expertise that gets you noticed</h2>
              <p>
                Headline-worthy products — top-listed by App Store features,
                Gartner, G2, Deloitte, and more.
              </p>
            </div>
          </Reveal>
          <AwardCards showCertifications={false} fullWidth logoHeight={120} />
        </div>
      </section>

      <CurvedDivider from="white" to="black" />

      <section className={styles.sExpert}>
        <div className={`container-wide ${styles.container}`}>
          <div className={styles.expertCta}>
            <Reveal className={styles.expertCopy}>
              <h2>Talk to a Design Studio expert</h2>
              <p>
                Share your UX/UI challenges, explore collaboration strategies,
                and meet the people who will own the craft.
              </p>
              <Button href="/contact" arrow>
                Explore design solutions
              </Button>
            </Reveal>
            <div className={styles.portraits}>
              {experts.map((person) => (
                <Reveal key={person.name} className={styles.portrait}>
                  <img src={person.image} alt={person.name} loading="lazy" />
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="light" />

      <section className={styles.sCases}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <div className={styles.centeredIntro}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden />
                Success stories
              </p>
              <h2>See our work in action</h2>
              <p>
                Agile, data-driven, and result-oriented — enabling companies to
                ship the best versions of their products.
              </p>
            </div>
          </Reveal>
          <CaseStudyCarousel studies={studies} fullWidth />
        </div>
      </section>

      <section className={styles.sProcess}>
        <div className={styles.processInner}>
          <div className={styles.processLeft}>
            <Reveal>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden />
                Process
              </p>
              <h2 className={styles.sectionTitle}>
                Our process for elevating your product
              </h2>
              <img
                className={styles.processImg}
                src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80"
                alt="Product design workshop"
                loading="lazy"
              />
            </Reveal>
          </div>
          <div className={styles.steps}>
            {processSteps.map((step, i) => (
              <Reveal key={step.title}>
                <div className={styles.step}>
                  <span className={styles.stepBadge} aria-hidden>
                    {i + 1}
                  </span>
                  <p className={styles.stepBody}>
                    <span className={styles.stepName}>{step.title}</span>
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sFooterCta}>
        <div className={styles.footerCtaInner}>
          <Reveal>
            <h2>Have a design project in mind? Let&apos;s talk</h2>
            <p>
              Your UX/UI transformation is one conversation away — explore
              personalized strategies for elevating your product.
            </p>
            <Button href="/contact" arrow>
              Book a consultation
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
