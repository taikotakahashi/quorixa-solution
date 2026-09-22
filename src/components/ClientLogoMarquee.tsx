import { clients as staticClients } from "../data/content";
import { getClients } from "../lib/cms";
import { useCmsData } from "../lib/cms/useCmsData";
import styles from "./ClientLogoMarquee.module.css";

type Props = {
  /** hero = inside hero section (AE layout); standalone = separate band */
  variant?: "hero" | "standalone";
};

export function ClientLogoMarquee({ variant = "standalone" }: Props) {
  const { data: clients } = useCmsData(getClients, staticClients);
  // Triple for a denser, continuous AE-style ticker
  const items = [...clients, ...clients, ...clients];
  const isHero = variant === "hero";

  const track = (
    <div className={styles.track}>
      <div className={styles.marquee}>
        {items.map((client, i) => (
          <div key={`${client.id}-${i}`} className={styles.logo}>
            <img
              src={client.src}
              alt={client.name}
              className={styles.image}
              loading={isHero ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (isHero) {
    return (
      <div className={styles.logoSlider} aria-label="Trusted by leading companies">
        <div className={styles.divider} aria-hidden />
        {track}
      </div>
    );
  }

  return (
    <section
      className={`${styles.section} grid-bg`}
      aria-label="Trusted by leading companies"
    >
      <div className={styles.fullWidth}>{track}</div>
    </section>
  );
}
