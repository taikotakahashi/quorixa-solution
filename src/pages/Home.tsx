import { Check, FolderCode, Smile } from "lucide-react";
import { Hero } from "../components/Hero";
import { ClientLogoMarquee } from "../components/ClientLogoMarquee";
import { SectionHeader } from "../components/SectionHeader";
import { AwardCards } from "../components/AwardCards";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { CaseStudyCarousel } from "../components/CaseStudyCarousel";
import { TeamMembers } from "../components/TeamMembers";
import { TestimonialGrid } from "../components/TestimonialGrid";
import { HomeServicesExpertise } from "../components/HomeServicesExpertise";
import { HomeContactSection } from "../components/HomeContactSection";
import { HomeGlobalTalent } from "../components/HomeGlobalTalent";
import { caseStudies } from "../data/caseStudies";
import { teamMembers } from "../data/team";
import styles from "./Home.module.css";

const engineeringItems = [
  "Top-1% remote experts and dedicated teams",
  "Achieve 30–70% higher productivity thanks to AI augmentation",
  "Delivery based on your backlog",
  "Experts integrated into your team and process",
];

const solutionsItems = [
  "Software solutions to your business challenges",
  "Strategic AI use ensuring the high quality of generated assets",
  "End-to-end delivery of products and features",
  "Fully managed cross-functional team",
];

const testimonials = [
  {
    quote:
      "QUORIXA became an extension of our product org. The team shipped reliably and elevated our engineering standards.",
    author: "Jordan Hale",
    role: "CTO, enterprise SaaS",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
  },
  {
    quote:
      "They moved faster than our internal hiring loop without sacrificing quality. Communication stayed crisp every week.",
    author: "Priya Natarajan",
    role: "VP Product, FinTech",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80",
  },
  {
    quote:
      "Design and engineering worked as one unit. The release cadence and UX polish improved within the first quarter.",
    author: "Marcus Lee",
    role: "Head of Digital, Retail",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80",
  },
  {
    quote:
      "We needed AI features with real evaluation. QUORIXA delivered production systems, not demos.",
    author: "Elena Rossi",
    role: "Director of AI, Healthcare",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80",
  },
  {
    quote:
      "From discovery to launch, ownership was clear. Our stakeholders finally trusted the roadmap again.",
    author: "Daniel Brooks",
    role: "COO, Logistics",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
  },
];

export function Home() {
  return (
    <>
      <Hero
        layout="centered"
        withVideo
        title={
          <>
            AI-driven approach to{" "}
            <span className={styles.pillPurple}>building</span> products that
            people <span className={styles.pillGreen}>love</span>
          </>
        }
        description="We match you with vetted senior engineers and cross-functional teams to build, scale, and modernize digital products."
        ctaLabel="Tell us about your project"
        ctaHref="/contact"
      />

      <ClientLogoMarquee />

      <HomeServicesExpertise />

      <section className={`section grid-bg ${styles.helpSection}`}>
        <div className={`container-wide ${styles.helpContainer}`}>
          <Reveal>
            <div className={styles.helpIntro}>
              <span className={styles.helpPill}>Flexible engagement models</span>
              <h2>Your business needs are covered</h2>
              <p>
                Scale your engineering team with remote professionals or
                delegate product and feature delivery to QUORIXA
              </p>
            </div>
          </Reveal>

          <div className={styles.helpBox}>
            <div className={styles.helpCol}>
              <div className={styles.helpColHead}>
                <Smile
                  className={styles.helpColIcon}
                  size={28}
                  strokeWidth={1.7}
                  aria-hidden
                />
                <h3>Engineering teams</h3>
              </div>
              <ul className={styles.helpList}>
                {engineeringItems.map((item) => (
                  <li key={item}>
                    <Check
                      className={styles.helpCheck}
                      size={16}
                      strokeWidth={2.8}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.helpCol}>
              <div className={styles.helpColHead}>
                <FolderCode
                  className={styles.helpColIcon}
                  size={28}
                  strokeWidth={1.7}
                  aria-hidden
                />
                <h3>Software Solutions</h3>
              </div>
              <ul className={styles.helpList}>
                {solutionsItems.map((item) => (
                  <li key={item}>
                    <Check
                      className={styles.helpCheck}
                      size={16}
                      strokeWidth={2.8}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.centerCta}>
            <Button href="/solutions" arrow>
              Learn more
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <div className={styles.casesIntro}>
              <span className={styles.casesPill}>Case studies</span>
              <h2 className={styles.casesTitle}>
                <span className={styles.casesAccent}>Our clients win.</span>
                <br />
                You can, too.
              </h2>
              <p className={styles.casesDesc}>
                Discover how other business overcame industry challenges and
                achieved their goals by partnering with us
              </p>
            </div>
          </Reveal>
          <CaseStudyCarousel studies={caseStudies.slice(0, 5)} />
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <TestimonialGrid
            items={testimonials}
            featuredLabel="What our clients say about us"
            featuredImages={[
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&q=80",
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&h=160&fit=crop&q=80",
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&q=80",
            ]}
          />
        </div>
      </section>

      <section className={`section section--light ${styles.teamSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.teamIntro}>
              <span className={styles.teamPill}>Leadership & key experts</span>
              <h2>Meet our team</h2>
              <p>
                Exceptional technology solutions are only possible with
                exceptional people. Learn more about our key experts
              </p>
            </div>
          </Reveal>
          <TeamMembers members={teamMembers} />
          <div className={styles.centerCta}>
            <Button href="/about" variant="ghost" arrow>
              Get to know us
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className={styles.awardsIntro}>
              <span className={styles.proofPill}>Our proof of success</span>
              <SectionHeader
                title="Our work wins awards"
                description="We build products that win awards, land top spots on industry rankings, and get our clients noticed."
                align="center"
              />
            </div>
          </Reveal>
          <AwardCards fullWidth logoHeight={120} />
        </div>
      </section>

      <HomeGlobalTalent />

      <HomeContactSection />
    </>
  );
}
