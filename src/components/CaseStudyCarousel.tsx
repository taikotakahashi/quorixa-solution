import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";
import { CaseStudyCard } from "./CaseStudyCard";
import styles from "./CaseStudyCarousel.module.css";

type Props = {
  studies: CaseStudy[];
  fullWidth?: boolean;
};

/** Triple the list so we can loop endlessly left/right. */
const LOOP_COPIES = 3;

export function CaseStudyCarousel({ studies, fullWidth = false }: Props) {
  const n = studies.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeReal, setActiveReal] = useState(0);
  const [activeAbs, setActiveAbs] = useState(n); // start in middle copy
  const jumping = useRef(false);
  const scrollSettle = useRef<number | null>(null);
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });

  const looped = Array.from({ length: LOOP_COPIES }, (_, copy) =>
    studies.map((study, i) => ({
      study,
      key: `${copy}-${study.id}`,
      absIndex: copy * n + i,
      realIndex: i,
    })),
  ).flat();

  const getSlides = () =>
    Array.from(
      trackRef.current?.querySelectorAll<HTMLElement>(`.${styles.slide}`) ?? [],
    );

  const scrollToAbs = (absIndex: number, behavior: ScrollBehavior = "smooth") => {
    const el = trackRef.current;
    const slide = getSlides()[absIndex];
    if (!el || !slide) return;
    const left = slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2;
    el.scrollTo({ left, behavior });
  };

  /** If we landed in the first/third clone, jump to the matching middle slide. */
  const normalizeLoop = (absIndex: number) => {
    if (n <= 1) return absIndex;
    const el = trackRef.current;
    if (!el) return absIndex;

    let next = absIndex;
    if (absIndex < n) {
      next = absIndex + n;
    } else if (absIndex >= n * 2) {
      next = absIndex - n;
    } else {
      return absIndex;
    }

    jumping.current = true;
    scrollToAbs(next, "auto");
    requestAnimationFrame(() => {
      jumping.current = false;
    });
    return next;
  };

  const findNearestAbs = () => {
    const el = trackRef.current;
    if (!el) return n;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    getSlides().forEach((slide, i) => {
      const mid = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(mid - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  };

  const syncActive = (absIndex: number) => {
    const normalized = normalizeLoop(absIndex);
    setActiveAbs(normalized);
    setActiveReal(((normalized % n) + n) % n);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el || n === 0) return;

    const frame = requestAnimationFrame(() => {
      scrollToAbs(n, "auto");
      setActiveAbs(n);
      setActiveReal(0);
    });

    const onResize = () => {
      scrollToAbs(activeAbs, "auto");
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  const goToReal = (realIndex: number) => {
    // Prefer middle copy for smooth sequential movement
    const abs = n + realIndex;
    scrollToAbs(abs, "smooth");
    setActiveAbs(abs);
    setActiveReal(realIndex);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || e.button !== 0) return;
    drag.current = {
      active: true,
      moved: false,
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
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    el.classList.remove(styles.dragging);
    try {
      el.releasePointerCapture(drag.current.pointerId);
    } catch {
      /* already released */
    }

    requestAnimationFrame(() => {
      const nearest = findNearestAbs();
      scrollToAbs(nearest, "smooth");
      // After smooth snap settles, normalize clone position
      window.setTimeout(() => {
        syncActive(findNearestAbs());
      }, 320);
      setActiveAbs(nearest);
      setActiveReal(((nearest % n) + n) % n);
    });

    if (drag.current.moved) {
      e.preventDefault();
    }
  };

  const onScroll = () => {
    if (jumping.current || drag.current.active) return;
    const nearest = findNearestAbs();
    setActiveAbs(nearest);
    setActiveReal(((nearest % n) + n) % n);

    if (scrollSettle.current != null) window.clearTimeout(scrollSettle.current);
    scrollSettle.current = window.setTimeout(() => {
      if (!drag.current.active) syncActive(findNearestAbs());
    }, 140);
  };

  const onScrollEnd = () => {
    if (jumping.current || drag.current.active) return;
    if (scrollSettle.current != null) window.clearTimeout(scrollSettle.current);
    syncActive(findNearestAbs());
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  if (n === 0) return null;

  return (
    <div className={`${styles.wrap} ${fullWidth ? styles.fullWidth : ""}`}>
      <div
        className={styles.track}
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onScroll={onScroll}
        onScrollEnd={onScrollEnd}
      >
        {looped.map(({ study, key, absIndex, realIndex }) => (
          <div
            key={key}
            className={`${styles.slide} ${
              activeAbs === absIndex ? styles.slideActive : ""
            }`}
            data-real={realIndex}
          >
            <CaseStudyCard study={study} />
          </div>
        ))}
      </div>

      <div className={styles.dots} role="tablist" aria-label="Case study slides">
        {studies.map((study, i) => (
          <button
            key={study.id}
            type="button"
            role="tab"
            aria-selected={activeReal === i}
            className={`${styles.dot} ${activeReal === i ? styles.dotActive : ""}`}
            onClick={() => goToReal(i)}
            aria-label={`Go to case ${i + 1}`}
          />
        ))}
      </div>

      <div className={styles.footerLink}>
        <Link to="/our-work">
          See all cases <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
