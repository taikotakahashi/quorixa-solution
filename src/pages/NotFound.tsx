import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import styles from "./NotFound.module.css";

export function NotFound() {
  return (
    <section className={`${styles.page} grid-bg`}>
      <div className="container">
        <Reveal>
          <div className={styles.inner}>
            <p className={styles.code}>404</p>
            <h1 className={styles.title}>
              This page is off the{" "}
              <span className="highlight-orange">roadmap</span>
            </h1>
            <p className={styles.desc}>
              The link may be outdated or the page may have moved. Head home or
              reach out — we will get you to the right place.
            </p>
            <div className={styles.actions}>
              <Button href="/" arrow>
                Back to home
              </Button>
              <Button href="/contact" variant="outline" arrow>
                Contact us
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
