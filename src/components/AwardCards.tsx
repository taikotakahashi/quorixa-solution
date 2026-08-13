import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { awards, certifications } from "../data/content";
import { AwardBrandMark } from "./AwardBrandMark";
import styles from "./AwardCards.module.css";

type Props = {
  showCertifications?: boolean;
};

export function AwardCards({ showCertifications = true }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 172, behavior: "smooth" });
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.track} ref={trackRef}>
          {awards.map((award) => (
            <article
              key={award.title}
              className={styles.card}
              style={{ background: award.color }}
            >
              <p className={styles.title}>{award.title}</p>
              <div className={styles.brand}>
                <AwardBrandMark
                  brand={award.brand}
                  color={award.logoColor}
                  className={styles.brandMark}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left">
          <ChevronLeft size={16} />
        </button>
        <div className={styles.scrollbar} aria-hidden />
        <button type="button" onClick={() => scroll(1)} aria-label="Scroll right">
          <ChevronRight size={16} />
        </button>
      </div>

      {showCertifications && (
        <div className={styles.certs}>
          <h3 className={styles.certsLabel}>Certifications and recognition</h3>
          <div className={styles.certList}>
            {certifications.map((item) => (
              <img
                key={item.id}
                src={item.src}
                alt={item.label}
                className={styles.certLogo}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
