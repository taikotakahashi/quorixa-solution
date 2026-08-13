import styles from "./ShowcaseGrid.module.css";

const items = [
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    alt: "Analytics dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    alt: "Data visualization",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    alt: "Team collaboration",
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    alt: "Software interface",
  },
];

export function ShowcaseGrid() {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item.alt} className={styles.card}>
          <img src={item.src} alt={item.alt} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
