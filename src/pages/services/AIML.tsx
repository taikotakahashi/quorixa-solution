import { useState, type FormEvent } from "react";
import {
  Bot,
  BrainCircuit,
  Check,
  Database,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { ServiceHeroImage } from "../../components/ServiceHeroImage";
import aimlHero from "../../assets/services/aiml-hero.webp";
import { CaseStudyCarousel } from "../../components/CaseStudyCarousel";
import { Reveal } from "../../components/Reveal";
import { CurvedDivider } from "../../components/CurvedDivider";
import { Button } from "../../components/Button";
import { submitContactMessage } from "../../lib/submitContact";
import { caseStudies } from "../../data/caseStudies";
import { certifications } from "../../data/content";
import { techStackLogos } from "../../components/TechStackLogos";
import styles from "./AIML.module.css";

const aiServices: {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
}[] = [
  {
    icon: Lightbulb,
    title: "AI consultancy",
    description:
      "Translate human workflows and business rules into a structured AI transformation strategy.",
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
      "Tame chaotic data by turning unstructured information into actionable, business-ready insights.",
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
      "Predict outcomes, behaviors, and risks at scale by training highly precise machine learning models.",
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
    items: [
      "Hyper-personalized AI assistants",
      "CRM & ERP automation agents",
      "Policy and compliance monitoring",
    ],
  },
];

const prototypeCols = [
  {
    title: "AI POC in 2–8 weeks",
    body: "Validate ideas with high-quality AI prototypes and proofs of concepts built at warp speed.",
  },
  {
    title: "2X more cost-efficient",
    body: "Reduce engineering costs with remote teams and get 2X more value on your budget.",
  },
  {
    title: "Value from day 1",
    body: "Backed by discovery and architecture support, our experts deliver value from day one.",
  },
];

const stackAreas = [
  {
    title: "Generative AI",
    description:
      "Augment workflows and user experiences, automate the production of code, text, visuals, audio, and other assets, facilitate customer self-service, and analyze documents at massive scale.",
  },
  {
    title: "Predictive AI",
    description:
      "Streamline large-scale operations across business intelligence, marketing, risk management, supply chain, and manufacturing with accuracy, autonomy, and efficiency.",
  },
  {
    title: "Data science",
    description:
      "QUORIXA guides you through designing machine learning models and turning data into a core asset fueling your AI transformation.",
  },
  {
    title: "Data & AI/ML engineering",
    description:
      "From model training, hosting, and serving to custom applications — train, monitor, and enhance models, build pipelines, and run experiments end-to-end.",
  },
  {
    title: "MLOps & DevOps",
    description:
      "Shorten and enhance the AI/ML lifecycle by automating data/ML engineering, software development, and IT operations workflows.",
  },
];

const outcomesLeft = [
  "350+ million monthly users reached by AI-driven personalization platforms",
  "67 billion daily records processed by fraud detection on major trading platforms",
  "90% reduction in QA time via predictive maintenance for a Fortune automotive brand",
];

const outcomesRight = [
  "8 new languages added to a GenAI e-discovery tool for enterprise clients",
  "90%+ accuracy on traffic accident prevention — up to 48% insurance savings",
  "1M vaccines protected from discard with ML supply-chain solutions",
];

const supportCards = [
  {
    id: "google-cloud",
    title: "Google Cloud Partner Advantage Program, service partner",
  },
  {
    id: "iso",
    title: "Certified information security, cybersecurity, and privacy protection",
  },
  {
    id: "aws",
    title: "Certified Solutions Architects and Cloud Practitioners",
  },
  {
    id: "clutch",
    title: "Trusted delivery partner for enterprise AI programs",
  },
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

const serviceOptions = [
  "AI service",
  "Design solutions",
  "Dedicated team",
  "Development solutions",
  "QA solutions",
  "Data solutions",
  "Cybersecurity solutions",
  "Staff augmentation",
];

const aiCaseStudies = caseStudies.filter((s) =>
  ["medflow", "finledger", "logix", "geotap"].includes(s.id)
);
const studies =
  aiCaseStudies.length >= 3 ? aiCaseStudies.slice(0, 3) : caseStudies.slice(0, 3);

function certSrc(id: string) {
  return certifications.find((c) => c.id === id)?.src;
}

export function AIML() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    const result = await submitContactMessage({
      source: "AI/ML consultation form",
      firstName: String(data.get("firstName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      service: String(data.get("service") ?? "").trim(),
      message:
        String(data.get("message") ?? "").trim() || "AI/ML consultation request",
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    form.reset();
    setSubmitted(true);
  }

  return (
    <div className={styles.page}>
      <Hero
        title={
          <>
            Innovate with impact through custom GenAI &amp; ML solutions
          </>
        }
        description="86% of companies experiment with GenAI, yet only 21% see meaningful impact. Drive measurable growth with custom AI solutions and a highly efficient agile strategy — and leave your competition behind."
        ctaLabel="Get started today"
        visual={
          <ServiceHeroImage
            src={aimlHero}
            alt="AI Studio dashboard with GenAI and ML analytics"
          />
        }
      />

      {/* End-to-end services */}
      <section className={styles.sServices}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <div className={styles.centeredIntro}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden />
                Capabilities
              </p>
              <h2>End-to-end AI services: from strategy to deployed agents</h2>
              <p className={styles.introCopy}>
                AI creates value only when embedded into how your business
                actually runs. Accelerate your AI journey through scalable,
                IP-safe, and ROI-focused solutions that align your org, data,
                and engineering with your AI objectives.
              </p>
            </div>
          </Reveal>
          <div className={styles.serviceGrid}>
            {aiServices.map(({ icon: Icon, title, description, items }) => (
              <Reveal key={title} className={styles.serviceCell}>
                <article className={styles.serviceCard}>
                  <span className={styles.serviceIcon}>
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>
                        <Check size={14} strokeWidth={2.4} aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="light" to="black" />

      {/* Prototyping */}
      <section className={styles.sProto}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <div className={styles.protoHead}>
              <span className={styles.protoBadge} aria-hidden>
                <BrainCircuit size={22} strokeWidth={1.7} />
              </span>
              <h2>
                High-speed, low-risk
                <br />
                AI prototyping and development
              </h2>
              <p>
                Create AI prototypes and proofs of concepts with lower upfront
                investment, at 2X the speed of in-house development. We have the
                expertise to accelerate your path from AI experiments to
                successful products.
              </p>
            </div>
          </Reveal>
          <div className={styles.protoCols}>
            {prototypeCols.map((col) => (
              <Reveal key={col.title} className={styles.protoCol}>
                <h3>{col.title}</h3>
                <p>{col.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="white" />

      {/* Stack */}
      <section className={styles.sStack}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden />
              AI expertise
            </p>
            <h2 className={styles.stackTitle}>
              Your GenAI and ML stack is covered
            </h2>
          </Reveal>
          <div className={styles.techGrid} role="list">
            {techStackLogos.map(({ id, Logo }) => (
              <div key={id} className={styles.techItem} role="listitem">
                <Logo className={styles.techLogo} />
              </div>
            ))}
          </div>
          <div className={styles.stackAreas}>
            {stackAreas.map((area) => (
              <Reveal key={area.title}>
                <article className={styles.stackArea}>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <h3 className={styles.outcomesTitle}>
              Featured client outcomes and impact
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

      {/* Mid CTA */}
      <section className={styles.sMidCta}>
        <div className={`container-wide ${styles.midCtaInner}`}>
          <Reveal>
            <p className={styles.midCtaEyebrow}>
              Build future-proof AI products and enterprise solutions faster,
              while maximizing engineering ROI.
            </p>
            <h2>Accelerate your AI transformation</h2>
            <Button href="/contact" arrow>
              Book a consultation
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Case studies */}
      <section className={styles.sCases}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <div className={styles.centeredIntro}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden />
                Case studies
              </p>
              <h2>Our recent success stories</h2>
              <p className={styles.introCopy}>
                From optimizing Fortune 500 supply chains to predicting
                subscriber churn at massive scale — our AI playbook is about
                measurable impact.
              </p>
            </div>
          </Reveal>
          <CaseStudyCarousel studies={studies} fullWidth />
        </div>
      </section>

      <CurvedDivider from="light" to="black" />

      {/* Certified support */}
      <section className={styles.sSupport}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <div className={styles.centeredIntroDark}>
              <h2>Certified engineering support for your AI needs</h2>
              <p>
                Enable strategic AI adoption through custom-tailored cloud-native
                solutions that meet key industry standards.
              </p>
            </div>
          </Reveal>
          <div className={styles.supportGrid}>
            {supportCards.map((card) => (
              <Reveal key={card.title} className={styles.supportCell}>
                <article className={styles.supportCard}>
                  {certSrc(card.id) && (
                    <div className={styles.supportLogo}>
                      <img src={certSrc(card.id)} alt="" loading="lazy" />
                    </div>
                  )}
                  <h3>{card.title}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="light" />

      {/* Testimonial */}
      <section className={styles.sTestimonial}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <figure className={styles.testimonialInner}>
              <blockquote className={styles.quote}>
                &ldquo;QUORIXA helped us move from AI experiments to production
                systems with a level of engineering discipline we hadn&apos;t
                seen from external partners before.&rdquo;
              </blockquote>
              <figcaption>
                <div className={styles.caption}>Eric Schvimmer</div>
                <div className={styles.role}>
                  VP of Engineering, enterprise software platform
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <CurvedDivider from="light" to="black" />

      {/* Whitepaper CTA */}
      <section className={styles.sWhitepaper}>
        <div className={`container-wide ${styles.whitepaperInner}`}>
          <Reveal>
            <h2>
              Explore AI/ML management strategies in our whitepaper
            </h2>
            <Button href="/contact" arrow>
              Get started
            </Button>
          </Reveal>
        </div>
      </section>

      <CurvedDivider from="black" to="white" />

      {/* Process framework */}
      <section className={styles.sProcess}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <div className={styles.processIntro}>
              <h2>An agile framework for a reliable delivery</h2>
            </div>
          </Reveal>
          <div className={styles.processGrid}>
            {processCards.map((step, i) => (
              <Reveal key={step.title} className={styles.processCell}>
                <article className={styles.processCard}>
                  <span className={styles.processNum}>{i + 1}</span>
                  <span className={styles.processMeta}>{step.meta}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="white" to="black" />

      {/* Contact */}
      <section className={styles.sContact}>
        <div className={`container-wide ${styles.contactInner}`}>
          <Reveal>
            <h2>How can we help your business grow?</h2>
          </Reveal>
          <Reveal>
            {submitted ? (
              <div className={styles.thanks}>
                <h3>Thank you</h3>
                <p>
                  We&apos;ve received your message. A QUORIXA AI specialist will
                  follow up shortly.
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
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formRow}>
                  <label>
                    <span>First name*</span>
                    <input name="firstName" required placeholder="First name" />
                  </label>
                  <label>
                    <span>Last name*</span>
                    <input name="lastName" required placeholder="Last name" />
                  </label>
                </div>
                <div className={styles.formRow}>
                  <label>
                    <span>Email*</span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                    />
                  </label>
                  <label>
                    <span>Company name*</span>
                    <input name="company" required placeholder="Company name" />
                  </label>
                </div>
                <label>
                  <span>I&apos;m looking for*</span>
                  <select name="service" required defaultValue="">
                    <option value="" disabled>
                      Select your service
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>How can we help?</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your GenAI or ML goals…"
                  />
                </label>
                <p className={styles.consent}>
                  You agree to our friendly privacy policy.
                </p>
                {error && (
                  <p className={styles.error} role="alert">
                    {error}
                  </p>
                )}
                <Button type="submit" arrow disabled={submitting}>
                  {submitting ? "Sending…" : "Book a free consultation"}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

    </div>
  );
}
