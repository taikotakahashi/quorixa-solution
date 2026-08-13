import { Star } from "lucide-react";
import styles from "./TestimonialGrid.module.css";

export type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  image?: string;
};

type Props = {
  items: TestimonialItem[];
  featuredLabel?: string;
  featuredImages?: string[];
};

export function TestimonialGrid({
  items,
  featuredLabel = "What our clients say about us",
  featuredImages = [],
}: Props) {
  return (
    <div className={styles.grid}>
      <article className={styles.featured}>
        <span className={styles.badge}>Testimonials</span>
        <div className={styles.avatars}>
          {featuredImages.slice(0, 3).map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </div>
        <p className={styles.featuredText}>{featuredLabel}</p>
      </article>

      {items.map((item) => (
        <article key={item.author + item.quote.slice(0, 24)} className={styles.card}>
          <div className={styles.stars} aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="#F5C518" color="#F5C518" />
            ))}
          </div>
          <p className={styles.quote}>“{item.quote}”</p>
          <div className={styles.divider} />
          <div className={styles.author}>
            <strong>{item.author}</strong>
            <span className={styles.sep}>|</span>
            <span>{item.role}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
