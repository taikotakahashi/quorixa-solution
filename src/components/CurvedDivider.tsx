type Props = {
  from?: "white" | "light" | "black";
  to?: "white" | "light" | "black";
  invert?: boolean;
  /** SVG render height in px */
  height?: number;
};

const colors = {
  white: "#ffffff",
  light: "#f2f2f2",
  black: "#050505",
};

export function CurvedDivider({
  from = "white",
  to = "light",
  invert = false,
  height = 48,
}: Props) {
  const fill = colors[to];
  return (
    <div
      aria-hidden
      style={{
        lineHeight: 0,
        marginTop: "-1px",
        background: colors[from],
        transform: invert ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        style={{ width: "100%", height, display: "block" }}
      >
        <path
          d="M0,0 C360,64 1080,64 1440,0 L1440,64 L0,64 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
