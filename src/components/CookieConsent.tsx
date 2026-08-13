import { useEffect, useId, useState } from "react";
import { ChevronRight, Cookie, X } from "lucide-react";
import styles from "./CookieConsent.module.css";

type Prefs = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  performance: boolean;
};

const STORAGE_KEY = "quorixa-cookie-consent";

const defaultPrefs: Prefs = {
  necessary: true,
  functional: false,
  analytics: false,
  performance: false,
};

type Category = {
  key: keyof Prefs;
  title: string;
  description: string;
  locked?: boolean;
};

const categories: Category[] = [
  {
    key: "necessary",
    title: "Necessary",
    description:
      "Necessary cookies are required to enable basic website functionality and cannot be switched off. They are usually only set in response to actions you take, such as setting privacy preferences, logging in, or filling in forms.",
    locked: true,
  },
  {
    key: "functional",
    title: "Functional",
    description:
      "Functional cookies help perform certain functionalities like sharing content on social platforms, collecting feedback, and enabling third-party features.",
  },
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as number of visitors, bounce rate, and traffic source.",
  },
  {
    key: "performance",
    title: "Performance",
    description:
      "Performance cookies are used to understand and analyze key performance indexes of the website, which helps deliver a better user experience for visitors.",
  },
];

function readSaved(): Prefs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Prefs;
    return {
      necessary: true,
      functional: !!parsed.functional,
      analytics: !!parsed.analytics,
      performance: !!parsed.performance,
    };
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [banner, setBanner] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [openCat, setOpenCat] = useState<string>("necessary");
  const [showMore, setShowMore] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const saved = readSaved();
    if (saved) {
      setPrefs(saved);
      return;
    }
    const t = window.setTimeout(() => setBanner(true), 500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!customize) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCustomize(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [customize]);

  const openCustomize = () => {
    const saved = readSaved();
    if (saved) setPrefs(saved);
    setBanner(false);
    setCustomize(true);
  };

  const persist = (next: Prefs) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...next, at: Date.now() })
      );
    } catch {
      /* ignore */
    }
    setPrefs(next);
    setBanner(false);
    setCustomize(false);
  };

  const acceptAll = () =>
    persist({
      necessary: true,
      functional: true,
      analytics: true,
      performance: true,
    });

  const rejectAll = () => persist(defaultPrefs);
  const savePrefs = () => persist(prefs);

  return (
    <>
      <button
        type="button"
        className={styles.fab}
        onClick={openCustomize}
        aria-label="Cookie preferences"
        title="Cookie preferences"
      >
        <Cookie size={22} strokeWidth={2.2} />
      </button>

      {banner && !customize && (
        <div className={styles.banner} role="dialog" aria-label="Cookie notice">
          <div className={styles.bannerInner}>
            <p>
              We use cookies to improve your experience and analyze site traffic.
              You can accept all cookies, reject non-essential ones, or customize
              your preferences.
            </p>
            <div className={styles.bannerActions}>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={openCustomize}
              >
                Customize
              </button>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={rejectAll}
              >
                Reject All
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={acceptAll}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {customize && (
        <div className={styles.overlay} onClick={() => setCustomize(false)}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 id={titleId}>Customize Consent Preferences</h2>
              <button
                type="button"
                className={styles.close}
                onClick={() => setCustomize(false)}
                aria-label="Close preferences"
              >
                <X size={16} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.intro}>
                We use cookies to help you navigate efficiently and perform
                certain functions. You will find detailed information about all
                cookies under each consent category below.
              </p>
              {showMore ? (
                <p className={styles.intro}>
                  The cookies that are categorized as &quot;Necessary&quot; are
                  stored on your browser as they are essential for enabling the
                  basic functionalities of the site. We also use third-party
                  cookies that help us analyze how you use this website.
                </p>
              ) : null}
              <button
                type="button"
                className={styles.showMore}
                onClick={() => setShowMore((v) => !v)}
              >
                {showMore ? "Show less" : "Show more"}
              </button>

              <div className={styles.list}>
                {categories.map((cat) => {
                  const expanded = openCat === cat.key;
                  const enabled = prefs[cat.key];
                  return (
                    <div key={cat.key} className={styles.item}>
                      <div className={styles.itemRow}>
                        <button
                          type="button"
                          className={styles.itemToggle}
                          aria-expanded={expanded}
                          onClick={() =>
                            setOpenCat(expanded ? "" : cat.key)
                          }
                        >
                          <ChevronRight
                            size={16}
                            className={expanded ? styles.chevOpen : ""}
                          />
                          <span>{cat.title}</span>
                        </button>

                        {cat.locked ? (
                          <span className={styles.always}>Always Active</span>
                        ) : (
                          <button
                            type="button"
                            role="switch"
                            aria-checked={enabled}
                            aria-label={`${cat.title} cookies`}
                            className={`${styles.switch} ${enabled ? styles.switchOn : ""}`}
                            onClick={() =>
                              setPrefs((p) => ({
                                ...p,
                                [cat.key]: !p[cat.key],
                              }))
                            }
                          >
                            <span className={styles.knob} />
                          </button>
                        )}
                      </div>
                      {expanded && (
                        <p className={styles.itemDesc}>{cat.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <div className={styles.footerBtns}>
                <button
                  type="button"
                  className={styles.btnOutline}
                  onClick={rejectAll}
                >
                  Reject All
                </button>
                <button
                  type="button"
                  className={styles.btnOutline}
                  onClick={savePrefs}
                >
                  Save My Preferences
                </button>
                <button
                  type="button"
                  className={styles.btnAccept}
                  onClick={acceptAll}
                >
                  Accept All
                </button>
              </div>
            </div>
            <div className={styles.poweredBar}>
              <span>
                Powered by <strong>QUORIXA</strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
