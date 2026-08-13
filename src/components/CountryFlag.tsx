import { useId } from "react";

/** Circular 24×24 flag marks matching AgileEngine-style map country icons */
type Props = {
  id: string;
  className?: string;
  size?: number;
};

export function CountryFlag({ id, className, size = 24 }: Props) {
  const uid = useId().replace(/:/g, "");
  const clip = `cf-${id}-${uid}`;

  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    "aria-hidden": true as const,
  };

  const frame = (fill: React.ReactNode) => (
    <svg {...common}>
      <defs>
        <clipPath id={clip}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>{fill}</g>
    </svg>
  );

  switch (id) {
    case "usa":
      return frame(
        <>
          <rect width="24" height="24" fill="#B22234" />
          {[3, 6, 9, 12, 15, 18, 21].map((y) => (
            <rect key={y} y={y} width="24" height="1.6" fill="#fff" />
          ))}
          <rect width="10" height="10" fill="#3C3B6E" />
        </>,
      );
    case "mexico":
      return frame(
        <>
          <rect width="8" height="24" fill="#006847" />
          <rect x="8" width="8" height="24" fill="#fff" />
          <rect x="16" width="8" height="24" fill="#CE1126" />
          <circle cx="12" cy="12" r="2.2" fill="#8B4513" />
        </>,
      );
    case "argentina":
      return frame(
        <>
          <rect width="24" height="8" fill="#74ACDF" />
          <rect y="8" width="24" height="8" fill="#fff" />
          <rect y="16" width="24" height="8" fill="#74ACDF" />
          <circle cx="12" cy="12" r="2.4" fill="#F6B40E" />
        </>,
      );
    case "colombia":
      return frame(
        <>
          <rect width="24" height="12" fill="#FCD116" />
          <rect y="12" width="24" height="6" fill="#003893" />
          <rect y="18" width="24" height="6" fill="#CE1126" />
        </>,
      );
    case "brazil":
      return frame(
        <>
          <rect width="24" height="24" fill="#009C3B" />
          <path d="M12 4 L21 12 L12 20 L3 12 Z" fill="#FFDF00" />
          <circle cx="12" cy="12" r="4" fill="#002776" />
        </>,
      );
    case "guatemala":
      return frame(
        <>
          <rect width="8" height="24" fill="#4997D0" />
          <rect x="8" width="8" height="24" fill="#fff" />
          <rect x="16" width="8" height="24" fill="#4997D0" />
          <circle cx="12" cy="12" r="2" fill="#6B8E23" />
        </>,
      );
    case "poland":
      return frame(
        <>
          <rect width="24" height="12" fill="#fff" />
          <rect y="12" width="24" height="12" fill="#DC143C" />
        </>,
      );
    case "spain":
      return frame(
        <>
          <rect width="24" height="6" fill="#AA151B" />
          <rect y="6" width="24" height="12" fill="#F1BF00" />
          <rect y="18" width="24" height="6" fill="#AA151B" />
        </>,
      );
    case "portugal":
      return frame(
        <>
          <rect width="9" height="24" fill="#006600" />
          <rect x="9" width="15" height="24" fill="#FF0000" />
          <circle cx="9" cy="12" r="3" fill="#FFCC00" />
        </>,
      );
    case "ukraine":
      return frame(
        <>
          <rect width="24" height="12" fill="#0057B7" />
          <rect y="12" width="24" height="12" fill="#FFD700" />
        </>,
      );
    case "romania":
      return frame(
        <>
          <rect width="8" height="24" fill="#002B7F" />
          <rect x="8" width="8" height="24" fill="#FCD116" />
          <rect x="16" width="8" height="24" fill="#CE1126" />
        </>,
      );
    case "bulgaria":
      return frame(
        <>
          <rect width="24" height="8" fill="#fff" />
          <rect y="8" width="24" height="8" fill="#00966E" />
          <rect y="16" width="24" height="8" fill="#D62612" />
        </>,
      );
    case "slovenia":
      return frame(
        <>
          <rect width="24" height="8" fill="#fff" />
          <rect y="8" width="24" height="8" fill="#0033A0" />
          <rect y="16" width="24" height="8" fill="#ED1C24" />
        </>,
      );
    case "slovakia":
      return frame(
        <>
          <rect width="24" height="8" fill="#fff" />
          <rect y="8" width="24" height="8" fill="#0B4EA2" />
          <rect y="16" width="24" height="8" fill="#EE1C25" />
        </>,
      );
    case "india":
      return frame(
        <>
          <rect width="24" height="8" fill="#FF9933" />
          <rect y="8" width="24" height="8" fill="#fff" />
          <rect y="16" width="24" height="8" fill="#138808" />
          <circle cx="12" cy="12" r="2.4" fill="#000080" />
        </>,
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="12" fill="#ddd" />
        </svg>
      );
  }
}
