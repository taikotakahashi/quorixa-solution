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

export function CaseStudyCarousel({ studies, fullWidth = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });

  const getSlides = () =>
    Array.from(
      ref.current?.querySelectorAll<HTMLElement>(`.${styles.slide}`) ?? [],
    );

  const scrollToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    const el = ref.current;
    const slide = getSlides()[index];
    if (!el || !slide) return;
    const left =
      slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2;
    el.scrollTo({ left, behavior });
  };

  const updateActiveFromScroll = () => {
    const el = ref.current;
    if (!el) return;
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
    setActive(best);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => updateActiveFromScroll();
    el.addEventListener("scroll", onScroll, { passive: true });

    // Center the first slide on mount / resize
    const frame = requestAnimationFrame(() => scrollToIndex(0, "auto"));
    const onResize = () => scrollToIndex(active, "auto");
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studies.length]);

  const goTo = (index: number) => {
    scrollToIndex(index, "smooth");
    setActive(index);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
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
    const el = ref.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    el.classList.remove(styles.dragging);
    try {
      el.releasePointerCapture(drag.current.pointerId);
    } catch {
      /* already released */
    }

    updateActiveFromScroll();
    // Snap to nearest after measuring
    requestAnimationFrame(() => {
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
      scrollToIndex(best, "smooth");
      setActive(best);
    });

    if (drag.current.moved) {
      e.preventDefault();
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className={`${styles.wrap} ${fullWidth ? styles.fullWidth : ""}`}>
      <div
        className={styles.track}
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {studies.map((study, i) => (
          <div
            key={study.id}
            className={`${styles.slide} ${active === i ? styles.slideActive : ""}`}
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
            aria-selected={active === i}
            className={`${styles.dot} ${active === i ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
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
