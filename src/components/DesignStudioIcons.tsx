import type { ReactNode } from "react";

type Props = { className?: string };

const CORAL = "#E86B6B";
const CORAL_BG = "#FCEEEE";

const tile = {
  width: 40,
  height: 40,
  viewBox: "0 0 40 40",
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
};

function Tile({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg {...tile} className={className}>
      <rect width="40" height="40" rx="6" fill={CORAL_BG} />
      {children}
    </svg>
  );
}

/** Magnifying glass — product strategy & research */
export function IconStrategy({ className }: Props) {
  return (
    <Tile className={className}>
      <circle cx="18" cy="18" r="6.5" stroke={CORAL} strokeWidth="1.7" />
      <path
        d="M23 23l5.5 5.5"
        stroke={CORAL}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Tile>
  );
}

/** Cursor arrow — interaction design */
export function IconInteraction({ className }: Props) {
  return (
    <Tile className={className}>
      <path
        d="M14 12.5l13 7.2-5.8 1.7-1.7 5.8L14 12.5z"
        stroke={CORAL}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </Tile>
  );
}

/** Code brackets — low-code */
export function IconLowCode({ className }: Props) {
  return (
    <Tile className={className}>
      <path
        d="M16 14l-5 6 5 6M24 14l5 6-5 6"
        stroke={CORAL}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Tile>
  );
}

/** Four-square grid — branding */
export function IconBranding({ className }: Props) {
  return (
    <Tile className={className}>
      <rect x="12" y="12" width="6.5" height="6.5" rx="1.2" stroke={CORAL} strokeWidth="1.6" />
      <rect x="21.5" y="12" width="6.5" height="6.5" rx="1.2" stroke={CORAL} strokeWidth="1.6" />
      <rect x="12" y="21.5" width="6.5" height="6.5" rx="1.2" stroke={CORAL} strokeWidth="1.6" />
      <rect x="21.5" y="21.5" width="6.5" height="6.5" rx="1.2" stroke={CORAL} strokeWidth="1.6" />
    </Tile>
  );
}

/** Geometric frame — illustration & motion */
export function IconMotion({ className }: Props) {
  return (
    <Tile className={className}>
      <rect x="13" y="13" width="14" height="14" rx="2" stroke={CORAL} strokeWidth="1.6" />
      <circle cx="13" cy="13" r="1.8" fill={CORAL} />
      <circle cx="27" cy="13" r="1.8" fill={CORAL} />
      <circle cx="13" cy="27" r="1.8" fill={CORAL} />
      <circle cx="27" cy="27" r="1.8" fill={CORAL} />
    </Tile>
  );
}

/** Pen tip for the Design services badge */
export function IconPenTip({ className }: Props) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9.8 2.2l2 2L5.2 10.8 2.8 11.2l.4-2.4L9.8 2.2z"
        stroke={CORAL}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M8.6 3.4l2 2" stroke={CORAL} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function IconDesignBadge({ className }: Props) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="48" height="48" rx="12" fill={CORAL_BG} />
      <rect x="14" y="14" width="8" height="8" rx="1.5" stroke={CORAL} strokeWidth="1.6" />
      <rect x="26" y="14" width="8" height="8" rx="1.5" stroke={CORAL} strokeWidth="1.6" />
      <rect x="14" y="26" width="8" height="8" rx="1.5" stroke={CORAL} strokeWidth="1.6" />
      <rect x="26" y="26" width="8" height="8" rx="1.5" stroke={CORAL} strokeWidth="1.6" />
    </svg>
  );
}
