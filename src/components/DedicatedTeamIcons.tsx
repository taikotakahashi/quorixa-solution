import type { ReactNode } from "react";

/** Peach-tile icons matching the dedicated-teams reference. */

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

export function IconBackend({ className }: Props) {
  return (
    <Tile className={className}>
      <path
        d="M12 14h16M12 20h16M12 26h10"
        stroke="#FF7A33"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Tile>
  );
}

export function IconFrontend({ className }: Props) {
  return (
    <Tile className={className}>
      <rect
        x="10"
        y="12"
        width="20"
        height="16"
        rx="2"
        stroke="#FF7A33"
        strokeWidth="1.6"
      />
      <path d="M10 16h20" stroke="#FF7A33" strokeWidth="1.6" />
    </Tile>
  );
}

export function IconMobile({ className }: Props) {
  return (
    <Tile className={className}>
      <rect
        x="14"
        y="10"
        width="12"
        height="20"
        rx="2"
        stroke="#FF7A33"
        strokeWidth="1.6"
      />
      <circle cx="20" cy="26.5" r="1" fill="#FF7A33" />
    </Tile>
  );
}

export function IconQa({ className }: Props) {
  return (
    <Tile className={className}>
      <path
        d="M13 15h14M13 20h14M13 25h8"
        stroke="#FF7A33"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M26 23.5l1.5 1.5 3-3"
        stroke="#FF7A33"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Tile>
  );
}

export function IconDataMl({ className }: Props) {
  return (
    <Tile className={className}>
      <ellipse cx="20" cy="13" rx="8" ry="3" stroke="#FF7A33" strokeWidth="1.6" />
      <path
        d="M12 13v10c0 1.7 3.6 3 8 3s8-1.3 8-3V13"
        stroke="#FF7A33"
        strokeWidth="1.6"
      />
      <path d="M12 18c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="#FF7A33" strokeWidth="1.6" />
    </Tile>
  );
}

export function IconDesign({ className }: Props) {
  return (
    <Tile className={className}>
      <rect
        x="11"
        y="11"
        width="11"
        height="11"
        rx="1.5"
        stroke="#FF7A33"
        strokeWidth="1.6"
      />
      <rect
        x="18"
        y="18"
        width="11"
        height="11"
        rx="1.5"
        stroke="#FF7A33"
        strokeWidth="1.6"
      />
    </Tile>
  );
}

export function IconScale({ className }: Props) {
  return (
    <Tile className={className}>
      <path
        d="M12 26V18M17 26V14M22 26V16M27 26V12"
        stroke="#FF7A33"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Tile>
  );
}

export function IconPerson({ className }: Props) {
  return (
    <Tile className={className}>
      <circle cx="20" cy="15" r="4" stroke="#FF7A33" strokeWidth="1.6" />
      <path
        d="M12 28c1.5-4 4.5-6 8-6s6.5 2 8 6"
        stroke="#FF7A33"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Tile>
  );
}

export function IconClock({ className }: Props) {
  return (
    <Tile className={className}>
      <circle cx="20" cy="20" r="8" stroke="#FF7A33" strokeWidth="1.6" />
      <path
        d="M20 15v5l3.5 2"
        stroke="#FF7A33"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Tile>
  );
}

export function IconSearch({ className }: Props) {
  return (
    <Tile className={className}>
      <circle cx="18" cy="18" r="6" stroke="#FF7A33" strokeWidth="1.6" />
      <path
        d="M23 23l5 5"
        stroke="#FF7A33"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Tile>
  );
}

export function IconTeam({ className }: Props) {
  return (
    <Tile className={className}>
      <circle cx="15" cy="16" r="3.2" stroke="#FF7A33" strokeWidth="1.5" />
      <circle cx="25" cy="16" r="3.2" stroke="#FF7A33" strokeWidth="1.5" />
      <path
        d="M9 28c1-3.2 3.2-5 6-5s5 1.8 6 5M19 28c1-3.2 3.2-5 6-5s5 1.8 6 5"
        stroke="#FF7A33"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Tile>
  );
}

export function IconPuzzle({ className }: Props) {
  return (
    <Tile className={className}>
      <path
        d="M14 14h5v3a2 2 0 104 0v-3h3v5h3a2 2 0 110 4h-3v5h-5v-3a2 2 0 10-4 0v3h-5v-5H11a2 2 0 110-4h3v-5z"
        stroke="#FF7A33"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </Tile>
  );
}

export function IconCheckCircle({ className }: Props) {
  return (
    <Tile className={className}>
      <circle cx="20" cy="20" r="8" stroke="#FF7A33" strokeWidth="1.6" />
      <path
        d="M15.5 20.2l2.8 2.8 6.2-6.2"
        stroke="#FF7A33"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Tile>
  );
}

export function IconStep({ n, className }: Props & { n: number }) {
  return (
    <svg
      className={className}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="25" height="25" rx="4" fill="#FF7A33" />
      <text
        x="12.5"
        y="17"
        textAnchor="middle"
        fill="#fff"
        fontSize="13"
        fontFamily="Montserrat, Inter, sans-serif"
        fontWeight="800"
      >
        {n}
      </text>
    </svg>
  );
}
