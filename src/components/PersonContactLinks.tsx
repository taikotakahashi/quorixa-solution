import { Mail, Phone } from "lucide-react";
import styles from "./PersonContactLinks.module.css";

export type PersonContact = {
  linkedinUrl?: string;
  email?: string;
  phone?: string;
};

type Props = PersonContact & {
  name: string;
  className?: string;
};

function LinkedInGlyph() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function PersonContactLinks({
  name,
  linkedinUrl,
  email,
  phone,
  className,
}: Props) {
  const hasAny = Boolean(linkedinUrl || email || phone);
  if (!hasAny) return null;

  return (
    <div className={`${styles.row} ${className ?? ""}`.trim()}>
      {linkedinUrl ? (
        <a
          href={linkedinUrl}
          className={`${styles.icon} ${styles.linkedin}`}
          aria-label={`${name} on LinkedIn`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <LinkedInGlyph />
        </a>
      ) : null}
      {email ? (
        <a
          href={`mailto:${email}`}
          className={`${styles.icon} ${styles.email}`}
          aria-label={`Email ${name}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Mail size={14} strokeWidth={2.1} aria-hidden />
        </a>
      ) : null}
      {phone ? (
        <a
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          className={`${styles.icon} ${styles.phone}`}
          aria-label={`Call ${name}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Phone size={14} strokeWidth={2.1} aria-hidden />
        </a>
      ) : null}
    </div>
  );
}
