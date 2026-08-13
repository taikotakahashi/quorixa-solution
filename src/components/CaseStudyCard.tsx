import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";
import styles from "./CaseStudyCard.module.css";

type Props = {
  study: CaseStudy;
  featured?: boolean;
};

export function CaseStudyCard({ study, featured = false }: Props) {
  return (
    <Link
      to={study.href}
      className={`${styles.card} ${featured ? styles.featured : ""}`}
    >
      <div className={styles.imageWrap}>
        <img src={study.image} alt={study.title} loading="lazy" />
      </div>
      <div className={styles.body}>
        <div className={styles.tags}>
          {study.tags.map((tag) => (
            <span
              key={tag.label}
              className={styles.tag}
              style={{ background: tag.color }}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <h3 className={styles.title}>{study.title}</h3>
        <p className={styles.desc}>{study.description}</p>
        {study.result && <p className={styles.result}>{study.result}</p>}
      </div>
    </Link>
  );
}
