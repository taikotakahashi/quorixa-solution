import { Button } from "../../components/Button";
import { ClientLogoMarquee } from "../../components/ClientLogoMarquee";
import { CurvedDivider } from "../../components/CurvedDivider";
import { Reveal } from "../../components/Reveal";
import {
  IconBackend,
  IconCheckCircle,
  IconClock,
  IconDataMl,
  IconDesign,
  IconFrontend,
  IconMobile,
  IconPerson,
  IconPuzzle,
  IconQa,
  IconScale,
  IconSearch,
  IconTeam,
} from "../../components/DedicatedTeamIcons";
import heroImg from "../../assets/dt/hero.webp";
import processImg from "../../assets/dt/img-1.webp";
import styles from "./DedicatedTeams.module.css";

const specialties = [
  {
    title: "Full-stack and backend development",
    tech: "Node.js | Java | .Net | Python | Go | Scala",
    Icon: IconBackend,
  },
  {
    title: "Front-end development",
    tech: "React.js | Angular | Vue.js | JavaScript",
    Icon: IconFrontend,
  },
  {
    title: "Mobile development",
    tech: "iOS | Android | React Native",
    Icon: IconMobile,
  },
  {
    title: "Quality assurance",
    tech: "TDD | BDD | Manual QA | Testing automation",
    Icon: IconQa,
  },
  {
    title: "Big data and machine learning",
    tech: "Data engineering | Performance optimization | Data visualization | Data science",
    Icon: IconDataMl,
  },
  {
    title: "UI / UX Design",
    tech: "Design strategy | User research | Interaction design | Visual & motion design | UX consultancy",
    Icon: IconDesign,
  },
];

const benefits = [
  {
    Icon: IconScale,
    text: "Easily scale development and design capabilities to match your project needs",
  },
  {
    Icon: IconPerson,
    text: "Ensure long-term commitment and retained product knowledge",
  },
  {
    Icon: IconClock,
    text: "Kick off new and iterate on existing projects faster",
  },
  {
    Icon: IconSearch,
    text: "Find niche technical and industry experts unavailable locally",
  },
  {
    Icon: IconTeam,
    text: "Add brainpower to your existing team at a fraction of the cost",
  },
  {
    Icon: IconPuzzle,
    text: "Free up your core team for more strategic tasks",
  },
];

const advantages = [
  {
    title: "Top-shelf talent pool",
    description:
      "QUORIXA engages top global professionals whose skills and ownership mentality match your best in-house experts.",
  },
  {
    title: "Robust security",
    description:
      "Information security practices aligned to ISO/IEC 27001 standards provide a solid foundation for the long-term success of your project.",
  },
  {
    title: "Industry expertise",
    description:
      "We pre-screen and select the best candidates to fit your industry challenges and business needs, not just your technology stack.",
  },
  {
    title: "Flexibility",
    description:
      "Scaling your dedicated team up and down or switching engagement models — with QUORIXA, you're always in control.",
  },
  {
    title: "Strategic support",
    description:
      "Our tech leads and delivery managers are always there for you to consult on optimal architecture decisions and process improvements.",
  },
];

const processSteps = [
  {
    title: "Discovery",
    description: "Align on your project goals, architecture, and milestones",
  },
  {
    title: "Team",
    description:
      "Define your team composition, roles, and ideal candidate profiles",
  },
  {
    title: "Pitching",
    description: "Pitch team spots to select engineers",
  },
  {
    title: "Selection",
    description: "Interview, shortlist, and engage your top candidates",
  },
  {
    title: "Delivery",
    description:
      "Once assembled, your team starts producing value via a transparent iterative process",
  },
];

