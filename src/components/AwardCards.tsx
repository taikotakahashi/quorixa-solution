import { useRef } from "react";
import { awards, certifications } from "../data/content";
import styles from "./AwardCards.module.css";

type Props = {
  showCertifications?: boolean;
  fullWidth?: boolean;
  /** Max height for award logos inside cards (px) */
  logoHeight?: number;
};

export function AwardCards({
  showCertifications = true,
  fullWidth = false,
  logoHeight = 120,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || e.button !== 0) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      pointerId: e.pointerId,
    };
    el.setPointerCapture(e.pointerId);
    el.classList.add(styles.dragging);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    el.scrollLeft = drag.current.scrollLeft - dx;
  };

  const endDrag = () => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    el.classList.remove(styles.dragging);
    try {
      el.releasePointerCapture(drag.current.pointerId);
    } catch {
      /* already released */
    }
  };

  return (
    <div className={`${styles.root} ${fullWidth ? styles.fullWidth : ""}`}>
      <div className={styles.wrap}>
        <div
          className={styles.track}
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {awards.map((award) => (
            <article
              key={award.title + award.logoSrc}
              className={styles.card}
              style={{ background: award.color }}
            >
              <p className={styles.title}>{award.title}</p>
              <div className={styles.brand}>
                <img
                  src={award.logoSrc}
                  alt=""
                  className={styles.awardLogo}
                  style={{ maxHeight: logoHeight }}
                  draggable={false}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      {showCertifications && (
        <div className={styles.footer}>
          <div className={styles.certs}>
            <h3 className={styles.certsLabel}>Certifications and recognition</h3>
            <div className={styles.certList}>
              {certifications.map((item) => (
                <img
                  key={item.id}
                  src={item.src}
                  alt={item.label}
                  className={styles.certLogo}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
