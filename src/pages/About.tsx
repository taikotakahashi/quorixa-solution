import {
  Code2,
  Eye,
  Handshake,
  HeartHandshake,
  Target,
  Users,
} from "lucide-react";
import { AwardCards } from "../components/AwardCards";
import { Button } from "../components/Button";
import { ClientLogoMarquee } from "../components/ClientLogoMarquee";
import { CTASection } from "../components/CTASection";
import {
  DashboardVisual,
  MobileVisual,
} from "../components/HeroVisuals";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { ServiceCard } from "../components/ServiceCard";
import { StatCard } from "../components/StatCard";
import { TeamMembers } from "../components/TeamMembers";
import { Testimonial } from "../components/Testimonial";
import { employeeTestimonials, teamMembers } from "../data/team";
import { certifications } from "../data/content";
import styles from "./About.module.css";

const timeline = [
  {
    year: "2010",
    title: "Founded as a product studio",
    description:
      "QUORIXA began building proprietary software loved by ambitious product teams — laying the foundation for senior engineering craft.",
  },
  {
    year: "2014",
    title: "Dedicated teams take shape",
    description:
      "We launched software development services and expanded nearshore hubs so clients could embed specialists aligned to their timezone.",
  },
  {
    year: "2018",
    title: "Recognition & global scale",
    description:
      "Industry recognition accelerated as we grew delivery across the Americas and Europe — still keeping ownership close to every engagement.",
  },
  {
    year: "2024",
    title: "Studios for AI, data & quality",
    description:
      "AI Studio, Data Studio, and Quality Studio deepened our practice model — helping clients ship faster with measurable ROI.",
  },
];

const impactStats = [
  {
    value: "12×",
    label: "Faster data processing",
    description:
      "Achieved for a SaaS platform optimizing energy use across global retail brands.",
  },
  {
    value: "700+",
    label: "Microservices optimized",
    description:
      "For enterprise vendors — unlocking cloud cost savings and cleaner architecture.",
  },
  {
    value: "120%",
    label: "Higher conversions",
    description:
      "Driven by UX/UI redesign for a leading digital content platform.",
  },
  {
    value: "12×",
    label: "Faster release cycles",
    description:
      "Delivered for licensing platforms trusted by entertainment and gaming leaders.",
  },
];

const principles = [
  {
    icon: Code2,
    title: "Technical excellence",
    description:
      "You always get robust, scalable, elegant, and future-proof software built just in time.",
  },
  {
    icon: Target,
    title: "Ownership mentality",
    description:
      "We own the results of our work, adhere to best practices, and understand your unique goals.",
  },
  {
    icon: HeartHandshake,
    title: "Client focus",
    description:
      "We build software that solves real-world challenges and creates new business opportunities.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "You always get a clear, complete picture of our talent, workflows, and deliverables.",
  },
  {
    icon: Users,
    title: "Diversity",
    description:
      "Talent and skills aren't defined by race, gender, orientation, age, health, or religion.",
  },
  {
    icon: Handshake,
    title: "Teamwork",
    description:
      "Every idea is welcome, every team member is important, and every contribution counts.",
  },
];

const employeeQuote = employeeTestimonials[0];

const partnerCards = [
  {
    id: "google-cloud",
    title: "Google Cloud Partner Advantage",
    description: "Service partner for cloud-native delivery and modernization.",
  },
  {
    id: "inc5000",
    title: "Fastest-growing companies",
    description: "Recognized among the fastest-growing firms in the US.",
  },
  {
    id: "iso",
    title: "Information security certified",
    description: "Certified practices for cybersecurity and privacy protection.",
  },
  {
    id: "clutch",
    title: "Leader in custom software",
    description: "Trusted for application development and dedicated teams.",
  },
  {
    id: "istqb",
    title: "ISTQB partner company",
    description: "Quality engineering aligned to industry testing standards.",
  },
  {
    id: "aws",
    title: "Cloud architect expertise",
    description: "Certified Solutions Architects and Cloud Practitioners.",
  },
];

