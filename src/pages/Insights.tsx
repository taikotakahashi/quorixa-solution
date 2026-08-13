import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { insights } from "../data/insights";
import styles from "./Insights.module.css";

export function Insights() {
  const featured = insights[0];
  const rest = insights.slice(1);

  return (
    <>
      <section className={`${styles.hero} grid-bg`}>
        <div className="container">
          <Reveal>
            <div className={styles.heroInner}>
              <span className="label">Insights</span>
              <h1 className={styles.heroTitle}>
                Perspectives from the{" "}
                <span className="highlight-orange">engineering floor</span>
              </h1>
              <p className={styles.heroDesc}>
                Ideas on product delivery, AI, design systems, and building
                teams that ship with confidence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--sm">
        <div className="container">
          <Reveal>
            <Link to={`/insights/${featured.id}`} className={styles.featured}>
              <div className={styles.featuredImage}>
                <img src={featured.image} alt="" loading="lazy" />
              </div>
              <div className={styles.featuredBody}>
                <div className={styles.meta}>
                  <span className={styles.category}>{featured.category}</span>
                  <time dateTime={featured.date}>{featured.date}</time>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className={styles.readMore}>
                  Read article <ArrowUpRight size={16} strokeWidth={2.2} />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              title="Latest articles"
              description="Editorial notes and practical guidance from QUORIXA practitioners."
            />
          </Reveal>
          <div className={styles.grid}>
            {rest.map((article) => (
              <Reveal key={article.id}>
                <Link to={`/insights/${article.id}`} className={styles.card}>
                  <div className={styles.cardImage}>
                    <img src={article.image} alt="" loading="lazy" />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.meta}>
                      <span className={styles.category}>{article.category}</span>
                      <time dateTime={article.date}>{article.date}</time>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want this thinking on your product?"
        description="Talk with a QUORIXA team about your next initiative."
        ctaLabel="Book a consultation"
        ctaHref="/contact"
      />
    </>
  );
}
