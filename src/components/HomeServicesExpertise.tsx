import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  GitBranch,
  Globe2,
  Hexagon,
  Layers,
} from "lucide-react";
import { Reveal } from "./Reveal";
import tailored_expertise from "../assets/tailored_expertise-2.webp";
import styles from "./HomeServicesExpertise.module.css";

const studios = [
  {
    title: "AI Studio",
    description:
      "Drive the adoption of GenAI and ML from experiments to real-world use cases — at 2x the speed.",
    href: "/ai-ml",
    icon: Hexagon,
    color: "#5B35F5",
  },
  {
    title: "Data Studio",
    description:
      "Enable data-driven decision-making with predictive analytics and data visualization.",
    href: "/data-studio",
    icon: Globe2,
    color: "#1677FF",
  },
  {
    title: "Design Studio",
    description:
      "Grow UX/UI KPIs, such as conversions, by over 120% with our Lean UX model enhanced via AI mastery.",
    href: "/design-studio",
    icon: Layers,
    color: "#FF6500",
  },
  {
    title: "Quality Studio",
    description:
      "Speed up time-to-market and ensure healthy releases with agentic QA and testing solutions.",
    href: "/quality-assurance",
    icon: GitBranch,
    color: "#35B968",
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
    <section className={`section ${styles.section}`}>
      <div className="container">
        <Reveal>
          <div className={styles.intro}>
            <span className={styles.pill}>Services and expertise</span>
            <h2 className={styles.title}>
              Engineering solutions powered by GenAI and agentic development
            </h2>
            <p className={styles.desc}>
              Boost productivity, turn proofs of concept into market-ready
              products, and scale software using leading-edge architectures and
              technologies.
            </p>
            <Link to="/solutions" className={styles.growthLink}>
              See how we support your growth <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <Link to="/ai-ml" className={styles.featureCard}>
            <div className={styles.featureCopy}>
              <span className={styles.featureIcon}>
                <CalendarDays size={18} strokeWidth={2} />
              </span>
              <h3>AI-Driven Custom Software Development</h3>
              <p>
                Build in days what used to take months in areas like mobile, web
                UI, backend development, cloud, and DevOps.
              </p>
              <span className={styles.circleArrow} aria-hidden>
                <ArrowRight size={16} />
              </span>
            </div>
            <div className={styles.featureMedia}>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80"
                alt="Software dashboard"
              />
            </div>
          </Link>
        </Reveal>

        <div className={styles.studioGrid}>
          {studios.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} to={item.href} className={styles.studioCard}>
                <span
                  className={styles.studioIcon}
                  style={{ background: item.color }}
                >
                  <Icon size={24} color="#fff" strokeWidth={2} />
                </span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <span className={styles.circleArrow} aria-hidden>
                  <ArrowRight size={18} strokeWidth={2.2} />
                </span>
              </Link>
            );
          })}
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
