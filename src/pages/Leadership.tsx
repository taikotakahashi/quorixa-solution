import {
  Briefcase,
  Cog,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";
import { HomeContactSection } from "../components/HomeContactSection";
import { Reveal } from "../components/Reveal";
import { leadershipTeam as staticLeadership } from "../data/team";
import { getLeadershipTeam } from "../lib/cms";
import { useCmsData } from "../lib/cms/useCmsData";
import styles from "./Leadership.module.css";

function roleIcon(role: string): LucideIcon {
  const r = role.toLowerCase();
  if (
    r.includes("people") ||
    r.includes("recruiting") ||
    r.includes("delivery") ||
    r.includes("partnerships")
  ) {
    return Users;
  }
  if (
    r.includes("engineering") ||
    r.includes("cto") ||
    r.includes("cdo") ||
    r.includes("operations") ||
    r.includes("it")
  ) {
    return Cog;
  }
  return Briefcase;
}

export function Leadership() {
  const { data: leadershipTeam } = useCmsData(
    getLeadershipTeam,
    staticLeadership,
  );

  const withPhotos = leadershipTeam.filter((m) => m.image);
  const textOnly = leadershipTeam.filter((m) => !m.image);
  const featured = withPhotos.length ? withPhotos : leadershipTeam;
  const rest = withPhotos.length ? textOnly : [];

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <div className={styles.intro}>
              <span className={styles.pill}>
                <Users size={14} strokeWidth={2.2} aria-hidden />
                Leadership
              </span>
              <h1 className={styles.title}>
                Meet the <span className={styles.accent}>QUORIXA</span> team
              </h1>
              <p className={styles.lead}>
                Technical, honest, enthusiastic, and innovative — our leaders
                share a common desire for excellence and continuous improvement.
              </p>
            </div>
          </Reveal>

          <div className={styles.grid}>
            {featured.map((member) => {
              const Icon = roleIcon(member.role);
              return (
                <article
                  key={`${member.name}-${member.role}`}
                  className={styles.card}
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
                  ) : (
                    <div className={styles.photoFallback} aria-hidden />
                  )}
                  <strong className={styles.name}>{member.name}</strong>
                  <span className={styles.role}>
                    <Icon size={14} strokeWidth={2.2} aria-hidden />
                    {member.role}
                  </span>
                  <span className={styles.divider} aria-hidden />
                  <span className={styles.region}>
                    <MapPin size={13} strokeWidth={2.2} aria-hidden />
                    {member.region}
                  </span>
                </article>
              );
            })}
          </div>

          {rest.length > 0 ? (
            <div className={styles.textGrid}>
              {rest.map((member) => {
                const Icon = roleIcon(member.role);
                return (
                  <article
                    key={`${member.name}-${member.role}-text`}
                    className={styles.textCard}
                  >
                    <strong className={styles.name}>{member.name}</strong>
                    <span className={styles.role}>
                      <Icon size={14} strokeWidth={2.2} aria-hidden />
                      {member.role}
                    </span>
                    <span className={styles.region}>
                      <MapPin size={13} strokeWidth={2.2} aria-hidden />
                      {member.region}
                    </span>
                  </article>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>

      <HomeContactSection />
    </>
  );
}
