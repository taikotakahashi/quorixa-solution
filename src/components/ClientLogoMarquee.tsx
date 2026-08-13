import { clients } from "../data/content";
import styles from "./ClientLogoMarquee.module.css";

export function ClientLogoMarquee() {
  const items = [...clients, ...clients];

  return (
    <section
      className={`${styles.section} grid-bg`}
      aria-label="Trusted by leading companies"
    >
      <div className={styles.track}>
        <div className={styles.marquee}>
          {items.map((client, i) => (
            <div key={`${client.id}-${i}`} className={styles.logo}>
              <img
                src={client.src}
                alt={client.name}
                className={styles.image}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
