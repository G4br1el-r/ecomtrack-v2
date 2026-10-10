import type { PermissionMenuPage } from "@/schemas/Modules/Core/Access/permission-menu-page-schema";
import type { PermissionMenuSection } from "@/schemas/Modules/Core/Access/permission-menu-section-schema";

export type Breadcrumb = {
  label: string;
  href?: string;
};

export type PendingNavigation = {
  href: string;
  from: string;
};

export type MenuEntry = {
  section: PermissionMenuSection;
  page: PermissionMenuPage & { route: string };
};