export function DedicatedTeams() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={`container-wide ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1>Dedicated engineering &amp; design teams</h1>
            <p className={styles.heroDesc}>
              Thoroughly vetted, highly efficient, and custom-built for your
              unique challenge. Boost development velocity with high-impact
              agile teams aligned with your goals, process, and time zone.
            </p>
            <Button href="/contact" arrow>
              Book a free consultation
            </Button>
          </div>
          <div className={styles.heroImg}>
            <img src={heroImg} alt="Dedicated engineering team video call" />
          </div>
        </div>
        <ClientLogoMarquee variant="hero" />
      </section>

      <section className={styles.s1}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowIcon} aria-hidden />
              Services
            </p>
            <h2 className={styles.sectionTitle}>
              Our nearshore experts specialize in
            </h2>
          </Reveal>
          <div className={styles.cardGrid}>
            {specialties.map(({ title, tech, Icon }) => (
              <Reveal key={title} className={styles.gridCell}>
                <article className={styles.serviceCard}>
                  <Icon />
                  <h3>{title}</h3>
                  <p className={styles.techLine}>{tech}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="light" to="black" />

      <section className={styles.s2}>
        <div className={`container-wide ${styles.container}`}>
          <div className={styles.s2Top}>
            <Reveal className={styles.s2TitleWrap}>
              <h2 className={styles.s2Title}>
                Tech teams trusted by Fortune 500 firms and VC startups
              </h2>
            </Reveal>
            <div className={styles.stats}>
              <Reveal className={styles.statCell}>
                <div className={styles.stat}>
                  <h3>Access 850+</h3>
                  <p>experts located across 15 global talent hubs</p>
                </div>
              </Reveal>
              <Reveal className={styles.statCell}>
                <div className={styles.stat}>
                  <h3>Get up to 3x</h3>
                  <p>faster time-to-hire compared to industry average</p>
                </div>
              </Reveal>
              <Reveal className={styles.statCell}>
                <div className={styles.stat}>
                  <h3>Achieve up to 2x</h3>
                  <p>higher cost-efficiency compared to in-house rates</p>
                </div>
              </Reveal>
            </div>
          </div>
          <Reveal>
            <div className={styles.s2Bottom}>
              <div>
                <h3>
                  Consult our experts to start assembling your dedicated team
                </h3>
                <p>
                  Leverage QUORIXA to get access to top tech talent with greater
                  speed and efficiency.
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

      <section className={styles.s3}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <h2
              className={`${styles.sectionTitle} ${styles.sectionTitleCenter}`}
            >
              With our dedicated teams you can
            </h2>
          </Reveal>
          <div className={styles.cardGrid}>
            {benefits.map(({ Icon, text }) => (
              <Reveal key={text} className={styles.gridCell}>
                <article className={styles.outlineCard}>
                  <Icon />
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="light" to="black" />

      <section className={styles.s4}>
        <div className={`container-wide ${styles.container}`}>
          <Reveal>
            <div className={styles.s4Head}>
              <IconCheckCircle />
              <h2>Your strategic advantages with QUORIXA</h2>
            </div>
          </Reveal>
          <div className={styles.advantageGrid}>
            {advantages.map((item, i) => (
              <Reveal
                key={item.title}
                className={
                  i < 3 ? styles.advantageCell : styles.advantageCellWide
                }
              >
                <article className={styles.advantageCard}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="white" />

      <section className={styles.s5}>
        <div className={`container-wide ${styles.s5Inner}`}>
          <div className={styles.s5Left}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowIcon} aria-hidden />
              Process
            </p>
            <h2 className={styles.sectionTitle}>
              Assemble your expert team your way
            </h2>
            <img
              className={styles.processImg}
              src={processImg}
              alt="Team collaborating in the office"
              loading="lazy"
            />
          </div>
          <div className={styles.steps}>
            {processSteps.map((step, i) => (
              <div key={step.title} className={styles.step}>
                <span className={styles.stepBadge} aria-hidden>
                  {i + 1}
                </span>
                <p className={styles.stepBody}>
                  <span className={styles.stepName}>{step.title}</span>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.s6}>
        <div className={`container-wide ${styles.s6Inner}`}>
          <Reveal>
            <p className={styles.s6Eyebrow}>Your success is our key priority</p>
            <h2>
              Talk with our experts to see how companies in your industry grow
              with our dedicated teams.
            </h2>
            <Button href="/contact" arrow>
              Book a consultation
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
