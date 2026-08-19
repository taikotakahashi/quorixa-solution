import { HomeContactSection } from "../components/HomeContactSection";
import { Reveal } from "../components/Reveal";
import { leadershipTeam } from "../data/team";
import styles from "./Leadership.module.css";

export function Leadership() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <div className={styles.intro}>
              <span className={styles.pill}>Leadership &amp; key experts</span>
              <h1 className={styles.title}>Meet the QUORIXA team</h1>
              <p className={styles.lead}>
                Technical, honest, enthusiastic, and innovative, our team
                members share a common desire for excellence and continuous
                improvement. We foster a culture of learning and growth while
                upholding the highest standards of ethics and integrity.
              </p>
            </div>
          </Reveal>

          <div className={styles.grid}>
            {leadershipTeam.map((member) => (
              <article
                key={`${member.name}-${member.role}`}
                className={`${styles.card} ${member.image ? styles.withPhoto : styles.textOnly}`}
              >
                {member.image ? (
                  <div className={styles.photoWrap}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className={styles.photo}
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <strong className={styles.name}>{member.name}</strong>
                <span className={styles.role}>{member.role}</span>
                <span className={styles.region}>{member.region}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeContactSection />
    </>
  );
}
