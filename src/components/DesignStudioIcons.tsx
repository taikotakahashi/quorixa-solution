import type { ReactNode } from "react";

type Props = { className?: string };

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
      <rect width="40" height="40" rx="4" fill="#FFEEE5" />
      {children}
    </svg>
  );
}

const stroke = "#FF7A33";

export function IconStrategy({ className }: Props) {
  return (
    <Tile className={className}>
      <circle cx="20" cy="20" r="8" stroke={stroke} strokeWidth="1.6" />
      <path d="M20 12v4M20 24v4M12 20h4M24 20h4" stroke={stroke} strokeWidth="1.6" />
    </Tile>
  );
}

export function IconInteraction({ className }: Props) {
  return (
    <Tile className={className}>
      <path
        d="M14 14l12 12M26 14L14 26"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="2" fill={stroke} />
      <circle cx="26" cy="26" r="2" fill={stroke} />
    </Tile>
  );
}

export function IconLowCode({ className }: Props) {
  return (
    <Tile className={className}>
      <rect x="11" y="13" width="18" height="14" rx="2" stroke={stroke} strokeWidth="1.6" />
      <path d="M15 18h10M15 22h6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </Tile>
  );
}

export function IconBranding({ className }: Props) {
  return (
    <Tile className={className}>
      <rect x="11" y="11" width="11" height="11" rx="1.5" stroke={stroke} strokeWidth="1.6" />
      <rect x="18" y="18" width="11" height="11" rx="1.5" stroke={stroke} strokeWidth="1.6" />
    </Tile>
  );
}

export function IconMotion({ className }: Props) {
  return (
    <Tile className={className}>
      <polygon
        points="16,12 28,20 16,28"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </Tile>
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
      <rect width="48" height="48" rx="12" fill="#FFEEE5" />
      <rect x="14" y="14" width="10" height="10" rx="1.5" stroke={stroke} strokeWidth="1.6" />
      <rect x="24" y="24" width="10" height="10" rx="1.5" stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}
