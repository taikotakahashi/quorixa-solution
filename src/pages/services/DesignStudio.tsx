import { Check, Star } from "lucide-react";
import { DesignStudioHero } from "../../components/DesignStudioHero";
import designHero from "../../assets/services/design-hero.webp";
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
  IconPenTip,
  IconStrategy,
} from "../../components/DesignStudioIcons";
import { caseStudies } from "../../data/caseStudies";
import { teamMembers } from "../../data/team";
import styles from "./DesignStudio.module.css";

const designServices = [
  {
    Icon: IconStrategy,
    title: "Product strategy & research",
    description:
      "Align design with business goals, identify quick wins, and secure long-term growth with strategic consultancy driven by market and user research.",
    span: "half" as const,
  },
  {
    Icon: IconInteraction,
    title: "Interaction design",
    description:
      "Wow investors with interactive prototypes, speed up product iterations with wireframes, and guide engineering with development-ready screens.",
    span: "half" as const,
  },
  {
    Icon: IconLowCode,
    title: "Low-code solutions",
    description:
      "Create PoCs, product demos, MVPs and other digital solutions at warp speed, while saving costs and freeing up your engineering resources.",
    span: "third" as const,
  },
  {
    Icon: IconBranding,
    title: "Branding",
    description:
      "Unify design efforts and artifacts into a comprehensive, consistent system, amplifying your brand voice across digital and offline channels.",
    span: "third" as const,
  },
  {
    Icon: IconMotion,
    title: "Illustration & motion graphics",
    description:
      "Impress customers and tell your brand's story with highly-engaging visual and motion assets ranging from illustrations and animations to presentations and videos.",
    span: "third" as const,
  },
];

const outcomesLeft = [
  "124% conversion growth report by a client after our redesign",
  "200+ e-commerce sites of a Fortune 500 company impacted by our design improvements",
  "20% higher revenue from first-time visitors generated for a client through our UX/UI solutions",
];

const outcomesRight = [
  "2X customer base growth supported through our strategic consultancy",
  "45% usability scores boost achieved thanks to our redesign of a client's internal tool",
  "3.0 to 4.7 Google Play Store ranking growth after our app redesign",
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
    image: teamMembers[2].image,
  },
  {
    name: "Amelia Chen",
    role: "Product Design Lead",
    image: teamMembers[0].image,
  },
  {
    name: "Marcus Reid",
    role: "Design Systems Lead",
    image: teamMembers[1].image,
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
      <DesignStudioHero imageSrc={designHero} />

      <section className={styles.sServices}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <p className={styles.eyebrow}>
              <IconPenTip />
              Design services
            </p>
          </Reveal>
          <Reveal>
            <div className={styles.servicesHead}>
              <h2 className={styles.sectionTitle}>
                Your design needs are covered
              </h2>
              <p className={styles.sectionDesc}>
                Solve UX/UI challenges end-to-end, from defining optimal design
                strategies to creating solutions that impact user experiences in
                meaningful, measurable ways
              </p>
            </div>
          </Reveal>
          <div className={styles.serviceGrid}>
            {designServices.map(({ Icon, title, description, span }) => (
              <Reveal
                key={title}
                className={`${styles.gridCell} ${
                  span === "half" ? styles.cellHalf : styles.cellThird
                }`}
              >
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
                  <Check size={16} strokeWidth={2.6} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ul>
              {outcomesRight.map((item) => (
                <li key={item}>
                  <Check size={16} strokeWidth={2.6} aria-hidden />
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
