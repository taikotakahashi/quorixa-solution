type Props = {
  brand: string;
  className?: string;
  color?: string;
};

/** Brand marks styled like the original awards strip (darker tint on colored cards) */
export function AwardBrandMark({ brand, className, color }: Props) {
  const style = color ? { color } : undefined;

  switch (brand) {
    case "meta":
      return (
        <svg
          className={className}
          style={style}
          viewBox="0 0 88 28"
          fill="none"
          aria-hidden
        >
          <path
            d="M6.5 19.2c2.6-5.8 5.9-9.7 9.5-9.7 2.4 0 3.9 1.7 5.8 4.9 2.1-3.4 3.6-4.9 6.1-4.9 3.4 0 6.6 3.8 9.3 9.7-.7 1.4-1.5 2.3-2.4 2.3-1.3 0-2.4-1.7-4.1-5.1-1.8 3.6-3.1 5.1-5 5.1-2.1 0-3.9-2.3-5.6-5.9-1.7 3.6-3 5.9-5.1 5.9-1.9 0-3.7-1.7-5.2-4.9-.9 2.8-1.7 4.1-2.5 4.1-.9 0-1.6-.9-2.3-2.3.1 0 .8.8 1.5.7z"
            fill="currentColor"
          />
          <text
            x="48"
            y="19.5"
            fill="currentColor"
            fontFamily="Inter, Helvetica Neue, Arial, sans-serif"
            fontSize="12"
            fontWeight="700"
          >
            Meta
          </text>
        </svg>
      );

    case "google-play":
      return (
        <div className={className} style={style}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
            <path
              d="M3.2 2.1c-.4.2-.7.7-.7 1.3v17.2c0 .6.3 1.1.7 1.3l10.1-9.9L3.2 2.1z"
              fill="currentColor"
            />
            <path
              d="m14.2 12.9 2.6 1.5 4.1 2.3c.6.4.6 1.1 0 1.4L15.2 21l-1-8.1z"
              fill="currentColor"
              opacity="0.85"
            />
            <path
              d="M14.2 11.1 15.2 3l5.7 3.3c.6.4.6 1.1 0 1.4l-4.1 2.3-2.6 1.1z"
              fill="currentColor"
              opacity="0.75"
            />
            <path
              d="m13.3 12-1 8.1-9.1-5.2L13.3 12z"
              fill="currentColor"
              opacity="0.55"
            />
          </svg>
          <span>Google Play</span>
        </div>
      );

    case "app-store":
      return (
        <div className={className} style={style}>
          <svg viewBox="0 0 18 22" width="18" height="22" aria-hidden>
            <path
              d="M13.9 11.5c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.7-1.7-3.3-1.7-1.4-.1-2.7.8-3.4.8s-1.8-.8-3-.8C4.3 6.5 2.7 7.7 1.6 9.6-.1 12.5 1.2 16.6 2.7 18.9c.7 1.1 1.6 2.3 2.8 2.2 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-.1 2.8-2.1.9-1.3 1.2-2.5 1.2-2.6 0 0-2.4-.9-2.4-3.9zM11.2 4.8c.6-.8 1-1.8.9-2.9-.9 0-1.9.6-2.5 1.3-.6.7-1.1 1.8-.9 2.8.9.1 1.9-.5 2.5-1.2z"
              fill="currentColor"
            />
          </svg>
          <span>App Store</span>
        </div>
      );

    case "deloitte":
      return (
        <span
          className={className}
          style={{
            ...style,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "22px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Deloitte<span style={{ color: "currentColor" }}>.</span>
        </span>
      );

    case "g2":
      return (
        <svg
          className={className}
          style={style}
          viewBox="0 0 40 28"
          aria-hidden
        >
          <path
            d="M14 3c-6 0-11 4.9-11 11s5 11 11 11c4.4 0 8.2-2.6 9.9-6.4l-4.7-2.1C18.4 18.6 16.4 20 14 20c-3.3 0-6-2.7-6-6s2.7-6 6-6c1.7 0 3.2.7 4.3 1.9l1.8-1.8 4.3-4.3C21.7 4.3 18.1 3 14 3z"
            fill="currentColor"
          />
          <rect x="18" y="11" width="14" height="5.5" rx="1" fill="currentColor" />
        </svg>
      );

    case "gartner":
      return (
        <span
          className={className}
          style={{
            ...style,
            fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
            fontSize: "20px",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            fontStyle: "italic",
          }}
        >
          Gartner
        </span>
      );

    case "crn":
      return (
        <span
          className={className}
          style={{
            ...style,
            fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
            fontSize: "26px",
            fontWeight: 900,
            letterSpacing: "0.12em",
          }}
        >
          CRN
        </span>
      );

    default:
      return null;
  }
}

type CertProps = {
  id: string;
  label: string;
  className?: string;
};

export function CertificationMark({ id, label, className }: CertProps) {
  switch (id) {
    case "google-cloud":
      return (
        <span className={className}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
            <path
              d="M12 5.2 8.4 11H4.8L12 3l7.2 8h-3.6L12 5.2zM6.2 13.2c-1.8 0-3.2 1.4-3.2 3.2S4.4 19.6 6.2 19.6h11.6c1.8 0 3.2-1.4 3.2-3.2 0-1.5-1-2.8-2.4-3.1l-1.2 2.1h.4c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2H6.2c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2h2.1l-1.1-2.1c-.3 0-.7.1-1 .1z"
              fill="currentColor"
            />
          </svg>
          {label}
        </span>
      );
    case "aws":
      return (
        <span className={className}>
          <svg viewBox="0 0 24 16" width="28" height="16" aria-hidden>
            <path
              d="M6.2 1.2h2.1l2.4 8.1L13.3 1.2h2.1L12.1 14H9.8L6.2 1.2zm9.4 0h5.8v1.8h-3.7v2.5h3.3v1.8h-3.3V14h-2.1V1.2zM1.4 4.2c0-1.9 1.5-3.2 3.6-3.2 1.2 0 2.2.4 2.9 1.1l-1.2 1.4c-.4-.4-1-.7-1.7-.7-.9 0-1.5.6-1.5 1.4 0 .8.5 1.2 1.6 1.5l.9.3c2 .6 3 1.6 3 3.3 0 2.1-1.6 3.5-3.9 3.5-1.5 0-2.8-.5-3.7-1.5l1.3-1.4c.5.7 1.3 1.1 2.3 1.1 1 0 1.7-.5 1.7-1.3 0-.7-.5-1.2-1.6-1.5l-.9-.3C2.5 7.6 1.4 6.5 1.4 4.2z"
              fill="currentColor"
            />
          </svg>
          {label}
        </span>
      );
    case "iso":
      return (
        <span className={className}>
          <svg viewBox="0 0 28 28" width="22" height="22" aria-hidden>
            <circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="14" cy="14" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text
              x="14"
              y="17"
              textAnchor="middle"
              fontSize="8"
              fontWeight="800"
              fill="currentColor"
            >
              ISO
            </text>
          </svg>
          {label}
        </span>
      );
    case "clutch":
      return (
        <span className={className}>
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden>
            <path
              d="m10 1.5 2.4 5 5.4.5-4.1 3.7 1.3 5.3L10 13.4 5 15.9l1.3-5.3L2.2 7l5.4-.5L10 1.5z"
              fill="currentColor"
            />
          </svg>
          {label}
        </span>
      );
    default:
      return <span className={className}>{label}</span>;
  }
}
