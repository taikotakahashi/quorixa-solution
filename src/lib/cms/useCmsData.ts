import { useEffect, useState } from "react";

type State<T> = {
  data: T;
  loading: boolean;
  error: string | null;
};

/** Load CMS data once; `fallback` is shown until the async load resolves. */
export function useCmsData<T>(loader: () => Promise<T>, fallback: T): State<T> {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
