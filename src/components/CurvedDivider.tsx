type Props = {
  from?: "white" | "light" | "black";
  to?: "white" | "light" | "black";
  invert?: boolean;
};

const colors = {
  white: "#ffffff",
  light: "#f3f3f3",
  black: "#050505",
};

export function CurvedDivider({ from = "white", to = "light", invert = false }: Props) {
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
        style={{ width: "100%", height: 48, display: fill }}
      >
        <path d="M0,0 C360,64 1080,64 1440,0 L1440,64 L0,64 Z" />
      </svg>
    </div>
  );
}