export function About() {
  return (
    <>
      <section className={`${styles.storyHero} grid-bg`}>
        <div className={`container ${styles.storyLayout}`}>
          <Reveal>
            <div className={styles.storyCopy}>
              <span className="label">About us</span>
              <h1 className={styles.storyTitle}>
                Our story: 15+ years of elevating{" "}
                <span className="highlight-orange">digital products</span>
              </h1>
              <p className={styles.storyDesc}>
                QUORIXA evolved from a proprietary software product into a
                provider of tailored engineering, AI, data, and design solutions
                fueling the growth of hundreds of companies.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.deviceStage} aria-hidden>
              <div className={styles.deviceDash}>
                <DashboardVisual accent="orange" />
              </div>
              <div className={styles.devicePhones}>
                <MobileVisual />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ClientLogoMarquee />

      <section className={`section section--dark ${styles.impactSection}`}>
        <div className="container">
          <div className={styles.impactLayout}>
            <Reveal>
              <div>
                <h2 className={styles.impactTitle}>
                  The hottest VC startups and world-famous brands report
                  impressive growth thanks to our{" "}
                  <span className="highlight-orange">
                    software expertise and solutions
                  </span>
                </h2>
              </div>
            </Reveal>
            <div className={styles.impactGrid}>
              {impactStats.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  description={stat.description}
                  variant="bordered"
                />
              ))}
            </div>
          </div>

          <Reveal>
            <div className={styles.purpleBar}>
              <div>
                <h3 className={styles.purpleTitle}>
                  Drive measurable growth with custom software engineering and
                  design solutions
                </h3>
              </div>
              <Button href="/contact" variant="outline" arrow>
                Book a consultation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="QUORIXA history"
              title="How we got here"
              description="A decade-plus of refining how exceptional engineering teams partner with product organizations."
              align="center"
            />
          </Reveal>
          <ol className={styles.timeline}>
            {timeline.map((item, index) => (
              <Reveal key={item.year}>
                <li className={styles.timelineItem}>
                  <div className={styles.timelineCard}>
                    <span className={styles.timelineYear}>{item.year}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  {index < timeline.length - 1 && (
                    <span className={styles.timelineConnector} aria-hidden />
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="leadership" className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Leadership & key experts"
              title="Meet our team"
              description="Exceptional technology solutions are only possible with exceptional people."
              align="center"
            />
          </Reveal>
          <TeamMembers members={teamMembers} />
          <div className={styles.centerCta}>
            <Button href="/careers" variant="ghost" arrow>
              Explore careers at QUORIXA
            </Button>
          </div>
        </div>
      </section>

      <section id="recognition" className={`section section--dark ${styles.recognition}`}>
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Get to know us"
              title="Recognition, certifications, and partnerships"
              description="The solutions you get with QUORIXA are secure, reliable, and up to the highest industry standards."
              align="center"
              dark
            />
          </Reveal>

          <div className={styles.partnerGrid}>
            {partnerCards.map((card) => {
              const logo = certifications.find((c) => c.id === card.id);
              return (
              <Reveal key={card.title}>
                <article className={styles.partnerCard}>
                  {logo ? (
                    <img
                      src={logo.src}
                      alt={logo.label}
                      className={styles.partnerMark}
                    />
                  ) : null}
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              </Reveal>
              );
            })}          </div>

          <div className={styles.awardStrip}>
            <AwardCards showCertifications={false} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Culture and values"
              title="The principles guiding us"
              description="We continually improve our strategy and business practices while staying true to our core values."
              align="center"
            />
          </Reveal>
          <div className={styles.principlesGrid}>
            {principles.map((principle) => (
              <Reveal key={principle.title}>
                <ServiceCard
                  icon={principle.icon}
                  title={principle.title}
                  description={principle.description}
                  iconBg="#FFF0E6"
                  iconColor="#FF6500"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className={`container ${styles.expertLayout}`}>
          <Reveal>
            <div>
              <SectionHeader
                label="Culture and values"
                title="We engage top experts — and help them grow"
                description="Technical, honest, enthusiastic, and innovative — our team consistently earns stellar reviews from talented software experts."
              />
              <div className={styles.expertActions}>
                <Button href="/careers" arrow>
                  View open roles
                </Button>
                <Button href="/contact" variant="ghost" arrow>
                  Talk to us
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <Testimonial
              quote={employeeQuote.quote}
              author={employeeQuote.name}
              role={employeeQuote.role}
              company={employeeQuote.location}
              image={employeeQuote.image}
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Talk to our experts about your software challenges and explore the solutions we can offer"
        description="Drive your growth with technology expertise that powers successful digital products."
        ctaLabel="Let's get in touch"
        ctaHref="/contact"
        secondaryLabel="View our work"
        secondaryHref="/our-work"
      />
    </>
  );
}
