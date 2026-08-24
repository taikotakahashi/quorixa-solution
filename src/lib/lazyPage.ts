import { lazy, type ComponentType } from "react";

export function lazyPage<M extends Record<string, ComponentType>>(
  importer: () => Promise<M>,
  exportName: keyof M,
) {
  return lazy(() =>
    importer().then((mod) => ({
      default: mod[exportName] as ComponentType,
    })),
  );
}
