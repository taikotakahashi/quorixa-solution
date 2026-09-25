import { awards, certifications } from "../data/content";
import styles from "./AwardCards.module.css";

type Props = {
  showCertifications?: boolean;
  fullWidth?: boolean;
  /** Max height for award logos inside cards (px) */
  logoHeight?: number;
};

function AwardCard({
  title,
  color,
  logoSrc,
  logoHeight,
}: {
  title: string;
  color: string;
  logoSrc: string;
  logoHeight: number;
}) {
  return (
    <article className={styles.card} style={{ background: color }}>
      <p className={styles.title}>{title}</p>
      <div className={styles.brand}>
        <img
          src={logoSrc}
          alt=""
          className={styles.awardLogo}
          style={{ maxHeight: logoHeight }}
          draggable={false}
        />
      </div>
    </article>
  );
}

export function AwardCards({
  showCertifications = true,
  fullWidth = false,
  logoHeight = 190,
}: Props) {
  const set = (
    <div className={styles.set}>
      {awards.map((award) => (
        <AwardCard
          key={award.title + award.logoSrc}
          title={award.title}
          color={award.color}
          logoSrc={award.logoSrc}
          logoHeight={logoHeight}
        />
      ))}
    </div>
  );

  return (
    <div className={`${styles.root} ${fullWidth ? styles.fullWidth : ""}`}>
      <div className={styles.wrap}>
        <div className={styles.track}>
          <div className={styles.marquee}>
            {set}
            <div className={styles.set} aria-hidden>
              {awards.map((award) => (
                <AwardCard
                  key={`loop-${award.title}-${award.logoSrc}`}
                  title={award.title}
                  color={award.color}
                  logoSrc={award.logoSrc}
                  logoHeight={logoHeight}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCertifications && (
        <div className={styles.footer}>
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
        </div>
      )}
    </div>
  );
}
