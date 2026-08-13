import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CaseStudy } from "../data/caseStudies";
import { CaseStudyCard } from "./CaseStudyCard";
import styles from "./CaseStudyCarousel.module.css";

type Props = {
  studies: CaseStudy[];
};

export function CaseStudyCarousel({ studies }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous">
          <ChevronLeft size={18} />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Next">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className={styles.track} ref={ref}>
        {studies.map((study) => (
          <div key={study.id} className={styles.slide}>
            <CaseStudyCard study={study} />
          </div>
        ))}
      </div>
    </div>
  );
}
