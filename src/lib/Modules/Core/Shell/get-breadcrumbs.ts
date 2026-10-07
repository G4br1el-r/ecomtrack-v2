import type { Breadcrumb } from "@/@types/Modules/Core/Shell/navigation";

import { findNavEntry } from "./find-nav-entry";

export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const entry = findNavEntry(pathname);
  if (!entry) return [{ label: "Página não encontrada" }];
  const group: Breadcrumb = entry.groupHref
    ? { label: entry.groupLabel, href: entry.groupHref }
    : { label: entry.groupLabel };
  return [group, { label: entry.title }];
}
