import type { MenuEntry } from "@/@types/Modules/Core/Shell/navigation";
import type { PermissionMenuSection } from "@/schemas/Modules/Core/Access/permission-menu-section-schema";

export function findMenuEntry(menu: PermissionMenuSection[] | undefined, pathname: string): MenuEntry | null {
  let best: MenuEntry | null = null;
  for (const section of menu ?? []) {
    for (const page of section.pages) {
      const route = page.route;
      if (!route || (pathname !== route && !pathname.startsWith(`${route}/`))) continue;
      if (!best || route.length > best.page.route.length) best = { section, page: { ...page, route } };
    }
  }
  return best;
}
