import {
  Brain,
  Briefcase,
  Code2,
  Database,
  Palette,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import { PersonContactLinks } from "./PersonContactLinks";
import styles from "./TeamMembers.module.css";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  linkedinUrl?: string;
  email?: string;
  phone?: string;
};

type Props = {
  members: TeamMember[];
};

type Specialty = {
  Icon: LucideIcon;
  className: string;
};

function specialtyForRole(role: string): Specialty {
  const r = role.toLowerCase();
  if (r.includes("design")) return { Icon: Palette, className: styles.specDesign };
  if (r.includes("ai") || r.includes("ml"))
    return { Icon: Brain, className: styles.specAi };
  if (r.includes("qa") || r.includes("quality"))
    return { Icon: Code2, className: styles.specQa };
  if (r.includes("data"))
    return { Icon: Database, className: styles.specData };
  if (r.includes("mobile"))
    return { Icon: Smartphone, className: styles.specMobile };
  if (r.includes("delivery") || r.includes("manager") || r.includes("people"))
    return { Icon: Users, className: styles.specDelivery };
  return { Icon: Briefcase, className: styles.specDefault };
}

function PhotoWave() {
  return (
    <svg
      className={styles.wave}
      viewBox="0 0 320 40"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 22 C36 6 72 34 108 18 C150 -2 178 32 220 14 C252 0 286 24 320 12 L320 40 L0 40 Z"
        fill="#fff"
      />
    </svg>
  );
}

export function TeamMembers({ members }: Props) {
  return (
    <div className={styles.row}>
      {members.map((m) => {
        const { Icon, className: specClass } = specialtyForRole(m.role);
        return (
          <article key={m.name} className={styles.card}>
            <div className={styles.photoWrap}>
              <img
                className={styles.photo}
                src={m.image}
                alt={m.name}
                loading="lazy"
              />
              <PhotoWave />
              <span className={`${styles.specBadge} ${specClass}`} aria-hidden>
                <Icon size={16} strokeWidth={2.2} />
              </span>
            </div>
            <strong className={styles.name}>{m.name}</strong>
            <span className={styles.role}>{m.role}</span>
            <PersonContactLinks
              name={m.name}
              linkedinUrl={m.linkedinUrl}
              email={m.email}
              phone={m.phone}
            />
          </article>
        );
      })}
    </div>
  );
}
