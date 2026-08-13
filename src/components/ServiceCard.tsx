import type { LucideIcon } from "lucide-react";
import styles from "./ServiceCard.module.css";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg?: string;
  iconColor?: string;
  items?: string[];
  href?: string;
};

export function ServiceCard({
  icon: Icon,
  title,
  description,
  iconBg = "#F3E8FF",
  iconColor = "#5B35F5",
  items,
}: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <div
        className={styles.icon}
        style={{ background: iconBg, color: iconColor }}
      >
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
      {items && items.length > 0 && (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
