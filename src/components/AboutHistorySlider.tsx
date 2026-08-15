import { useEffect, useRef, useState } from "react";
import styles from "./AboutHistorySlider.module.css";

export type HistoryMilestone = {
  year: string;
  items: string[];
};

type Props = {
  items: HistoryMilestone[];
};

export function AboutHistorySlider({ items }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const drag = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });

  const syncProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    setMaxScroll(max);
    setProgress(max === 0 ? 0 : el.scrollLeft / max);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncProgress();
    const onScroll = () => syncProgress();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => syncProgress());
    ro.observe(el);
    window.addEventListener("resize", syncProgress);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", syncProgress);
    };
  }, [items.length]);

  const setScrollRatio = (ratio: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    el.scrollLeft = Math.max(0, Math.min(1, ratio)) * max;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      pointerId: e.pointerId,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    el.scrollLeft = drag.current.scrollLeft - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    try {
      el.releasePointerCapture(drag.current.pointerId);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={styles.wrap}>
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {items.map((item) => (
          <article key={item.year} className={styles.slide}>
            <div className={styles.card}>
              <ul>
                {item.items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className={styles.marker}>
              <span className={styles.yearBubble}>{item.year}</span>
            </div>
          </article>
        ))}
        <div className={styles.axis} aria-hidden />
      </div>

      <div className={styles.scrollbar}>
        <input
          className={styles.range}
          type="range"
          min={0}
          max={1000}
          step={1}
          value={Math.round(progress * 1000)}
          aria-label="Scroll company history"
          disabled={maxScroll <= 0}
          onChange={(e) => setScrollRatio(Number(e.target.value) / 1000)}
        />
      </div>
    </div>
  );
}
