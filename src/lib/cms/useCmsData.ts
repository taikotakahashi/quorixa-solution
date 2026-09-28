import { useEffect, useState } from "react";
import { isCmsConfigured } from "../supabase";

type State<T> = {
  data: T;
  loading: boolean;
  error: string | null;
};

function emptyLike<T>(fallback: T): T {
  if (Array.isArray(fallback)) return [] as unknown as T;
  return fallback;
}

/**
 * Load CMS data once.
 * - CMS configured: start empty (no static flash), then show DB result.
 * - CMS not configured: use `fallback` immediately (hardcoded src/data).
 */
export function useCmsData<T>(loader: () => Promise<T>, fallback: T): State<T> {
  const cms = isCmsConfigured;
  const [data, setData] = useState<T>(() =>
    cms ? emptyLike(fallback) : fallback,
  );
  const [loading, setLoading] = useState(cms);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cms) {
      setData(fallback);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    loader()
      .then((value) => {
        if (!cancelled) {
          setData(value);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load");
          setData(fallback);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- loader identity intentionally ignored
  }, []);

  return { data, loading, error };
}
