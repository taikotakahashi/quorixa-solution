import type { ReactNode } from "react";
import starsImg from "../assets/testimonials/stars.webp";
import clientsImg from "../assets/testimonials/ts.webp";
import styles from "./TestimonialGrid.module.css";

export type TestimonialItem = {
  quote: ReactNode;
  author: string;
  role: string;
};

type Props = {
  items: TestimonialItem[];
  featuredLabel?: string;
};

export function TestimonialGrid({
  items,
  featuredLabel = "What our clients say about us",
}: Props) {
  const [first, second, third, fourth, fifth] = items;

  return (
    <div className={styles.columns}>
      <div className={styles.column}>
        <div className={styles.intro}>
          <p className={styles.badge}>Testimonials</p>
          <img
            className={styles.clientsImg}
            src={clientsImg}
            alt="Clients"
            loading="lazy"
          />
          <h3 className={styles.introTitle}>{featuredLabel}</h3>
        </div>
        {first && <TestimonialCard item={first} />}
      </div>

      <div className={styles.column}>
        {second && <TestimonialCard item={second} />}
        {third && <TestimonialCard item={third} />}
      </div>

      <div className={styles.column}>
        {fourth && <TestimonialCard item={fourth} />}
        {fifth && <TestimonialCard item={fifth} />}
      </div>
    </div>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <article className={styles.card}>
      <img className={styles.stars} src={starsImg} alt="" aria-hidden />
      <p className={styles.quote}>"{item.quote}"</p>
      <p className={styles.author}>
        <strong>{item.author}</strong>
        <span className={styles.sep}> | </span>
        <span>{item.role}</span>
      </p>
    </article>
  );
}
