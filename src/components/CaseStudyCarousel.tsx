import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";
import { CaseStudyCard } from "./CaseStudyCard";
import styles from "./CaseStudyCarousel.module.css";

type Props = {
  studies: CaseStudy[];
};

const GAP = 24;

export function CaseStudyCarousel({ studies }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });

  const getStep = () => {
    const el = ref.current;
    const slide = el?.querySelector(`.${styles.slide}`) as HTMLElement | null;
    if (!el || !slide) return 0;
    return slide.offsetWidth + GAP;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const step = getStep();
      if (!step) return;
      const idx = Math.round(el.scrollLeft / step);
      setActive(Math.min(Math.max(idx, 0), studies.length - 1));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [studies.length]);

  const goTo = (index: number) => {
    const el = ref.current;
    const step = getStep();
    if (!el || !step) return;
    el.scrollTo({ left: index * step, behavior: "smooth" });
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

    const step = getStep();
    if (step) {
      const idx = Math.round(el.scrollLeft / step);
      const clamped = Math.min(Math.max(idx, 0), studies.length - 1);
      el.scrollTo({ left: clamped * step, behavior: "smooth" });
      setActive(clamped);
    }

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
    <div className={styles.wrap}>
      <div
        className={styles.track}
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {studies.map((study) => (
          <div key={study.id} className={styles.slide}>
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
