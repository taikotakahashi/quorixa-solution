import {
  Eye,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Star,
  Target,
  Users,
} from "lucide-react";
import hero1 from "../assets/about-aboutus/au-h-1-flat.webp";
import hero2 from "../assets/about-aboutus/au-h-2-flat.webp";
import hero3 from "../assets/about-aboutus/au-h-3-flat.webp";
import hero4 from "../assets/about-aboutus/au-h-4-flat.webp";
import { AboutHistorySlider } from "../components/AboutHistorySlider";
import { AwardCards } from "../components/AwardCards";
import { Button } from "../components/Button";
import { ClientLogoMarquee } from "../components/ClientLogoMarquee";
import { CTASection } from "../components/CTASection";
import { CurvedDivider } from "../components/CurvedDivider";
import { Reveal } from "../components/Reveal";
import { TeamMembers } from "../components/TeamMembers";
import { certifications } from "../data/content";
import { employeeTestimonials, teamMembers } from "../data/team";
import styles from "./About.module.css";

/** AE hero-section structure: ae-container (copy + gallery) then logo-slider sibling */
const heroImages = [hero1, hero2, hero3, hero4];

const impactStats = [
  {
    value: "12×",
    label: "Faster data processing",
    description:
      "Achieved for a SaaS optimizing energy use at Gap, Whirlpool, and Goodyear.",
  },
  {
    value: "700",
    label: "Microservices optimized",
    description:
      "For an IBM and Merck vendor, leading to 25% cloud cost savings.",
  },
  {
    value: "120%",
    label: "Higher conversions",
    description:
      "Driven by redesign of the web UX/UI of the world’s #1 stock content platform.",
  },
  {
    value: "12×",
    label: "Faster release cycles",
    description:
      "Ensured for a licensing solutions provider trusted by Disney, Epic Games, and Ubisoft.",
  },
];

const timeline = [
  {
    year: "2010",
    items: ["Founded as a product company loved by Symantec and Toyota"],
  },
  {
    year: "2013",
    items: ["Launch of software development services"],
  },
  {
    year: "2016",
    items: ["Argentina location launched", "Inc. 5000 listing"],
  },
  {
    year: "2017",
    items: [
      "DC CTO Club launched",
      "Named a top destination for software experts",
    ],
  },
  {
    year: "2018",
    items: [
      "Recognition as a top-3 software development firm in DC and the Bay Area",
    ],
  },
  {
    year: "2021",
    items: [
      "Design Studio, Data Studio, and Quality Studio launched",
      "Listing as a top-500 fastest-growing firm in the Americas",
    ],
  },
  {
    year: "2024",
    items: [
      "250 happy clients impacted by our expertise",
      "99% of clients feel confident recommending us to peers",
    ],
  },
  {
    year: "2025",
    items: [
      "2X higher perceived ROI compared to industry average as reported by clients",
    ],
  },
];

const principles = [
  {
    icon: Lightbulb,
    title: "Technical excellence",
    description:
      "You always get robust, scalable, elegant, and future-proof software built just in time.",
  },
  {
    icon: Target,
    title: "Ownership mentality",
    description:
      "We own the results of our work, adhere to best practices, and understand your unique needs and goals.",
  },
  {
    icon: HeartHandshake,
    title: "Client focus",
    description:
      "We build software that solves real-world challenges, creating new business opportunities and improving customer experiences.",
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
      "Talent and skills aren’t defined by race, gender, sexual orientation, age, health, or religion.",
  },
  {
    icon: Handshake,
    title: "Teamwork",
    description:
      "Every idea is welcome, every team member is important, and every contribution counts.",
  },
];

const partnerCards = [
  {
    id: "google-cloud",
    title: "Google Cloud Partner Advantage Program, service partner",
    description: "Service partner for cloud-native delivery and modernization.",
  },
  {
    id: "inc5000",
    title: "Fastest-growing companies in the US",
    description: "Recognized among the fastest-growing firms in the US.",
  },
  {
    id: "iso",
    title: "Certified information security, cybersecurity, and privacy protection",
    description: "Certified practices for cybersecurity and privacy protection.",
  },
  {
    id: "clutch",
    title: "Leader in custom software and application development",
    description: "Trusted for application development and dedicated teams.",
  },
  {
    id: "istqb",
    title: "ISTQB partner company, Gold level",
    description: "Quality engineering aligned to industry testing standards.",
  },
  {
    id: "aws",
    title: "Certified Solutions Architects and Cloud Practitioners",
    description: "AWS cloud architect expertise across delivery teams.",
  },
];

const employeeQuote = {
  quote:
    "Having been with QUORIXA for over 10 years, I continue to discover endless opportunities for growth and development. Over this time, QUORIXA has become more than just a workplace — it’s a place where I can find help, support others, and become better from day to day!",
  name: employeeTestimonials[0]?.name ?? "Ruslan Mihorianu",
  role: "Lead Product Studio Infrastructure Owner",
  location: employeeTestimonials[0]?.location ?? "",
  image: employeeTestimonials[0]?.image ?? "",
};

