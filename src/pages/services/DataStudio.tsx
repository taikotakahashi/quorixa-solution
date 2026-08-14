import { Check, Star } from "lucide-react";
import { Hero } from "../../components/Hero";
import { ServiceHeroImage } from "../../components/ServiceHeroImage";
import dataHero from "../../assets/services/data-hero.webp";
import { CaseStudyCarousel } from "../../components/CaseStudyCarousel";
import { Reveal } from "../../components/Reveal";
import { Button } from "../../components/Button";
import { CurvedDivider } from "../../components/CurvedDivider";
import {
  IconAdvantage,
  IconDataEngineering,
  IconDataScience,
  IconPerformance,
  IconStepBlue,
  IconVisualization,
} from "../../components/DataStudioIcons";
import { caseStudies } from "../../data/caseStudies";
import styles from "./DataStudio.module.css";

const solutions = [
  {
    Icon: IconDataEngineering,
    title: "Data engineering",
    description:
      "Unify data for analysis and reporting with ETL pipelines, governance, quality checks, and monitoring.",
  },
  {
    Icon: IconPerformance,
    title: "Performance optimization",
    description:
      "Maximize efficiency and prevent degradation while achieving crystal-clear, trustworthy data.",
  },
  {
    Icon: IconVisualization,
    title: "Data visualization",
    description:
      "Gain actionable insight from complex data with reporting tailored to your team, processes, and goals.",
  },
  {
    Icon: IconDataScience,
    title: "Data science and ML",
    description:
      "Identify patterns, risks, and opportunities with domain-specific science and leading-edge ML.",
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

const advantages = [
  {
    title: "Top-1% talent",
    description:
      "Senior data engineers and scientists across the Americas, Europe, and Asia.",
  },
  {
    title: "Proven expertise",
    description:
      "99% of clients say they feel confident recommending QUORIXA to industry peers.",
  },
  {
    title: "Strategic support",
    description:
      "We've helped clients grow from PoCs to data products featured by analysts.",
  },
  {
    title: "High efficiency",
    description:
      "In-house quality and industry expertise at a fraction of fully in-house cost.",
  },
  {
    title: "Flexibility at scale",
    description:
      "The right capabilities at every growth stage — we handle the staffing details.",
  },
  {
    title: "Tailored approach",
    description:
      "No cookie-cutter tech — solutions adapt to your business, not the other way around.",
  },
];

const processSteps = [
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
];

const dataCaseStudies = caseStudies.filter((s) =>
  ["medflow", "finledger", "logix"].includes(s.id)
);
const studies =
  dataCaseStudies.length >= 3 ? dataCaseStudies : caseStudies.slice(0, 3);

export function DataStudio() {
  return (
    <div className={styles.page}>
      <Hero
        title="Turn data into action. We'll handle the tech"
        description="Tailored data engineering and business analytics — backed by scalable, secure, and future-proof software from QUORIXA Data Studio."
        ctaLabel="Ready to explore?"
        visual={
          <ServiceHeroImage
            src={dataHero}
            alt="Data Studio business analytics dashboard"
          />
        }
      />

      <section className={styles.sSolutions}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden />
              Solutions and deliverables
            </p>
            <h2 className={styles.sectionTitle}>
              Solutions for your data-driven growth
            </h2>
            <p className={styles.sectionDesc}>
              Engineering, performance, visualization, and applied science —
              delivered as one coherent data practice.
            </p>
          </Reveal>
          <div className={styles.serviceGrid}>
            {solutions.map(({ Icon, title, description }) => (
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
              Client outcomes that make us proud
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

      <section className={styles.sPhotoCta}>
        <div className={`container-wide ${styles.container}`}>
          <div className={styles.photoCta}>
            <Reveal className={styles.photoCtaCopy}>
              <span className={styles.photoLabel}>Let&apos;s talk</span>
              <h2>
                Want to <span className={styles.highlight}>10×</span> your data
                solutions?
              </h2>
              <p>
                We&apos;ll assess your stack, prioritize quick wins, and map a
                path to a durable analytics foundation your teams can trust.
              </p>
              <Button href="/contact" arrow>
                Get started
              </Button>
            </Reveal>
            <Reveal className={styles.photoWrap}>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80"
                alt="Data analytics collaboration"
                loading="lazy"
              />
            </Reveal>
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
                Case studies
              </p>
              <h2>Success stories written with data</h2>
              <p>
                From leading-edge data systems to ML analytics trusted by
                enterprise brands.
              </p>
            </div>
          </Reveal>
          <CaseStudyCarousel studies={studies} fullWidth />
        </div>
      </section>

      <CurvedDivider from="light" to="black" />

      <section className={styles.sAdvantages}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <div className={styles.sAdvantagesHead}>
              <h2>
                Your competitive advantages with{" "}
                <span className={styles.highlight}>Data Studio</span>
              </h2>
              <p>
                Enterprise rigor with product-team urgency — so data becomes a
                growth lever, not a backlog.
              </p>
            </div>
          </Reveal>
          <div className={styles.advantageGrid}>
            {advantages.map((item, i) => (
              <Reveal key={item.title} className={styles.advantageCell}>
                <article className={styles.advantageCard}>
                  <IconAdvantage kind={i} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className={styles.advantagesBottom}>
              <div>
                <h3>Ready to elevate your data capabilities?</h3>
                <p>
                  Share your stack and goals — we&apos;ll outline a practical
                  plan for pipelines, insights, and ML.
                </p>
              </div>
              <Button href="/contact" arrow>
                Book a consultation
              </Button>
            </div>
          </Reveal>
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
                &ldquo;QUORIXA stands out for the quality of their talent. They
                have a phenomenal process for ensuring they onboard the best of
                the best — and it shows in the data products they ship.&rdquo;
              </blockquote>
              <figcaption>
                <div className={styles.caption}>Maya Chen</div>
                <div className={styles.role}>VP of Data, IoT &amp; software platform</div>
              </figcaption>
            </figure>
          </Reveal>
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
                The right process for elevating your data
              </h2>
              <img
                className={styles.processImg}
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Analytics dashboard collaboration"
                loading="lazy"
              />
            </Reveal>
          </div>
          <div className={styles.steps}>
            {processSteps.map((step, i) => (
              <Reveal key={step.title}>
                <div className={styles.step}>
                  <IconStepBlue n={i + 1} />
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
            <h2>Let&apos;s explore what we can do for you</h2>
            <p>
              Share your stack and goals — we&apos;ll outline a practical plan
              for pipelines, insights, and ML.
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
