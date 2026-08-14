import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
  disabled?: boolean;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  arrow = false,
  className = "",
  type = "button",
  ariaLabel,
  disabled = false,
}: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${disabled ? styles.disabled : ""} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight size={16} strokeWidth={2.2} />}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          aria-label={ariaLabel}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