export function About() {
  return (
    <>
      {/* Mirrors AE: section.hero-section > .ae-container + .logo-slider */}
      <section className={`${styles.heroSection} grid-bg`}>
        <div className={styles.aeContainer}>
          <p className={styles.textBnt}>About us</p>
          <h1 className={styles.heroH1}>
            Our story: 15+ years of elevating digital products
          </h1>
          <p className={styles.preheader}>
            QUORIXA evolved from a proprietary software product into a provider
            of tailored engineering, AI, data, and design solutions fueling the
            growth of hundreds of companies.
          </p>

          <div className={styles.heroGallery}>
            {heroImages.map((src, index) => (
              <div key={src} className={styles.heroCard}>
                <img
                  src={src}
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <ClientLogoMarquee variant="hero" />
      </section>

      <CurvedDivider from="white" to="black" />
      <section className={`${styles.impactSection} section--dark`}>
        <div className="container">
          <div className={styles.impactLayout}>
            <Reveal>
              <h2 className={styles.impactTitle}>
                The{" "}
                <span className={styles.accentOrange}>
                  hottest VC startups and world-famous brands
                </span>{" "}
                report impressive growth thanks to our software expertise and
                solutions.
              </h2>
            </Reveal>
            <div className={styles.impactGrid}>
              {impactStats.map((stat) => (
                <article key={stat.label} className={styles.statCard}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <p className={styles.statDesc}>{stat.description}</p>
                </article>
              ))}
            </div>
          </div>

          <Reveal>
            <div className={styles.expertBar}>
              <h3 className={styles.expertBarTitle}>
                Drive measurable growth with custom software engineering and
                design solutions
              </h3>
              <Button href="/contact" arrow>
                Talk to an expert
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
      <CurvedDivider from="black" to="light" />

      <section className={`section section--light ${styles.timelineSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.timelineHeader}>
              <span className={styles.pill}>QUORIXA history</span>
              <h2 className={styles.timelineTitle}>
                How <span className={styles.accentOrange}>we got</span> here
              </h2>
            </div>
          </Reveal>
          <AboutHistorySlider items={timeline} />
        </div>
      </section>

      <section id="leadership" className={`section ${styles.teamSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.teamHeader}>
              <h2 className={styles.sectionTitleCentered}>Meet our team</h2>
              <p className={styles.teamLead}>
                Exceptional technology solutions are only possible with
                exceptional people. Learn more about our key experts.
              </p>
            </div>
          </Reveal>
          <TeamMembers members={teamMembers} />
          <div className={styles.centerCta}>
            <Button href="/leadership" variant="ghost" arrow>
              All the team
            </Button>
          </div>
        </div>
      </section>

      <CurvedDivider from="white" to="black" />
      <section
        id="recognition"
        className={`${styles.recognition} section--dark`}
      >
        <div className="container">
          <Reveal>
            <div className={styles.recognitionHeader}>
              <h2 className={styles.sectionTitleCenteredDark}>
                Recognition, certifications, and partnerships
              </h2>
              <p className={styles.recognitionLead}>
                The solutions you get with QUORIXA are secure, reliable, and up
                to the highest industry standards.
              </p>
            </div>
          </Reveal>

          <div className={styles.partnerGrid}>
            {partnerCards.map((card) => {
              const logo = certifications.find((c) => c.id === card.id);
              return (
                <Reveal key={card.title}>
                  <article className={styles.partnerCard}>
                    {logo ? (
                      <div className={styles.partnerLogo}>
                        <img src={logo.src} alt={logo.label} />
                      </div>
                    ) : (
                      <div className={styles.partnerLogoFallback} aria-hidden>
                        <Users size={22} />
                      </div>
                    )}
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className={styles.awardStrip}>
            <AwardCards showCertifications={false} />
          </div>
        </div>
      </section>
      <CurvedDivider from="black" to="white" />

      <section className={`section ${styles.principlesSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.principlesHeader}>
              <h2 className={styles.sectionTitleCentered}>
                The principles guiding us
              </h2>
              <p className={styles.principlesLead}>
                We continually improve our strategy and business practices while
                staying true to our core values.
              </p>
            </div>
          </Reveal>
          <div className={styles.principlesGrid}>
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <Reveal key={principle.title}>
                  <article className={styles.principleCard}>
                    <div className={styles.principleIcon} aria-hidden>
                      <Icon size={22} strokeWidth={2.2} />
                    </div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`section section--light ${styles.expertsSection}`}>
        <div className="container">
          <div className={styles.cultureGrid}>
            <Reveal>
              <article className={styles.cultureCopyCard}>
                <span className={styles.pill}>Culture and values</span>
                <h2 className={styles.cultureTitle}>
                  We engage top experts — and help them grow
                </h2>
                <p className={styles.cultureDesc}>
                  Technical, honest, enthusiastic, and innovative, our team
                  consistently gets stellar reviews and high rankings from
                  talented software experts.
                </p>
              </article>
            </Reveal>

            <Reveal>
              <aside className={styles.cultureRatingsCard}>
                <div className={styles.ratingBlock}>
                  <strong className={styles.ratingBrandGlass}>Glassdoor</strong>
                  <div className={styles.ratingScore}>
                    <span>4.6</span>
                    <span className={styles.stars} aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="#0caa41"
                          stroke="#0caa41"
                        />
                      ))}
                    </span>
                  </div>
                </div>
                <div className={styles.ratingDivider} aria-hidden />
                <div className={styles.ratingBlock}>
                  <strong className={styles.ratingBrandComp}>Comparably</strong>
                  <span className={styles.ratingSub}>Top company culture</span>
                </div>
              </aside>
            </Reveal>

            <Reveal>
              <blockquote className={styles.cultureQuoteCard}>
                <img
                  src={employeeQuote.image}
                  alt=""
                  className={styles.quoteAvatar}
                  loading="lazy"
                />
                <div>
                  <p className={styles.quoteText}>“{employeeQuote.quote}”</p>
                  <footer className={styles.quoteMeta}>
                    <strong>{employeeQuote.name}</strong>
                    <span>{employeeQuote.role}</span>
                  </footer>
                </div>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Talk to our experts about your software challenges and explore the solutions we can offer"
        description="Drive your growth with technology expertise that powers 250+ successful digital products."
        ctaLabel="Let’s get in touch"
        ctaHref="/contact"
        secondaryLabel="View our work"
        secondaryHref="/our-work"
      />
    </>
  );
}
