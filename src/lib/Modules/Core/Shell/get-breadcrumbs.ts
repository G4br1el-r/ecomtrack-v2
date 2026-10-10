import type { Breadcrumb } from "@/@types/Modules/Core/Shell/navigation";
import type { PermissionMenuSection } from "@/schemas/Modules/Core/Access/permission-menu-section-schema";

import { findMenuEntry } from "./find-menu-entry";

export function getBreadcrumbs(menu: PermissionMenuSection[] | undefined, pathname: string): Breadcrumb[] {
  const entry = findMenuEntry(menu, pathname);
  if (!entry) return [{ label: "Página não encontrada" }];
  return entry.section.name
    ? [{ label: entry.section.name }, { label: entry.page.name }]
    : [{ label: entry.page.name }];
}
