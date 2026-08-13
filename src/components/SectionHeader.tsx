import styles from "./SectionHeader.module.css";

type Props = {
  label?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
}: Props) {
  return (
    <div
      className={`${styles.wrap} ${styles[align]} ${dark ? styles.dark : ""} ${className}`}
    >
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  );
}
