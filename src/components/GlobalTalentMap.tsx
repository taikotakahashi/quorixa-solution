import { useMemo, useState } from "react";
import { talentLocations, type TalentLocation } from "../data/careers";
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
                        {loc.flag}
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
          <svg
            className={styles.world}
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <pattern
                id="mapDots"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.35" fill="#c5c5c5" />
              </pattern>
            </defs>
            {/* Simplified continent silhouettes filled with dots */}
            <g fill="url(#mapDots)">
              {/* North America */}
              <path d="M80 90 C140 70 200 75 250 110 C290 145 300 190 270 230 C240 265 190 275 150 250 C110 225 70 180 65 140 C60 110 70 95 80 90Z" />
              {/* Central/South America */}
              <path d="M220 260 C245 270 265 300 275 340 C285 390 270 440 245 455 C220 468 205 440 200 400 C195 360 200 310 210 280 C214 268 216 262 220 260Z" />
              {/* Europe */}
              <path d="M470 120 C510 105 545 110 565 135 C580 155 575 180 555 195 C530 210 500 205 480 185 C460 165 455 140 470 120Z" />
              {/* Africa */}
              <path d="M480 210 C530 205 565 230 575 280 C585 340 560 390 520 405 C480 418 455 380 450 330 C445 280 455 230 480 210Z" />
              {/* Asia */}
              <path d="M580 100 C680 80 780 100 820 150 C850 190 840 240 800 270 C740 310 660 300 610 260 C570 230 555 170 580 100Z" />
              {/* India extension */}
              <path d="M680 270 C710 275 725 310 715 345 C705 370 680 375 670 350 C660 320 665 285 680 270Z" />
              {/* Australia */}
              <path d="M800 360 C850 350 900 365 910 395 C915 420 880 435 845 430 C810 425 790 400 800 360Z" />
            </g>
          </svg>

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
              <span className={styles.tooltipFlag}>{active.flag}</span>
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
