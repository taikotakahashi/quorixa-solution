import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import {
  insights,
  type Insight,
  type InsightSection,
} from "../data/insights";
import styles from "./Insights.module.css";

const SECTIONS: InsightSection[] = ["Insights", "Articles", "News"];

function ArticleCard({ article }: { article: Insight }) {
  return (
    <Link to={`/insights/${article.id}`} className={styles.card}>
      <div className={styles.cardImage}>
        <img src={article.image} alt="" loading="lazy" />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <time className={styles.cardDate} dateTime={article.date}>
          {article.date}
        </time>
        <div className={styles.tagRow}>
          {article.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function Insights() {
  const featured = insights.find((item) => item.featured) ?? insights[0];

  const bySection = (section: InsightSection) =>
    insights.filter((item) => item.section === section);

  return (
    <>
      <section className={`${styles.hero} grid-bg`}>
        <div className="container">
          <Reveal>
            <div className={styles.heroInner}>
              <span className={styles.blogPill}>Blog</span>
              <h1 className={styles.heroTitle}>QUORIXA's blog corner</h1>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className="container">
          <Reveal>
            <Link to={`/insights/${featured.id}`} className={styles.featured}>
              <div className={styles.featuredImage}>
                <img src={featured.image} alt="" loading="lazy" />
              </div>
              <div className={styles.featuredBody}>
                <span className={styles.featuredEyebrow}>Insights</span>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <div className={styles.tagRow}>
                  {featured.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={styles.readMore}>
                  Read Full Story <ArrowRight size={16} strokeWidth={2.2} />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {SECTIONS.map((section) => {
        const items = bySection(section).slice(0, 3);
        if (items.length === 0) return null;

        return (
          <section key={section} className={styles.listSection}>
            <div className="container">
              <Reveal>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitle}>{section}</h2>
                  <Link to="/insights" className={styles.allLink}>
                    All {section} <ArrowRight size={16} strokeWidth={2.2} />
                  </Link>
                </div>
              </Reveal>
              <div className={styles.grid}>
                {items.map((article) => (
                  <Reveal key={article.id}>
                    <ArticleCard article={article} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CTASection
        title="Want this thinking on your product?"
        description="Talk with a QUORIXA team about your next initiative."
        ctaLabel="Book a consultation"
        ctaHref="/contact"
      />
    </>
  );
}
