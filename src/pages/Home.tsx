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
    quote: (
      <>
        QUORIXA delivers quality work, much of which can be attributed to their
        ability to supply such expert resources that fit well with the internal
        tech stack. They&apos;ve effectively become part of the internal team
        while providing a good ROI.{" "}
        <strong>Responsive and timely, they communicate seamlessly.</strong>
      </>
    ),
    author: "Chris Johnson",
    role: "CTO, Centriq",
  },
  {
    quote: (
      <>
        The past eight years, QUORIXA has been a critical part of our
        development team makeup that has provided us with flexibility and
        adjunct capabilities to meet our constantly evolving product roadmap
        with{" "}
        <strong>
          reliable, high-quality, globally sourced resources.
        </strong>
      </>
    ),
    author: "Eric Schvimmer",
    role: "EVP of Technology / CTO, Bloomberg Industry Group",
  },
  {
    quote: (
      <>
        QUORIXA built a quality product, overcoming communication challenges and
        several fluctuations in staff. Their{" "}
        <strong>
          CEO&apos;s strong leadership and desire to exceed expectations helps
          them stand out
        </strong>{" "}
        among other vendors, although clearly defining project ownership is
        recommended for future endeavors.
      </>
    ),
    author: "Doug Ramsey",
    role: "Former Director of Engineering, LivingSocial",
  },
  {
    quote: (
      <>
        <strong>QUORIXA&apos;s developers</strong> have adjusted well to the
        complex software they had little prior experience with. Still, they{" "}
        <strong>
          have performed to a level on par with the in-house developers.
        </strong>{" "}
        They have been eager to learn and contribute, becoming invested in the
        overall quality of the deliverables.
      </>
    ),
    author: "Kevin Heidorn",
    role: "COO, Yobi",
  },
  {
    quote: (
      <>
        Unlike other providers,{" "}
        <strong>
          QUORIXA offers a competitive price while still doing high-quality work
        </strong>
        . They focus on building a successful product and not just on getting
        paid, which fosters a positive working relationship. The team
        communicates well and is open to changes in project scope.
      </>
    ),
    author: "Igor Minin",
    role: "VP of Engineering, iControl",
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

      <section className={styles.casesSection}>
        <div className={`container-wide ${styles.casesContainer}`}>
          <Reveal>
            <div className={styles.casesIntro}>
              <p className={styles.casesPill}>Case studies</p>
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
          <CaseStudyCarousel studies={caseStudies} fullWidth />
        </div>
      </section>

      <section className={`section ${styles.testimonialsSection}`}>
        <div className={`container-wide ${styles.testimonialsContainer}`}>
          <TestimonialGrid
            items={testimonials}
            featuredLabel="What our clients say about us"
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
          <AwardCards fullWidth logoHeight={190} />
        </div>
      </section>

      <HomeGlobalTalent />

      <HomeContactSection />
    </>
  );
}
