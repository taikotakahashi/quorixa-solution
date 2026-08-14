import styles from "./ServiceHeroImage.module.css";

type Props = {
  src: string;
  alt: string;
  compact?: boolean;
};

export function ServiceHeroImage({ src, alt, compact = false }: Props) {
  return (
    <div className={`${styles.wrap} ${compact ? styles.compact : ""}`.trim()}>
      <img src={src} alt={alt} className={styles.img} loading="eager" />
    </div>
  );
}
