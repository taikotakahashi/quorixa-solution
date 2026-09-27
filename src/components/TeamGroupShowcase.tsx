import { Users } from "lucide-react";
import styles from "./TeamGroupShowcase.module.css";

type Props = {
  src: string;
  alt: string;
  countLabel?: string;
  countCaption?: string;
};

export function TeamGroupShowcase({
  src,
  alt,
  countLabel = "20+",
  countCaption = "Talented Team Members",
}: Props) {
  return (
    <div className={styles.wrap}>
      <figure className={styles.figure}>
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </figure>
      <aside className={styles.badge} aria-label={`${countLabel} ${countCaption}`}>
        <span className={styles.badgeIcon}>
          <Users size={18} strokeWidth={2.2} aria-hidden />
        </span>
        <span className={styles.badgeText}>
          <strong>{countLabel}</strong>
          <small>{countCaption}</small>
        </span>
      </aside>
    </div>
  );
}
