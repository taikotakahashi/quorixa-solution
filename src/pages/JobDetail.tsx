import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "../components/Button";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { jobs } from "../data/team";
import styles from "./JobDetail.module.css";

export function JobDetail() {
  const { id } = useParams();
  const job = jobs.find((item) => item.id === id);

  if (!job) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h1>Position not found</h1>
          <p style={{ margin: "16px 0 28px" }}>
            This role may have closed or the link is outdated.
          </p>
          <Button href="/careers#positions" arrow>
            View open positions
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={`${styles.hero} grid-bg`}>
        <div className="container">
          <Link to="/careers#positions" className={styles.back}>
            <ArrowLeft size={16} /> All positions
          </Link>
          <Reveal>
            <div className={styles.badges}>
              <span>{job.department}</span>
              <span>{job.type}</span>
              <span>{job.level}</span>
            </div>
            <h1 className={styles.title}>{job.title}</h1>
            <p className={styles.location}>
              <MapPin size={16} /> {job.location}
            </p>
            <p className={styles.summary}>{job.summary}</p>
            <div className={styles.actions}>
              <Button href="/contact" arrow>
                Apply now
              </Button>
              <Button href="/careers#culture" variant="ghost" arrow>
                Why join us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <div>
            <h2>What you’ll do</h2>
            <ul className={styles.list}>
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2>What you’ll bring</h2>
            <ul className={styles.list}>
              {job.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside className={styles.aside}>
            <h3>Tech stack</h3>
            <div className={styles.tags}>
              {job.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className={styles.asideCard}>
              <strong>Ready to apply?</strong>
              <p>
                Send a short note about your experience — our talent team typically
                responds within a few business days.
              </p>
              <Button href="/contact" arrow>
                Start application
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <CTASection
        title="Build something meaningful with us"
        description="Bring your expertise, curiosity, and ambition."
        ctaLabel="View open positions"
        ctaHref="/careers#positions"
      />
    </>
  );
}
