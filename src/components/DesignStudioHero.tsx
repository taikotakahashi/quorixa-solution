import { Button } from "./Button";
import { ClientLogoMarquee } from "./ClientLogoMarquee";
import styles from "./DesignStudioHero.module.css";

type Props = {
  imageSrc: string;
};

export function DesignStudioHero({ imageSrc }: Props) {
  return (
    <section className={`${styles.hero} grid-bg`}>
      <div className={`container-wide ${styles.inner}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Design digital products that stand out
          </h1>
          <p className={styles.desc}>
            Captivate users, solve business challenges, and accelerate growth
            with highly effective, data-driven UI/UX design from QUORIXA Design
            Studio.
          </p>
          <Button href="/contact" arrow>
            Schedule a Session
          </Button>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualFrame}>
            <img
              src={imageSrc}
              alt="Design Studio product interfaces and design systems"
              className={styles.visualImg}
              loading="eager"
            />
          </div>
        </div>
      </div>

      <ClientLogoMarquee variant="hero" />
    </section>
  );
}
