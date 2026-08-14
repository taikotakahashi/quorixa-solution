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
      <rect width="40" height="40" rx="4" fill="#E8F1FF" />
      {children}
    </svg>
  );
}

const stroke = "#3056D3";

export function IconDataEngineering({ className }: Props) {
  return (
    <Tile className={className}>
      <ellipse cx="20" cy="14" rx="8" ry="3" stroke={stroke} strokeWidth="1.6" />
      <path
        d="M12 14v10c0 1.7 3.6 3 8 3s8-1.3 8-3V14"
        stroke={stroke}
        strokeWidth="1.6"
      />
      <path d="M12 19c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke={stroke} strokeWidth="1.6" />
    </Tile>
  );
}

export function IconPerformance({ className }: Props) {
  return (
    <Tile className={className}>
      <path
        d="M12 26V18M17 26V14M22 26V16M27 26V12"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Tile>
  );
}

export function IconVisualization({ className }: Props) {
  return (
    <Tile className={className}>
      <rect x="11" y="22" width="4" height="7" rx="1" fill={stroke} />
      <rect x="18" y="17" width="4" height="12" rx="1" fill={stroke} />
      <rect x="25" y="13" width="4" height="16" rx="1" fill={stroke} />
    </Tile>
  );
}

export function IconDataScience({ className }: Props) {
  return (
    <Tile className={className}>
      <path
        d="M12 24c3-6 6-9 8-9s5 3 8 9"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="20" cy="15" r="3" stroke={stroke} strokeWidth="1.6" />
    </Tile>
  );
}

export function IconAdvantage({ kind, className }: Props & { kind: number }) {
  const paths: Record<number, ReactNode> = {
    0: (
      <path
        d="M12 26V18M17 26V14M22 26V16M27 26V12"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
    1: (
      <path
        d="M14 20l3 3 9-9"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    2: (
      <>
        <circle cx="20" cy="16" r="4" stroke="#fff" strokeWidth="1.6" />
        <path
          d="M12 28c1.5-4 4.5-6 8-6s6.5 2 8 6"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
    3: (
      <circle cx="20" cy="20" r="8" stroke="#fff" strokeWidth="1.6" />
    ),
    4: (
      <path
        d="M14 14h12v12H14zM18 18h4v4h-4z"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
    5: (
      <path
        d="M12 20h16M20 12v16"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
  };

  return (
    <svg {...tile} className={className}>
      <rect width="40" height="40" rx="4" fill="rgba(255,255,255,0.08)" />
      {paths[kind]}
    </svg>
  );
}

export function IconStepBlue({ n, className }: Props & { n: number }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="28" height="28" rx="4" fill="#3056D3" />
      <text
        x="14"
        y="19"
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
