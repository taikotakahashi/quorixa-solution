import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import tailored_expertise from "../assets/tailored_expertise-2.webp";
import featureImg from "../assets/services/s1-img.webp";
import {
  IconAiStudio,
  IconCardArrow,
  IconCustomSoftware,
  IconDataStudio,
  IconDesignStudio,
  IconQualityStudio,
} from "./ServiceStudioIcons";
import styles from "./HomeServicesExpertise.module.css";

const studios = [
  {
    title: "AI Studio",
    description:
      "Drive the adoption of GenAI and ML from experiments to real-world use cases — at 2x the speed.",
    href: "/ai-ml",
    Icon: IconAiStudio,
  },
  {
    title: "Data Studio",
    description:
      "Enable data-driven decision-making with predictive analytics and data visualization.",
    href: "/data-studio",
    Icon: IconDataStudio,
  },
  {
    title: "Design Studio",
    description:
      "Grow UX/UI KPIs, such as conversions, by over 120% with our Lean UX model enhanced via AI mastery.",
    href: "/design-studio",
    Icon: IconDesignStudio,
  },
  {
    title: "Quality Studio",
    description:
      "Speed up time-to-market and ensure healthy releases with agentic QA and testing solutions.",
    href: "/quality-assurance",
    Icon: IconQualityStudio,
  },
];

const roiItems = [
  "Consulting on AI architectures and MVP/PoC development",
  "Dedicated experts monitoring and evaluating models like DeepSeek, GPT, Llama, and more",
  "High-speed agentic AI-driven prototyping with modern builder tools",
  "Engineering augmentation with tools like Cursor, driving 2–3× higher ROI with remote delivery",
];

export function HomeServicesExpertise() {
  return (
    <section className={styles.section}>
      <div className={`container-wide ${styles.container}`}>
        <Reveal>
          <div className={styles.intro}>
            <p className={styles.pill}>Services and expertise</p>
            <h2 className={styles.title}>
              Engineering solutions powered by GenAI and agentic development
            </h2>
            <p className={styles.desc}>
              Boost productivity, turn proofs of concept into market-ready
              products, and scale software using leading-edge architectures and
              technologies.
              <br />
              <br />
              <Link to="/solutions" className={styles.growthLink}>
                See how we support your growth
              </Link>
            </p>
          </div>
        </Reveal>

        <div className={styles.cards}>
          <Link to="/ai-ml" className={styles.featureCard}>
            <div className={styles.featureInner}>
              <div className={styles.featureCopy}>
                <IconCustomSoftware className={styles.drawIcon} />
                <h3>AI-Driven Custom Software Development</h3>
                <p>
                  Build in days what used to take months in areas like mobile,
                  web UI, backend development, cloud, and DevOps.
                </p>
              </div>
              <span className={styles.circleArrow} aria-hidden>
                <IconCardArrow />
              </span>
            </div>
            <img
              className={styles.featureImg}
              src={featureImg}
              alt="AI-driven software dashboard"
            />
          </Link>

          {studios.map(({ title, description, href, Icon }) => (
            <Link key={title} to={href} className={styles.studioCard}>
              <div className={styles.studioInner}>
                <div>
                  <Icon className={styles.drawIcon} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <span className={styles.circleArrow} aria-hidden>
                  <IconCardArrow />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Reveal>
          <div className={styles.roiBanner}>
            <div className={styles.roiCopy}>
              <h3>Drive AI ROI beyond vibe-coding</h3>
              <ul>
                {roiItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.roiVisual} aria-hidden="true">
              <img src={tailored_expertise} alt="" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
