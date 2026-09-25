import { Link } from "react-router-dom";
import { Button } from "./Button";
import styles from "./CTASection.module.css";

type Props = {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  links?: { label: string; href: string }[];
  /** When set, renders text left + image right (dark CTA band) */
  image?: { src: string; alt: string };
};

export function CTASection({
  title,
  description,
  ctaLabel = "Book a consultation",
  ctaHref = "/contact",
  secondaryLabel,
  secondaryHref,
  links,
  image,
}: Props) {
  if (links?.length) {
    return (
      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <div className={styles.splitLeft}>
            <h2 className={styles.splitTitle}>{title}</h2>
            {description && <p className={styles.splitDesc}>{description}</p>}
          </div>
          <div className={styles.splitRight}>
            <ul className={styles.linkGrid}>
              {links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className={styles.splitAction}>
              <Button href={ctaHref} arrow>
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (image) {
    return (
      <section className={styles.section}>
        <div className={`container ${styles.mediaSplit}`}>
          <div className={styles.mediaCopy}>
            <h2 className={styles.mediaTitle}>{title}</h2>
            {description && <p className={styles.mediaDesc}>{description}</p>}
            <div className={styles.mediaActions}>
              <Button href={ctaHref} arrow>
                {ctaLabel}
              </Button>
              {secondaryLabel && secondaryHref && (
                <Button href={secondaryHref} variant="outline" arrow>
                  {secondaryLabel}
                </Button>
              )}
            </div>
          </div>
          <figure className={styles.mediaFigure}>
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.desc}>{description}</p>}
        <div className={styles.actions}>
          <Button href={ctaHref} arrow>
            {ctaLabel}
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button href={secondaryHref} variant="outline" arrow>
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
