import { CheckCircle2 } from "lucide-react";
import styles from "./CheckList.module.css";

type Props = {
  items: string[];
  columns?: 1 | 2;
};

export function CheckList({ items, columns = 2 }: Props) {
  return (
    <ul className={`${styles.list} ${columns === 2 ? styles.two : ""}`}>
      {items.map((item) => (
        <li key={item}>
          <CheckCircle2 size={18} strokeWidth={2} className={styles.icon} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
