import { useMemo, useState } from "react";
import { talentLocations, type TalentLocation } from "../data/careers";
import { CountryFlag } from "./CountryFlag";
import mapBg from "../assets/map-2025-scaled.webp";
import styles from "./GlobalTalentMap.module.css";

const regions: TalentLocation["region"][] = ["Americas", "Europe", "Asia"];

export function GlobalTalentMap() {
  const [activeId, setActiveId] = useState("usa");
  const active = useMemo(
    () => talentLocations.find((l) => l.id === activeId) ?? talentLocations[0],
    [activeId]
  );

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Locations">
        {regions.map((region) => (
          <div key={region} className={styles.region}>
            <h3 className={styles.regionTitle}>{region}</h3>
            <ul className={styles.list}>
              {talentLocations
                .filter((l) => l.region === region)
                .map((loc) => (
                  <li key={loc.id}>
                    <button
                      type="button"
                      className={`${styles.countryBtn} ${
                        activeId === loc.id ? styles.countryActive : ""
                      }`}
                      onClick={() => setActiveId(loc.id)}
                      aria-pressed={activeId === loc.id}
                    >
                      <span className={styles.flag} aria-hidden>
                        <CountryFlag id={loc.id} size={22} />
                      </span>
                      {loc.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </aside>

      <div className={styles.mapPanel}>
        <div className={styles.mapCanvas} role="img" aria-label="Global talent map">
          <img src={mapBg} alt="" className={styles.mapImage} draggable={false} />

          {talentLocations.map((loc) => (
            <button
              key={loc.id}
              type="button"
              className={`${styles.marker} ${
                activeId === loc.id ? styles.markerActive : ""
              }`}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              onClick={() => setActiveId(loc.id)}
              aria-label={`${loc.name}, ${loc.openRoles} open positions`}
            >
              <span className={styles.ripple} />
              <span className={styles.ripple} />
              <span className={styles.dot} />
            </button>
          ))}

          <div
            className={styles.tooltip}
            style={{ left: `${active.x}%`, top: `${active.y}%` }}
          >
            <div className={styles.tooltipInner}>
              <span className={styles.tooltipFlag}>
                  <CountryFlag id={active.id} size={20} />
                </span>
              <div>
                <strong>
                  {active.name} <span aria-hidden>→</span>
                </strong>
                <span>
                  {active.openRoles} open position
                  {active.openRoles === 1 ? "" : "s"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
