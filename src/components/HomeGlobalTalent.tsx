import { useEffect, useMemo, useState } from "react";
import { talentLocations, type TalentLocation } from "../data/careers";
import { CountryFlag } from "./CountryFlag";
import mapBg from "../assets/map-2025-scaled.webp";
import styles from "./HomeGlobalTalent.module.css";

const regions: TalentLocation["region"][] = ["Americas", "Europe", "Asia"];

function formatLocalTime(utcOffset: string) {
  const match = utcOffset.match(/UTC([+-])(\d+)(?::(\d+))?/);
  if (!match) return "--:--";
  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2]);
  const mins = Number(match[3] ?? 0);
  const totalMins = sign * (hours * 60 + mins);
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const local = new Date(utc + totalMins * 60000);
  return local.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

export function HomeGlobalTalent() {
  const [region, setRegion] = useState<TalentLocation["region"]>("Americas");
  const [activeId, setActiveId] = useState("usa");
  const [, setTick] = useState(0);

  const countries = useMemo(
    () => talentLocations.filter((l) => l.region === region),
    [region],
  );

  const active = useMemo(
    () => talentLocations.find((l) => l.id === activeId) ?? countries[0],
    [activeId, countries],
  );

  useEffect(() => {
    if (!countries.some((c) => c.id === activeId)) {
      setActiveId(countries[0]?.id ?? "usa");
    }
  }, [countries, activeId]);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className={`section section--light ${styles.section}`}>
      <div className="container">
        <div className={styles.intro}>
          <h2>Global talent supporting your growth</h2>
          <p>With 15+ global talent hubs, your time zone and budget are covered</p>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Regions">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={region === r}
              className={`${styles.tab} ${region === r ? styles.tabActive : ""}`}
              onClick={() => setRegion(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <ul className={styles.countries}>
          {countries.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className={`${styles.countryBtn} ${
                  activeId === c.id ? styles.countryBtnActive : ""
                }`}
                onClick={() => setActiveId(c.id)}
              >
                <CountryFlag id={c.id} size={24} className={styles.flagSvg} />
                <span className={styles.countryName}>{c.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.mapStage}>
          <img
            src={mapBg}
            alt=""
            className={styles.mapImage}
            draggable={false}
          />

          {talentLocations.map((loc) => (
            <button
              key={loc.id}
              type="button"
              className={`${styles.pin} ${
                loc.region === region ? styles.pinActive : styles.pinMuted
              } ${activeId === loc.id ? styles.pinSelected : ""}`}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              onClick={() => {
                setRegion(loc.region);
                setActiveId(loc.id);
              }}
              aria-label={loc.name}
            >
              <span className={styles.pinRipple} />
              <span className={styles.pinDot} />
            </button>
          ))}

          {active && (
            <div
              className={styles.tooltip}
              style={{ left: `${active.x}%`, top: `${active.y}%` }}
            >
              <div className={styles.tooltipInner}>
                <CountryFlag id={active.id} size={22} />
                <p className={styles.tooltipMeta}>
                  {active.utcOffset} | Time: {formatLocalTime(active.utcOffset)}
                </p>
                <strong className={styles.tooltipName}>{active.name}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
