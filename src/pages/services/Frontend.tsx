import {
  LayoutTemplate,
  Monitor,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../../components/Hero";
import { DesignCollageVisual } from "../../components/HeroVisuals";
import { CurvedDivider } from "../../components/CurvedDivider";
import { SectionHeader } from "../../components/SectionHeader";
import { CaseStudyCard } from "../../components/CaseStudyCard";
import { Testimonial } from "../../components/Testimonial";
import { CTASection } from "../../components/CTASection";
import { Reveal } from "../../components/Reveal";
import { Button } from "../../components/Button";
import { caseStudies } from "../../data/caseStudies";
import shared from "./ServicePage.module.css";
import styles from "./Frontend.module.css";

const skinDeep = [
  {
    value: "70%",
    description:
      "According to Google, 70% of web UIs take 7+ seconds to load above-the-fold content.",
  },
  {
    value: "1 sec",
    description:
      "A 1-second delay decreases user satisfaction by 16% and conversions by 7%.",
  },
  {
    value: "4–5",
    description:
      "A user tells 4–5 people about great UX — and complains to 8–20 about a terrible experience.",
  },
];

const impactCards = [
  {
    value: "76%",
    description: "Faster first meaningful render from UI modernization programs.",
  },
  {
    value: "10+",
    description: "Client engineering teams benefiting from microfrontend UI systems.",
  },
  {
    value: "2–4×",
    description: "Usability improvement from custom client-facing solutions.",
  },
  {
    value: "2×",
    description: "User base growth after FinTech UI revamps we delivered.",
  },
  {
    value: "64%",
    description: "Reduction of return rates traced to immersive try-on experiences.",
  },
  {
    value: "3 mo",
    description: "Typical timeline for MVPs, market-ready apps, or full UI revamps.",
  },
];

const advantages: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: LayoutTemplate,
    title: "Ready for heavy lifting",
    description:
      "From SPAs, PWAs, and custom data visualization to WYSIWYG builders and UI architecture — complex, strategic surfaces.",
  },
  {
    icon: Monitor,
    title: "Fortune-grade",
    description:
      "Fortune 500 enterprises and high-growth companies trust QUORIXA with flagship customer-facing solutions.",
  },
  {
    icon: Zap,
    title: "Blazing-fast",
    description:
      "MVPs, market-ready web apps, or full UI revamps — shipped in as little as three months when urgency matters.",
  },
];

const techLogos = [
  "TypeScript",
  "JavaScript",
  "React",
  "Vue.js",
  "Angular",
  "Next.js",
  "Nuxt.js",
  "Three.js",
  "Tailwind CSS",
  "Vite",
];

const studies = caseStudies
  .filter((s) => ["retailpulse", "geotap", "medflow"].includes(s.id))
  .concat(caseStudies)
  .filter((s, i, arr) => arr.findIndex((x) => x.id === s.id) === i)
  .slice(0, 3);

export function Frontend() {
  return (
    <>
      <Hero
        title={
          <>
            Front-end development and{" "}
            <span className="highlight-orange">web UI solutions</span>
          </>
        }
        description="Captivate users with sleek, fast, fluid UIs that adapt to any screen — powered by future-proof technology."
        ctaLabel="Book a free consultation"
        visual={<DesignCollageVisual />}
      />

      <CurvedDivider from="white" to="black" />

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Philosophy"
              title={
                <>
                  No UI is{" "}
                  <span className="highlight-orange">skin-deep</span>
                </>
              }
              description="UIs that generate business value never compromise on performance, design, and user experience."
              dark
              align="center"
            />
          </Reveal>
          <div className={styles.skinCards}>
            {skinDeep.map((item) => (
              <Reveal key={item.value}>
                <article className={styles.skinCard}>
                  <div className={styles.skinValue}>{item.value}</div>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="light" />

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Impact"
              title="Deliver impactful user-facing experiences"
              description="Tailored UI solutions yield impressive outcomes — modernizations, rearchitectures, and custom web apps that drive measurable growth."
            />
          </Reveal>
          <div className={styles.impactGrid}>
            {impactCards.map((item) => (
              <Reveal key={item.value + item.description}>
                <article className={styles.impactCard}>
                  <div className={styles.impactValue}>{item.value}</div>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <div className={styles.advantagesHead}>
              <span className="label">Why QUORIXA</span>
              <h2>
                Your UI solutions are in the{" "}
                <span className="highlight-orange">right hands</span>
              </h2>
              <p>
                From complex SPAs to design-system foundations — front-end
                engineers who blend craft with architecture.
              </p>
            </div>
          </Reveal>
          <div className={styles.partnerGrid}>
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title}>
                  <article className={styles.partnerCard}>
                    <div
                      className={shared.benefitIcon}
                      style={{ background: "#FFF0E6", color: "#FF6500" }}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Stack"
              title="Your UI development stack is covered"
              description="Framework depth with TypeScript discipline — matched to your roadmap, not a fashion cycle."
              align="center"
            />
          </Reveal>
          <Reveal>
            <div className={styles.techLogoGrid}>
              {techLogos.map((tech) => (
                <div key={tech} className={styles.techLogo}>
                  {tech}
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
              quote="Working alongside an in-house team, QUORIXA helped develop a new user interface for our platform. The launch landed on time, customer feedback was strongly positive, and their professionalism established a seamless process."
              author="Daniel Okoro"
              role="CTO"
              company="security software company"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <div className={styles.darkCta}>
              <div>
                <h2>
                  Explore our front-end expertise and find out how we can help
                  achieve your goals
                </h2>
                <p>
                  Need robust UI architectures, feature-rich SPAs, PWAs, or
                  industry-specific interfaces? Let&apos;s brainstorm.
                </p>
              </div>
              <Button href="/contact" arrow>
                Book a free consultation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Case studies"
              title="Success stories"
              description="See how companies enhance flagship web solutions, boost performance, and drive engagement with QUORIXA UI expertise."
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

      <CTASection
        title="Build custom UI solutions faster while boosting engineering efficiency"
        description="Share your UI goals — we'll assemble engineers who blend craft, systems thinking, and delivery speed."
        ctaLabel="Book a consultation"
        secondaryLabel="Explore design studio"
        secondaryHref="/design-studio"
      />
    </>
  );
}
