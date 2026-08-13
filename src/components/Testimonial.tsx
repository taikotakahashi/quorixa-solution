import { Star } from "lucide-react";
import styles from "./Testimonial.module.css";

type Props = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  image?: string;
};

export function Testimonial({ quote, author, role, company, image }: Props) {
  return (
    <figure className={styles.wrap}>
      <div className={styles.stars} aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill="#F5C518" color="#F5C518" />
        ))}
      </div>
      <blockquote className={styles.quote}>“{quote}”</blockquote>
      <figcaption className={styles.caption}>
        {image && (
          <img src={image} alt={author} className={styles.avatar} loading="lazy" />
        )}
        <div>
          <div className={styles.author}>{author}</div>
          <div className={styles.role}>
            {role}
            {company ? `, ${company}` : ""}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
