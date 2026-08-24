import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ASSETS } from "../assets";
import styles from "./PageLoader.module.css";

const BOOT_MS = 500;
const BOOT_EXIT_MS = 520;
const ROUTE_MS = 500;
const ROUTE_EXIT_MS = 380;

function LoaderBadge({ duration }: { duration: number }) {
  return (
    <div className={styles.badge}>
      <span className={styles.ripple} />
      <span className={`${styles.ripple} ${styles.rippleLate}`} />
      <div className={styles.badgeInner}>
        <img src={ASSETS.logo} alt="QUORIXA" className={styles.logo} />
        <div className={styles.bar} aria-hidden="true">
          <span
            className={styles.fill}
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
}

function LoaderDots() {
  return (
    <div className={styles.dots} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export function OverlayScreen({
  leaving = false,
  duration,
}: {
  leaving?: boolean;
  duration: number;
}) {
  return (
    <div
      className={`${styles.overlay} ${leaving ? styles.leaving : ""}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading QUORIXA"
    >
      <LoaderBadge duration={duration} />
      <LoaderDots />
    </div>
  );
}

export function RouteTransition() {
  const location = useLocation();
  const skipFirst = useRef(true);
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }

    setLeaving(false);
    setActive(true);
    setCycle((n) => n + 1);

    const hold = window.setTimeout(() => {
      setLeaving(true);
      window.setTimeout(() => setActive(false), ROUTE_EXIT_MS);
    }, ROUTE_MS);

    return () => window.clearTimeout(hold);
  }, [location.pathname]);

  if (!active) return null;
  return <OverlayScreen key={cycle} leaving={leaving} duration={ROUTE_MS} />;
}

export function RouteFallback() {
  return <OverlayScreen duration={ROUTE_MS} />;
}

export function BootGate({ children }: { children: ReactNode }) {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("is-booting");
    document.getElementById("boot-splash")?.remove();

    const start = performance.now();
    let exitTimer = 0;
    let holdTimer = 0;

    const finish = () => {
      const wait = Math.max(0, BOOT_MS - (performance.now() - start));
      holdTimer = window.setTimeout(() => {
        setLeaving(true);
        exitTimer = window.setTimeout(() => {
          setDone(true);
          document.documentElement.classList.remove("is-booting");
          document.documentElement.classList.add("is-ready");
        }, BOOT_EXIT_MS);
      }, wait);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(finish).catch(finish);
    } else {
      finish();
    }

    return () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(exitTimer);
      document.documentElement.classList.remove("is-booting");
    };
  }, []);

  return (
    <>
      {!done && <OverlayScreen leaving={leaving} duration={BOOT_MS} />}
      {children}
    </>
  );
}
