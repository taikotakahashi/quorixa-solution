import {
  Compass,
  Handshake,
  Lightbulb,
  Shield,
  Target,
  Users,
} from "lucide-react";
import { AwardCards } from "../components/AwardCards";
import { Button } from "../components/Button";
import { ClientLogoMarquee } from "../components/ClientLogoMarquee";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { ServiceCard } from "../components/ServiceCard";
import { StatCard } from "../components/StatCard";
import { Testimonial } from "../components/Testimonial";
import { employeeTestimonials, teamMembers } from "../data/team";
import styles from "./About.module.css";

const timeline = [
  {
    year: "2012",
    title: "Founded",
    description:
      "QUORIXA began as a product engineering studio focused on shipping reliable software for ambitious founders.",
  },
  {
    year: "2016",
    title: "Global delivery",
    description:
      "Expanded into dedicated teams across Europe and the Americas, aligning specialists to client timezones.",
  },
  {
    year: "2020",
    title: "Studios model",
    description:
      "Launched AI, Data, Design, and Quality studios — deep practices under one delivery organization.",
  },
  {
    year: "2024",
    title: "Platform era",
    description:
      "Scaled AI-assisted engineering and enterprise partnerships while keeping senior ownership on every engagement.",
  },
];

const principles = [
  {
    icon: Target,
    title: "Outcomes over output",
    description:
      "We measure success by business impact — not ticket volume or hours billed.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Users,
    title: "Senior ownership",
    description:
      "Experienced engineers lead delivery, mentor teams, and stay accountable end to end.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Lightbulb,
    title: "Craft with curiosity",
    description:
      "We stay current on platforms and patterns so clients get durable, modern solutions.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
  {
    icon: Handshake,
    title: "Partnership mindset",
    description:
      "We integrate with your process, communicate clearly, and protect trust at every milestone.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: Shield,
    title: "Quality by default",
    description:
      "Testing, accessibility, and operational readiness are built in — not bolted on later.",
    iconBg: "#FFE8E6",
    iconColor: "#FF3B30",
  },
  {
    icon: Compass,
    title: "Clarity in complexity",
    description:
      "We simplify architecture and decisions so teams can move fast without losing control.",
    iconBg: "#F3E8FF",
    iconColor: "#4523D8",
  },
];

const employeeQuote = employeeTestimonials[0];

export function About() {
  return (
    <>
      <section className={`${styles.storyHero} grid-bg`}>
        <div className="container">
          <Reveal>
            <div className={styles.storyInner}>
              <span className="label">About QUORIXA</span>
              <h1 className={styles.storyTitle}>
                Our story: elevating digital products with{" "}
                <span className="highlight-orange">engineering excellence</span>
              </h1>
              <p className={styles.storyDesc}>
                We assemble dedicated specialists who treat your product like
                their own — shipping with rigor, empathy, and long-term
                technical judgment.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ClientLogoMarquee />

      <section className="section section--dark">
        <div className="container">
          <div className={styles.impactLayout}>
            <Reveal>
              <div>
                <span className="label">Impact</span>
                <h2 className={styles.impactTitle}>
                  Built for teams that need{" "}
                  <span className="highlight-orange">results</span>
                </h2>
                <p>
                  From early-stage products to enterprise platforms, QUORIXA
                  delivers senior engineering capacity with studio-level depth.
                </p>
              </div>
            </Reveal>
            <div className={styles.impactGrid}>
              <StatCard
                value="12+"
                label="Years"
                description="Shipping production software across industries."
              />
              <StatCard
                value="850+"
                label="Engineers"
                description="Specialists across product, data, AI, and QA."
              />
              <StatCard
                value="25+"
                label="Countries"
                description="Distributed talent collaborating as one team."
              />
              <StatCard
                value="95%"
                label="Retention"
                description="Long-term partnerships built on delivery trust."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Timeline"
              title="How we got here"
              description="A decade of refining how exceptional engineering teams partner with product organizations."
              align="center"
            />
          </Reveal>
          <ol className={styles.timeline}>
            {timeline.map((item, index) => (
              <Reveal key={item.year}>
                <li className={styles.timelineItem}>
                  <div className={styles.timelineMarker}>
                    <span className={styles.timelineYear}>{item.year}</span>
                    {index < timeline.length - 1 && (
                      <span className={styles.timelineLine} aria-hidden />
                    )}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
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
              label="Leadership"
              title="The people behind the work"
              description="Leaders and practitioners across engineering, design, AI, and delivery."
              align="center"
            />
          </Reveal>
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <Reveal key={member.name}>
                <article className={styles.teamCard}>
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                  />
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="recognition" className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Recognition"
              title="Awards that reflect delivery quality"
              description="Industry trust earned through products that perform in the real world."
              align="center"
              dark
            />
          </Reveal>
          <AwardCards />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Principles"
              title="How we work when it matters"
              description="Six commitments that shape every engagement — from discovery through production."
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
                  iconBg={principle.iconBg}
                  iconColor={principle.iconColor}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <Testimonial
              quote={employeeQuote.quote}
              author={employeeQuote.name}
              role={employeeQuote.role}
              company={employeeQuote.location}
              image={employeeQuote.image}
            />
          </Reveal>
          <div className={styles.centerCta}>
            <Button href="/careers" variant="ghost" arrow>
              Explore careers at QUORIXA
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Build with a team that cares about craft"
        description="Join engineers, designers, and delivery leaders shaping products that matter."
        ctaLabel="View open roles"
        ctaHref="/careers"
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
