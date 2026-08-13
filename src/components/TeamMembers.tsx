import styles from "./TeamMembers.module.css";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

type Props = {
  members: TeamMember[];
};

export function TeamMembers({ members }: Props) {
  return (
    <div className={styles.row}>
      {members.map((m) => (
        <article key={m.name} className={styles.card}>
          <img
            className={styles.photo}
            src={m.image}
            alt={m.name}
            loading="lazy"
          />
          <strong>{m.name}</strong>
          <span>{m.role}</span>
        </article>
      ))}
    </div>
  );
}
