import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { ChevronDown } from "lucide-react";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { caseStudies } from "../data/caseStudies";
import styles from "./OurWork.module.css";

const SERVICE_OPTIONS = [
  "AI Studio",
  "Backend",
  "Data Studio",
  "Design Studio",
  "Front-end",
  "Mobile",
  "Quality Studio",
] as const;

const INDUSTRY_OPTIONS = [
  "Agriculture",
  "Automotive",
  "Education",
  "Energy & Resources",
  "Financial Services",
  "Fitness & Wellness",
  "Healthcare & Pharma",
  "Human Capital",
  "Insurance",
  "Legal",
  "Logistics & Delivery",
  "Manufacturing",
  "Marketing",
  "Media",
  "Private Equity",
  "Real Estate",
  "Retail & Ecommerce",
  "Tech & Software",
  "Telecom",
  "Travel",
] as const;

type FilterPanel = "services" | "industries" | null;

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function matchesService(tags: { label: string }[], selected: string[]) {
  if (selected.length === 0) return true;
  const labels = tags.map((t) => normalize(t.label));
  return selected.some((service) => {
    const key = normalize(service);
    return labels.some(
      (label) => label === key || label.includes(key) || key.includes(label),
    );
  });
}

function matchesIndustry(industry: string | undefined, selected: string[]) {
  if (selected.length === 0) return true;
  if (!industry) return false;
  const value = normalize(industry);
  return selected.some((item) => {
    const key = normalize(item);
    return value === key || value.includes(key) || key.includes(value);
  });
}

function toggleValue(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function OurWork() {
  const [openPanel, setOpenPanel] = useState<FilterPanel>(null);
  const [services, setServices] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  const industryOptions = useMemo(() => {
    const fromData = caseStudies
      .map((study) => study.industry)
      .filter((value): value is string => Boolean(value));
    return Array.from(new Set([...INDUSTRY_OPTIONS, ...fromData]));
  }, []);

  const filtered = useMemo(
    () =>
      caseStudies.filter(
        (study) =>
          matchesService(study.tags, services) &&
          matchesIndustry(study.industry, industries),
      ),
    [services, industries],
  );

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setOpenPanel(null);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPanel(null);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function onTogglePanel(
    panel: Exclude<FilterPanel, null>,
    event: ReactMouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation();
    setOpenPanel((current) => (current === panel ? null : panel));
  }

  const hasFilters = services.length > 0 || industries.length > 0;

  return (
    <>
      <section className={`${styles.hero} grid-bg`}>
        <div className="container">
          <Reveal>
            <div className={styles.heroInner}>
              <span className={styles.heroLabel}>Portfolio</span>
              <h1 className={styles.heroTitle}>Explore our work in action</h1>
              <p className={styles.heroDesc}>
                Solve industry challenges, drive growth, and build award-winning
                products with QUORIXA. See how startups and Fortune 500 companies
                do it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.workSection}>
        <div className="container">
          <div className={styles.filterBarWrap} ref={filterRef}>
            <div className={styles.filterBar}>
              <div className={styles.filterControl}>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${
                    openPanel === "services" || services.length > 0
                      ? styles.filterBtnActive
                      : ""
                  }`}
                  aria-expanded={openPanel === "services"}
                  aria-haspopup="listbox"
                  onClick={(event) => onTogglePanel("services", event)}
                >
                  <span>
                    Filter by Services{" "}
                    <span className={styles.count}>{services.length}</span>
                  </span>
                  <ChevronDown size={16} strokeWidth={2.2} />
                </button>
                {openPanel === "services" && (
                  <div className={styles.dropdown} role="listbox">
                    {SERVICE_OPTIONS.map((option) => (
                      <label key={option} className={styles.checkItem}>
                        <input
                          type="checkbox"
                          checked={services.includes(option)}
                          onChange={() =>
                            setServices((current) =>
                              toggleValue(current, option),
                            )
                          }
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.filterControl}>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${
                    openPanel === "industries" || industries.length > 0
                      ? styles.filterBtnActive
                      : ""
                  }`}
                  aria-expanded={openPanel === "industries"}
                  aria-haspopup="listbox"
                  onClick={(event) => onTogglePanel("industries", event)}
                >
                  <span>
                    Filter by Industries{" "}
                    <span className={styles.count}>{industries.length}</span>
                  </span>
                  <ChevronDown size={16} strokeWidth={2.2} />
                </button>
                {openPanel === "industries" && (
                  <div
                    className={`${styles.dropdown} ${styles.dropdownWide}`}
                    role="listbox"
                  >
                    {industryOptions.map((option) => (
                      <label key={option} className={styles.checkItem}>
                        <input
                          type="checkbox"
                          checked={industries.includes(option)}
                          onChange={() =>
                            setIndustries((current) =>
                              toggleValue(current, option),
                            )
                          }
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {hasFilters && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => {
                  setServices([]);
                  setIndustries([]);
                }}
              >
                Clear All
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className={styles.empty}>
              No case studies found. Try adjusting your filters or click “Clear
              All” to see more results.
            </p>
          ) : (
            <div className={styles.grid}>
              {filtered.map((study) => (
                <Reveal key={study.id}>
                  <CaseStudyCard study={study} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Have a product challenge like these?"
        description="Tell us what you're building — we'll assemble the right specialists."
        ctaLabel="Book a consultation"
        ctaHref="/contact"
      />
    </>
  );
}
