import { useEffect, useId, useState } from "react";
import { Accessibility, Contrast, Type, X } from "lucide-react";
import styles from "./AccessibilityButton.module.css";

export function AccessibilityButton() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const setTextSize = (size: "normal" | "large") => {
    document.documentElement.style.fontSize = size === "large" ? "112.5%" : "";
  };

  const toggleContrast = () => {
    document.body.classList.toggle("a11y-contrast");
  };

  return (
    <div className={styles.root}>
      {open && (
        <div
          id={panelId}
          className={styles.panel}
          role="dialog"
          aria-label="Accessibility options"
        >
          <div className={styles.panelHeader}>
            <strong>Accessibility</strong>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close accessibility options"
            >
              <X size={16} />
            </button>
          </div>
          <button type="button" className={styles.option} onClick={() => setTextSize("large")}>
            <Type size={16} /> Larger text
          </button>
          <button type="button" className={styles.option} onClick={() => setTextSize("normal")}>
            <Type size={16} /> Default text
          </button>
          <button type="button" className={styles.option} onClick={toggleContrast}>
            <Contrast size={16} /> High contrast
          </button>
        </div>
      )}
      <button
        type="button"
        className={styles.btn}
        aria-label="Accessibility options"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <Accessibility size={20} strokeWidth={2.2} aria-hidden />
      </button>
    </div>
  );
}
