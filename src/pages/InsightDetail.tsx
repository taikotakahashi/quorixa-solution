import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/Button";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { insights } from "../data/insights";
import styles from "./InsightDetail.module.css";

export function InsightDetail() {
  const { id } = useParams();
  const article = insights.find((item) => item.id === id);

  if (!article) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h1>Article not found</h1>
          <p style={{ margin: "16px 0 28px" }}>
            This insight may have moved or no longer exists.
          </p>
          <Button href="/insights" arrow>
            Back to insights
          </Button>
        </div>
      </section>
    );
  }

  const related = insights.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <>
      <article className={styles.article}>
        <div className="container">
          <Link to="/insights" className={styles.back}>
            <ArrowLeft size={16} /> Insights
          </Link>
          <Reveal>
            <div className={styles.meta}>
              <span>{article.category}</span>
              <span>{article.date}</span>
              <span>{article.readTime} read</span>
            </div>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.excerpt}>{article.excerpt}</p>
          </Reveal>
          <div className={styles.heroImage}>
            <img src={article.image} alt="" loading="eager" />
          </div>
          <div className={styles.body}>
            {article.content.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <section className="section section--light">
        <div className="container">
          <h2 className={styles.relatedTitle}>More insights</h2>
          <div className={styles.related}>
            {related.map((item) => (
              <Link key={item.id} to={`/insights/${item.id}`} className={styles.relatedCard}>
                <img src={item.image} alt="" loading="lazy" />
                <span className={styles.relatedCat}>{item.category}</span>
                <strong>{item.title}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Build something meaningful with us"
        ctaLabel="Book a consultation"
      />
    </>
  );
}
