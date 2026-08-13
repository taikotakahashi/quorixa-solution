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
        <div className={className} style={style}>
          <svg viewBox="0 0 28 14" width="28" height="14" aria-hidden>
            <path
              d="M2.1 10.2C3.6 6.4 5.7 3.6 8.2 3.6c1.5 0 2.5 1.1 3.7 3.2 1.3-2.2 2.3-3.2 3.9-3.2 2.2 0 4.2 2.5 6 6.4-.5.9-1 1.5-1.6 1.5-.8 0-1.5-1.1-2.6-3.3-1.2 2.3-2 3.3-3.2 3.3-1.3 0-2.5-1.5-3.6-3.8C9.7 9.9 8.9 11.5 7.5 11.5c-1.2 0-2.4-1.1-3.4-3.2-.6 1.8-1.1 2.7-1.6 2.7-.6 0-1-.6-1.5-1.5.1 0 .6.5 1.1.7z"
              fill="currentColor"
            />
          </svg>
          <span
            style={{
              fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Meta
          </span>
        </div>
      );

    case "google-play":
      return (
        <div className={className} style={style}>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
            <path
              d="M3.6 2.4c-.5.3-.8.8-.8 1.5v16.2c0 .7.3 1.2.8 1.5l9.5-9.6L3.6 2.4z"
              fill="currentColor"
            />
            <path
              d="m14.2 12.8 2.5 1.4 3.9 2.2c.6.3.6 1 0 1.3l-5.3 3-1.1-7.9z"
              fill="currentColor"
              opacity="0.88"
            />
            <path
              d="M14.2 11.2 15.3 3.4l5.3 3c.6.3.6 1 0 1.3l-3.9 2.2-2.5 1.3z"
              fill="currentColor"
              opacity="0.78"
            />
            <path
              d="m13.1 12-1.1 7.9-8.4-4.8L13.1 12z"
              fill="currentColor"
              opacity="0.58"
            />
          </svg>
          <span
            style={{
              fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Google Play
          </span>
        </div>
      );

    case "app-store":
      return (
        <div className={className} style={style}>
          <svg viewBox="0 0 18 22" width="22" height="26" aria-hidden>
            <path
              d="M13.9 11.5c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.7-1.7-3.3-1.7-1.4-.1-2.7.8-3.4.8s-1.8-.8-3-.8C4.3 6.5 2.7 7.7 1.6 9.6-.1 12.5 1.2 16.6 2.7 18.9c.7 1.1 1.6 2.3 2.8 2.2 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-.1 2.8-2.1.9-1.3 1.2-2.5 1.2-2.6 0 0-2.4-.9-2.4-3.9zM11.2 4.8c.6-.8 1-1.8.9-2.9-.9 0-1.9.6-2.5 1.3-.6.7-1.1 1.8-.9 2.8.9.1 1.9-.5 2.5-1.2z"
              fill="currentColor"
            />
          </svg>
          <span
            style={{
              fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            App Store
          </span>
        </div>
      );

    case "deloitte":
      return (
        <span
          className={className}
          style={{
            ...style,
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            fontSize: "24px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Deloitte.
        </span>
      );

    case "g2":
      return (
        <svg
          className={className}
          style={style}
          viewBox="0 0 48 32"
          width="64"
          height="42"
          aria-hidden
        >
          <path
            d="M15.2 2.5C8.1 2.5 2.4 8.2 2.4 15.3S8.1 28.1 15.2 28.1c5.1 0 9.5-3 11.5-7.4l-5.5-2.4c-.9 2.4-3.2 4.1-6 4.1-3.8 0-6.9-3.1-6.9-6.9s3.1-6.9 6.9-6.9c2 0 3.8.8 5.1 2.2l2.1-2.1 5-5C24.2 4 20 2.5 15.2 2.5z"
            fill="currentColor"
          />
          <path
            d="M22.5 13.2h16.2c1.1 0 2 .9 2 2v2.4c0 1.1-.9 2-2 2H22.5v-6.4z"
            fill="currentColor"
          />
        </svg>
      );

    case "gartner":
      return (
        <span
          className={className}
          style={{
            ...style,
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            fontStyle: "italic",
            lineHeight: 1,
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
            fontSize: "28px",
            fontWeight: 900,
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
        >
          CRN
        </span>
      );

    case "ibd":
      return (
        <div className={className} style={{ ...style, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.06em",
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}
          >
            Best Online
            <br />
            Brokers
          </div>
        </div>
      );

    case "fast-company":
      return (
        <span
          className={className}
          style={{
            ...style,
            fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            lineHeight: 1.15,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Fast
          <br />
          Company
        </span>
      );

    case "webby":
      return (
        <div className={className} style={{ ...style, textAlign: "center" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "2px solid currentColor",
              display: "grid",
              placeItems: "center",
              margin: "0 auto 6px",
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            W
          </div>
          <span
            style={{
              fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            The Webby Awards
          </span>
        </div>
      );

    case "software-reviews":
      return (
        <div className={className} style={{ ...style, textAlign: "center" }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              border: "3px solid currentColor",
              display: "grid",
              placeItems: "center",
              margin: "0 auto",
              fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
              fontSize: "9px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            Gold
            <br />
            Medal
            <br />
            2021
          </div>
        </div>
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
