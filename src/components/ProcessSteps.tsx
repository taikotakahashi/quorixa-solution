import type { LucideIcon } from "lucide-react";
import styles from "./ProcessSteps.module.css";

type Step = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

type Props = {
  steps: Step[];
  image?: string;
  imageAlt?: string;
  title?: string;
};

export function ProcessSteps({
  steps,
  image,
  imageAlt = "Team collaboration",
  title,
}: Props) {
  return (
    <div className={styles.grid}>
      <div className={styles.left}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {image && (
          <div className={styles.imageWrap}>
            <img src={image} alt={imageAlt} loading="lazy" />
          </div>
        )}
      </div>
      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <div className={styles.num}>{i + 1}</div>
            <div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
