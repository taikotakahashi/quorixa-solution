import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import {
  searchKindLabel,
  searchSite,
  type SearchIndex,
  type SearchResult,
} from "../lib/siteSearch";
import styles from "./HeaderTools.module.css";

type Props = {
  index: SearchIndex;
  onOpenChange?: (open: boolean) => void;
};

export function HeaderSearch({ index, onOpenChange }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results: SearchResult[] = expanded ? searchSite(query, index) : [];

  useEffect(() => {
    onOpenChange?.(expanded);
  }, [expanded, onOpenChange]);

  useEffect(() => {
    if (!expanded) return;
    inputRef.current?.focus();
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setExpanded(false);
        setQuery("");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  return (
    <div
      ref={rootRef}
      className={`${styles.searchRoot} ${expanded ? styles.searchExpanded : ""}`}
    >
      {/* Input grows right → left; icon stays on the right of this control */}
      <div className={styles.searchShell} aria-hidden={!expanded}>
        <input
          ref={inputRef}
          type="search"
          className={styles.searchInput}
          placeholder="Search jobs, articles, team…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          tabIndex={expanded ? 0 : -1}
        />
      </div>

      <button
        type="button"
        className={styles.iconBtn}
        aria-label={expanded ? "Close search" : "Search the site"}
        aria-expanded={expanded}
        aria-controls={expanded ? listId : undefined}
        onClick={() => {
          setExpanded((v) => {
            if (v) setQuery("");
            return !v;
          });
        }}
      >
        {expanded ? (
          <X size={18} strokeWidth={2.2} />
        ) : (
          <Search size={18} strokeWidth={2.2} />
        )}
      </button>

      {expanded && query.trim().length >= 2 && (
        <div id={listId} className={styles.searchResults} role="listbox">
          {results.length === 0 ? (
            <p className={styles.empty}>No matches for “{query.trim()}”</p>
          ) : (
            results.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={styles.resultRow}
                role="option"
                onClick={() => {
                  setExpanded(false);
                  setQuery("");
                }}
              >
                <span className={styles.resultKind}>
                  {searchKindLabel(item.kind)}
                </span>
                <span className={styles.resultText}>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
