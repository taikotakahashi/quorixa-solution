import { useMemo, useState } from "react";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { caseStudies } from "../data/caseStudies";
import styles from "./OurWork.module.css";

const FILTERS = ["All", "Mobile", "AI", "Data", "Design", "QA"] as const;
type Filter = (typeof FILTERS)[number];

const filterMatchers: Record<Exclude<Filter, "All">, string[]> = {
  Mobile: ["mobile"],
  AI: ["ai studio", "ai"],
  Data: ["data studio", "data"],
  Design: ["design studio", "design"],
  QA: ["quality studio", "qa", "quality"],
};

function matchesFilter(
  tags: { label: string }[],
  filter: Filter,
): boolean {
  if (filter === "All") return true;
  const labels = tags.map((t) => t.label.toLowerCase());
  const keys = filterMatchers[filter];
  return labels.some((label) => keys.some((key) => label.includes(key)));
}

export function OurWork() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(
    () => caseStudies.filter((study) => matchesFilter(study.tags, active)),
    [active],
  );

  return (
    <>
      <section className={`${styles.hero} grid-bg`}>
        <div className="container">
          <Reveal>
            <div className={styles.heroInner}>
              <span className="label">Our work</span>
              <h1 className={styles.heroTitle}>
                Explore our work{" "}
                <span className="highlight-orange">in action</span>
              </h1>
              <p className={styles.heroDesc}>
                Selected engagements across mobile, AI, data, design, and
                quality — outcomes delivered with senior engineering ownership.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--sm">
        <div className="container">
          <Reveal>
            <SectionHeader
              title="Case studies"
              description="Filter by capability to explore how QUORIXA partners ship."
            />
          </Reveal>

          <div
            className={styles.filters}
            role="tablist"
            aria-label="Filter case studies"
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={active === filter}
                className={`${styles.pill} ${active === filter ? styles.pillActive : ""}`}
                onClick={() => setActive(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className={styles.empty}>
              No case studies match this filter yet. Try another category.
            </p>
          ) : (
            <div className={styles.grid}>
              {filtered.map((study) => (
                <Reveal key={study.id}>
                  <CaseStudyCard study={study} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Have a product challenge like these?"
        description="Tell us what you're building — we'll assemble the right specialists."
        ctaLabel="Book a consultation"
        ctaHref="/contact"
      />
    </>
  );
}
