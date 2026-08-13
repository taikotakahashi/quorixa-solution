import styles from "./StatCard.module.css";

type Props = {
  value: string;
  label: string;
  description?: string;
  variant?: "light" | "dark" | "bordered";
};

export function StatCard({
  value,
  label,
  description,
  variant = "dark",
}: Props) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  );
}
