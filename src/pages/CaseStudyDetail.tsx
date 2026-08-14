import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Boxes,
  Building2,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../components/Button";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { CTASection } from "../components/CTASection";
import { CurvedDivider } from "../components/CurvedDivider";
import { Reveal } from "../components/Reveal";
import { caseStudies } from "../data/caseStudies";
import {
  detailsById,
  fallbackDetail,
  type StudyDetail,
} from "../data/caseStudyDetails";
import styles from "./CaseStudyDetail.module.css";

const infoMeta: {
  key: "industries" | "services" | "solutions" | "technologies";
  label: string;
  icon: LucideIcon;
}[] = [
  { key: "industries", label: "Industries", icon: Building2 },
  { key: "services", label: "Services", icon: Layers },
  { key: "solutions", label: "Solutions", icon: Boxes },
  { key: "technologies", label: "Technologies", icon: Code2 },
];

function listValue(
  detail: StudyDetail,
  key: "industries" | "services" | "solutions" | "technologies",
): string {
  const value = detail[key];
  return Array.isArray(value) ? value.join(", ") : value;
}

export function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const study = caseStudies.find((item) => item.id === id);
  const [activeSection, setActiveSection] = useState("");

  const detail = study
    ? (detailsById[study.id] ?? fallbackDetail(study.industry))
    : null;

  useEffect(() => {
    if (!detail?.solutionAreas.length) return;
    setActiveSection(detail.solutionAreas[0].id);
  }, [detail]);

  useEffect(() => {
    if (!detail?.solutionAreas.length) return;

    const nodes = detail.solutionAreas
      .map((area) => document.getElementById(area.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [detail, study?.id]);

  if (!study || !detail) {
    return (
      <section className={`${styles.notFound} grid-bg`}>
        <div className="container">
          <h1>Case study not found</h1>
          <p>
            We couldn&apos;t find that engagement. Browse the full portfolio
            instead.
          </p>
          <Button href="/our-work" arrow>
            Back to our work
          </Button>
        </div>
      </section>
    );
  }

  const related = caseStudies
    .filter((item) => item.id !== study.id)
    .slice(0, 3);

  const heroTitle = detail.heroTitle ?? study.title;

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <h1 className={styles.title}>{heroTitle}</h1>
                <p className={styles.desc}>{detail.heroDescription}</p>
              </div>
              <div className={styles.heroImage}>
                <img src={study.image} alt="" loading="eager" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className="container">
          <Reveal>
            <div className={styles.infoGrid}>
              {infoMeta.map(({ key, label, icon: Icon }) => (
                <div key={key} className={styles.infoCell}>
                  <div className={styles.infoIcon} aria-hidden>
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3>{label}</h3>
                    <p>{listValue(detail, key)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {detail.callout ? (
        <section className={styles.calloutSection}>
          <div className="container">
            <Reveal>
              <div className={styles.callout}>
                <div className={styles.calloutIcon} aria-hidden>
                  <Sparkles size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h3>{detail.callout.title}</h3>
                  <p>{detail.callout.body}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <CurvedDivider from="white" to="black" />
      <section className={`${styles.outcomesSection} section--dark`}>
        <div className="container">
          <Reveal>
            <h2 className={styles.outcomesTitle}>
              <span className={styles.outcomesAccent}>Outcomes</span>{" "}
              <span>and highlights</span>
            </h2>
          </Reveal>
          <div
            className={
              detail.quote ? styles.outcomesLayout : styles.outcomesLayoutSolo
            }
          >
            <Reveal>
              <ul className={styles.outcomeList}>
                {detail.outcomes.map((item) => (
                  <li key={item}>
                    <CheckCircle2
                      size={20}
                      strokeWidth={2.2}
                      className={styles.outcomeCheck}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            {detail.quote ? (
              <Reveal>
                <blockquote className={styles.quote}>
                  <p>“{detail.quote.text}”</p>
                  <footer>
                    <strong>{detail.quote.author}</strong>
                    <span>{detail.quote.role}</span>
                  </footer>
                </blockquote>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>
      <CurvedDivider from="black" to="white" />

      <section className={styles.solutionsSection}>
        <div className="container">
          <Reveal>
            <h2 className={styles.solutionsHeading}>Solutions overview</h2>
          </Reveal>
          <div className={styles.solutionsLayout}>
            <nav className={styles.sideNav} aria-label="Solution areas">
              {detail.solutionAreas.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  className={`${styles.sideNavItem} ${
                    activeSection === area.id ? styles.sideNavActive : ""
                  }`}
                  onClick={() => scrollToSection(area.id)}
                >
                  {area.navLabel}
                </button>
              ))}
            </nav>
            <div className={styles.solutionsContent}>
              {detail.solutionAreas.map((area) => (
                <Reveal key={area.id}>
                  <article id={area.id} className={styles.solutionBlock}>
                    <h3>{area.title}</h3>
                    <p className={styles.solutionLead}>{area.description}</p>
                    <h4 className={styles.deliverablesLabel}>Key deliverables</h4>
                    <ul className={styles.deliverables}>
                      {area.deliverables.map((item) => (
                        <li key={item}>
                          <CheckCircle2
                            size={18}
                            strokeWidth={2.2}
                            className={styles.deliverableCheck}
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className={styles.techLabel}>Technologies</h4>
                    <p className={styles.techCopy}>{area.technologies}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`section section--light ${styles.relatedSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.relatedHeader}>
              <h2>See more success stories</h2>
              <Link to="/our-work" className={styles.relatedLink}>
                View all work
              </Link>
            </div>
          </Reveal>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Reveal key={item.id}>
                <CaseStudyCard study={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={detail.ctaTitle}
        description={detail.ctaDescription}
        ctaLabel="Book a free consultation"
        ctaHref="/contact"
        secondaryLabel="View all work"
        secondaryHref="/our-work"
      />
    </>
  );
}
