import { Button } from "./Button";
import styles from "./CTASection.module.css";

type Props = {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  title,
  description,
  ctaLabel = "Book a consultation",
  ctaHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: Props) {
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
