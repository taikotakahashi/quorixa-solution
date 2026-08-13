import { Button } from "./Button";
import { ASSETS } from "../assets";
import styles from "./Hero.module.css";

type Props = {
  title: React.ReactNode;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  visual?: React.ReactNode;
  className?: string;
  layout?: "split" | "centered";
  withVideo?: boolean;
};

export function Hero({
  title,
  description,
  ctaLabel = "Book a free consultation",
  ctaHref = "/contact",
  visual,
  className = "",
  layout = "split",
  withVideo = false,
}: Props) {
  if (layout === "centered") {
    return (
      <section
        className={`${styles.hero} ${styles.heroCentered} ${withVideo ? styles.heroVideo : "grid-bg"} ${className}`}
      >
        {withVideo && (
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src={ASSETS.heroVideo} type="video/webm" />
          </video>
        )}
        {withVideo && <div className={styles.videoOverlay} aria-hidden="true" />}
        <div className={`container ${styles.centered}`}>
          <h1 className={styles.centeredTitle}>{title}</h1>
          <p className={styles.centeredDesc}>{description}</p>
          <div className={styles.centeredCta}>
            <Button href={ctaHref} variant={withVideo ? "secondary" : undefined} arrow>
              {ctaLabel}
            </Button>
          </div>
          {visual && <div className={styles.centeredVisual}>{visual}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.hero} grid-bg ${className}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.desc}>{description}</p>
          <Button href={ctaHref} arrow>
            {ctaLabel}
          </Button>
        </div>
        {visual && <div className={styles.visual}>{visual}</div>}
      </div>
    </section>
  );
}
