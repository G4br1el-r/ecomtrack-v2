import type { PermissionMenuSection } from "@/schemas/Modules/Core/Access/permission-menu-section-schema";

export function getVisibleMenuSections(menu: PermissionMenuSection[] | undefined): PermissionMenuSection[] {
  return (menu ?? [])
    .map((section) => ({ ...section, pages: section.pages.filter((page) => page.showInMenu && page.route) }))
    .filter((section) => section.pages.length > 0);
}
